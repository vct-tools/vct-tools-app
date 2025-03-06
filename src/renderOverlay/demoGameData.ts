import type { GameData } from "./overlayType";

export const demoGameData: GameData = {
  round: 26,
  phase: "buy",

  blueSide: "defense",
  redSide: "attack",
  blueScore: 12,
  redScore: 13,

  live: { spikePlanted: true },
  matchLog: [
    // First half
    { roundNumber: 1, winner: "blue", cause: "elimination", blueSide: "defense", redSide: "attack" },
    { roundNumber: 2, winner: "red", cause: "elimination", blueSide: "defense", redSide: "attack" },
    { roundNumber: 3, winner: "red", cause: "elimination", blueSide: "defense", redSide: "attack" },
    { roundNumber: 4, winner: "red", cause: "detonation", blueSide: "defense", redSide: "attack" },
    { roundNumber: 5, winner: "red", cause: "detonation", blueSide: "defense", redSide: "attack" },
    { roundNumber: 6, winner: "red", cause: "elimination", blueSide: "defense", redSide: "attack" },
    { roundNumber: 7, winner: "red", cause: "elimination", blueSide: "defense", redSide: "attack" },
    { roundNumber: 8, winner: "red", cause: "detonation", blueSide: "defense", redSide: "attack" },
    { roundNumber: 9, winner: "blue", cause: "defuse", blueSide: "defense", redSide: "attack" },
    { roundNumber: 10, winner: "blue", cause: "defuse", blueSide: "defense", redSide: "attack" },
    { roundNumber: 11, winner: "blue", cause: "defuse", blueSide: "defense", redSide: "attack" },
    { roundNumber: 12, winner: "red", cause: "elimination", blueSide: "defense", redSide: "attack" },

    // Second half - teams swap sides
    { roundNumber: 13, winner: "red", cause: "defuse", blueSide: "attack", redSide: "defense" },
    { roundNumber: 14, winner: "red", cause: "elimination", blueSide: "attack", redSide: "defense" },
    { roundNumber: 15, winner: "blue", cause: "elimination", blueSide: "attack", redSide: "defense" },
    { roundNumber: 16, winner: "blue", cause: "detonation", blueSide: "attack", redSide: "defense" },
    { roundNumber: 17, winner: "blue", cause: "elimination", blueSide: "attack", redSide: "defense" },
    { roundNumber: 18, winner: "blue", cause: "elimination", blueSide: "attack", redSide: "defense" },
    { roundNumber: 19, winner: "blue", cause: "elimination", blueSide: "attack", redSide: "defense" },
    { roundNumber: 20, winner: "blue", cause: "elimination", blueSide: "attack", redSide: "defense" },
    { roundNumber: 21, winner: "red", cause: "elimination", blueSide: "attack", redSide: "defense" },
    { roundNumber: 22, winner: "blue", cause: "detonation", blueSide: "attack", redSide: "defense" },
    { roundNumber: 23, winner: "red", cause: "defuse", blueSide: "attack", redSide: "defense" },
    { roundNumber: 24, winner: "blue", cause: "elimination", blueSide: "attack", redSide: "defense" },

    // Overtime
    { roundNumber: 25, winner: "blue", cause: "defuse", blueSide: "defense", redSide: "attack" }
  ],

  bluePlayers: [
    {
      name: "TM2 playerbb",
      tagline: "abcd",
      agent: "Raze",
      health: 100,
      alive: true,
      KDA: [24, 17, 14],
      loadout: {
        firearm: { name: "Vandal" },
        sidearm: { name: "Classic" },
        shield: 25
      },
      abilities: {
        Ability1: { maxUses: 1, remainingUses: 1 },
        Ability2: { maxUses: 2, remainingUses: 0 },
        Signature: { maxUses: 1, remainingUses: 1 },
        Ultimate: { maxUses: 8, remainingUses: 5 }
      },
      credits: 1400
    },
    {
      name: "TM2 playerca",
      tagline: "efgh",
      agent: "Viper",
      health: 100,
      alive: true,
      KDA: [23, 16, 12],
      loadout: {
        firearm: { name: "Vandal" },
        sidearm: { name: "Classic" },
        shield: 50
      },
      abilities: {
        Ability1: { maxUses: 1, remainingUses: 0 },
        Ability2: { maxUses: 1, remainingUses: 1 },
        Signature: { maxUses: 1, remainingUses: 0 },
        Ultimate: { maxUses: 9, remainingUses: 9 }
      },
      credits: 1400
    },
    {
      name: "TM2 playernm",
      tagline: "ijkl",
      agent: "Waylay",
      health: 0,
      alive: false,
      KDA: [20, 17, 12],
      loadout: {
        firearm: null,
        sidearm: null,
        shield: 0
      },
      abilities: {
        Ability1: { maxUses: 2, remainingUses: 1 },
        Ability2: { maxUses: 1, remainingUses: 0 },
        Signature: { maxUses: 1, remainingUses: 0 },
        Ultimate: { maxUses: 8, remainingUses: 8 }
      },
      credits: 1400
    },
    {
      name: "TM2 playerkf",
      tagline: "mnop",
      agent: "Omen",
      health: 34,
      alive: false,
      KDA: [15, 17, 5],
      loadout: {
        firearm: null,
        sidearm: null,
        shield: 0
      },
      abilities: {
        Ability1: { maxUses: 2, remainingUses: 1 },
        Ability2: { maxUses: 1, remainingUses: 0 },
        Signature: { maxUses: 1, remainingUses: 0 },
        Ultimate: { maxUses: 8, remainingUses: 8 }
      },
      credits: 1400
    },
    {
      name: "TM2 playergj",
      tagline: "qrst",
      agent: "Vyse",
      health: 100,
      alive: true,
      KDA: [13, 18, 9],
      loadout: {
        firearm: null,
        sidearm: { name: "Sheriff" },
        shield: 50
      },
      abilities: {
        Ability1: { maxUses: 2, remainingUses: 0 },
        Ability2: { maxUses: 1, remainingUses: 0 },
        Signature: { maxUses: 1, remainingUses: 0 },
        Ultimate: { maxUses: 8, remainingUses: 2 }
      },
      credits: 1400
    }
  ],
  redPlayers: [
    {
      name: "TM1 playerqe",
      tagline: "mnop",
      agent: "Omen",
      health: 34,
      alive: false,
      KDA: [15, 17, 5],
      loadout: {
        firearm: null,
        sidearm: null,
        shield: 0
      },
      abilities: {
        Ability1: { maxUses: 2, remainingUses: 1 },
        Ability2: { maxUses: 1, remainingUses: 0 },
        Signature: { maxUses: 1, remainingUses: 0 },
        Ultimate: { maxUses: 8, remainingUses: 8 }
      },
      credits: 1400
    },
    {
      name: "TM1 playerer",
      tagline: "efgh",
      agent: "Waylay",
      health: 100,
      alive: true,
      KDA: [23, 16, 12],
      loadout: {
        firearm: { name: "Vandal" },
        sidearm: { name: "Classic" },
        shield: 50
      },
      abilities: {
        Ability1: { maxUses: 1, remainingUses: 0 },
        Ability2: { maxUses: 1, remainingUses: 1 },
        Signature: { maxUses: 1, remainingUses: 0 },
        Ultimate: { maxUses: 9, remainingUses: 9 }
      },
      credits: 1400
    },
    {
      name: "TM1 playeroi",
      tagline: "ijkl",
      agent: "Fade",
      health: 0,
      alive: false,
      KDA: [20, 17, 12],
      loadout: {
        firearm: null,
        sidearm: null,
        shield: 0
      },
      abilities: {
        Ability1: { maxUses: 2, remainingUses: 1 },
        Ability2: { maxUses: 1, remainingUses: 0 },
        Signature: { maxUses: 1, remainingUses: 0 },
        Ultimate: { maxUses: 8, remainingUses: 8 }
      },
      credits: 1400
    },
    {
      name: "TM1 playerhg",
      tagline: "abcd",
      agent: "Raze",
      health: 100,
      alive: true,
      KDA: [24, 17, 14],
      loadout: {
        firearm: { name: "Vandal" },
        sidearm: { name: "Classic" },
        shield: 25
      },
      abilities: {
        Ability1: { maxUses: 1, remainingUses: 1 },
        Ability2: { maxUses: 2, remainingUses: 0 },
        Signature: { maxUses: 1, remainingUses: 1 },
        Ultimate: { maxUses: 8, remainingUses: 5 }
      },
      credits: 1400
    },
    {
      name: "TM1 playerzz",
      tagline: "qrst",
      agent: "Vyse",
      health: 100,
      alive: true,
      KDA: [13, 18, 9],
      loadout: {
        firearm: null,
        sidearm: { name: "Ghost" },
        shield: 50
      },
      abilities: {
        Ability1: { maxUses: 2, remainingUses: 0 },
        Ability2: { maxUses: 1, remainingUses: 0 },
        Signature: { maxUses: 1, remainingUses: 0 },
        Ultimate: { maxUses: 8, remainingUses: 2 }
      },
      credits: 1400
    }
  ]
}
