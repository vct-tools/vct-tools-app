import {
  bgGradient,
  easeInOutExpo,
  animationDelay,
  drawCenteredText,
  atkC,
  defC,
  accent,
  headerC
} from "./renderUtils";
import { type OverlaySettings } from "./overlayType";

export function roundWin(
  ctx: CanvasRenderingContext2D,
  ceromony: string,
  winningTeamName: string,
  winningTeamSide: string,
  roundNum: number,
  animationProgress: number = 0,
  settings: OverlaySettings,
  brandingImage: HTMLImageElement | null
): void {
  bgGradient(ctx);
  ctx.filter = "none";
  const width = easeInOutExpo(800, 1000, animationDelay(0.2, 0.9, animationProgress));
  const height = easeInOutExpo(300, 200, animationDelay(0.2, 0.9, animationProgress));
  const roundInfoWidth = 250;
  const roundInfoHeight = 60;
  const locationY =
    animationProgress < 0.9
      ? easeInOutExpo(1080 / 2, 1080 - height / 2, animationDelay(0.2, 0.9, animationProgress))
      : easeInOutExpo(
          1080 - height / 2,
          1080 - height / 2 + height * 2,
          animationDelay(0.9, 1, animationProgress)
        );

  if (animationProgress >= 0.1) {
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

    if (settings.series.showBrandingImg && brandingImage) {
      // Calculate image size
      const brandingHeight = easeInOutExpo(80, 60, animationDelay(0.2, 0.9, animationProgress));
      const aspectRatio = brandingImage.width / brandingImage.height;
      const brandingWidth = brandingHeight * aspectRatio;
      ctx.drawImage(
        brandingImage,
        easeInOutExpo(
          1920 / 2 - brandingWidth / 2,
          1920 / 2 -
            width / 2 +
            25 +
            ctx.measureText(ceromony.toUpperCase()).width / 2 -
            brandingWidth / 2,
          animationDelay(0.2, 0.9, animationProgress)
        ),
        locationY - easeInOutExpo(100, 70, animationDelay(0.2, 0.9, animationProgress)),
        brandingWidth,
        brandingHeight
      );
    }

    drawCenteredText(
      ctx,
      ceromony.toUpperCase(),
      easeInOutExpo(
        1920 / 2 - ctx.measureText(ceromony.toUpperCase()).width / 2,
        1920 / 2 - width / 2 + 25,
        animationDelay(0.2, 0.9, animationProgress)
      ),
      locationY +
        (settings.series.showBrandingImg
          ? easeInOutExpo(50, 40, animationDelay(0.2, 0.9, animationProgress))
          : 0),
      `${easeInOutExpo(150, 100, animationDelay(0.2, 0.9, animationProgress))}px 'Tungsten'`,
      `rgb(${headerC})`,
      "left",
      "middle"
    );
  }

  // Animation big box
  if (animationProgress <= 0.2) {
    ctx.fillStyle = `rgb(${accent})`;

    ctx.fillRect(
      1920 / 2 -
        width / 2 -
        10 +
        easeInOutExpo(0, width + 20, animationDelay(0, 0.2, animationProgress)),
      locationY - height / 2 - roundInfoHeight / 2 - 10,
      width + 20 - easeInOutExpo(0, width + 20, animationDelay(0, 0.2, animationProgress)),
      height + roundInfoHeight + 20
    );
  }

  if (animationProgress >= 0.1) {
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
      winningTeamSide === "Attack"
        ? `rgba(${atkC}, ${animationDelay(0.5, 0.9, animationProgress)})`
        : `rgba(${defC}, ${animationDelay(0.5, 0.9, animationProgress)})`,
      "right",
      "middle"
    );
  }
}
