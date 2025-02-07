<template>
  <div class="container">
    <header-container pageName="Create graphics">
      <div class="graphics-body">
        <div class="graphic">
          <canvas width="700" :height="canvasHeight" ref="mainCanvas"></canvas>
        </div>
        <div class="options">
          <div class="panel">
            <HeaderSmall>Select Graphic</HeaderSmall>
            <UISelect prefix="Graphic Type: " :items="[`Team composition`]" v-model="graphicType"></UISelect>
          </div>
          <div class="panel" v-if="graphicType == `Team composition`">
            <HeaderSmall>Team Comp</HeaderSmall>
            <UISelect prefix="Map: " :items="maps.map((a) => a.name)" v-model="teamCompData.map"></UISelect>
            <div v-for="(p, i) in teamCompData.comp" :key="i" style="display: flex; gap: 2px;">
              <UISelect prefix="Agent: " :items="[`(Remove player)`, `(Show as unknown)`, ...agents.map((a) => a.name)]" v-model="teamCompData.comp[i].agent" style="width: 50%;"></UISelect>
              <UIField v-model="teamCompData.comp[i].player" style="width: 50%; text-align: center;"></UIField>
            </div>
          </div>
          <div class="panel">
            <AdsenseMultiplexAd></AdsenseMultiplexAd>
          </div>
        </div>
      </div>
    </header-container>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  align-items: center;
}

.graphics-body {
  width: 100%;
  flex: 1;
  font-size: 12pt;

  display: flex;
  justify-content: space-between;
}

.graphic {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

canvas {
  border: 1px solid #54758142;
  max-width: 100%;
}

.options {
  flex: 1;
  margin-left: 1em;

  display: flex;
  flex-direction: column;
  gap: 1px;
}

.options .panel {
  padding: 1em;
  background-color: #54758142;
}
</style>

<script setup lang="ts">
import AdsenseMultiplexAd from "@/components/Adsense/AdsenseMultiplexAd.vue";
import HeaderContainer from "@/components/HeaderContainer.vue";
import HeaderSmall from "@/components/HeaderSmall.vue";
import UISelect from "@/components/UIElement/UISelect.vue";
import NoAgentImg from "@/assets/images/agents/Unknown.webp";
import { roleImages, Role } from "@/agents";
import agents from "@/agents";
import { maps } from "@/maps";

import { ref, type Ref, watch, onMounted } from "vue";
import UIField from "@/components/UIElement/UIField.vue";

const canvasHeight = ref(500);
const graphicType = ref("Team composition");
const teamCompData = ref<
  {
    map: string;
    comp: {
      player: string;
      agent: string;
    }[]
  }
>({
  map: "Ascent",
  comp: [
    { player: "Player 1", agent: "Brimstone" },
    { player: "Player 2", agent: "Jett" },
    { player: "Player 3", agent: "Phoenix" },
    { player: "Player 4", agent: "Sage" },
    { player: "Player 5", agent: "Sova" },
  ]
});

const mainCanvas: Ref<HTMLCanvasElement | null> = ref(null);

const loadImg = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
}

const draw = async () => {
  if (mainCanvas.value) {
    const ctx = mainCanvas.value.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, mainCanvas.value.width, mainCanvas.value.height);

      if (graphicType.value == "Team composition") {
        canvasHeight.value = 620;

        // Draw map image
        ctx.textAlign = "left";
        const map = maps.find((a) => a.name == teamCompData.value.map);
        if (map) {
          ctx.drawImage(await loadImg(map.image), 0, -100, 700, 394); // 394px aspect ratio 16:9
        }

        ctx.fillStyle = "rgba(32, 86, 95, 0.5)";
        ctx.fillRect(0, 0, 700, 270);
        ctx.fillStyle = "rgba(32, 86, 95, 0.7)";
        ctx.fillRect(700 - 270, 0, 270, 270);

        ctx.font = "50px Tungsten";
        ctx.fillStyle = "#e0ebb9";

        ctx.fillText("TEAM COMPOSITION", 15, 120);
        ctx.font = "25px 'Din Next'";
        ctx.fillStyle = "white";
        ctx.fillText(`Map: ${teamCompData.value.map}`, 15, 80 + 70);

        if (map) {
          ctx.drawImage(await loadImg(map.map), 700 - 250, 5, 250, 250); // 394px aspect ratio 16:9
        }

        let offsetY = 250;
        let alt = false;
        for (const player of teamCompData.value.comp) {
          const a = agents.find((a) => a.name == player.agent);
          if (a) {
            const agentImg = await loadImg(a.icon);
            const c = roleImages.find((b) => b.role == a.role);
            if (c) {
              const roleImg = await loadImg(c.image);
              ctx.fillStyle = alt ? "rgb(32, 86, 95)" : "rgb(28, 66, 73)";
              ctx.fillRect(0, offsetY, 700, 100);

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
            ctx.fillRect(0, offsetY, 700, 70);

            ctx.fillStyle = "white";
            ctx.font = "20px 'Din Next'";

            ctx.fillText(player.player, 120 + 40, offsetY + 42);

            ctx.drawImage(agentImg, 10, offsetY + 10, 50, 50);
            offsetY += 70;
            alt = !alt;
          } else {
            ctx.fillStyle = (offsetY / 100) % 2 == 0 ? "rgb(32, 86, 95)" : "rgb(28, 66, 73)";
            ctx.fillRect(0, offsetY, 700, 70);  
            offsetY += 70;
            alt = !alt;
          }
        }
        ctx.fillStyle = (offsetY / 100) % 2 == 0 ? "rgb(32, 86, 95)" : "rgb(28, 66, 73)";
        ctx.fillRect(0, offsetY, 700, 20);
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        ctx.font = "15px 'Din Next'";

        ctx.fillText("VCTtools.net", 700/2, offsetY + 15);
      }
    }
  }
}

watch(teamCompData, () => {
  draw();
}, { deep: true });

onMounted(() => {
  draw();
});
</script>
