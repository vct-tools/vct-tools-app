import { type Ref } from "vue";
import agents from "@/agents";
import { loadImg } from "../load_img";

type TeamRoster = {
  teamName: string;
  tagline: string;
  roster: {
    name: string;
    image: {
      imageType: "File Upload" | "Agent Portrait";
      agent: string;
      dataUri: null | string;
    },
    type: "Player" | "Substitute" | "Coach";
  }[]
};

const renderTeamRoster = async (teamRosterData: Ref<TeamRoster>, ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createRadialGradient(300, 50, 10, 300, 50, 300);
  gradient.addColorStop(0.05, "rgba(33, 52, 66, 1)");
  gradient.addColorStop(1, "rgba(28, 66, 73, 1)");
  ctx.fillStyle = gradient;

  ctx.fillRect(0, 0, 600, 540);

  ctx.fillStyle = "#e0ebb9";
  ctx.font = "70px Tungsten";
  ctx.textAlign = "left";
  ctx.fillText(teamRosterData.value.teamName.toUpperCase(), 10, 75);
  const os = ctx.measureText(teamRosterData.value.teamName.toUpperCase()).width + 10;
  ctx.fillStyle = "#ccc";
  ctx.font = "20px 'Din Next'";
  ctx.fillText(`(${teamRosterData.value.tagline})`, 10 + os, 73);

  let offsetX = 0;
  let offsetY = 100;
  let alt = false;
  let num = 0;

  for (const member of teamRosterData.value.roster) {
    ctx.fillStyle = alt ? "rgb(32, 86, 95)" : "rgb(28, 66, 73)";
    ctx.fillRect(offsetX, offsetY, 150, 210);
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(offsetX, offsetY + 150, 150, 60);

    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(offsetX, offsetY + 150, 150, 25);
    if (member.type != "Player") {
      ctx.fillStyle = "#e0ebb9";
      ctx.font = "15px 'Din Next'";
      ctx.fillText(
        {
          Substitute: "SUB",
          Coach: "COACH"
        }[member.type],
        offsetX + 5,
        offsetY + 167
      );
    }

    // Draw image
    if (member.image.imageType == "Agent Portrait") {
      const agent = agents.find((a) => a.name == member.image.agent);
      if (agent) {
        const img = await loadImg(agent.icon);
        ctx.drawImage(img, offsetX, offsetY, 150, 150);
      }
    } else if (member.image.dataUri) {
      const img = await loadImg(member.image.dataUri);
      ctx.drawImage(img, offsetX, offsetY, 150, 150);
    }

    ctx.fillStyle = "#fff";
    ctx.font = "20px 'Din Next'";
    ctx.textAlign = "left";
    ctx.fillText(member.name, offsetX + 5, offsetY + 198);

    offsetX += 150;
    num += 1;
    if (num % 4 == 0) {
      offsetX = 0;
      offsetY += 210;
      alt = !alt;
    }
    alt = !alt;
  }

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.font = "15px 'Din Next'";

  ctx.fillText("VCTtools.net", 600 / 2, 520 + 15);
}

export { type TeamRoster, renderTeamRoster };
