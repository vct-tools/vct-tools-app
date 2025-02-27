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
import { easeInOutExpo } from "./renderUtils";
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
(async () => { spikeImage = await loadImg(spikeImageURL) })();

let brandingImage: HTMLImageElement | null = null;

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

    const defTeam = gameData.redSide == "defense" ? gameData.redPlayers : gameData.bluePlayers;
    for (let i = 0; i < defTeam.length; i++) {
      playerLeft(
        ctx,
        25 - (xVal || 0),
        1080 - (25 + 115 * i),
        defTeam[i],
        defTeam[i].alive,
        settings,
        agentImages,
        abilityImages
      );
    }

    const atkTeam = gameData.redSide == "attack" ? gameData.redPlayers : gameData.bluePlayers;
    for (let i = 0; i < atkTeam.length; i++) {
      playerRight(
        ctx,
        1920 - 25 + (xVal || 0),
        1080 - (25 + 115 * i),
        atkTeam[i],
        atkTeam[i].alive,
        settings,
        agentImages,
        abilityImages
      );
    }
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

  if (gameData.phase == "combat") {
    // Draw spike
    if (!gameData.live.spikePlanted && spikeImage) {
      ctx.drawImage(spikeImage, 1920 / 2 - 25, 125, 50, 50);
    }

    // const onLeft = gameData.redSide == "attack";
    // TODO - Draw spike side
  }

  roundWinLoop(settings, ctx);

  score(ctx, {
    attackerScore: gameData.redSide == "attack" ? gameData.redScore : gameData.blueScore,
    defenderScore: gameData.redSide == "defense" ? gameData.redScore : gameData.blueScore,
    attackerName: gameData.redSide == "attack" ? settings.redTeamShortName : settings.blueTeamShortName,
    defenderName: gameData.redSide == "defense" ? settings.redTeamShortName : settings.blueTeamShortName,
    roundNum: gameData.round
  });

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

function roundWinLoop(settings: OverlaySettings, ctx: CanvasRenderingContext2D): void {
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
        brandingImage
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
