import type { Ref } from "vue";
import type { OverlaySettings } from "./overlayType";
import { loadImg } from "./pages/GraphicCreator/load_img";
import agents from "./agents";

type AbilityData = {
  name: string;
  maxUses: number;
  remainingUses: number;
  image: string;
};

type UltimateData = {
  name: string;
  maxProgress: number;
  progress: number;
  image: string;
};

type Gun = {
  name: string;
  image: string;
};

type LoadoutData = {
  sidearm: Gun | null;
  firearm: Gun | null;
  shield: {
    name: "light" | "heavy" | "regen" | "none";
    image: string;
    health: number;
  };
};

type PlayerData = {
  name: string;
  agent: string;
  health: number;
  credits: number;
  abilities: AbilityData[];
  ultimate: UltimateData;
  loadout: LoadoutData;
  KDA: [number, number, number];
};

type Round = {
  roundNumber: number;
  winner: "attacker" | "defender";
  cause: "defuse" | "elimination" | "time" | "detonation";
};

type GameData = {
  round: number;
  phase: string;
  matchLog: Round[];
  attackerScore: number;
  defenderScore: number;
  attackers: PlayerData[];
  defenders: PlayerData[];
};

const atkC = "243, 68, 83";
const defC = "50, 175, 138";
const headerC = "224, 235, 185";
const accent = "134, 191, 42";

const images: Record<string, HTMLImageElement> = {};

function bgGradient(ctx: CanvasRenderingContext2D): void {
  const gradient = ctx.createRadialGradient(1920 / 2, 1080 / 2, 20, 1920 / 2, 1080 / 2, 1080);
  gradient.addColorStop(0.05, "rgba(33, 52, 66, 0.96)");
  gradient.addColorStop(1, "rgba(28, 66, 73, 0.96)");
  ctx.fillStyle = gradient;
}

function drawCenteredText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  font: string,
  color: string,
  align: CanvasTextAlign = "center",
  baseline: CanvasTextBaseline = "alphabetic",
  yOffset: number = 0
) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;

  const metrics = ctx.measureText(text);
  const ascent = metrics.actualBoundingBoxAscent || metrics.emHeightAscent || 0;
  const descent = metrics.actualBoundingBoxDescent || 0;

  ctx.fillText(text, x, y + ascent / 2 - descent / 2 + yOffset);
}

function easeInOutExpo(v0: number, v1: number, x: number): number {
  return x === 0
    ? v0
    : x === 1
    ? v1
    : x < 0.5
    ? (v1 - v0) * Math.pow(2, 20 * x - 10) / 2 + v0
    : (v1 - v0) * (2 - Math.pow(2, -20 * x + 10)) / 2 + v0;
}

function animationDelay(min: number, max: number, animationProgress: number): number {
  if (animationProgress <= min) return 0;
  if (animationProgress >= max) return 1;

  return (animationProgress - min) / (max - min);
}

export function renderLoop(gameData: Ref<GameData> | null, settings: Ref<OverlaySettings>, ctx: CanvasRenderingContext2D): void {
  const targetFps = 30;
  const frameTime = 1000 / targetFps;
  let lastFrameTime = 0;

  const r = (timestamp: number) => {
    if (timestamp - lastFrameTime < frameTime) {
      requestAnimationFrame(r);
      return;
    }

    lastFrameTime = timestamp;

    renderOverlay(ctx, settings.value, gameData ? gameData.value : null);
    requestAnimationFrame(r);
  }

  requestAnimationFrame(r);
}

export function renderOverlay(
  ctx: CanvasRenderingContext2D,
  settings: OverlaySettings,
  gameData: GameData | null
): void {
  ctx.clearRect(0, 0, 1920, 1080);

  roundWin(ctx, "ROUND WIN", settings.attackerTeamName, "Attack", 7, 0.9);
  score(ctx, {
    attackerScore: 12,
    defenderScore: 7,
    attackerName: settings.attackerTeamName,
    defenderName: settings.defenderTeamName,
    roundNum: 7
  });

  for (let i = 0; i < 5; i++) {
    playerLeft(ctx, 25, 1080 - 25 - i * 115);
  }
}

