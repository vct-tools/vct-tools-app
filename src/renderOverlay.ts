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

const atkC = "#f34453";
const defC = "#32af8a";
function bgGradient(ctx: CanvasRenderingContext2D): void {
  const gradient = ctx.createRadialGradient(1920 / 2, 1080 / 2, 20, 1920 / 2, 1080 / 2, 1080);
  gradient.addColorStop(0.05, "rgba(33, 52, 66, 0.9)");
  gradient.addColorStop(1, "rgba(28, 66, 73, 0.9)");
  ctx.fillStyle = gradient;
}

export function renderOverlay(
  ctx: CanvasRenderingContext2D,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  settings: OverlaySettings,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  gameData: GameData | null
): void {
  ctx.clearRect(0, 0, 1920, 1080);

  roundWin(ctx, "ROUND WIN", settings.attackerTeamName, "Attack", 42);
}

function roundWin(
  ctx: CanvasRenderingContext2D,
  ceromony: string,
  winningTeamName: string,
  winningTeamSide: string,
  roundNum: number
): void {
  bgGradient(ctx);
  const width = 1000;
  const height = 300;
  const roundInfoWidth = 250;
  const roundInfoHeight = 60;

  ctx.fillRect(1920 / 2 - width / 2, 1080 / 2 - height / 2, width, height);
  ctx.fillStyle = atkC;
  ctx.fillRect(
    1920 / 2 - width / 2 + width / 2 - roundInfoWidth / 2,
    1080 / 2 - height / 2 - roundInfoHeight / 2,
    roundInfoWidth,
    roundInfoHeight
  );

  // Round ??
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = "40px 'Din Next'";
  ctx.fillText(`ROUND ${roundNum}`, 1920 / 2 - width / 2 + width / 2, 1080 / 2 - height / 2 + 12);

  // Ceromony (centered left half of width)
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = "100px 'Tungsten'";
  ctx.fillText(
    ceromony.toUpperCase(),
    1920 / 2 - width / 2 + width / 4,
    1080 / 2 - height / 2 + height / 2 + 35
  );

  // Winning Team Name (centered right half of width)
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = "100px 'Din Next'";
  ctx.fillText(
    winningTeamName.toUpperCase(),
    1920 / 2 - width / 2 + (width / 4) * 3,
    1080 / 2 - height / 2 + height / 2 + 10
  );

  // Winning Team Side (centered right half of width under Winning Team Name)
  ctx.fillStyle = winningTeamSide.toLowerCase() == "attack" ? atkC : defC;
  ctx.textAlign = "center";
  ctx.font = "40px 'Din Next'";
  ctx.fillText(
    winningTeamSide.toUpperCase(),
    1920 / 2 - width / 2 + (width / 4) * 3,
    1080 / 2 - height / 2 + height / 2 + 50 + 10
  );
}

export { type GameData, type PlayerData, type LoadoutData, type AbilityData, type Gun, type Round };
