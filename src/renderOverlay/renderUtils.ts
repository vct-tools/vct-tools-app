export const atkC = "243, 68, 83";
export const defC = "50, 175, 138";
export const headerC = "224, 235, 185";
export const accent = "134, 191, 42";

export function bgGradient(ctx: CanvasRenderingContext2D): void {
  const gradient = ctx.createRadialGradient(1920 / 2, 1080 / 2, 20, 1920 / 2, 1080 / 2, 1080);
  gradient.addColorStop(0.05, "rgb(46, 89, 121)");
  gradient.addColorStop(1, "rgb(2, 35, 41)");
  ctx.fillStyle = gradient;
}

export function drawCenteredText(
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

export function easeInOutExpo(v0: number, v1: number, x: number): number {
  return x === 0
    ? v0
    : x === 1
      ? v1
      : x < 0.5
        ? ((v1 - v0) * Math.pow(2, 20 * x - 10)) / 2 + v0
        : ((v1 - v0) * (2 - Math.pow(2, -20 * x + 10))) / 2 + v0;
}

export function animationDelay(min: number, max: number, animationProgress: number): number {
  if (animationProgress <= min) return 0;
  if (animationProgress >= max) return 1;

  return (animationProgress - min) / (max - min);
}

export function lerp(v0: number, v1: number, x: number): number {
  return v0 * (1 - x) + v1 * x;
}
