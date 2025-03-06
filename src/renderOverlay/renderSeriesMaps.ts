import { drawCenteredText } from "./renderUtils";
import { type OverlaySettings } from "./overlayType";

export function seriesMaps(ctx: CanvasRenderingContext2D, settings: OverlaySettings): void {
  const gradient = ctx.createLinearGradient(0, 0, 500, 0);
  gradient.addColorStop(0, `rgba(0, 0, 0, 0.5)`);
  gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
  ctx.fillStyle = gradient;

  ctx.fillRect(0, 0, 500, 25);
  for (let i = 0; i < settings.series.maps.length; i++) {
    drawCenteredText(
      ctx,
      settings.series.maps[i],
      200 * i + 5,
      12.5,
      "20px 'Din Next'",
      "white",
      "left",
      "middle"
    );
  }
}
