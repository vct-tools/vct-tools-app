<template>
  <div class="container">
    <header-container pageName="Create graphics">
      <div class="graphics-body">
        <div class="graphic">
          <div class="graphic-canvas">
            <canvas width="600" :height="canvasHeight" ref="mainCanvas"></canvas>
            <div style="display: flex; width: 100%; gap: 2px">
              <UIButtonLabel>{{
                rendered ? "Done rendering" : "Rendering graphic..."
              }}</UIButtonLabel>
              <UIButton @click="copy()">Copy to clipboard</UIButton>
              <UIButton @click="save()">Save image</UIButton>
              <UIButton @click="draw()">Re-render</UIButton>
            </div>
          </div>
        </div>
        <div class="options">
          <div class="panel">
            <HeaderSmall>Select Graphic</HeaderSmall>
            <UISelect
              prefix="Graphic Type: "
              :items="[`Team composition`, `Team roster`]"
              v-model="graphicType as string"
            ></UISelect>
          </div>
          <div class="panel" v-if="graphicType == `Team composition`">
            <HeaderSmall>Team Comp</HeaderSmall>
            <UISelect
              prefix="Map: "
              :items="maps.map((a) => a.name)"
              v-model="teamCompData.map as string"
            ></UISelect>
            <div v-for="(p, i) in teamCompData.comp" :key="i" style="display: flex; gap: 2px">
              <UISelect
                prefix="Agent: "
                :items="[`(Remove player)`, `(Show as unknown)`, ...agents.map((a) => a.name)]"
                v-model="teamCompData.comp[i].agent as string"
                style="width: 50%"
              ></UISelect>
              <UIField
                v-model="teamCompData.comp[i].player"
                style="width: 50%; text-align: center"
              ></UIField>
            </div>
          </div>
          <div class="panel" v-if="graphicType == `Team roster`">
            <HeaderSmall>Team Roster</HeaderSmall>
            <div class="fg">
              <UIField v-model="teamRosterData.teamName"></UIField>
              <UIField v-model="teamRosterData.tagline"></UIField>
              <UIButton
                @click="
                  teamRosterData.roster.push({
                    name: `Player 1`,
                    image: { imageType: `Agent Portrait`, agent: `Brimstone`, dataUri: null },
                    type: `Player`
                  })
                "
                :disabled="teamRosterData.roster.length >= 8"
                >+ Add new member</UIButton
              >
            </div>
            <div class="fg">
              <UIButtonLabel>Name</UIButtonLabel>
              <UIButtonLabel>Image Type</UIButtonLabel>
              <UIButtonLabel>Image/Agent</UIButtonLabel>
              <UIButtonLabel>Type</UIButtonLabel>
              <div class="fgs"></div>
            </div>
            <div class="fg" v-for="(member, i) in teamRosterData.roster" :key="i">
              <UIField v-model="teamRosterData.roster[i].name"></UIField>
              <UISelect
                v-model="teamRosterData.roster[i].image.imageType as string"
                :items="[`File Upload`, `Agent Portrait`]"
              ></UISelect>
              <UISelect
                v-model="teamRosterData.roster[i].image.agent as string"
                :items="agents.map((a) => a.name)"
                v-if="teamRosterData.roster[i].image.imageType == `Agent Portrait`"
              ></UISelect>
              <UIButton v-else @click="loadImgRoster(i)">Select image...</UIButton>
              <UISelect
                v-model="teamRosterData.roster[i].type as string"
                :items="[`Player`, `Substitute`, `Coach`]"
              ></UISelect>
              <UIButton @click="teamRosterData.roster.splice(i, 1)">Delete</UIButton>
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
  background-color: #54758142;
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

.mc-editor {
  width: 100%;
  height: 40vh;
}

.fg {
  display: flex;
  width: 100%;
  gap: 2px;
}

.fgs {
  width: 100%;
}
</style>

<script setup lang="ts">
import AdsenseMultiplexAd from "@/components/Adsense/AdsenseMultiplexAd.vue";
import HeaderContainer from "@/components/HeaderContainer.vue";
import HeaderSmall from "@/components/HeaderSmall.vue";
import { nextTick, ref, type Ref, watch } from "vue";
import { UIField, UIButtonLabel, UIButton, UISelect, agents, maps } from "vct-tools-components";
import { type TeamComp, renderTeamComp } from "./Renderers/teamComp";
import { type TeamRoster, renderTeamRoster } from "./Renderers/teamRoster";

const rendered = ref(false);
const canvasHeight = ref(600);
const graphicType = ref("Team composition");
const teamCompData = ref<TeamComp>({
  map: "Ascent",
  comp: [
    { player: "Player 1", agent: "Brimstone" },
    { player: "Player 2", agent: "Jett" },
    { player: "Player 3", agent: "Phoenix" },
    { player: "Player 4", agent: "Sage" },
    { player: "Player 5", agent: "Sova" }
  ]
});
const teamRosterData = ref<TeamRoster>({
  teamName: "My Team",
  tagline: "TMN",
  roster: [
    {
      name: "Player 1",
      image: { imageType: "Agent Portrait", agent: "Brimstone", dataUri: null },
      type: "Player"
    },
    {
      name: "Player 2",
      image: { imageType: "Agent Portrait", agent: "Jett", dataUri: null },
      type: "Player"
    },
    {
      name: "Player 3",
      image: { imageType: "Agent Portrait", agent: "Phoenix", dataUri: null },
      type: "Player"
    },
    {
      name: "Player 4",
      image: { imageType: "Agent Portrait", agent: "Sage", dataUri: null },
      type: "Player"
    },
    {
      name: "Player 5",
      image: { imageType: "Agent Portrait", agent: "Sova", dataUri: null },
      type: "Player"
    },
    {
      name: "Player 6",
      image: { imageType: "Agent Portrait", agent: "Brimstone", dataUri: null },
      type: "Substitute"
    },
    {
      name: "Player 7",
      image: { imageType: "Agent Portrait", agent: "Jett", dataUri: null },
      type: "Substitute"
    },
    {
      name: "Player 8",
      image: { imageType: "Agent Portrait", agent: "Sova", dataUri: null },
      type: "Coach"
    }
  ]
});

const mainCanvas: Ref<HTMLCanvasElement | null> = ref(null);

const draw = async () => {
  rendered.value = false;
  if (mainCanvas.value) {
    const ctx = mainCanvas.value.getContext("2d");
    if (ctx) {
      canvasHeight.value =
        {
          "Team composition": 470,
          "Team roster": 540
        }[graphicType.value] || 500;

      await nextTick();

      ctx.clearRect(0, 0, mainCanvas.value.width, mainCanvas.value.height);

      if (graphicType.value == "Team composition") {
        await renderTeamComp(teamCompData, ctx, mainCanvas.value);
      } else if (graphicType.value == "Team roster") {
        await renderTeamRoster(teamRosterData, ctx);
      }
    }
  }
  rendered.value = true;
};

const loadImgRoster = (i: number) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        teamRosterData.value.roster[i].image.dataUri = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
};

const copy = () => {
  if (mainCanvas.value) {
    mainCanvas.value.toBlob((blob) => {
      if (blob) {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]);
      }
    });
  }
};

const save = () => {
  if (mainCanvas.value) {
    mainCanvas.value.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "graphic.png";
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  }
};

watch(
  [graphicType, teamCompData, teamRosterData, mainCanvas],
  async () => {
    await nextTick();
    draw();
  },
  { deep: true, immediate: true }
);
</script>
