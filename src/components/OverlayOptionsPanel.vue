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
      <UIButtonLabel>Series - Branding</UIButtonLabel>
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
    </div>
    <div class="flex-v flex-qh p">
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
      <UISelect v-model="model.nameType" :items="[`Name`, `Name and tagline`]"></UISelect>
      <UIButtonLabel>Blue (starting defender) team name</UIButtonLabel>
      <div class="flex-h">
        <UIField v-model="model.blueTeamName"></UIField>
        <UIField v-model="model.blueTeamShortName"></UIField>
      </div>
      <UIButtonLabel>Red (starting attacker) team name</UIButtonLabel>
      <div class="flex-h">
        <UIField v-model="model.redTeamName"></UIField>
        <UIField v-model="model.redTeamShortName"></UIField>
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
      <UIButton @click="shownInformation.gameOverview.shown = !shownInformation.gameOverview.shown"
        >Show game overview</UIButton
      >
      <UISelect v-model="previewGameData.phase" prefix="Phase: " :items="[`buy`, `combat`]"></UISelect>
      <div class="flex-h">
        <UISelect
          v-model="previewOptions.triggerCeromonyWinTeam"
          prefix="Winning team: "
          :items="[`Attack`, `Defense`]"
        ></UISelect>
        <UISelect
          v-model="previewOptions.triggerCeromonyType"
          prefix="Ceromony: "
          :items="[`Round Win`, `Clutch`, `Flawless`, `Ace`, `Team Ace`, `Thrifty`]"
        ></UISelect>
        <UIButton @click="preview_TriggerCeromony()">Trigger ceromony</UIButton>
      </div>
      <UIButton @click="fullscreenPreview()">Fullscreen preview</UIButton>
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

const canvasElement: Ref<HTMLCanvasElement | null> = ref(null);
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

