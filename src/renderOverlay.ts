import type { OverlaySettings } from "./overlayType";

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

export function renderOverlay(
  ctx: CanvasRenderingContext2D,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  settings: OverlaySettings,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  gameData: GameData | null
): void {
  ctx.clearRect(0, 0, 1920, 1080);

  const text = ["SORRY, PREVIEW UNAVAILABLE", "The overlay preview is still work in progress"];

  ctx.font = "100px Tungsten";
  const w1 = ctx.measureText(text[0]).width;

  ctx.font = "60px Din Next";
  const w2 = ctx.measureText(text[1]).width;

  ctx.fillStyle = "#01171fdd";
  ctx.fillRect(1920 / 2 - w2 / 2 - 50, 1080 / 2 - 150, w2 + 100, 300);

  ctx.fillStyle = "white";
  ctx.font = "100px Tungsten";
  ctx.fillText(text[0], 1920 / 2 - w1 / 2, 1080 / 2);
  ctx.font = "60px Din Next";
  ctx.fillText(text[1], 1920 / 2 - w2 / 2, 1080 / 2 + 70);
}

export { type GameData, type PlayerData, type LoadoutData, type AbilityData, type Gun, type Round };
