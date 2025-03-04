import { type Ref, ref } from "vue";
import type { OverlaySettings } from "./overlayType";
import { loadImg } from "@/pages/GraphicCreator/load_img";

import spikeImageURL from "@/assets/images/Spike.webp";

import { roundWin } from "./renderCeromony";
import { score } from "./renderScore";
import { playerLeft } from "./renderPlayerLeft";
import { playerRight } from "./renderPlayerRight";
import { sponsors } from "./renderSponsors";
import { seriesMaps } from "./renderSeriesMaps";
import { drawCenteredText } from "./renderUtils";
import { type GameData } from "./overlayType";
import { easeInOutExpo, lerp } from "./renderUtils";
import { preRound } from "./renderPreRound";

const agentImages: Ref<Record<string, HTMLImageElement>> = ref({});
const abilityImages: Ref<
  Record<
    string,
    {
      Ability1: HTMLImageElement;
      Ability2: HTMLImageElement;
      Signature: HTMLImageElement;
      Ultimate: HTMLImageElement;
    }
  >
> = ref({});
let spikeImage: HTMLImageElement | null = null;
const teamLogos: { red: HTMLImageElement | null; blue: HTMLImageElement | null } = { red: null, blue: null };

(async () => { spikeImage = await loadImg(spikeImageURL) })();

let brandingImage: HTMLImageElement | null = null;
let ceromonyBackgroundImage: HTMLImageElement | null = null;

const sponsorImages: HTMLImageElement[] = [];

const shownInformation = {
  roundWin: {
    trigger: (
      ceromony: string,
      winningTeamName: string,
      winningTeamSide: string,
      roundNum: number
    ) => {
      shownInformation.roundWin.i.data = { ceromony, winningTeamName, winningTeamSide, roundNum };
      shownInformation.roundWin.i.t = 0;
      shownInformation.roundWin.i.running = true;
    },
    i: {
      t: 0,
      running: false,
      data: {
        ceromony: "",
        winningTeamName: "",
        winningTeamSide: "",
        roundNum: 0
      },
      animation: {
        stall: 120
      }
    }
  },
  gameOverview: {
    shown: true,
    lastShown: true,
    running: false,
    directionShow: false, // Is the direction of the animation to show or hide, true = show, false = hide
    t: 0
  },
  playerInformation: {
    shown: false,
    lastShown: false,
    running: false,
    directionShow: false, // Is the direction of the animation to show or hide, true = show, false = hide
    t: 0
  },
  spike: {
    planted: false,
    lastPlanted: false,
    running: false,
    directionShow: false, // Is the direction of the animation to unplant or plant, true = plant, false = unplant
    t: 0
  }
};

export function renderLoop(
  gameData: Ref<GameData>,
  settings: Ref<OverlaySettings>,
  ctx: CanvasRenderingContext2D
): void {
  const targetFps = 60;
  const frameTime = 1000 / targetFps;
  let lastFrameTime = performance.now();

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const r = (timestamp: number) => {
    const deltaTime = timestamp - lastFrameTime;

    if (deltaTime >= frameTime) {
      lastFrameTime = timestamp - (deltaTime % frameTime);
      renderOverlay(ctx, settings.value, gameData.value);
    }

    requestAnimationFrame(r);
  };

  requestAnimationFrame(r);
}

const stalls = {
  roundWin: 0
};

