import { type OverlaySettings } from "./overlayType";

export function sponsors(
  ctx: CanvasRenderingContext2D,
  settings: OverlaySettings,
  sponsorImages: HTMLImageElement[]
): void {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  const w = 350;
  const h = 150;
  ctx.fillRect(1920 - w, 0, w, h);

  function getIndexFromTime(timestamp: number, delay: number, listLength: number) {
    return Math.floor(timestamp / delay) % listLength;
  }

  try {
    if (settings.sponsors.sponsorImgs.length > 0) {
      const index = getIndexFromTime(
        performance.now(),
        100000,
        settings.sponsors.sponsorImgs.length
      );

      const iH = 100;
      const aspect = sponsorImages[index].width / sponsorImages[index].height;

      const iW = iH * aspect;
      ctx.drawImage(sponsorImages[index], 1920 - w / 2 - iW / 2, 25, iW, iH);
    }
  } catch {}
}