const previewGameData = ref<GameData>({
  round: 17,
  matchLog: [
    { cause: "elimination", roundNumber: 1, winner: "blue" },
    { cause: "elimination", roundNumber: 2, winner: "blue" },
    { cause: "elimination", roundNumber: 3, winner: "red" },
    { cause: "elimination", roundNumber: 4, winner: "red" },
    { cause: "elimination", roundNumber: 5, winner: "red" },
    { cause: "elimination", roundNumber: 6, winner: "red" },
    { cause: "elimination", roundNumber: 7, winner: "red" },
    { cause: "elimination", roundNumber: 8, winner: "red" },
    { cause: "defuse", roundNumber: 9, winner: "blue" },
    { cause: "elimination", roundNumber: 10, winner: "red" },
    { cause: "defuse", roundNumber: 11, winner: "blue" },
    { cause: "elimination", roundNumber: 12, winner: "red" },
    { cause: "elimination", roundNumber: 13, winner: "red" },
    { cause: "elimination", roundNumber: 14, winner: "blue" },
    { cause: "defuse", roundNumber: 15, winner: "red" },
    { cause: "elimination", roundNumber: 16, winner: "blue" }
  ],
  phase: "buy",
  redScore: 10,
  blueScore: 6,
  redPlayers: [
    { name: "SEN TwelveZ", tagline: "Pro", agent: "Fade", health: 100, loadout: { sidearm: { name: "Classic"}, firearm: { name: "Vandal" }, shield: 50}, credits: 4600, abilities: { Ability1: { maxUses: 1, remainingUses: 1 }, Ability2: { maxUses: 1, remainingUses: 1 }, Signature: { maxUses: 1, remainingUses: 1 }, Ultimate: { maxUses: 6, remainingUses: 4 }}, KDA: [23, 10, 14], alive: false},
    { name: "pingu", tagline: "w2e", agent: "Cypher", health: 100, loadout: { sidearm: { name: "Classic"}, firearm: { name: "Vandal" }, shield: 50}, credits: 4600, abilities: { Ability1: { maxUses: 1, remainingUses: 1 }, Ability2: { maxUses: 1, remainingUses: 1 }, Signature: { maxUses: 1, remainingUses: 1 }, Ultimate: { maxUses: 6, remainingUses: 3 }}, KDA: [23, 10, 14], alive: true},
    { name: "Penzツ", tagline: "mvmnt", agent: "Neon", health: 100, loadout: { sidearm: { name: "Classic"}, firearm: { name: "Vandal" }, shield: 50}, credits: 4600, abilities: { Ability1: { maxUses: 1, remainingUses: 1 }, Ability2: { maxUses: 1, remainingUses: 1 }, Signature: { maxUses: 1, remainingUses: 1 }, Ultimate: { maxUses: 6, remainingUses: 2 }}, KDA: [23, 10, 14], alive: true},
    { name: "Ducklord", tagline: "1276", agent: "Astra", health: 100, loadout: { sidearm: { name: "Classic"}, firearm: { name: "Vandal" }, shield: 50}, credits: 4600, abilities: { Ability1: { maxUses: 1, remainingUses: 1 }, Ability2: { maxUses: 1, remainingUses: 1 }, Signature: { maxUses: 1, remainingUses: 1 }, Ultimate: { maxUses: 6, remainingUses: 1 }}, KDA: [23, 10, 14], alive: true},
    { name: "infinityatom", tagline: "qwert", agent: "Reyna", health: 100, loadout: { sidearm: { name: "Classic"}, firearm: { name: "Vandal" }, shield: 50}, credits: 4600, abilities: { Ability1: { maxUses: 1, remainingUses: 1 }, Ability2: { maxUses: 1, remainingUses: 1 }, Signature: { maxUses: 1, remainingUses: 1 }, Ultimate: { maxUses: 6, remainingUses: 2 }}, KDA: [23, 10, 14], alive: true}
  ],
  bluePlayers: [
    { name: "SEN TwelveZ", tagline: "Pro", agent: "Fade", health: 100, loadout: { sidearm: { name: "Classic"}, firearm: { name: "Vandal" }, shield: 50}, credits: 4600, abilities: { Ability1: { maxUses: 1, remainingUses: 1 }, Ability2: { maxUses: 1, remainingUses: 1 }, Signature: { maxUses: 1, remainingUses: 1 }, Ultimate: { maxUses: 6, remainingUses: 5 }}, KDA: [23, 10, 14], alive: true},
    { name: "pingu", tagline: "w2e", agent: "Cypher", health: 100, loadout: { sidearm: { name: "Classic"}, firearm: { name: "Vandal" }, shield: 50}, credits: 4600, abilities: { Ability1: { maxUses: 1, remainingUses: 1 }, Ability2: { maxUses: 1, remainingUses: 1 }, Signature: { maxUses: 1, remainingUses: 1 }, Ultimate: { maxUses: 6, remainingUses: 6 }}, KDA: [23, 10, 14], alive: true},
    { name: "Penzツ", tagline: "mvmnt", agent: "Neon", health: 100, loadout: { sidearm: { name: "Classic"}, firearm: { name: "Vandal" }, shield: 50}, credits: 4600, abilities: { Ability1: { maxUses: 1, remainingUses: 1 }, Ability2: { maxUses: 1, remainingUses: 1 }, Signature: { maxUses: 1, remainingUses: 1 }, Ultimate: { maxUses: 9, remainingUses: 7 }}, KDA: [23, 10, 14], alive: true},
    { name: "Ducklord", tagline: "1276", agent: "Astra", health: 100, loadout: { sidearm: { name: "Classic"}, firearm: { name: "Vandal" }, shield: 50}, credits: 4600, abilities: { Ability1: { maxUses: 1, remainingUses: 1 }, Ability2: { maxUses: 1, remainingUses: 1 }, Signature: { maxUses: 1, remainingUses: 1 }, Ultimate: { maxUses: 6, remainingUses: 4 }}, KDA: [23, 10, 14], alive: false},
    { name: "infinityatom", tagline: "qwert", agent: "Reyna", health: 100, loadout: { sidearm: { name: "Classic"}, firearm: { name: "Vandal" }, shield: 50}, credits: 4600, abilities: { Ability1: { maxUses: 1, remainingUses: 1 }, Ability2: { maxUses: 1, remainingUses: 1 }, Signature: { maxUses: 1, remainingUses: 1 }, Ultimate: { maxUses: 6, remainingUses: 3 }}, KDA: [23, 10, 14], alive: false}
  ],
  redSide: "defense",
  blueSide: "attack"
});

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

const newSponsor = async () => {
  try {
    model.value.sponsors.sponsorImgs.push(await getImageDataURI());
  } catch {}
};
</script>
