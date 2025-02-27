type PlayerOverlayFeatures = {
  playerAbilities: boolean;
  playerHealth: boolean;
  agentImages: boolean;
  playerKDA: boolean;
};

type GameOverviewVisible = {
  KDA: boolean;
  loadout: boolean;
  abilities: boolean;
  shields: boolean;
  agentImages: boolean;
  matchLog: boolean;
};

type OtherOverlayFeatures = {
  gameOverviewDuringBuyPhase: boolean;
  roundOutcomeBanner: boolean;
};

type RoundOutcomeBanner = {
  clutch: boolean;
  flawless: boolean;
  ace: boolean;
  teamAce: boolean;
  thrifty: boolean;
};

type SeriesInformation = {
  maps: string[];
  brandingImg: string | null;
  showBrandingImg: boolean;
  seriesName: string;
};

type SponsorInformation = {
  sponsorEnabled: boolean;
  sponsorImgs: string[];
};

type OverlaySettings = {
  playerOverlayFeatures: PlayerOverlayFeatures;
  gameOverviewVisible: GameOverviewVisible;
  otherOverlayFeatures: OtherOverlayFeatures;
  roundOutcomeBanner: RoundOutcomeBanner;
  nameType: "Name" | "Name and tagline";
  redTeamName: string;
  blueTeamName: string;
  redTeamShortName: string;
  blueTeamShortName: string;
  series: SeriesInformation;
  sponsors: SponsorInformation;
};

function createDefaultOverlaySettings(): OverlaySettings {
  return {
    nameType: "Name",
    redTeamName: "John Porkers",
    redTeamShortName: "PORK",
    blueTeamName: "Team 2",
    blueTeamShortName: "TM2",
    playerOverlayFeatures: {
      playerAbilities: true,
      playerHealth: true,
      agentImages: true,
      playerKDA: true
    },
    gameOverviewVisible: {
      KDA: true,
      loadout: true,
      abilities: true,
      shields: true,
      agentImages: true,
      matchLog: true
    },
    otherOverlayFeatures: {
      gameOverviewDuringBuyPhase: true,
      roundOutcomeBanner: true
    },
    roundOutcomeBanner: {
      clutch: true,
      flawless: true,
      ace: true,
      teamAce: true,
      thrifty: true
    },
    series: {
      maps: ["Ascent (TEAM1)", "Bind (TEAM2)", "Fracture (DECIDER)"],
      brandingImg: null,
      showBrandingImg: false,
      seriesName: "Tournament Name - Lower Bracket Series 1"
    },
    sponsors: {
      sponsorEnabled: false,
      sponsorImgs: []
    }
  };
}

type AbilityData = {
  maxUses: number;
  remainingUses: number;
};

type Gun = {
  name: string;
};

type LoadoutData = {
  sidearm: Gun | null;
  firearm: Gun | null;
  shield: number;
};

type PlayerData = {
  name: string;
  tagline: string;
  agent: string;
  health: number;
  credits: number;
  abilities: {
    Ability1: AbilityData;
    Ability2: AbilityData;
    Signature: AbilityData;
    Ultimate: AbilityData;
  };
  loadout: LoadoutData;
  KDA: [number, number, number];
  alive: boolean;
};

type Round = {
  roundNumber: number;
  winner: "red" | "blue";
  cause: "defuse" | "elimination" | "time" | "detonation";
};

type GameData = {
  round: number;
  phase: string;
  matchLog: Round[];
  redScore: number;
  blueScore: number;
  redPlayers: PlayerData[];
  bluePlayers: PlayerData[];
  redSide: "attack" | "defense";
  blueSide: "attack" | "defense";
  live: {
    spikePlanted: boolean;
  }
};

export { type OverlaySettings, createDefaultOverlaySettings, type AbilityData, type Gun, type LoadoutData, type PlayerData, type Round, type GameData };