export async function renderOverlay(
  ctx: CanvasRenderingContext2D,
  settings: OverlaySettings,
  gameData: GameData
): Promise<void> {
  ctx.clearRect(0, 0, 1920, 1080);

  shownInformation.playerInformation.shown = gameData.phase == "combat";
  shownInformation.gameOverview.shown = gameData.phase == "buy";

  // Deal with playerInformation showing
  if (
    shownInformation.playerInformation.shown == false &&
    shownInformation.playerInformation.lastShown == true
  ) {
    shownInformation.playerInformation.running = true;
    shownInformation.playerInformation.directionShow = false;
    shownInformation.playerInformation.t = 0;

    shownInformation.playerInformation.lastShown = false;
  } else if (
    shownInformation.playerInformation.shown == true &&
    shownInformation.playerInformation.lastShown == false
  ) {
    shownInformation.playerInformation.running = true;
    shownInformation.playerInformation.directionShow = true;
    shownInformation.playerInformation.t = 0;

    shownInformation.playerInformation.lastShown = true;
  }

  if (shownInformation.playerInformation.running) {
    shownInformation.playerInformation.t += 5;

    if (shownInformation.playerInformation.t >= 100) {
      shownInformation.playerInformation.running = false;
    }
  }

  if (shownInformation.playerInformation.shown || shownInformation.playerInformation.running) {
    const xVal = shownInformation.playerInformation.running
      ? shownInformation.playerInformation.directionShow
        ? easeInOutExpo(500, 0, shownInformation.playerInformation.t / 100)
        : easeInOutExpo(0, 500, shownInformation.playerInformation.t / 100)
      : null;

    for (let i = 0; i < gameData.redPlayers.length; i++) {
      playerLeft(
        ctx,
        25 - (xVal || 0),
        1080 - (25 + 115 * i),
        gameData.redPlayers[i],
        gameData.redPlayers[i].alive,
        settings,
        agentImages,
        abilityImages,
        gameData.redSide
      );
    }

    for (let i = 0; i < gameData.bluePlayers.length; i++) {
      playerRight(
        ctx,
        1920 - 25 + (xVal || 0),
        1080 - (25 + 115 * i),
        gameData.bluePlayers[i],
        gameData.bluePlayers[i].alive,
        settings,
        agentImages,
        abilityImages,
        gameData.blueSide
      );
    }

    // Draw watermark
    const watermarkText = "Overlay by VCTTools.net";
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.beginPath();
    ctx.font = "20px 'Din Next'";
    const w = ctx.measureText(watermarkText).width;
    ctx.roundRect(1920 - 25 + (xVal || 0) - (w + 10), 1080 - (25 + 115 * (gameData.bluePlayers.length + 1)) + (115 - 30), (w + 10), 30, [10, 10, 10, 10]);
    ctx.fill();
    ctx.closePath();

    drawCenteredText(
      ctx,
      watermarkText,
      1920 - 25 + (xVal || 0) - 5,
      1080 - (25 + 115 * (gameData.bluePlayers.length + 1)) + (115 - 15),
      "20px 'Din Next'",
      "rgb(255, 255, 255, 0.2)",
      "right",
      "middle"
    );
  }

  // Game overview
  if (
    shownInformation.gameOverview.shown == false &&
    shownInformation.gameOverview.lastShown == true
  ) {
    shownInformation.gameOverview.running = true;
    shownInformation.gameOverview.directionShow = false;
    shownInformation.gameOverview.t = 0;

    shownInformation.gameOverview.lastShown = false;
  } else if (
    shownInformation.gameOverview.shown == true &&
    shownInformation.gameOverview.lastShown == false
  ) {
    shownInformation.gameOverview.running = true;
    shownInformation.gameOverview.directionShow = true;
    shownInformation.gameOverview.t = 0;

    shownInformation.gameOverview.lastShown = true;
  }

  if (shownInformation.gameOverview.running) {
    shownInformation.gameOverview.t += 5;

    if (shownInformation.gameOverview.t >= 100) {
      shownInformation.gameOverview.running = false;
    }
  }

  if (shownInformation.gameOverview.shown || shownInformation.gameOverview.running) {
    const yVal = shownInformation.gameOverview.running ? (
      shownInformation.gameOverview.directionShow ? easeInOutExpo(1080, 0, shownInformation.gameOverview.t / 100) :
      easeInOutExpo(0, 1080, shownInformation.gameOverview.t / 100)
    ) : null;

    preRound(ctx, gameData, settings, agentImages, abilityImages, (yVal || 0) + 1080 - 25, brandingImage);
  }

  if (!brandingImage) {
    if (settings.series.showBrandingImg && settings.series.brandingImg) {
      loadImg(settings.series.brandingImg).then((img) => {
        brandingImage = img;
      });
    } else {
      brandingImage = null;
    }
  } else {
    if (!settings.series.showBrandingImg) {
      brandingImage = null;
    } else if (settings.series.brandingImg != brandingImage.src && settings.series.brandingImg) {
      loadImg(settings.series.brandingImg).then((img) => {
        brandingImage = img;
      });
    }
  }

  if (!teamLogos.red) {
    if (settings.redTeamLogo) {
      loadImg(settings.redTeamLogo).then((img) => {
        teamLogos.red = img;
      });
    } else {
      teamLogos.red = null;
    }
  } else {
    if (settings.redTeamLogo && settings.redTeamLogo != teamLogos.red.src) {
      loadImg(settings.redTeamLogo).then((img) => {
        teamLogos.red = img;
      });
    }
  }

  if (!teamLogos.blue) {
    if (settings.blueTeamLogo) {
      loadImg(settings.blueTeamLogo).then((img) => {
        teamLogos.blue = img;
      });
    } else {
      teamLogos.blue = null;
    }
  } else {
    if (settings.blueTeamLogo && settings.blueTeamLogo != teamLogos.blue.src) {
      loadImg(settings.blueTeamLogo).then((img) => {
        teamLogos.blue = img;
      });
    }
  }

  if (!ceromonyBackgroundImage) {
    if (settings.roundOutcomeBanner.background) {
      loadImg(settings.roundOutcomeBanner.background).then((img) => {
        ceromonyBackgroundImage = img;
      });
    } else {
      ceromonyBackgroundImage = null;
    }
  } else {
    if (settings.roundOutcomeBanner.background && settings.redTeamLogo != ceromonyBackgroundImage.src) {
      loadImg(settings.roundOutcomeBanner.background).then((img) => {
        ceromonyBackgroundImage = img;
      });
    }
  }

  score(ctx, gameData, settings, teamLogos);

  // Spike animation
  shownInformation.spike.planted = gameData.live.spikePlanted;

  if (shownInformation.spike.planted == false && shownInformation.spike.lastPlanted == true) {
    shownInformation.spike.running = true;
    shownInformation.spike.directionShow = false;
    shownInformation.spike.t = 100; // Start from 100 when unplanting

    shownInformation.spike.lastPlanted = false;
  } else if (shownInformation.spike.planted == true && shownInformation.spike.lastPlanted == false) {
    shownInformation.spike.running = true;
    shownInformation.spike.directionShow = true;
    shownInformation.spike.t = 0; // Start from 0 when planting

    shownInformation.spike.lastPlanted = true;
  }

  if (shownInformation.spike.running) {
    if (shownInformation.spike.directionShow) {
      shownInformation.spike.t = Math.min(shownInformation.spike.t + 5, 100);
    } else {
      shownInformation.spike.t = Math.max(shownInformation.spike.t - 5, 0);
    }

    if (shownInformation.spike.t === 100 || shownInformation.spike.t === 0) {
      shownInformation.spike.running = false;
    }
  }

  if (gameData.phase == "combat") {
    const spikeY = lerp(100, 30, shownInformation.spike.t / 100);
    const triangleY = 125;
    // Draw spike
    if (gameData.live.spikePlanted) {
      ctx.fillStyle = "rgb(15, 25, 35)";
      ctx.fillRect(1920 / 2 - 140 / 2, 25, 140, 72 - 25);
    }

    if (spikeImage) {
      ctx.drawImage(spikeImage, 1920 / 2 - 25, spikeY, 50, 50);
    }

    const onLeft = gameData.redSide == "attack";
    const triangleSize = 15;

    if (onLeft) {
      ctx.beginPath();
      ctx.moveTo(1920 / 2 - 50, triangleY - triangleSize / 2);
      ctx.lineTo(1920 / 2 - 50 - triangleSize, triangleY);
      ctx.lineTo(1920 / 2 - 50, triangleY + triangleSize / 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.closePath();
    } else {
      ctx.beginPath();
      ctx.moveTo(1920 / 2 + 50, triangleY - triangleSize / 2);
      ctx.lineTo(1920 / 2 + 50 + triangleSize, triangleY);
      ctx.lineTo(1920 / 2 + 50, triangleY + triangleSize / 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.closePath();
    }
  }

  shownInformation.roundWin.i.data.roundNum = gameData.round;
  roundWinLoop(settings, ctx, gameData);

  // Draw overlay overlay
  if (settings.series.maps.length > 0) {
    seriesMaps(ctx, settings);
  }

  const gradient = ctx.createLinearGradient(0, 0, 500, 0);
  gradient.addColorStop(0, `rgba(0, 0, 0, 1)`);
  gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
  ctx.fillStyle = gradient;

  ctx.fillRect(0, 25, 500, 25);

  drawCenteredText(
    ctx,
    settings.series.seriesName,
    5,
    12.5 + 25,
    "20px 'Din Next'",
    "white",
    "left",
    "middle"
  );

  if (settings.sponsors.sponsorEnabled) {
    if (settings.sponsors.sponsorImgs.length > 0) {
      settings.sponsors.sponsorImgs.forEach((img, i) => {
        if (sponsorImages[i]) {
          if (sponsorImages[i].src != img) {
            loadImg(img).then((img) => {
              sponsorImages[i] = img;
            });
          }
        } else {
          loadImg(img).then((img) => {
            sponsorImages[i] = img;
          });
        }
      });
    }

    sponsors(ctx, settings, sponsorImages);
  }
}

function roundWinLoop(settings: OverlaySettings, ctx: CanvasRenderingContext2D, gameData: GameData): void {
  if (shownInformation.roundWin.i.running) {
    if (settings.otherOverlayFeatures.roundOutcomeBanner) {
      roundWin(
        ctx,
        shownInformation.roundWin.i.data.ceromony,
        shownInformation.roundWin.i.data.winningTeamName,
        shownInformation.roundWin.i.data.winningTeamSide,
        shownInformation.roundWin.i.data.roundNum,
        shownInformation.roundWin.i.t / 100,
        settings,
        brandingImage,
        teamLogos,
        gameData,
        ceromonyBackgroundImage
      );

      if (shownInformation.roundWin.i.t == 90) {
        stalls.roundWin += 1;
        if (stalls.roundWin >= shownInformation.roundWin.i.animation.stall) {
          stalls.roundWin = 0;
          shownInformation.roundWin.i.t += 2;
        }
      } else {
        shownInformation.roundWin.i.t += 2;
      }
      if (shownInformation.roundWin.i.t >= 100) shownInformation.roundWin.i.running = false;
    } else {
      shownInformation.roundWin.i.running = false;
    }
  }
}

export { shownInformation };
