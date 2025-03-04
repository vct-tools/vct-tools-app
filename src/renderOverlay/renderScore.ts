import type { GameData, OverlaySettings } from "./overlayType";
import { drawCenteredText, atkC, defC } from "./renderUtils";

export function score(
  ctx: CanvasRenderingContext2D,
  gameData: GameData,
  settings: OverlaySettings,
  teamLogos: { red: HTMLImageElement | null; blue: HTMLImageElement | null }
): void {
  const color = "15, 25, 35";
  const timerWidth = 140;
  const timerHeight = 72;

  // Draw triangles on either side of the timer
  ctx.fillStyle = `rgb(${color})`;
  ctx.beginPath();
  ctx.moveTo(1920 / 2 - timerWidth / 2, timerHeight);
  ctx.lineTo(1920 / 2 - timerWidth / 2, 0);
  ctx.lineTo(1920 / 2 - timerWidth / 2 - timerWidth / 6, 0);
  ctx.fill();
  ctx.closePath();

  ctx.fillStyle = `rgb(${color})`;
  ctx.beginPath();
  ctx.moveTo(1920 / 2 + timerWidth / 2, timerHeight);
  ctx.lineTo(1920 / 2 + timerWidth / 2, 0);
  ctx.lineTo(1920 / 2 + timerWidth / 2 + timerWidth / 6, 0);
  ctx.fill();
  ctx.closePath();

  ctx.fillStyle = `rgb(${color})`;
  ctx.beginPath();
  ctx.moveTo(1920 / 2 - timerWidth / 2, timerHeight);
  ctx.lineTo(1920 / 2 - timerWidth / 2 + timerHeight / 12, timerHeight + 20);
  ctx.lineTo(1920 / 2 + timerWidth / 2 - timerHeight / 12, timerHeight + 20);
  ctx.lineTo(1920 / 2 + timerWidth / 2, timerHeight);
  ctx.fill();
  ctx.closePath();

  const teamWidth = settings.showTeamLogos ? 250 : 200;
  const scoreWidth = 66;

  // Draw the red team
  {
    ctx.strokeStyle = `rgb(${color})`;
    ctx.fillStyle = `rgba(${gameData.redSide == "attack" ? atkC : defC}, 0.65)`;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(1920 / 2 - timerWidth / 2 - timerWidth / 6 - 3, 10);
    ctx.lineTo(1920 / 2 - timerWidth / 2 - 15, timerHeight / 2 + 10);
    ctx.lineTo(1920 / 2 - timerWidth / 2 - timerWidth / 6 - 3, timerHeight + 10);
    ctx.lineTo(1920 / 2 - timerWidth / 2 - timerWidth / 6 - 3 - teamWidth, timerHeight + 10);
    ctx.lineTo(
      1920 / 2 - timerWidth / 2 - timerWidth / 6 - 3 - teamWidth - 12,
      timerHeight / 2 + 10
    );
    ctx.lineTo(1920 / 2 - timerWidth / 2 - timerWidth / 6 - 3 - teamWidth, 10);
    ctx.lineTo(1920 / 2 - timerWidth / 2 - timerWidth / 6 - 3, 10);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = `rgb(${color})`;
    ctx.beginPath();
    ctx.moveTo(1920 / 2 - timerWidth / 2 - timerWidth / 6 - 3 - scoreWidth, 10);
    ctx.lineTo(1920 / 2 - timerWidth / 2 - timerWidth / 6 - 3 - scoreWidth, timerHeight + 10);
    ctx.lineTo(1920 / 2 - timerWidth / 2 - timerWidth / 6 - 3 - teamWidth, timerHeight + 10);
    ctx.lineTo(
      1920 / 2 - timerWidth / 2 - timerWidth / 6 - 3 - teamWidth - 12,
      timerHeight / 2 + 10
    );
    ctx.lineTo(1920 / 2 - timerWidth / 2 - timerWidth / 6 - 3 - teamWidth, 10);
    ctx.fill();
    ctx.closePath();

    // Draw the score
    drawCenteredText(
      ctx,
      `${gameData.redScore}`,
      1920 / 2 - timerWidth / 2 - timerWidth / 6 - (scoreWidth) / 2,
      timerHeight / 2 + 10,
      "50px Tungsten",
      "white",
      "center",
      "middle"
    );

    // Draw team name
    drawCenteredText(
      ctx,
      settings.redTeamShortName.toUpperCase(),
      settings.showTeamLogos ? 1920 / 2 - timerWidth / 2 - timerWidth / 6 - scoreWidth - (teamWidth - scoreWidth) / 3 - 3 : 1920 / 2 - timerWidth / 2 - timerWidth / 6 - scoreWidth - (teamWidth - scoreWidth) / 2 - 3,
      timerHeight / 2 + 10,
      "50px Tungsten",
      "white",
      "center",
      "middle"
    );

    // Draw the team logo
    if (settings.showTeamLogos && teamLogos.red) {
      const logoSize = timerHeight - 20;

      ctx.drawImage(
        teamLogos.red,
        1920 / 2 - timerWidth / 2 - timerWidth / 6 - scoreWidth - (teamWidth - scoreWidth) + (teamWidth - scoreWidth) / 4 - 3 - logoSize / 2,
        timerHeight / 2 + 10 - logoSize / 2,
        logoSize,
        logoSize
      );
    }
  }

  // Draw the blue team
  {
    ctx.strokeStyle = `rgb(${color})`;
    ctx.fillStyle = `rgba(${gameData.blueSide == "attack" ? atkC : defC}, 0.65)`;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(1920 / 2 + timerWidth / 2 + timerWidth / 6 + 3, 10);
    ctx.lineTo(1920 / 2 + timerWidth / 2 + 15, timerHeight / 2 + 10);
    ctx.lineTo(1920 / 2 + timerWidth / 2 + timerWidth / 6 + 3, timerHeight + 10);
    ctx.lineTo(1920 / 2 + timerWidth / 2 + timerWidth / 6 + 3 + teamWidth, timerHeight + 10);
    ctx.lineTo(
      1920 / 2 + timerWidth / 2 + timerWidth / 6 + 3 + teamWidth + 12,
      timerHeight / 2 + 10
    );
    ctx.lineTo(1920 / 2 + timerWidth / 2 + timerWidth / 6 + 3 + teamWidth, 10);
    ctx.lineTo(1920 / 2 + timerWidth / 2 + timerWidth / 6 + 3, 10);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = `rgb(${color})`;
    ctx.beginPath();
    ctx.moveTo(1920 / 2 + timerWidth / 2 + timerWidth / 6 + 3 + scoreWidth, 10);
    ctx.lineTo(1920 / 2 + timerWidth / 2 + timerWidth / 6 + 3 + scoreWidth, timerHeight + 10);
    ctx.lineTo(1920 / 2 + timerWidth / 2 + timerWidth / 6 + 3 + teamWidth, timerHeight + 10);
    ctx.lineTo(
      1920 / 2 + timerWidth / 2 + timerWidth / 6 + 3 + teamWidth + 12,
      timerHeight / 2 + 10
    );
    ctx.lineTo(1920 / 2 + timerWidth / 2 + timerWidth / 6 + 3 + teamWidth, 10);
    ctx.fill();
    ctx.closePath();

    // Draw the score
    drawCenteredText(
      ctx,
      `${gameData.blueScore}`,
      1920 / 2 + timerWidth / 2 + timerWidth / 6 + (scoreWidth) / 2,
      timerHeight / 2 + 10,
      "50px Tungsten",
      "white",
      "center",
      "middle"
    );

    // Draw team name
    drawCenteredText(
      ctx,
      settings.blueTeamShortName.toUpperCase(),
      settings.showTeamLogos ? 1920 / 2 + timerWidth / 2 + timerWidth / 6 + scoreWidth + (teamWidth - scoreWidth) / 3 + 3 : 1920 / 2 + timerWidth / 2 + timerWidth / 6 + scoreWidth + (teamWidth - scoreWidth) / 2 + 3,
      timerHeight / 2 + 10,
      "50px Tungsten",
      "white",
      "center",
      "middle"
    );

    // Draw the team logo
    if (settings.showTeamLogos && teamLogos.blue) {
      const logoSize = timerHeight - 20;

      ctx.drawImage(
        teamLogos.blue,
        1920 / 2 + timerWidth / 2 + timerWidth / 6 + scoreWidth + (teamWidth - scoreWidth) - (teamWidth - scoreWidth) / 4 + 3 - logoSize / 2,
        timerHeight / 2 + 10 - logoSize / 2,
        logoSize,
        logoSize
      );
    }
  }

  drawCenteredText(
    ctx,
    `ROUND ${gameData.round}`,
    1920 / 2,
    15,
    "20px 'Din Next'",
    "white",
    "center",
    "middle"
  );
}
