import { type Ref } from "vue";
import { parseGamePlan } from "@/parseGamePlan";
import { maps } from "@/maps";
import { loadImg } from "../load_img";
import agents from "@/agents";

const renderGamePlan = async (gamePlan: Ref<string>, ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createRadialGradient(300, 50, 10, 300, 50, 300);
  gradient.addColorStop(0.05, "rgba(33, 52, 66, 1)");
  gradient.addColorStop(1, "rgba(28, 66, 73, 1)");
  ctx.fillStyle = gradient;

  ctx.fillRect(0, 0, 600, 670);

  const parsedGamePlan = parseGamePlan(gamePlan.value);
  // const refs: Record<string, string[]> = {};
  let cMap: null | string = null;
  let calloutsDefined = false;

  let callouts: Record<string, string[][]> = {};

  for (const line of parsedGamePlan) {
    if (line[0] == "Map") {
      if (cMap) throw new Error("Disallowed multiple map declarations");
      if (line.length != 2) throw new Error("Invalid map declaration");

      cMap = line[1];
      const mn = maps.find((a) => a.name == cMap);
      if (mn) {
        const img = await loadImg(mn.map);
        ctx.drawImage(img, 10, 10, 580, 580);

        callouts = mn.callouts.reduce((acc, a) => {
          acc[a.name] = [];
          return acc;
        }, {} as Record<string, string[][]>);
      } else {
        throw new Error(`Unknown map: ${cMap}`);
      }
    } else if (line[0] == "Callouts") {
      if (!cMap) throw new Error("Callouts must be declared after map");
      if (calloutsDefined) throw new Error("Disallowed multiple callout declarations");

      const mn2 = maps.find((a) => a.name == cMap);
      if (mn2) {
        calloutsDefined = true;
      }
    } else if (line[0] == "Agent") {
      if (line.length != 4) throw new Error("Invalid agent declaration");
      if (!cMap) throw new Error("Agent must be declared after map");
      if (!["Attacker", "Defender"].includes(line[1])) throw new Error(`Unknown team: ${line[1]}`);

      callouts[line[3]]?.push([line[2], line[1], cMap, line[3]]);
    } else {
      throw new Error(`Unknown command: ${line[0]}`);
    }
  }

  // Render callouts if no agents are present on specific callouts
  for (const [callout, agents] of Object.entries(callouts)) {
    if (agents.length == 0) {
      if (cMap && calloutsDefined) {
        renderCallout(callout, cMap, ctx);
      }
    } else {
      const offsetStart = -(agents.length - 1) / 2;
      let i = 0;
      for (const agent of agents) {
        renderAgent(agent[0], agent[1], agent[2], agent[3], offsetStart + i, ctx);
        i++;
      }
    }
  }

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.font = "15px 'Din Next'";

  ctx.fillText("VCTtools.net", 600 / 2, 650 + 15);
};

const renderAgent = async (
  agent: string,
  team: string,
  cMap: string,
  callout: string,
  offset: number,
  ctx: CanvasRenderingContext2D
) => {
  const agentSize = 25;

  const agentT = agents.find((a) => a.name == agent);
  if (!agentT) {
    throw new Error(`Unknown agent: ${agent}`);
  } else {
    // Draw agent
    const agentImg = await loadImg(agentT.icon);
    ctx.fillStyle = team == "Attacker" ? "#f34453" : "#32af8a";

    // Get location
    const mn3 = maps.find((a) => a.name == cMap);
    if (mn3) {
      const calloutLoc = mn3.callouts.find((a) => a.name == callout);
      if (calloutLoc) {
        ctx.fillRect(
          (calloutLoc.x * 1.16 + 10 - agentSize / 2) + offset * (agentSize + 2),
          calloutLoc.y * 1.16 + 10 - agentSize / 2,
          agentSize,
          agentSize
        );
        ctx.drawImage(
          agentImg,
          calloutLoc.x * 1.16 + 10 - agentSize / 2 + offset * (agentSize + 2),
          calloutLoc.y * 1.16 + 10 - agentSize / 2,
          agentSize,
          agentSize
        );
      } else {
        throw new Error(`Unknown callout: ${callout}`);
      }
    }
  }
};

const renderCallout = (callout: string, cMap: string, ctx: CanvasRenderingContext2D) => {
  const mn4 = maps.find((a) => a.name == cMap);
  if (mn4) {
    const mn5 = mn4.callouts.find((a) => a.name == callout);
    if (mn5) {
      const calloutLoc = mn5;
      if (calloutLoc) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.font = "10px 'Din Next'";
        ctx.fillText(callout, calloutLoc.x * 1.16 + 10, calloutLoc.y * 1.16 + 10);
      }
    }
  }
}

export { renderGamePlan };
