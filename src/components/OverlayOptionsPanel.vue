<template>
  <div class="main flex-h">
    <div class="flex-v flex-hh p">
      <UIButtonLabel>Round outcome banner</UIButtonLabel>
      <UISwitch v-model="model.roundOutcomeBanner.clutch">Clutch</UISwitch>
      <UISwitch v-model="model.roundOutcomeBanner.flawless">Flawless</UISwitch>
      <UISwitch v-model="model.roundOutcomeBanner.ace">Ace</UISwitch>
      <UISwitch v-model="model.roundOutcomeBanner.teamAce">Team Ace</UISwitch>
      <UISwitch v-model="model.roundOutcomeBanner.thrifty">Thrifty</UISwitch>
      <UIButtonLabel>Round outcome banner - Background</UIButtonLabel>
      <UISwitch v-model="model.roundOutcomeBanner.useBackground">Custom background</UISwitch>
      <UIButton @click="loadBackground()">Select background image (1000x250px)</UIButton>
      <UIButtonLabel>Game overview visible</UIButtonLabel>
      <UISwitch v-model="model.gameOverviewVisible.KDA">K/D/A</UISwitch>
      <UISwitch v-model="model.gameOverviewVisible.loadout">Loadout & credits</UISwitch>
      <UISwitch v-model="model.gameOverviewVisible.abilities">Abilities</UISwitch>
      <UISwitch v-model="model.gameOverviewVisible.shields">Shields</UISwitch>
      <UISwitch v-model="model.gameOverviewVisible.agentImages">Agent images</UISwitch>
      <UISwitch v-model="model.gameOverviewVisible.matchLog">Match log</UISwitch>
      <UIButtonLabel>Series - Branding</UIButtonLabel>
      <UISwitch v-model="showBranding">Show VCT Tools branding <UIProLabel></UIProLabel></UISwitch>
      <UISwitch v-model="model.series.showBrandingImg">Show branding</UISwitch>
      <UIButton @click="loadBranding()">Select branding image</UIButton>
      <UIButtonLabel>Series - Maps</UIButtonLabel>
      <div class="flex-h" v-for="(map, index) in model.series.maps" :key="index">
        <UIField v-model="model.series.maps[index]"></UIField>
        <UIButton style="width: 25%" @click="model.series.maps.splice(index, 1)">DEL</UIButton>
      </div>
      <UIButton @click="model.series.maps.push(`Map Name`)">Add map</UIButton>
      <UIButtonLabel>Series - Name</UIButtonLabel>
      <UIField v-model="model.series.seriesName"></UIField>
      <UIButtonLabel>Player overlay features</UIButtonLabel>
      <UISwitch v-model="model.playerOverlayFeatures.playerAbilities">Player abilities</UISwitch>
      <UISwitch v-model="model.playerOverlayFeatures.playerHealth">Player health</UISwitch>
      <UISwitch v-model="model.playerOverlayFeatures.agentImages">Agent images</UISwitch>
      <UISwitch v-model="model.playerOverlayFeatures.playerKDA">Player K/D/A</UISwitch>
      <UIButtonLabel>Other overlay features</UIButtonLabel>
      <UISwitch v-model="model.otherOverlayFeatures.gameOverviewDuringBuyPhase"
        >Game overview during buy phase</UISwitch
      >
      <UISwitch v-model="model.otherOverlayFeatures.roundOutcomeBanner"
        >Round outcome banner</UISwitch
      >
      <UIButtonLabel>Visible name</UIButtonLabel>
      <UISelect v-model="model.nameType as string" :items="[`Name`, `Name and tagline`]"></UISelect>
      <UIButtonLabel>Red (starting attacker) team name</UIButtonLabel>
      <div class="flex-h">
        <UIField v-model="model.redTeamName"></UIField>
        <UIField v-model="model.redTeamShortName"></UIField>
      </div>
      <UISwitch v-model="model.redTeamHideShortName"
        >Truncate "{{ model.redTeamShortName }}" from usernames</UISwitch
      >
      <UIButtonLabel>Blue (starting defender) team name</UIButtonLabel>
      <div class="flex-h">
        <UIField v-model="model.blueTeamName"></UIField>
        <UIField v-model="model.blueTeamShortName"></UIField>
      </div>
      <UISwitch v-model="model.blueTeamHideShortName"
        >Truncate "{{ model.blueTeamShortName }}" from usernames</UISwitch
      >
      <UIButtonLabel>Team logos</UIButtonLabel>
      <UISwitch v-model="model.showTeamLogos">Show team logos</UISwitch>
      <div class="flex-h">
        <div class="flex-hh">
          <UIButtonLabel>Red logo</UIButtonLabel>
          <div class="lc" v-if="model.redTeamLogo">
            <img :src="model.redTeamLogo" height="100" width="100" />
          </div>
          <UIButton @click="loadRedLogo()">Upload... (1:1)</UIButton>
        </div>
        <div class="flex-hh">
          <UIButtonLabel>Blue logo</UIButtonLabel>
          <div class="lc" v-if="model.blueTeamLogo">
            <img :src="model.blueTeamLogo" height="100" width="100" />
          </div>
          <UIButton @click="loadBlueLogo()">Upload... (1:1)</UIButton>
        </div>
      </div>
      <UIButtonLabel>Top-right corner sponsors</UIButtonLabel>
      <UISwitch v-model="model.sponsors.sponsorEnabled">Show sponsors</UISwitch>
      <div v-for="(img, index) in model.sponsors.sponsorImgs" :key="index">
        <div style="display: flex; justify-content: center">
          <img :src="img" style="max-height: 70px" />
        </div>
        <UIButton @click="model.sponsors.sponsorImgs.splice(index, 1)">DEL</UIButton>
      </div>
      <UIButton @click="newSponsor()">Add sponsor</UIButton>
      <UIButtonLabel>Accent color (any CSS color)</UIButtonLabel>
      <div class="flex-h">
        <UIField v-model="model.accentColor" style="margin-bottom: -1px"></UIField>
        <div :style="`width: 50%; background-color: ${model.accentColor}`"></div>
      </div>
    </div>
    <div class="flex-v p">
      <div style="position: sticky; top: 0px">
        <UIButtonLabel>Preview</UIButtonLabel>
        <canvas
          width="1920"
          height="1080"
          class="canvas"
          :style="`background-image: url(${HavenGameplay}); margin-bottom: 10px`"
          ref="canvasElement"
        ></canvas>
        <AdsenseMultiplexAd></AdsenseMultiplexAd>
      </div>
    </div>
    <div class="flex-v flex-hh p">
      <div style="position: sticky; top: 0px">
        <UIButtonLabel>Preview options</UIButtonLabel>
        <UISelect
          v-model="previewGameData.phase as string"
          prefix="Phase: "
          :items="[`buy`, `combat`]"
        ></UISelect>
        <UISwitch v-model="previewGameData.live.spikePlanted">Spike planted</UISwitch>

        <UIButtonLabel>Ceromony</UIButtonLabel>
        <UISelect
          v-model="previewOptions.triggerCeromonyWinTeam as string"
          prefix="Winning team: "
          :items="[`Attack`, `Defense`]"
        ></UISelect>
        <UISelect
          v-model="previewOptions.triggerCeromonyType as string"
          prefix="Ceromony: "
          :items="[`Round Win`, `Clutch`, `Flawless`, `Ace`, `Team Ace`, `Thrifty`]"
        ></UISelect>
        <UIButton @click="preview_TriggerCeromony()">Trigger ceromony</UIButton>
        <UIButtonLabel>Display</UIButtonLabel>
        <UIButton @click="fullscreenPreview()">Fullscreen preview</UIButton>
        <div
          style="
            width: 100%;
            text-align: center;
            margin-top: 5px;
            color: #f34453;
            border: 1px solid #6b7476;
            padding: 5px;
          "
        >
          <BIconExclamationTriangle></BIconExclamationTriangle><br />
          <span style="font-size: 9pt"
            >Offset edges may be visible in the preview due to downscaled resolution. For best
            results, use a 1080p monitor.</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex-h {
  display: flex;
  gap: 2px;
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

.lc {
  display: flex;
  justify-content: center;
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
import {
  createDefaultOverlaySettings,
  type GameData,
  type OverlaySettings
} from "@/renderOverlay/overlayType";

import HavenGameplay from "@/assets/images/haven_gameplay.png";

import { onMounted, ref, type Ref } from "vue";
import { renderLoop, shownInformation } from "@/renderOverlay/renderMain";
import { UIField, UISwitch, UISelect, UIButtonLabel, UIButton } from "vct-tools-components";
import { ceromonyFilter } from "@/renderOverlay/overlayPreParse";
import { demoGameData } from "@/renderOverlay/demoGameData";
import { BIconExclamationTriangle } from "bootstrap-icons-vue";
import AdsenseMultiplexAd from "./Adsense/AdsenseMultiplexAd.vue";
import UIProLabel from "./UIProLabel.vue";

const canvasElement: Ref<HTMLCanvasElement | null> = ref(null);
const showBranding = ref(true);
const previewOptions = ref({
  triggerCeromonyType: "Round Win",
  triggerCeromonyWinTeam: "Attack"
});

const fullscreenPreview = () => {
  canvasElement.value?.requestFullscreen();
};

const model: Ref<OverlaySettings> = defineModel({
  default: createDefaultOverlaySettings()
});

const previewGameData = ref<GameData>({ ...demoGameData });

onMounted(() => {
  if (canvasElement.value) {
    const ctx = canvasElement.value.getContext("2d");
    if (ctx) {
      renderLoop(previewGameData, model, ctx);
    }
  }
});

const preview_TriggerCeromony = () => {
  shownInformation.roundWin.trigger(
    ceromonyFilter(previewOptions.value.triggerCeromonyType, model.value),
    previewOptions.value.triggerCeromonyWinTeam == "Attack"
      ? model.value.redTeamName
      : model.value.blueTeamName,
    previewOptions.value.triggerCeromonyWinTeam,
    1
  );
};

const getImageDataURI = async () => {
  return new Promise<string>((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            if (typeof e.target.result === "string") {
              resolve(e.target.result);
            } else {
              reject("Invalid image file");
            }
          }
        };
        reader.readAsDataURL(file);
      } else {
        reject("No file selected");
      }
    };
    input.click();
  });
};

const loadBranding = async () => {
  try {
    model.value.series.brandingImg = await getImageDataURI();
  } catch {}
};

const loadBlueLogo = async () => {
  try {
    model.value.blueTeamLogo = await getImageDataURI();
  } catch {}
};

const loadRedLogo = async () => {
  try {
    model.value.redTeamLogo = await getImageDataURI();
  } catch {}
};

const loadBackground = async () => {
  try {
    model.value.roundOutcomeBanner.background = await getImageDataURI();
  } catch {}
};

const newSponsor = async () => {
  try {
    model.value.sponsors.sponsorImgs.push(await getImageDataURI());
  } catch {}
};
</script>
