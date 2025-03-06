import { drawCenteredText, atkC, defC } from "../renderUtils";
import { loadImg } from "@/pages/GraphicCreator/load_img";
import { weapons } from "vct-tools-components";
import { type Ref } from "vue";
import { type GameData, type OverlaySettings } from "../overlayType";
import { nameFilter } from "../overlayPreParse";

export async function renderTeamLeft(
  ctx: CanvasRenderingContext2D,
  gameData: GameData,
  settings: OverlaySettings,
  y: number,
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
  weaponImages: Record<string, HTMLImageElement>
) {
  // Draw teams and rounds
  const color = "15, 25, 35";
  ctx.fillStyle = `rgba(${color}, 1)`;

  // Left - draw table with 7 columns
  // 300px | 150px | 150px | ??
  const playerHeight = 80;

  let offset = 0;
  let alt = false;

  ctx.fillStyle = `rgba(${color}, 1)`;
  ctx.fillRect(25, y - playerHeight * 5 - 50, 910, 50);
  drawCenteredText(
    ctx,
    "PLAYER",
    25 + 150,
    y - playerHeight * 5 - 25,
    "20px 'Din Next'",
    "white",
    "center",
    "middle"
  );

  drawCenteredText(
    ctx,
    "K",
    25 + 300 + 150 / 3 - 150 / 3 / 2,
    y - playerHeight * 5 - 25,
    "20px 'Din Next'",
    "white",
    "center",
    "middle"
  );

  drawCenteredText(
    ctx,
    "D",
    25 + 300 + (150 / 3) * 2 - 150 / 3 / 2,
    y - playerHeight * 5 - 25,
    "20px 'Din Next'",
    "white",
    "center",
    "middle"
  );

  drawCenteredText(
    ctx,
    "A",
    25 + 300 + 150 - 150 / 3 / 2,
    y - playerHeight * 5 - 25,
    "20px 'Din Next'",
    "white",
    "center",
    "middle"
  );

  drawCenteredText(
    ctx,
    "ABILITIES",
    25 + 300 + 150 + 100,
    y - playerHeight * 5 - 25,
    "20px 'Din Next'",
    "white",
    "center",
    "middle"
  );

  drawCenteredText(
    ctx,
    "LOADOUT",
    25 + 300 + 150 + 200 + 150 / 2,
    y - playerHeight * 5 - 25,
    "20px 'Din Next'",
    "white",
    "center",
    "middle"
  );

  drawCenteredText(
    ctx,
    "CREDS",
    25 + 300 + 150 + 200 + 150 + 110 / 2,
    y - playerHeight * 5 - 25,
    "20px 'Din Next'",
    "white",
    "center",
    "middle"
  );

  for (const player of gameData.redPlayers) {
    alt = !alt;
    ctx.fillStyle = `rgba(0, 0, 0, ${alt ? 0.8 : 0.9})`;
    ctx.fillRect(25, y - playerHeight * 5 + offset, 910, playerHeight);

    if (agentImages.value[player.agent]) {
      // Get side
      const sideColor = gameData.redSide == "attack" ? atkC : defC;
      ctx.fillStyle = `rgba(${sideColor}, 1)`;
      ctx.fillRect(25, y - playerHeight * 5 + offset, playerHeight / 2, playerHeight);
      ctx.drawImage(
        agentImages.value[player.agent],
        25,
        y - playerHeight * 5 + offset,
        playerHeight,
        playerHeight
      );
    }

    drawCenteredText(
      ctx,
      nameFilter(player.name, player.tagline, settings),
      25 + playerHeight + 10,
      y - playerHeight * 5 + offset + playerHeight / 2,
      "20px 'Din Next'",
      "white",
      "left",
      "middle"
    );

    drawCenteredText(
      ctx,
      player.KDA[0].toString(),
      25 + 300 + 150 / 3 - 150 / 3 / 2,
      y - playerHeight * 5 + offset + playerHeight / 2,
      "20px 'Din Next'",
      "white",
      "center",
      "middle"
    );

    drawCenteredText(
      ctx,
      player.KDA[1].toString(),
      25 + 300 + (150 / 3) * 2 - 150 / 3 / 2,
      y - playerHeight * 5 + offset + playerHeight / 2,
      "20px 'Din Next'",
      "white",
      "center",
      "middle"
    );

    drawCenteredText(
      ctx,
      player.KDA[2].toString(),
      25 + 300 + 150 - 150 / 3 / 2,
      y - playerHeight * 5 + offset + playerHeight / 2,
      "20px 'Din Next'",
      "white",
      "center",
      "middle"
    );

    if (abilityImages.value[player.agent]) {
      const abilities = abilityImages.value[player.agent];

      if (player.abilities.Ability1.remainingUses == 0) ctx.filter = "opacity(0.3)";
      const abilityWidth = 200 / 3;
      const abilityOffset = (abilityWidth - (playerHeight - 50)) / 2;

      ctx.drawImage(
        abilities.Ability1,
        25 + 450 + abilityWidth * 0 + abilityOffset,
        y - playerHeight * 5 + offset + (playerHeight - 50) / 2,
        playerHeight - 50,
        playerHeight - 50
      );
      ctx.filter = "none";

      if (player.abilities.Ability2.remainingUses == 0) ctx.filter = "opacity(0.3)";
      ctx.drawImage(
        abilities.Ability2,
        25 + 450 + abilityWidth * 1 + abilityOffset,
        y - playerHeight * 5 + offset + (playerHeight - 50) / 2,
        playerHeight - 50,
        playerHeight - 50
      );
      ctx.filter = "none";

      if (player.abilities.Signature.remainingUses == 0) ctx.filter = "opacity(0.3)";
      ctx.drawImage(
        abilities.Signature,
        25 + 450 + abilityWidth * 2 + abilityOffset,
        y - playerHeight * 5 + offset + (playerHeight - 50) / 2,
        playerHeight - 50,
        playerHeight - 50
      );
      ctx.filter = "none";

      (() => {
        const spacing = 12;
        const pointCount = player.abilities.Ultimate.maxUses;
        const totalWidth = pointCount * spacing;
        const location = 25 + 450 + 100 - totalWidth / 2;
        const yLoc = y - playerHeight * 5 + offset + playerHeight;

        for (let i = 0; i < pointCount; i++) {
          ctx.fillStyle = player.abilities.Ultimate.remainingUses > i ? "white" : "rgb(97, 97, 97)";
          ctx.beginPath();
          ctx.moveTo(location + i * spacing, yLoc - 15);
          ctx.lineTo(location + 5 + i * spacing, yLoc - 20);
          ctx.lineTo(location + 10 + i * spacing, yLoc - 15);
          ctx.lineTo(location + 5 + i * spacing, yLoc - 10);
          ctx.closePath();
          ctx.fill();
        }
      })();
    }

    // Loadout
    let strongestWeapon = "Melee";
    if (player.loadout.sidearm) strongestWeapon = player.loadout.sidearm.name;
    if (player.loadout.firearm) strongestWeapon = player.loadout.firearm.name;

    if (weaponImages[strongestWeapon]) {
      // Render strongest
      const height = 30;
      const aspect = weaponImages[strongestWeapon].width / weaponImages[strongestWeapon].height;
      const width = height * aspect;

      ctx.drawImage(
        weaponImages[strongestWeapon],
        25 + 300 + 150 + 200 + 150 / 2 - width / 2,
        y - playerHeight * 5 + offset + playerHeight / 2 - height / 2,
        width,
        height
      );
    } else {
      const icon = weapons.find((a) => a.name == strongestWeapon);
      if (icon) {
        weaponImages[strongestWeapon] = await loadImg(icon.icon);
      }
    }

    // Creds
    drawCenteredText(
      ctx,
      `$${player.credits}`,
      25 + 300 + 150 + 200 + 150 + 110 / 2,
      y - playerHeight * 5 + offset + playerHeight / 2,
      "20px 'Din Next'",
      "white",
      "center",
      "middle"
    );

    offset += playerHeight;
  }

  // Draw lines between columns
  ctx.beginPath();
  ctx.moveTo(25, y - playerHeight * 5 - 50);
  ctx.lineTo(25, y);
  ctx.moveTo(25 + 300, y - playerHeight * 5 - 50);
  ctx.lineTo(25 + 300, y);
  ctx.moveTo(25 + 450, y - playerHeight * 5 - 50);
  ctx.lineTo(25 + 450, y);
  ctx.moveTo(25 + 650, y - playerHeight * 5 - 50);
  ctx.lineTo(25 + 650, y);
  ctx.moveTo(25 + 800, y - playerHeight * 5 - 50);
  ctx.lineTo(25 + 800, y);
  ctx.moveTo(25 + 910, y - playerHeight * 5 - 50);
  ctx.lineTo(25 + 910, y);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}
