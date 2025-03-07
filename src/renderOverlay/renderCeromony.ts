import {
  bgGradient,
  easeInOutExpo,
  animationDelay,
  drawCenteredText,
  atkC,
  defC,
  headerC
} from "./renderUtils";
import { type GameData, type OverlaySettings } from "./overlayType";

export function roundWin(
  ctx: CanvasRenderingContext2D,
  ceromony: string,
  winningTeamName: string,
  winningTeamSide: string,
  roundNum: number,
  animationProgress: number = 0,
  settings: OverlaySettings,
  brandingImage: HTMLImageElement | null,
  teamLogos: { red: HTMLImageElement | null; blue: HTMLImageElement | null },
  gameData: GameData,
  background: HTMLImageElement | null
): void {
  bgGradient(ctx);
  ctx.filter = "none";
  const width = 1000;
  const height = 250;
  const roundInfoWidth = 250;
  const roundInfoHeight = 60;
  const locationY =
    animationProgress < 0.9
      ? easeInOutExpo(1080 / 2, 1080 - height / 2, animationDelay(0.4, 0.9, animationProgress))
      : easeInOutExpo(
          1080 - height / 2,
          1080 - height / 2 + height * 2,
          animationDelay(0.9, 1, animationProgress)
        );

  if (animationProgress >= 0.2) {
    if (settings.roundOutcomeBanner.useBackground) {
      if (background) {
        ctx.drawImage(background, 1920 / 2 - width / 2, locationY - height / 2, width, height);
      }
    } else {
      ctx.fillRect(1920 / 2 - width / 2, locationY - height / 2, width, height);
    }

    ctx.fillStyle = `rgba(${winningTeamSide.toLowerCase() == "attack" ? atkC : defC}, ${easeInOutExpo(0, 0.3, animationDelay(0.5, 0.9, animationProgress))})`;
    ctx.fillRect(1920 / 2 - 4, locationY - height / 2, 8, height);

    ctx.fillStyle = `rgba(${winningTeamSide.toLowerCase() == "defense" ? defC : atkC}, ${easeInOutExpo(0, 1, animationDelay(0.5, 0.9, animationProgress))})`;
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
      `rgba(255, 255, 255, ${easeInOutExpo(0, 1, animationDelay(0.5, 0.9, animationProgress))})`,
      "center",
      "middle"
    );

    ctx.font = `${easeInOutExpo(150, settings.series.showBrandingImg ? 100 : 125, animationDelay(0.4, 0.9, animationProgress))}px 'Tungsten'`;

    if (settings.series.showBrandingImg && brandingImage) {
      // Calculate image size
      const brandingHeight = easeInOutExpo(100, 80, animationDelay(0.4, 0.9, animationProgress));
      const aspectRatio = brandingImage.width / brandingImage.height;
      const brandingWidth = brandingHeight * aspectRatio;
      ctx.drawImage(
        brandingImage,
        winningTeamSide.toLowerCase() == "attack"
          ? easeInOutExpo(
              1920 / 2 - brandingWidth / 2,
              1920 / 2 - width / 4 - brandingWidth / 2,
              animationDelay(0.4, 0.9, animationProgress)
            )
          : easeInOutExpo(
              1920 / 2 - brandingWidth / 2,
              1920 / 2 + width / 4 - brandingWidth / 2,
              animationDelay(0.4, 0.9, animationProgress)
            ),
        locationY - easeInOutExpo(110, 80, animationDelay(0.4, 0.9, animationProgress)),
        brandingWidth,
        brandingHeight
      );
    }

    drawCenteredText(
      ctx,
      ceromony.toUpperCase(),
      winningTeamSide.toLowerCase() == "attack"
        ? easeInOutExpo(1920 / 2, 1920 / 2 - width / 4, animationDelay(0.4, 0.9, animationProgress))
        : easeInOutExpo(
            1920 / 2,
            1920 / 2 + width / 4,
            animationDelay(0.4, 0.9, animationProgress)
          ),
      locationY +
        (settings.series.showBrandingImg
          ? easeInOutExpo(60, 50, animationDelay(0.4, 0.9, animationProgress))
          : 0),
      `${easeInOutExpo(150, settings.series.showBrandingImg ? 100 : 125, animationDelay(0.4, 0.9, animationProgress))}px 'Tungsten'`,
      `rgb(${headerC})`,
      "center",
      "middle"
    );
  }

  // Animation big box
  if (animationProgress <= 0.4) {
    ctx.fillStyle = settings.accentColor;

    if (animationProgress < 0.2) {
      const offsetWidth = easeInOutExpo(250, 10, animationDelay(0, 0.2, animationProgress));
      const boxWidth = easeInOutExpo(
        width + 500,
        width + 20,
        animationDelay(0, 0.2, animationProgress)
      );

      ctx.fillRect(
        1920 / 2 - width / 2 - offsetWidth,
        locationY - height / 2 - 10,
        boxWidth,
        height + 20
      );
    } else {
      ctx.fillRect(
        1920 / 2 -
          width / 2 -
          10 +
          easeInOutExpo(0, width + 20, animationDelay(0.2, 0.4, animationProgress)),
        locationY - height / 2 - 10,
        width + 20 - easeInOutExpo(0, width + 20, animationDelay(0.2, 0.4, animationProgress)),
        height + 20
      );
    }
  }

  if (animationProgress >= 0.4) {
    if (settings.showTeamLogos) {
      let winningTeamStart = "red";
      if (winningTeamSide.toLowerCase() == "attack" && gameData.redSide == "attack")
        winningTeamStart = "red";
      if (winningTeamSide.toLowerCase() == "defense" && gameData.redSide == "defense")
        winningTeamStart = "red";
      if (winningTeamSide.toLowerCase() == "attack" && gameData.redSide == "defense")
        winningTeamStart = "blue";
      if (winningTeamSide.toLowerCase() == "defense" && gameData.redSide == "attack")
        winningTeamStart = "blue";

      const x = winningTeamStart === "red" ? teamLogos.red : teamLogos.blue;

      if (x) {
        const logoSize = easeInOutExpo(100, 80, animationDelay(0.4, 0.9, animationProgress));
        ctx.filter = `opacity(${animationDelay(0.5, 0.9, animationProgress)})`;
        ctx.drawImage(
          x,
          winningTeamSide.toLowerCase() == "attack"
            ? 1920 / 2 + width / 4 - logoSize / 2
            : 1920 / 2 - width / 4 - logoSize / 2,
          locationY - logoSize / 2,
          logoSize,
          logoSize
        );
        ctx.filter = "none";
      }

      drawCenteredText(
        ctx,
        winningTeamSide.toUpperCase(),
        winningTeamSide.toLowerCase() == "defense" ? 1920 / 2 - width / 4 : 1920 / 2 + width / 4,
        locationY + 70,
        "25px 'Din Next'",
        winningTeamSide === "Attack"
          ? `rgba(${atkC}, ${animationDelay(0.5, 0.9, animationProgress)})`
          : `rgba(${defC}, ${animationDelay(0.5, 0.9, animationProgress)})`,
        "center",
        "middle"
      );

      drawCenteredText(
        ctx,
        winningTeamName.toUpperCase(),
        winningTeamSide.toLowerCase() == "defense" ? 1920 / 2 - width / 4 : 1920 / 2 + width / 4,
        locationY - 70,
        "25px 'Din Next'",
        `rgba(255, 255, 255, ${animationDelay(0.5, 0.9, animationProgress)})`,
        "center",
        "middle"
      );
    } else {
      drawCenteredText(
        ctx,
        winningTeamName.toUpperCase(),
        winningTeamSide.toLowerCase() == "defense" ? 1920 / 2 - width / 4 : 1920 / 2 + width / 4,
        locationY - 10,
        "60px 'Din Next'",
        `rgba(255, 255, 255, ${animationDelay(0.5, 0.9, animationProgress)})`,
        "center",
        "middle"
      );

      drawCenteredText(
        ctx,
        winningTeamSide.toUpperCase(),
        winningTeamSide.toLowerCase() == "defense" ? 1920 / 2 - width / 4 : 1920 / 2 + width / 4,
        locationY + 30,
        "25px 'Din Next'",
        winningTeamSide === "Attack"
          ? `rgba(${atkC}, ${animationDelay(0.5, 0.9, animationProgress)})`
          : `rgba(${defC}, ${animationDelay(0.5, 0.9, animationProgress)})`,
        "center",
        "middle"
      );
    }
  }
}
