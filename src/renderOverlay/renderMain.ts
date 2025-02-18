import type { Ref } from "vue";
import type { OverlaySettings } from "./overlayType";
import { loadImg } from "@/pages/GraphicCreator/load_img";

import { roundWin } from "./renderCeromony";
import { score } from "./renderScore";
import { playerLeft } from "./renderPlayerLeft";
import { playerRight } from "./renderPlayerRight";
import { sponsors } from "./renderSponsors";
import { seriesMaps } from "./renderSeriesMaps";
import { drawCenteredText } from "./renderUtils";
import { type GameData } from "./overlayType";


const agentImages: Record<string, HTMLImageElement> = {};
const abilityImages: Record<
  string,
  {
    Ability1: HTMLImageElement;
    Ability2: HTMLImageElement;
    Signature: HTMLImageElement;
    Ultimate: HTMLImageElement;
  }
> = {};

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
    shown: false,
    lastShown: false,
    running: false,
    t: 0
  },
  playerInformation: {
    shown: true,
    lastShown: true,
    running: false,
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

export function renderOverlay(
  ctx: CanvasRenderingContext2D,
  settings: OverlaySettings,
  gameData: GameData
): void {
  ctx.clearRect(0, 0, 1920, 1080);

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

  roundWinLoop(settings, ctx);

  score(ctx, {
    attackerScore: 4,
    defenderScore: 5,
    attackerName: settings.redTeamName,
    defenderName: settings.blueTeamName,
    roundNum: 7
  });

  if (shownInformation.playerInformation.shown && !shownInformation.playerInformation.lastShown) {
    shownInformation.playerInformation.running = true;
    shownInformation.playerInformation.t = 0;
  }

  if (shownInformation.playerInformation.running) {
  }

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