function roundWin(
  ctx: CanvasRenderingContext2D,
  ceromony: string,
  winningTeamName: string,
  winningTeamSide: string,
  roundNum: number,
  animationProgress: number = 0
): void {
  bgGradient(ctx);
  const width = easeInOutExpo(800, 1000, animationDelay(0.2, 0.9, animationProgress));
  const height = easeInOutExpo(300, 200, animationDelay(0.2, 0.9, animationProgress));
  const roundInfoWidth = 250;
  const roundInfoHeight = 60;
  const locationY = animationProgress < 0.9 ? easeInOutExpo(1080 / 2, 1080 - height / 2, animationDelay(0.2, 0.9, animationProgress)) : easeInOutExpo(1080 - height / 2, 1080 - height / 2 + height * 2, animationDelay(0.9, 1, animationProgress));

  ctx.fillRect(1920 / 2 - width / 2, locationY - height / 2, width, height);
  ctx.fillStyle = `rgba(${atkC})`;
  ctx.fillRect(
    1920 / 2 - width / 2 + width / 2 - roundInfoWidth / 2,
    locationY - height / 2 - roundInfoHeight / 2,
    roundInfoWidth,
    roundInfoHeight
  );

  drawCenteredText(
    ctx,
    `ROUND ${roundNum}`,
    1920 / 2 - width / 2 + width / 2,
    locationY - height / 2,
    "40px 'Din Next'",
    "white",
    "center",
    "middle"
  );

  ctx.font = `${easeInOutExpo(150, 100, animationDelay(0.2, 0.9, animationProgress))}px 'Tungsten'`;
  drawCenteredText(
    ctx,
    ceromony,
    easeInOutExpo(1920 / 2 - ctx.measureText(ceromony).width / 2, 1920 / 2 - width / 2 + 25, animationDelay(0.2, 0.9, animationProgress)),
    locationY,
    `${easeInOutExpo(150, 100, animationDelay(0.2, 0.9, animationProgress))}px 'Tungsten'`,
    `rgb(${headerC})`,
    "left",
    "middle"
  );

  // Animation big box
  if (animationProgress <= 0.2) {
    ctx.fillStyle = `rgb(${accent})`;
    ctx.fillRect(1920 / 2 - width / 2 - 10 + easeInOutExpo(0, width + 20, animationDelay(0, 0.2, animationProgress)), locationY - height / 2 - roundInfoHeight / 2 - 10, width + 20 - easeInOutExpo(0, width + 20, animationDelay(0, 0.2, animationProgress)), height + roundInfoHeight + 20);
  }

  drawCenteredText(
    ctx,
    winningTeamName.toUpperCase(),
    1920 / 2 + width / 2 - 25,
    locationY - 25,
    "60px 'Din Next'",
    `rgba(255, 255, 255, ${animationDelay(0.5, 0.9, animationProgress)})`,
    "right",
    "middle"
  );

  drawCenteredText(
    ctx,
    winningTeamSide.toUpperCase(),
    1920 / 2 + width / 2 - 25,
    locationY + 25,
    "60px 'Din Next'",
    winningTeamSide === "Attack" ? `rgba(${atkC}, ${animationDelay(0.5, 0.9, animationProgress)})` : `rgba(${defC}, ${animationDelay(0.5, 0.9, animationProgress)})`,
    "right",
    "middle"
  );
}

function score(ctx: CanvasRenderingContext2D, gameData: { attackerScore: number; defenderScore: number; attackerName: string; defenderName: string; roundNum: number; }): void {
  const color = "rgb(15, 25, 35)";
  const timerWidth = 140;
  const timerHeight = 72;

  const width = 200;

  // Draw left
  ctx.beginPath();
  ctx.moveTo(1920 / 2 - timerWidth / 2 - 1, timerHeight);
  ctx.lineTo(1920 / 2 - timerWidth / 2 - width, timerHeight);
  ctx.lineTo(1920 / 2 - timerWidth / 2 - width - timerHeight / 2, 0);
  ctx.lineTo(1920 / 2 - timerWidth / 2 - 1, 0);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();

  // Draw right
  ctx.beginPath();
  ctx.moveTo(1920 / 2 + timerWidth / 2 + 1, timerHeight);
  ctx.lineTo(1920 / 2 + timerWidth / 2 + width, timerHeight);
  ctx.lineTo(1920 / 2 + timerWidth / 2 + width + timerHeight / 2, 0);
  ctx.lineTo(1920 / 2 + timerWidth / 2 + 1, 0);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();

  // Draw outline around both
  ctx.beginPath();
  ctx.moveTo(1920 / 2 - timerWidth / 2 - width - timerHeight / 2 - 10, -5);
  ctx.lineTo(1920 / 2 - timerWidth / 2 - width - 5, timerHeight + 6);
  ctx.lineTo(1920 / 2 + timerWidth / 2 + width + 5, timerHeight + 6);
  ctx.lineTo(1920 / 2 + timerWidth / 2 + width + timerHeight / 2 + 10, -5);
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.closePath();

  // Attacker score and name
  drawCenteredText(
    ctx,
    gameData.attackerName.toUpperCase(),
    1920 / 2 - timerWidth / 2 - 20,
    timerHeight / 2 + 10,
    "42px Tungsten",
    "white",
    "right",
    "middle"
  );

  drawCenteredText(
    ctx,
    "ATK",
    1920 / 2 - timerWidth / 2 - 20,
    timerHeight / 2 - 20,
    "20px 'Din Next'",
    "white",
    "right",
    "middle"
  );

  drawCenteredText(
    ctx,
    gameData.attackerScore.toString(),
    1920 / 2 - timerWidth / 5 - width,
    timerHeight / 2 + 10,
    "42px Tungsten",
    `rgb(${atkC})`,
    "center",
    "middle"
  );

  // Time
  drawCenteredText(
    ctx,
    `ROUND ${gameData.roundNum}`,
    1920 / 2,
    timerHeight / 2 - 20,
    "20px 'Din Next'",
    "white",
    "center",
    "middle"
  );

  // Defender score and name
  drawCenteredText(
    ctx,
    gameData.defenderName.toUpperCase(),
    1920 / 2 + timerWidth / 2 + 20,
    timerHeight / 2 + 10,
    "42px Tungsten",
    "white",
    "left",
    "middle"
  );

  drawCenteredText(
    ctx,
    "DEF",
    1920 / 2 + timerWidth / 2 + 20,
    timerHeight / 2 - 20,
    "20px 'Din Next'",
    "white",
    "left",
    "middle"
  );

  drawCenteredText(
    ctx,
    gameData.defenderScore.toString(),
    1920 / 2 + timerWidth / 5 + width,
    timerHeight / 2 + 10,
    "42px Tungsten",
    `rgb(${defC})`,
    "center",
    "middle"
  );
}

