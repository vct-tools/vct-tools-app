import type { GameData, OverlaySettings, Round } from "./overlayType";
import { drawCenteredText, atkC, defC, bgGradient } from "./renderUtils";
import { loadImg } from "@/pages/GraphicCreator/load_img";
import { type Ref } from "vue";
import { agents } from "vct-tools-components";

import AttackDetonationImg from "@/assets/images/roundOutcomes/attack_detonation.webp";
import AttackEliminationImg from "@/assets/images/roundOutcomes/attack_elimination.webp";
import DefenseDefuseImg from "@/assets/images/roundOutcomes/defense_defuse.webp";
import DefenseEliminationImg from "@/assets/images/roundOutcomes/defense_elimination.webp";
import DefenseTimeImg from "@/assets/images/roundOutcomes/defense_time.webp";

const outcomeImages = <
  {
    attack_detonation: HTMLImageElement | null;
    attack_elimination: HTMLImageElement | null;
    defense_defuse: HTMLImageElement | null;
    defense_elimination: HTMLImageElement | null;
    defense_time: HTMLImageElement | null;
  }
>{
  attack_detonation: null,
  attack_elimination: null,
  defense_defuse: null,
  defense_elimination: null,
  defense_time: null
};

(async () => {
  outcomeImages.attack_detonation = await loadImg(AttackDetonationImg);
  outcomeImages.attack_elimination = await loadImg(AttackEliminationImg);
  outcomeImages.defense_defuse = await loadImg(DefenseDefuseImg);
  outcomeImages.defense_elimination = await loadImg(DefenseEliminationImg);
  outcomeImages.defense_time = await loadImg(DefenseTimeImg);
})();

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
  y: number
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

  // Draw initial box
  const overviewWidth = 1400;
  const overviewHeight = 600;
  const color = "15, 25, 35";

  ctx.beginPath();
  ctx.fillStyle = `rgba(${color}, 0.8)`;
  ctx.roundRect(
    1920 / 2 - overviewWidth / 2,
    y - overviewHeight,
    overviewWidth,
    overviewHeight,
    [10, 10, 10, 10]
  );
  ctx.fill();
  ctx.closePath();

  // Draw team data
  ctx.beginPath();
  ctx.fillStyle = `rgba(${color}, 1)`;
  ctx.roundRect(
    1920 / 2 - overviewWidth / 2,
    y - overviewHeight,
    overviewWidth,
    80,
    [10, 10, 0, 0]
  );
  ctx.fill();
  ctx.closePath();

  {
    drawCenteredText(
      ctx,
      settings.redTeamName.toUpperCase(),
      1920 / 2 - overviewWidth / 2 + 100,
      y - overviewHeight + 40,
      "60px Tungsten",
      "white",
      "left",
      "middle"
    );

    drawCenteredText(
      ctx,
      gameData.redScore.toString(),
      1920 / 2 - overviewWidth / 2 + 50,
      y - overviewHeight + 40,
      "60px Tungsten",
      `rgba(${gameData.redSide == "attack" ? atkC : defC}, 1)`,
      "center",
      "middle"
    );

    drawCenteredText(
      ctx,
      settings.blueTeamName.toUpperCase(),
      1920 / 2 + overviewWidth / 2 - 100,
      y - overviewHeight + 40,
      "60px Tungsten",
      "white",
      "right",
      "middle"
    );

    drawCenteredText(
      ctx,
      gameData.blueScore.toString(),
      1920 / 2 + overviewWidth / 2 - 50,
      y - overviewHeight + 40,
      "60px Tungsten",
      `rgba(${gameData.blueSide == "attack" ? atkC : defC}, 1)`,
      "center",
      "middle"
    );

    drawCenteredText(
      ctx,
      "MATCH OVERVIEW",
      1920 / 2,
      y - overviewHeight + 40,
      "25px 'Din Next'",
      "white",
      "center",
      "middle"
    );
  }

  // Draw rounds
  const roundSize = 70;

  ctx.beginPath();
  ctx.fillStyle = `rgba(${color}, 0.4)`;
  ctx.roundRect(
    1920 / 2 - overviewWidth / 2,
    y - roundSize,
    overviewWidth,
    roundSize,
    [0, 0, 10, 10]
  );
  ctx.fill();
  ctx.closePath();
  ctx.fillRect(1920 / 2 - overviewWidth / 2, y - roundSize * 2 - 3, overviewWidth, roundSize);

  ctx.beginPath();
  ctx.fillStyle = `rgba(${color}, 1)`;
  ctx.roundRect(
    1920 / 2 - overviewWidth / 2 + 125,
    y - roundSize,
    overviewWidth - 125,
    roundSize,
    [0, 0, 10, 0]
  );
  ctx.fill();
  ctx.closePath();
  ctx.fillRect(
    1920 / 2 - overviewWidth / 2 + 125,
    y - roundSize * 2 - 3,
    overviewWidth - 125,
    roundSize
  );

  // Team names
  drawCenteredText(
    ctx,
    settings.redTeamShortName.toUpperCase(),
    1920 / 2 - overviewWidth / 2 + 125 / 2,
    y - roundSize / 2,
    "50px Tungsten",
    "white",
    "center",
    "middle"
  );

  drawCenteredText(
    ctx,
    settings.blueTeamShortName.toUpperCase(),
    1920 / 2 - overviewWidth / 2 + 125 / 2,
    y - roundSize - roundSize / 2 - 3,
    "50px Tungsten",
    "white",
    "center",
    "middle"
  );

  let offset = 0;
  const roundsFittable = Math.floor((overviewWidth - 125) / roundSize);
  const rounds: (Round | null)[] = [...gameData.matchLog];
  rounds.splice(13, 0, null as unknown as Round);
  for (const round of rounds.slice(-roundsFittable)) {
    if (
      outcomeImages.attack_detonation == null ||
      outcomeImages.attack_elimination == null ||
      outcomeImages.defense_defuse == null ||
      outcomeImages.defense_elimination == null ||
      outcomeImages.defense_time == null
    )
      break;

    try {
      if (round == null) {
        drawCenteredText(
          ctx,
          "SW",
          1920 / 2 - overviewWidth / 2 + 125 + roundSize / 2 + offset,
          y - roundSize + roundSize / 2,
          "20px 'Din Next'",
          "white",
          "center",
          "middle"
        );

        drawCenteredText(
          ctx,
          "SW",
          1920 / 2 - overviewWidth / 2 + 125 + roundSize / 2 + offset,
          y - roundSize * 2 - 3 + roundSize / 2,
          "20px 'Din Next'",
          "white",
          "center",
          "middle"
        );
      } else {
        if (round.winner == "blue") {
          ctx.drawImage(
            outcomeImages[`${gameData.blueSide}_${round.cause}` as keyof typeof outcomeImages] || outcomeImages.defense_time,
            1920 / 2 - overviewWidth / 2 + 125 + 15 + offset,
            y - roundSize * 2 - 3 + 15,
            roundSize - 30,
            roundSize - 30
          );

          drawCenteredText(
            ctx,
            round.roundNumber.toString(),
            1920 / 2 - overviewWidth / 2 + 125 + roundSize / 2 + offset,
            y - roundSize + roundSize / 2,
            "20px 'Din Next'",
            "white",
            "center",
            "middle"
          );
        } else {
          ctx.drawImage(
            outcomeImages[`${gameData.redSide}_${round.cause}` as keyof typeof outcomeImages] || outcomeImages.defense_time,
            1920 / 2 - overviewWidth / 2 + 125 + 15 + offset,
            y - roundSize + 15,
            roundSize - 30,
            roundSize - 30
          );

          drawCenteredText(
            ctx,
            round.roundNumber.toString(),
            1920 / 2 - overviewWidth / 2 + 125 + roundSize / 2 + offset,
            y - roundSize * 2 - 3 + roundSize / 2,
            "20px 'Din Next'",
            "white",
            "center",
            "middle"
          );
        }
      }
    } catch {}

    offset += roundSize;
  }
}
