import { agents } from "vct-tools-components";
import { loadImg } from "@/pages/GraphicCreator/load_img";
import { drawCenteredText, atkC, defC } from "./renderUtils";
import { type OverlaySettings, type PlayerData } from "./overlayType";
import { nameFilter } from "./overlayPreParse";
import { type Ref } from "vue";

export async function playerRight(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  player: PlayerData,
  alive: boolean,
  settings: OverlaySettings,
  agentImages: Ref<Record<string, HTMLImageElement>>,
  abilityImages: Ref<Record<
    string,
    {
      Ability1: HTMLImageElement;
      Ability2: HTMLImageElement;
      Signature: HTMLImageElement;
      Ultimate: HTMLImageElement;
    }
  >>,
  side: "attack" | "defense"
): Promise<void> {
  const playerHealth = player.health;
  const ultProgress = [player.abilities.Ultimate.remainingUses, player.abilities.Ultimate.maxUses];
  const playerShields = player.loadout.shield;
  const agent = player.agent;
  const kda = player.KDA;
  const agentData = agents.find((a) => a.name == agent);
  if (!agentData) return;

  // get agent image
  if (!agentImages.value[agent]) {
    agentImages.value[agent] = await loadImg(agentData.icon);
  }

  if (!abilityImages.value[agent]) {
    abilityImages.value[agent] = {
      Ability1: await loadImg(agentData.abilities.Ability1.icon),
      Ability2: await loadImg(agentData.abilities.Ability2.icon),
      Signature: await loadImg(agentData.abilities.Signature.icon),
      Ultimate: await loadImg(agentData.abilities.Ultimate.icon)
    };
  }

  ctx.filter = alive ? "" : "grayscale(1)";
  ctx.fillStyle = `rgba(${side == "defense" ? defC : atkC}, 0.5)`;
  ctx.beginPath();
  ctx.roundRect(x - (alive ? 400 : 300), y - 30, alive ? 400 : 300, 30, [0, 0, 10, 10]);
  ctx.fill();
  ctx.closePath();

  ctx.fillStyle = `rgba(100, 100, 100, 1)`;
  ctx.fillRect(x - (alive ? 400 : 300), y - 30 - 10, alive ? 400 : 300, 10);

  if (alive) {
    ctx.fillStyle = `rgba(${side == "defense" ? defC : atkC}, 1)`;
    ctx.fillRect(x - playerHealth * 4, y - 30 - 10, playerHealth * 4, 10);
  }

  drawCenteredText(
    ctx,
    nameFilter(player.name, player.tagline, settings),
    x - 6,
    y - 15,
    "bold 20px 'Din Next'",
    "white",
    "right",
    "middle"
  );

  ctx.fillStyle = `rgba(0, 0, 0, 0.3)`;
  ctx.beginPath();
  ctx.roundRect(x - (alive ? 400 : 300), y - 30 - 10 - 70, alive ? 400 : 300, 70, [10, 10, 0, 0]);
  ctx.fill();
  ctx.closePath();

  if (alive) {
    if (settings.playerOverlayFeatures.playerAbilities) {
      if (ultProgress[0] != ultProgress[1]) {
        (() => {
          const spacing = 12;
          const pointCount = ultProgress[1];
          const totalWidth = (pointCount - 1) * spacing;
          const location = x - 250 - totalWidth / 2;

          for (let i = 0; i < pointCount; i++) {
            ctx.fillStyle = ultProgress[0] > i ? "white" : "rgb(58, 58, 58)";
            ctx.beginPath();
            ctx.moveTo(location + i * spacing, y - 15);
            ctx.lineTo(location + 5 + i * spacing, y - 20);
            ctx.lineTo(location + 10 + i * spacing, y - 15);
            ctx.lineTo(location + 5 + i * spacing, y - 10);
            ctx.closePath();
            ctx.fill();
          }
        })();
      } else {
        ctx.fillStyle = `rgba(${side == "defense" ? defC : atkC}, 0.6)`;
        ctx.fillRect(x - 250 - 30, y - 30, 60, 30);

        // Draw ultimate icon
        ctx.drawImage(abilityImages.value[agent].Ultimate, x - 250 - 10, y - 25, 20, 20);
      }
    }

    // draw shield
    if (settings.playerOverlayFeatures.playerHealth) {
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;

      const xSl = x - 359;
      const ySl = y - 27;

      ctx.beginPath();
      ctx.moveTo(xSl + 21, ySl + 11);
      ctx.bezierCurveTo(xSl + 21, ySl + 16.55, xSl + 17.16, ySl + 21.74, xSl + 12, ySl + 23);
      ctx.bezierCurveTo(xSl + 6.84, ySl + 21.74, xSl + 3, ySl + 16.55, xSl + 3, ySl + 11);
      ctx.lineTo(xSl + 3, ySl + 5);
      ctx.lineTo(xSl + 12, ySl + 1);
      ctx.lineTo(xSl + 21, ySl + 5);
      ctx.lineTo(xSl + 21, ySl + 11);
      ctx.closePath();
      ctx.stroke();

      // Draw health and shields
      drawCenteredText(
        ctx,
        playerHealth.toString(),
        x - 395,
        y - 15,
        "bold 20px 'Din Next'",
        "white",
        "left",
        "middle"
      );

      drawCenteredText(
        ctx,
        playerShields.toString(),
        x - 347,
        y - 15,
        "12px 'Din Next'",
        "white",
        "center",
        "middle"
      );
    }

    // Draw abilities
    if (settings.playerOverlayFeatures.playerAbilities) {
      if (player.abilities.Ability1.remainingUses == 0) ctx.filter = "opacity(0.3)";
      ctx.drawImage(abilityImages.value[agent].Ability1, x - 255, y - 30 - 10 - 70 + 35 / 2, 35, 35);
      ctx.filter = "none";

      if (player.abilities.Ability2.remainingUses == 0) ctx.filter = "opacity(0.3)";
      ctx.drawImage(abilityImages.value[agent].Ability2, x - 195, y - 30 - 10 - 70 + 35 / 2, 35, 35);
      ctx.filter = "none";

      if (player.abilities.Signature.remainingUses == 0) ctx.filter = "opacity(0.3)";
      ctx.drawImage(abilityImages.value[agent].Signature, x - 135, y - 30 - 10 - 70 + 35 / 2, 35, 35);
      ctx.filter = "none";
    }

    // Draw KDA
    if (settings.playerOverlayFeatures.playerKDA) {
      drawCenteredText(
        ctx,
        `${kda[0]} / ${kda[1]} / ${kda[2]}`,
        x - 330,
        y - 30 - 10 - 70 + 35,
        "20px 'Din Next'",
        "white",
        "center",
        "middle"
      );
    }
  }

  // Draw agent
  if (settings.playerOverlayFeatures.agentImages) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(agentImages.value[agent], -x, y - 30 - 10 - 70, 70, 70);
    ctx.restore();
  }
  ctx.filter = "none";
}
