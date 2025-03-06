import type { GameData, OverlaySettings, PlayerData, Round } from "./overlayType";
import { drawCenteredText, atkC, defC } from "./renderUtils";
import { loadImg } from "@/pages/GraphicCreator/load_img";
import { type Ref } from "vue";
import { agents, weapons } from "vct-tools-components";

import AttackDetonationImg from "@/assets/images/roundOutcomes/attack_detonation.webp";
import AttackEliminationImg from "@/assets/images/roundOutcomes/attack_elimination.webp";
import DefenseDefuseImg from "@/assets/images/roundOutcomes/defense_defuse.webp";
import DefenseEliminationImg from "@/assets/images/roundOutcomes/defense_elimination.webp";
import DefenseTimeImg from "@/assets/images/roundOutcomes/defense_time.webp";
import SwapSidesImg from "@/assets/images/roundOutcomes/swap_sides.webp";
import { renderTeamLeft } from "./preRound/teamLeft";
import { renderTeamRight as renderTeamRight } from "./preRound/teamRight";

const outcomeImages: {
  attack_detonation: HTMLImageElement | null;
  attack_elimination: HTMLImageElement | null;
  defense_defuse: HTMLImageElement | null;
  defense_elimination: HTMLImageElement | null;
  defense_time: HTMLImageElement | null;
  swap_sides: HTMLImageElement | null;
} = {
  attack_detonation: null,
  attack_elimination: null,
  defense_defuse: null,
  defense_elimination: null,
  defense_time: null,
  swap_sides: null
};

(async () => {
  outcomeImages.attack_detonation = await loadImg(AttackDetonationImg);
  outcomeImages.attack_elimination = await loadImg(AttackEliminationImg);
  outcomeImages.defense_defuse = await loadImg(DefenseDefuseImg);
  outcomeImages.defense_elimination = await loadImg(DefenseEliminationImg);
  outcomeImages.defense_time = await loadImg(DefenseTimeImg);
  outcomeImages.swap_sides = await loadImg(SwapSidesImg);
})();

const weaponImages: Record<string, HTMLImageElement> = {};

