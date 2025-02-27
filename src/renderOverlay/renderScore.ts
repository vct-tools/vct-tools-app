import { drawCenteredText, atkC, defC } from "./renderUtils";

export function score(
  ctx: CanvasRenderingContext2D,
  gameData: {
    redScore: number;
    blueScore: number;
    redName: string;
    blueName: string;
    roundNum: number;
    redSide: string;
    blueSide: string;
  }
): void {
  const color = "15, 25, 35";
  const timerWidth = 140;
  const timerHeight = 72;

  const width = 200;
  ctx.filter = "none";

  // Draw left
  ctx.beginPath();
  ctx.moveTo(1920 / 2 - timerWidth / 2 - 1, timerHeight);
  ctx.lineTo(1920 / 2 - timerWidth / 2 - width, timerHeight);
  ctx.lineTo(1920 / 2 - timerWidth / 2 - width - timerHeight / 4, 0);
  ctx.lineTo(1920 / 2 - timerWidth / 2 - 1, 0);
  ctx.fillStyle = `rgb(${color})`;
  ctx.fill();
  ctx.closePath();

  // Draw right
  ctx.beginPath();
  ctx.moveTo(1920 / 2 + timerWidth / 2 + 1, timerHeight);
  ctx.lineTo(1920 / 2 + timerWidth / 2 + width, timerHeight);
  ctx.lineTo(1920 / 2 + timerWidth / 2 + width + timerHeight / 4, 0);
  ctx.lineTo(1920 / 2 + timerWidth / 2 + 1, 0);
  ctx.fillStyle = `rgb(${color})`;
  ctx.fill();
  ctx.closePath();

  // Draw outline around both
  ctx.beginPath();
  ctx.moveTo(1920 / 2 - timerWidth / 2 - width - timerHeight / 4 - 8, -5);
  ctx.lineTo(1920 / 2 - timerWidth / 2 - width - 5, timerHeight + 6);
  ctx.lineTo(1920 / 2 + timerWidth / 2 + width + 5, timerHeight + 6);
  ctx.lineTo(1920 / 2 + timerWidth / 2 + width + timerHeight / 4 + 8, -5);
  ctx.strokeStyle = `rgb(${color})`;
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.closePath();

  // Draw branding
  drawCenteredText(
    ctx,
    "VCTTools.net",
    1920 / 2,
    timerHeight + 20,
    "bold 20px 'Din Next'",
    `rgba(${color}, 0.7)`,
    "center",
    "middle"
  );

  // Red score and name
  drawCenteredText(
    ctx,
    gameData.redName.toUpperCase(),
    1920 / 2 - timerWidth / 2 - 20,
    timerHeight / 2 + 10,
    "42px Tungsten",
    "white",
    "right",
    "middle"
  );

  drawCenteredText(
    ctx,
    gameData.redSide == "defense" ? "DEF" : "ATK",
    1920 / 2 - timerWidth / 2 - 20,
    timerHeight / 2 - 20,
    "20px 'Din Next'",
    "white",
    "right",
    "middle"
  );

  drawCenteredText(
    ctx,
    gameData.redScore.toString(),
    1920 / 2 - timerWidth / 5 - width,
    timerHeight / 2 + 10,
    "42px Tungsten",
    `rgb(${gameData.redSide == "defense" ? defC : atkC})`,
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

  // Blue score and name
  drawCenteredText(
    ctx,
    gameData.blueName.toUpperCase(),
    1920 / 2 + timerWidth / 2 + 20,
    timerHeight / 2 + 10,
    "42px Tungsten",
    "white",
    "left",
    "middle"
  );

  drawCenteredText(
    ctx,
    gameData.blueSide == "defense" ? "DEF" : "ATK",
    1920 / 2 + timerWidth / 2 + 20,
    timerHeight / 2 - 20,
    "20px 'Din Next'",
    "white",
    "left",
    "middle"
  );

  drawCenteredText(
    ctx,
    gameData.blueScore.toString(),
    1920 / 2 + timerWidth / 5 + width,
    timerHeight / 2 + 10,
    "42px Tungsten",
    `rgb(${gameData.blueSide == "defense" ? defC : atkC})`,
    "center",
    "middle"
  );
}
