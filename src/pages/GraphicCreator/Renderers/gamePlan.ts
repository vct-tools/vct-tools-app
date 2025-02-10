import { type Ref } from "vue";
import { parseGamePlan } from "@/parseGamePlan";
import { maps } from "@/maps";
import { loadImg } from "../load_img";

const renderGamePlan = async (gamePlan: Ref<string>, ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createRadialGradient(300, 50, 10, 300, 50, 300);
  gradient.addColorStop(0.05, "rgba(33, 52, 66, 1)");
  gradient.addColorStop(1, "rgba(28, 66, 73, 1)");
  ctx.fillStyle = gradient;

  ctx.fillRect(0, 0, 600, 670);

  const parsedGamePlan = parseGamePlan(gamePlan.value);
  const refs: Record<string, string[]> = {};
  let cMap: null | string = null;
  for (const line of parsedGamePlan) {
    switch (line[0]) {
      case "Map":
        if (cMap) {
          throw new Error("Disallowed multiple map declarations");
        }

        if (line.length != 2) {
          throw new Error("Invalid map declaration, Syntax: Map <map name>");
        }

        cMap = line[1];
        const mn = maps.find((a) => a.name == cMap);
        if (mn) {
          const img = await loadImg(mn.map);
          ctx.drawImage(img, 10, 10, 580, 580);
        } else {
          throw new Error(`Unknown map: ${cMap}`);
        }

        break;

      case "Callouts":
        if (!cMap) {
          throw new Error("Callouts must be declared after map");
        }

        if (line.length != 2) {
          throw new Error("Invalid callouts declaration, Syntax: Callouts [yes/no]");
        }

        // Draw callouts
        if (line[1] == "yes") {
          const mn = maps.find((a) => a.name == cMap);
          if (mn) {
            for (const callout of mn.callouts) {
              ctx.textAlign = "center";
              ctx.fillStyle = "white";
              ctx.font = "7px 'Din Next'";

              ctx.fillText(callout.name, (callout.x * 1.16) + 10, (callout.y * 1.16) + 10);
            }
          } else {
            throw new Error(`Unknown map: ${cMap}`);
          }
        }

        break;

      default:
        throw new Error(`Unknown command: ${line[0]}`);
    }
  }

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.font = "15px 'Din Next'";

  ctx.fillText("VCTtools.net", 600 / 2, 650 + 15);
}

export { renderGamePlan };