export async function preRound(
  ctx: CanvasRenderingContext2D,
  gameData: GameData,
  settings: OverlaySettings,
  agentImages: Ref<Record<string, HTMLImageElement>>,
  abilityImages: Ref<
    Record<
      string,
      {
        Ability1: HTMLImageElement;
        Ability2: HTMLImageElement;
        Signature: HTMLImageElement;
        Ultimate: HTMLImageElement;
      }
    >
  >,
  y: number,
  teamLogos: { red: HTMLImageElement | null; blue: HTMLImageElement | null }
): Promise<void> {
  // Make sure the agent images are loaded
  for (const player of gameData.redPlayers) {
    if (!agentImages.value[player.agent]) {
      const agentData = agents.find((a) => a.name == player.agent);
      if (!agentData) continue;
      agentImages.value[player.agent] = await loadImg(agentData.icon);
    }

    if (!abilityImages.value[player.agent]) {
      const agentData = agents.find((a) => a.name == player.agent);
      if (!agentData) continue;
      abilityImages.value[player.agent] = {
        Ability1: await loadImg(agentData.abilities.Ability1.icon),
        Ability2: await loadImg(agentData.abilities.Ability2.icon),
        Signature: await loadImg(agentData.abilities.Signature.icon),
        Ultimate: await loadImg(agentData.abilities.Ultimate.icon)
      };
    }
  }

  for (const player of gameData.bluePlayers) {
    if (!agentImages.value[player.agent]) {
      const agentData = agents.find((a) => a.name == player.agent);
      if (!agentData) continue;
      agentImages.value[player.agent] = await loadImg(agentData.icon);
    }

    if (!abilityImages.value[player.agent]) {
      const agentData = agents.find((a) => a.name == player.agent);
      if (!agentData) continue;
      abilityImages.value[player.agent] = {
        Ability1: await loadImg(agentData.abilities.Ability1.icon),
        Ability2: await loadImg(agentData.abilities.Ability2.icon),
        Signature: await loadImg(agentData.abilities.Signature.icon),
        Ultimate: await loadImg(agentData.abilities.Ultimate.icon)
      };
    }
  }

  renderTeamLeft(ctx, gameData, settings, y, agentImages, abilityImages, weaponImages);
  renderTeamRight(ctx, gameData, settings, y, agentImages, abilityImages, weaponImages);
  const playerHeight = 80;

  const color = "15, 25, 35";
  ctx.fillStyle = `rgba(${color}, 0.95)`;
  ctx.fillRect(25, y - playerHeight * 5 - 50 - 25 - 100, 1920 - 50, 100);

  if (settings.showTeamLogos) {
    ctx.fillStyle = `rgba(${color}, 1)`;
    ctx.fillRect(25, y - playerHeight * 5 - 50 - 25 - 100, 100, 100);
    ctx.fillStyle = gameData.redSide == "attack" ? `rgb(${atkC})` : `rgb(${defC})`;
    ctx.fillRect(25 + 100 - 2, y - playerHeight * 5 - 50 - 25 - 100, 4, 100);

    ctx.fillStyle = `rgba(${color}, 1)`;
    ctx.fillRect(1920 - 25 - 100, y - playerHeight * 5 - 50 - 25 - 100, 100, 100);
    ctx.fillStyle = gameData.blueSide == "attack" ? `rgb(${atkC})` : `rgb(${defC})`;
    ctx.fillRect(1920 - 25 - 100 - 2, y - playerHeight * 5 - 50 - 25 - 100, 4, 100);

    if (teamLogos.red)
      ctx.drawImage(teamLogos.red, 25 + 10, y - playerHeight * 5 - 50 - 25 - 100 + 10, 80, 80);

    if (teamLogos.blue)
      ctx.drawImage(
        teamLogos.blue,
        1920 - 25 - 100 + 10,
        y - playerHeight * 5 - 50 - 25 - 100 + 10,
        80,
        80
      );
  }

  drawCenteredText(
    ctx,
    settings.redTeamName.toUpperCase(),
    25 + (settings.showTeamLogos ? 100 : 0) + 25,
    y - playerHeight * 5 - 50 - 25 - 100 + 40,
    "50px 'Tungsten'",
    "white",
    "left",
    "middle"
  );

  drawCenteredText(
    ctx,
    `LOADOUT VALUE: $${calculateLoadoutValue(gameData.redPlayers)}`,
    25 + (settings.showTeamLogos ? 100 : 0) + 25,
    y - playerHeight * 5 - 50 - 25 - 100 + 75,
    "25px 'Din Next'",
    "gray",
    "left",
    "middle"
  );

  drawCenteredText(
    ctx,
    settings.blueTeamName.toUpperCase(),
    1920 - 25 - (settings.showTeamLogos ? 100 : 0) - 25,
    y - playerHeight * 5 - 50 - 25 - 100 + 40,
    "50px 'Tungsten'",
    "white",
    "right",
    "middle"
  );

  drawCenteredText(
    ctx,
    `LOADOUT VALUE: $${calculateLoadoutValue(gameData.bluePlayers)}`,
    1920 - 25 - (settings.showTeamLogos ? 100 : 0) - 25,
    y - playerHeight * 5 - 50 - 25 - 100 + 75,
    "25px 'Din Next'",
    "gray",
    "right",
    "middle"
  );

  ctx.fillStyle = `rgba(255, 255, 255, 0.01)`;
  ctx.fillRect(25 + 550, y - playerHeight * 5 - 50 - 25 - 100, (910 - 550) * 2 + 50, 100);

  ctx.strokeStyle = `rgba(0, 0, 0, 0.1)`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(25 + 550, y - playerHeight * 5 - 50 - 25 - 100 + 50);
  ctx.lineTo(25 + 550 + (910 - 550) * 2 + 50, y - playerHeight * 5 - 50 - 25 - 100 + 50);
  ctx.moveTo(25 + 550 + 50, y - playerHeight * 5 - 50 - 25 - 100);
  ctx.lineTo(25 + 550 + 50, y - playerHeight * 5 - 50 - 25);
  ctx.stroke();

  if (settings.showTeamLogos) {
    if (teamLogos.red)
      ctx.drawImage(teamLogos.red, 25 + 550 + 5, y - playerHeight * 5 - 50 - 25 - 100 + 5, 40, 40);
    if (teamLogos.blue)
      ctx.drawImage(teamLogos.blue, 25 + 550 + 5, y - playerHeight * 5 - 50 - 25 - 50 + 5, 40, 40);
  } else {
    drawCenteredText(
      ctx,
      settings.redTeamShortName.toUpperCase(),
      25 + 550 + 25,
      y - playerHeight * 5 - 50 - 25 - 100 + 25,
      "15px 'Din Next'",
      "white",
      "center",
      "middle"
    );

    drawCenteredText(
      ctx,
      settings.blueTeamShortName.toUpperCase(),
      25 + 550 + 25,
      y - playerHeight * 5 - 50 - 25 - 100 + 75,
      "15px 'Din Next'",
      "white",
      "center",
      "middle"
    );
  }

  // Draw the rounds
  const roundWidth = 50;

  const roundsFittable = Math.floor(((910 - 550) * 2 + 50) / roundWidth) - 1;

  // IN THE ROUNDS VARIABLE
  // Round - a round
  // number - a control
  // -> 1 = swap sides
  // -> 2 = overtime

  ctx.fillStyle = `#1f2830`;
  ctx.fillRect(
    25 + 550 + 50 + roundWidth * roundsFittable,
    y - playerHeight * 5 - 50 - 25 - 100,
    25,
    roundWidth * 2
  );

  drawCenteredText(
    ctx,
    ">",
    25 + 550 + 50 + roundWidth * roundsFittable + 25 / 2,
    y - playerHeight * 5 - 50 - 25 - 100 + roundWidth,
    "20px 'Din Next'",
    "white",
    "center",
    "middle"
  );

  const rounds = [...gameData.matchLog] as (Round | number)[];
  if (rounds.length > 12) rounds.splice(12, 0, 1);
  if (rounds.length > 25) rounds.splice(25, 0, 2);

  let offset = 0;
  for (const round of rounds.slice(-roundsFittable)) {
    if (
      outcomeImages.attack_detonation == null ||
      outcomeImages.attack_elimination == null ||
      outcomeImages.defense_defuse == null ||
      outcomeImages.defense_elimination == null ||
      outcomeImages.defense_time == null ||
      outcomeImages.swap_sides == null
    )
      break;

    try {
      if (typeof round == "number") {
        ctx.fillStyle = `#1f2830`;
        ctx.fillRect(
          25 + 550 + 50 + offset,
          y - playerHeight * 5 - 50 - 25 - 100,
          roundWidth,
          roundWidth * 2
        );

        if (round == 1) {
          ctx.drawImage(
            outcomeImages.swap_sides,
            25 + 550 + 50 + offset + 10,
            y - playerHeight * 5 - 50 - 25 - 100 + roundWidth / 2 + 10,
            roundWidth - 20,
            roundWidth - 20
          )
        }

        if (round == 2) {
          drawCenteredText(
            ctx,
            "OT",
            25 + 550 + 50 + offset + roundWidth / 2,
            y - playerHeight * 5 - 50 - 25 - 100 + roundWidth,
            "20px 'Din Next'",
            "white",
            "center",
            "middle"
          );
        }
      } else {
        if (round.winner == "red") {
          ctx.drawImage(
            outcomeImages[`${round.redSide}_${round.cause}` as keyof typeof outcomeImages] ||
              outcomeImages.defense_time,
            25 + 550 + 50 + offset + 10,
            y - playerHeight * 5 - 50 - 25 - 100 + 10,
            roundWidth - 20,
            roundWidth - 20
          );

          drawCenteredText(
            ctx,
            round.roundNumber.toString(),
            25 + 550 + 50 + offset + roundWidth / 2,
            y - playerHeight * 5 - 25 - 100 + roundWidth / 2,
            "16px 'Din Next'",
            "gray",
            "center",
            "middle"
          );
        } else {
          ctx.drawImage(
            outcomeImages[`${round.blueSide}_${round.cause}` as keyof typeof outcomeImages] ||
              outcomeImages.defense_time,
            25 + 550 + 50 + offset + 10,
            y - playerHeight * 5 - 25 - 100 + 10,
            roundWidth - 20,
            roundWidth - 20
          );

          drawCenteredText(
            ctx,
            round.roundNumber.toString(),
            25 + 550 + 50 + offset + roundWidth / 2,
            y - playerHeight * 5 - 25 - 50 - 100 + roundWidth / 2,
            "16px 'Din Next'",
            "gray",
            "center",
            "middle"
          );
        }
      }
    } catch {}

    offset += roundWidth;
  }
}

function calculateLoadoutValue(players: PlayerData[]) {
  const getPrice = (weapon: string) => {
    const weaponData = weapons.find((w) => w.name == weapon);
    if (!weaponData) return 0;
    return weaponData.credits;
  };

  let value = 0;
  for (const player of players) {
    if (player.loadout.sidearm) value += getPrice(player.loadout.sidearm.name);
    if (player.loadout.firearm) value += getPrice(player.loadout.firearm.name);
  }
  return value;
}
