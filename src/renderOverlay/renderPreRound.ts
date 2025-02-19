import type { GameData, OverlaySettings, PlayerData, Round } from "./overlayType";
import { drawCenteredText, atkC, defC, bgGradient } from "./renderUtils";
import { loadImg } from "@/pages/GraphicCreator/load_img";
import { type Ref } from "vue";
import { agents } from "vct-tools-components";

import AttackDetonationImg from "@/assets/images/roundOutcomes/attack_detonation.webp";
import AttackEliminationImg from "@/assets/images/roundOutcomes/attack_elimination.webp";
import DefenseDefuseImg from "@/assets/images/roundOutcomes/defense_defuse.webp";
import DefenseEliminationImg from "@/assets/images/roundOutcomes/defense_elimination.webp";
import DefenseTimeImg from "@/assets/images/roundOutcomes/defense_time.webp";
import SwapSidesImg from "@/assets/images/roundOutcomes/swap_sides.webp";
import { getSide } from "./overlayPreParse";

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
  const overviewHeight = 599 + 40;
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
      y - overviewHeight + 40 - 15,
      "25px 'Din Next'",
      "white",
      "center",
      "middle"
    );

    drawCenteredText(
      ctx,
      settings.series.seriesName,
      1920 / 2,
      y - overviewHeight + 40 + 15,
      "15px 'Din Next'",
      "rgba(255, 255, 255, 0.7)",
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
  if (rounds.length > 12) rounds.splice(12, 0, null as unknown as Round);
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
      if (round == null) {
        ctx.fillStyle = `rgb(${color})`;
        ctx.fillRect(1920 / 2 - overviewWidth / 2 + 125 + offset, y - roundSize * 2 - 3, roundSize, roundSize * 2 + 3);
        ctx.fillStyle = `rgb(255, 255, 255, 0.1)`;
        ctx.fillRect(1920 / 2 - overviewWidth / 2 + 125 + offset, y - roundSize * 2 - 3, roundSize, roundSize * 2 + 3);

        ctx.drawImage(
          outcomeImages.swap_sides,
          1920 / 2 - overviewWidth / 2 + 125 + 15 + offset,
          y - roundSize - roundSize / 2 - 3 / 2 + 15,
          roundSize - 30,
          roundSize - 30
        );
      } else {
        if (round.winner == "blue") {
          ctx.drawImage(
            outcomeImages[
              `${getSide("defense", round.roundNumber)}_${round.cause}` as keyof typeof outcomeImages
            ] || outcomeImages.defense_time,
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
            outcomeImages[
              `${getSide("attack", round.roundNumber)}_${round.cause}` as keyof typeof outcomeImages
            ] || outcomeImages.defense_time,
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

  // Draw player information (left)
  const playerHeight = 76;

  const drawPlayer = (x: number, y: number, player: PlayerData, ctx: CanvasRenderingContext2D) => {
    if (agentImages.value[player.agent]) {
      ctx.drawImage(agentImages.value[player.agent], x, y, playerHeight, playerHeight);
    }

    drawCenteredText(
      ctx,
      player.name,
      x + playerHeight + 10,
      y + playerHeight / 2 - playerHeight / 4,
      "bold 20px 'Din Next'",
      "white",
      "left",
      "middle"
    );

    drawCenteredText(
      ctx,
      `${player.KDA[0]} / ${player.KDA[1]} / ${player.KDA[2]}`,
      x + playerHeight + 10,
      y + playerHeight / 2,
      "20px 'Din Next'",
      `rgba(255, 255, 255, 0.5)`,
      "left",
      "middle"
    );

    drawCenteredText(
      ctx,
      `$${player.credits}`,
      x + playerHeight + 10,
      y + playerHeight / 2 + playerHeight / 4,
      "20px 'Din Next'",
      `rgba(255, 255, 255, 0.5)`,
      "left",
      "middle"
    );

    if (abilityImages.value[player.agent]) {
      const abilities = abilityImages.value[player.agent];
      ctx.drawImage(abilities.Ability1, x + playerHeight + 150 + 25, y + 20, playerHeight - 50, playerHeight - 50);
      ctx.drawImage(abilities.Ability2, x + playerHeight * 2 + 150 + 25, y + 20, playerHeight - 50, playerHeight - 50);
      ctx.drawImage(abilities.Signature, x + playerHeight * 3 + 150 + 25, y + 20, playerHeight - 50, playerHeight - 50);

      (() => {
        const spacing = 12;
        const pointCount = player.abilities.Ultimate.maxUses;
        const totalWidth = pointCount * spacing;
        const location = (x + playerHeight * 2 + playerHeight / 2 + 150) - totalWidth / 2;

        for (let i = 0; i < pointCount; i++) {
          ctx.fillStyle = player.abilities.Ultimate.remainingUses > i ? "white" : "rgb(97, 97, 97)";
          ctx.beginPath();
          ctx.moveTo(location + i * spacing, y - 15 + playerHeight);
          ctx.lineTo(location + 5 + i * spacing, y - 20 + playerHeight);
          ctx.lineTo(location + 10 + i * spacing, y - 15 + playerHeight);
          ctx.lineTo(location + 5 + i * spacing, y - 10 + playerHeight);
          ctx.closePath();
          ctx.fill();
        }
      })();
    }
  }

  {
    ctx.fillStyle = `rgba(${color}, 0.8)`;

    ctx.fillRect(1920 / 2 - overviewWidth / 2, y - overviewHeight + 80, overviewWidth, 36);
    [0, 1].forEach((a) => {
      drawCenteredText(
        ctx,
        "NAME / KDA / CREDITS",
        1920 / 2 - overviewWidth / 2 + 10 + (overviewWidth / 2) * a,
        y - overviewHeight + 80 + 18,
        "20px 'Din Next'",
        "white",
        "left",
        "middle"
      );

      drawCenteredText(
        ctx,
        "ABILITIES",
        1920 / 2 - overviewWidth / 2 + playerHeight * 2 + playerHeight / 2 + 150 + (overviewWidth / 2) * a,
        y - overviewHeight + 80 + 18,
        "20px 'Din Next'",
        "white",
        "center",
        "middle"
      );
    });
  }

  for (const player of gameData.redPlayers) {
    const playerIndex = gameData.redPlayers.indexOf(player);
    const playerY = y - overviewHeight + playerHeight + playerHeight * playerIndex;

    if (playerIndex % 2 == 0) {
      ctx.fillStyle = `rgba(${color}, 0.4)`;
      ctx.fillRect(1920 / 2 - overviewWidth / 2, playerY + 40, overviewWidth, playerHeight);
    }

    drawPlayer(1920 / 2 - overviewWidth / 2, playerY + 40, player, ctx);
  }

  for (const player of gameData.bluePlayers) {
    const playerIndex = gameData.bluePlayers.indexOf(player);
    const playerY = y - overviewHeight + playerHeight + playerHeight * playerIndex;

    drawPlayer(1920 / 2, playerY + 40, player, ctx);
  }
}