async function playerLeft(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const playerHealth = 100;
  const ultProgress = [4, 9];
  const playerShields = 50;
  const agent = "Raze";

  // get agent image
  if (!images[agent]) {
    const agentF = agents.find((a) => a.name == agent);
    if (agentF) {
      images[agentF.name] = await loadImg(agentF.icon);
    }
  }

  ctx.fillStyle = `rgba(${defC}, 0.5)`;
  ctx.fillRect(x, y - 30, 400, 30);

  ctx.fillStyle = `rgba(100, 100, 100, 1)`;
  ctx.fillRect(x, y - 30 - 10, 400, 10);
  ctx.fillStyle = `rgba(${defC}, 1)`;
  ctx.fillRect(x, y - 30 - 10, playerHealth * 4, 10);

  drawCenteredText(
    ctx,
    `abcdefghijklmop`,
    x + 6,
    y - 15,
    "bold 20px 'Din Next'",
    "white",
    "left",
    "middle"
  );

  (() => {
    const spacing = 12;
    const pointCount = ultProgress[1];
    const totalWidth = (pointCount - 1) * spacing;
    const location = x + 250 - totalWidth / 2;

    for (let i = 0; i < pointCount; i++) {
      ctx.fillStyle = ultProgress[0] > i ? "white" : "rgb(58, 58, 58)";
      ctx.beginPath();
      ctx.moveTo(location + i * spacing, y - 15);
      ctx.lineTo(location + 5 + i * spacing, y - 20);
      ctx.lineTo(location + 10 + i * spacing, y - 15);
      ctx.lineTo(location + 5 + i * spacing, y - 10);
      ctx.closePath();
      ctx.fill();
    }
  })();


  // draw shield
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;


  const xSl = x + 335;
  const ySl = y - 27;

  ctx.beginPath();
  ctx.moveTo(xSl + 21, ySl + 11);
  ctx.bezierCurveTo(
    xSl + 21, ySl + 16.55,
    xSl + 17.16, ySl + 21.74,
    xSl + 12, ySl + 23
  );
  ctx.bezierCurveTo(
    xSl + 6.84, ySl + 21.74,
    xSl + 3, ySl + 16.55,
    xSl + 3, ySl + 11
  );
  ctx.lineTo(xSl + 3 , ySl + 5 );
  ctx.lineTo(xSl + 12 , ySl + 1 );
  ctx.lineTo(xSl + 21 , ySl + 5 );
  ctx.lineTo(xSl + 21 , ySl + 11 );
  ctx.closePath();
  ctx.stroke();

  // Draw health and shields
  drawCenteredText(
    ctx,
    playerHealth.toString(),
    x + 395,
    y - 15,
    "bold 20px 'Din Next'",
    "white",
    "right",
    "middle"
  );

  drawCenteredText(
    ctx,
    playerShields.toString(),
    x + 347,
    y - 15,
    "10px 'Din Next'",
    "white",
    "center",
    "middle"
  );

  // Draw box
  ctx.fillStyle = `rgba(0, 0, 0, 0.3)`;
  ctx.fillRect(x, y - 30 - 10 - 70, 400, 70);

  // Draw agent
  ctx.drawImage(images[agent], x + 5, y - 30 - 10 - 70, 70, 70);
}

export { type GameData, type PlayerData, type LoadoutData, type AbilityData, type Gun, type Round };
