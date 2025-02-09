import { maps } from "@/maps";
import NoAgentImg from "@/assets/images/Unknown.webp";
import { roleImages } from "@/agents";
import agents from "@/agents";
import type { Ref } from "vue";
import { loadImg } from "../load_img";

type TeamComp = {
  map: string;
  comp: {
    player: string;
    agent: string;
  }[]
}

const renderTeamComp = async (teamCompData: Ref<TeamComp>, ctx: CanvasRenderingContext2D, mainCanvas: HTMLCanvasElement) => {
  const map = maps.find((a) => a.name == teamCompData.value.map);
  if (map) {
    ctx.drawImage(await loadImg(map.image), 0, -150, 600, 394); // 394px aspect ratio 16:9
  }

  ctx.fillStyle = "rgba(32, 86, 95, 0.6)";
  ctx.fillRect(0, 0, 600, 270);

  ctx.font = "50px Tungsten";
  ctx.fillStyle = "#e0ebb9";
  ctx.textAlign = "center";
  ctx.fillText("TEAM COMPOSITION", mainCanvas.width / 2, 50);
  ctx.font = "25px 'Din Next'";
  ctx.fillStyle = "white";
  ctx.fillText(
    `Playing on ${teamCompData.value.map.toUpperCase()}`,
    mainCanvas.width / 2,
    80
  );

  let offsetY = 100;
  let alt = false;
  ctx.textAlign = "left";
  for (const player of teamCompData.value.comp) {
    const a = agents.find((a) => a.name == player.agent);
    if (a) {
      const agentImg = await loadImg(a.icon);
      const c = roleImages.find((b) => b.role == a.role);
      if (c) {
        const roleImg = await loadImg(c.image);
        ctx.fillStyle = alt ? "rgb(32, 86, 95)" : "rgb(28, 66, 73)";
        ctx.fillRect(0, offsetY, 600, 70);

        ctx.fillStyle = "#e0ebb9";
        ctx.font = "40px Tungsten";

        ctx.drawImage(roleImg, 90, offsetY + 15, 40, 40);

        ctx.fillText(a.name.toUpperCase(), 120 + 40, offsetY + 40);

        ctx.fillStyle = "white";
        ctx.font = "20px 'Din Next'";
        ctx.fillText(player.player, 120 + 40, offsetY + 60);

        ctx.drawImage(agentImg, 0, offsetY, 70, 70);
        offsetY += 70;
        alt = !alt;
      }
    } else if (player.agent == "(Show as unknown)") {
      const agentImg = await loadImg(NoAgentImg);

      ctx.fillStyle = alt ? "rgb(32, 86, 95)" : "rgb(28, 66, 73)";
      ctx.fillRect(0, offsetY, 600, 70);

      ctx.fillStyle = "white";
      ctx.font = "20px 'Din Next'";

      ctx.fillText(player.player, 120 + 40, offsetY + 42);

      ctx.drawImage(agentImg, 10, offsetY + 10, 50, 50);
      offsetY += 70;
      alt = !alt;
    } else {
      ctx.fillStyle = (offsetY / 100) % 2 == 0 ? "rgb(32, 86, 95)" : "rgb(28, 66, 73)";
      ctx.fillRect(0, offsetY, 600, 70);
      offsetY += 70;
      alt = !alt;
    }
  }
  ctx.fillStyle = (offsetY / 100) % 2 == 0 ? "rgb(32, 86, 95)" : "rgb(28, 66, 73)";
  ctx.fillRect(0, offsetY, 600, 20);
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.font = "15px 'Din Next'";

  ctx.fillText("VCTtools.net", 600 / 2, offsetY + 15);
};

export { type TeamComp, renderTeamComp };
