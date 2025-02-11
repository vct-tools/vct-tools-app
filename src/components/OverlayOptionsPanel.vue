<template>
  <div class="main flex-h">
    <div class="flex-v flex-qh p">
      <UIButtonLabel>Round outcome banner</UIButtonLabel>
      <UISwitch v-model="model.roundOutcomeBanner.clutch">Clutch</UISwitch>
      <UISwitch v-model="model.roundOutcomeBanner.flawless">Flawless</UISwitch>
      <UISwitch v-model="model.roundOutcomeBanner.ace">Ace</UISwitch>
      <UISwitch v-model="model.roundOutcomeBanner.teamAce">Team Ace</UISwitch>
      <UISwitch v-model="model.roundOutcomeBanner.thrifty">Thrifty</UISwitch>
      <UIButtonLabel>Game overview visible</UIButtonLabel>
      <UISwitch v-model="model.gameOverviewVisible.KDA">K/D/A</UISwitch>
      <UISwitch v-model="model.gameOverviewVisible.loadout">Loadout & credits</UISwitch>
      <UISwitch v-model="model.gameOverviewVisible.abilities">Abilities</UISwitch>
      <UISwitch v-model="model.gameOverviewVisible.shields">Shields</UISwitch>
      <UISwitch v-model="model.gameOverviewVisible.agentImages">Agent images</UISwitch>
      <UISwitch v-model="model.gameOverviewVisible.matchLog">Match log</UISwitch>
    </div>
    <div class="flex-v flex-qh p">
      <UIButtonLabel>Player overlay features</UIButtonLabel>
      <UISwitch v-model="model.playerOverlayFeatures.playerAbilities">Player abilities</UISwitch>
      <UISwitch v-model="model.playerOverlayFeatures.playerHealth">Player health</UISwitch>
      <UISwitch v-model="model.playerOverlayFeatures.playerCredits">Player credits</UISwitch>
      <UISwitch v-model="model.playerOverlayFeatures.agentImages">Agent images</UISwitch>
      <UISwitch v-model="model.playerOverlayFeatures.playerLoadout">Player loadout</UISwitch>
      <UISwitch v-model="model.playerOverlayFeatures.playerKDA">Player K/D/A</UISwitch>
      <UIButtonLabel>Other overlay features</UIButtonLabel>
      <UISwitch v-model="model.otherOverlayFeatures.gameOverviewDuringBuyPhase"
        >Game overview during buy phase</UISwitch
      >
      <UISwitch v-model="model.otherOverlayFeatures.roundOutcomeBanner"
        >Round outcome banner</UISwitch
      >
      <UIButtonLabel>Visible name</UIButtonLabel>
      <UISelect v-model="model.nameType" :items="[`Name`, `Name and tagline`]"></UISelect>
      <UIButtonLabel>Defending team name</UIButtonLabel>
      <UIField v-model="model.defenderTeamName"></UIField>
      <UIButtonLabel>Attacking team name</UIButtonLabel>
      <UIField v-model="model.attackerTeamName"></UIField>
    </div>
    <div class="flex-v flex-hh p">
      <UIButtonLabel>Preview</UIButtonLabel>
      <canvas
        width="1920"
        height="1080"
        class="canvas"
        :style="`background-image: url(${HavenGameplay})`"
        ref="canvasElement"
      ></canvas>
      <div class="flex-l"></div>
      <UIButtonLabel>Preview options</UIButtonLabel>
      <UIButton @click="fullscreenPreview()">Fullscreen preview</UIButton>
    </div>
  </div>
</template>

<style scoped>
.flex-h {
  display: flex;
}

.flex-v {
  display: flex;
  flex-direction: column;
}

.flex-l {
  flex: 1;
}

.flex-qv {
  height: 25%;
}

.flex-qh {
  width: 25%;
}

.flex-hh {
  width: 50%;
}

.p {
  padding: 7px;
}

.canvas {
  width: 100%;
  aspect-ratio: 16/9;

  background-position: center;
  background-size: contain;
}
</style>

<style scoped>
.main {
  background-color: #54758142;
  width: 100%;
  height: 100%;
}
</style>

<script setup lang="ts">
import { createDefaultOverlaySettings, type OverlaySettings } from "@/overlayType";
import UIButton from "./UIElement/UIButton.vue";
import UIButtonLabel from "./UIElement/UIButtonLabel.vue";
import UISelect from "./UIElement/UISelect.vue";
import UISwitch from "./UIElement/UISwitch.vue";

import HavenGameplay from "@/assets/images/haven_gameplay.png";

import { onMounted, ref, type Ref } from "vue";
import { renderLoop } from "@/renderOverlay";
import UIField from "./UIElement/UIField.vue";

const canvasElement: Ref<HTMLCanvasElement | null> = ref(null);

const fullscreenPreview = () => {
  canvasElement.value?.requestFullscreen();
};

const model: Ref<OverlaySettings> = defineModel({
  default: createDefaultOverlaySettings()
});

onMounted(() => {
  if (canvasElement.value) {
    const ctx = canvasElement.value.getContext("2d");
    if (ctx) {
      renderLoop(null, model, ctx);
    }
  }
})

</script>
