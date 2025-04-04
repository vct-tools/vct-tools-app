<template>
  <div class="container">
    <header-container pageName="Map picker">
      <div class="map-pick-body">
        <div class="logs-container">
          <div class="logs">
            <div class="empty-state" v-if="mapHistory.length == 0">
              <b-icon-crosshair></b-icon-crosshair>
              NOTHING YET...
            </div>
            <MapHistoryView
              v-model="mapHistory"
              :finished="finished"
              :finalMap="finalMap"
              data-map-history-view=""
            >
            </MapHistoryView>
          </div>
        </div>
        <div class="options">
          <div class="options-container">
            <div class="panel pool" v-if="!selectedMaps">
              <header-small>Map pool selection</header-small>
              Select 7 maps to be used in the map pool.
              <map-pool-selector v-model="mapPool"></map-pool-selector>
              <div style="display: flex; justify-content: center; margin-top: 1em">
                <UILargeButton
                  :disabled="mapPool.length != 7"
                  @click="selectedMaps = true"
                  disabled-label="Select 7 maps"
                  >Save maps</UILargeButton
                >
              </div>
            </div>
            <div class="panel game" v-if="selectedMaps && !finished">
              <header-small>
                <span :class="currentTeam == 1 ? `atk` : `def`">Team {{ currentTeam }}&nbsp;</span>
                <span v-if="currentStage == stage.SELECT_ORDER">Selects which team bans first</span>
                <span v-if="currentStage == stage.BAN">Bans one map from the pool</span>
                <span v-if="currentStage == stage.PICK">Picks one map from the pool</span>
                <span v-if="currentStage == stage.SIDE"
                  >Picks a side to play on {{ finalMap }}</span
                >
              </header-small>
              <UISelect
                :items="mapPool"
                prefix="Map: "
                v-model="selectedMap as string"
                v-if="currentStage == stage.BAN || currentStage == stage.PICK"
              ></UISelect>
              <UISelect
                :items="[`Attack`, `Defense`]"
                prefix="Side: "
                v-model="selectedSide as string"
                v-if="currentStage == stage.SIDE"
              ></UISelect>
              <UISelect
                :items="[`Team 1`, `Team 2`]"
                prefix="Team: "
                v-model="selectedTeam as string"
                v-if="currentStage == stage.SELECT_ORDER"
              ></UISelect>
              <div style="display: flex; justify-content: center; margin-top: 1em">
                <UILargeButton
                  :disabled="!(selectedMap != null || selectedSide != null || selectedTeam != null)"
                  @click="handleClick()"
                  disabled-label="Select a choice"
                  >Continue</UILargeButton
                >
              </div>
            </div>
            <div class="panel" v-if="finished">
              <header-small>Map picking finished</header-small>
              <div
                class="final-splash"
                :style="`background-image: url(${maps.find((a) => a.name == finalMap)?.image});`"
                data-map-splash-view=""
              >
                <div class="text">
                  <span :class="mapHistory[mapHistory.length - 1].team == 1 ? `atk` : `def`"
                    >TEAM {{ mapHistory[mapHistory.length - 1].team }}</span
                  >
                  will play ATTACK on {{ finalMap?.toUpperCase() }}.
                </div>
              </div>
              <UIButton @click="copyMapLog()">Copy map log</UIButton>
            </div>
            <div class="panel" v-if="externalWindow == null">
              <header-small>Viewing window</header-small>
              Create a floating window to add as a source in your recording software.
              <UIButton @click="createWindow()">Create window</UIButton>
            </div>
            <div class="panel">
              <AdsenseSidebarAd></AdsenseSidebarAd>
            </div>
          </div>
        </div>
      </div>
    </header-container>
  </div>
  <div id="bottomScroll"></div>
</template>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  align-items: center;
}

.map-pick-body {
  width: 70vw;

  display: flex;
}

.logs-container {
  width: 40%;
  margin-right: 2em;
}

.logs {
  width: 100%;

  border: 1px solid #6b7476;

  padding: 5px;

  display: flex;
  flex-direction: column;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;

  font-size: 16pt;
}

.options-container {
  position: sticky;
  top: 1em;

  width: 100%;

  flex: 1;
  margin-left: 1em;

  display: flex;
  flex-direction: column;
  gap: 1px;
}

.options {
  width: 60%;
}

.options .panel {
  padding: 1em;
  background-color: #54758142;
}

.final-splash {
  width: 100%;
  aspect-ratio: 200/113;

  background-position: center;
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;
}

.final-splash .text {
  background-color: #01171f;
  padding: 5px;

  opacity: 0.9;

  font-size: 20pt;
}
</style>

<script setup lang="ts">
import HeaderContainer from "@/components/HeaderContainer.vue";
import HeaderSmall from "@/components/HeaderSmall.vue";
import MapPoolSelector from "@/components/MapPoolSelector.vue";
import { UIButton, UILargeButton, UISelect, maps, sides } from "vct-tools-components";
import { BIconCrosshair } from "bootstrap-icons-vue";

import { ref, type Ref } from "vue";
import MapHistoryView from "@/components/MapHistoryView.vue";
import html2canvas from "html2canvas";
import AdsenseSidebarAd from "@/components/Adsense/AdsenseSidebarAd.vue";

const externalWindow: Ref<WindowProxy | null> = ref(null);

enum stage {
  SELECT_ORDER,
  BAN,
  PICK,
  SIDE
}

const mapHistory: Ref<
  {
    type: "pick" | "ban" | "side";
    team: number;
    map?: string | null;
    side?: sides | null;
  }[]
> = ref([]);

const currentTeam = ref(Math.floor(Math.random() * 2) + 1);
const currentStage: Ref<stage> = ref(stage.SELECT_ORDER);

const copyMapLog = () => {
  html2canvas(document.querySelector("[data-map-history-view]") as HTMLElement).then((canvas) => {
    html2canvas(document.querySelector("[data-map-splash-view]") as HTMLElement).then((canvas2) => {
      const averageHeight = (canvas.height + canvas2.height) / 2;

      const aspectRatio1 = canvas.width / canvas.height;
      const aspectRatio2 = canvas2.width / canvas2.height;

      const newWidth1 = averageHeight * aspectRatio1;
      const newWidth2 = averageHeight * aspectRatio2;

      const resizedCanvas1 = document.createElement("canvas");
      resizedCanvas1.width = newWidth1;
      resizedCanvas1.height = averageHeight;
      const ctx1 = resizedCanvas1.getContext("2d");
      ctx1?.drawImage(canvas, 0, 0, newWidth1, averageHeight);

      const resizedCanvas2 = document.createElement("canvas");
      resizedCanvas2.width = newWidth2;
      resizedCanvas2.height = averageHeight;
      const ctx2 = resizedCanvas2.getContext("2d");
      ctx2?.drawImage(canvas2, 0, 0, newWidth2, averageHeight);

      const canvas3 = document.createElement("canvas");
      canvas3.width = newWidth1 + newWidth2;
      canvas3.height = averageHeight;

      const ctx3 = canvas3.getContext("2d");
      ctx3?.drawImage(resizedCanvas1, 0, 0);
      ctx3?.drawImage(resizedCanvas2, newWidth1, 0);

      // watermark
      if (ctx3) {
        ctx3.font = "16pt Din Next";
      }
      if (ctx3) {
        ctx3.fillStyle = "rgba(0, 0, 0, 0.5)";
      }
      ctx3?.fillText("vcttools.infinity-atom.org", 150, 30);

      canvas3.toBlob((blob) => {
        if (blob) {
          const item = new ClipboardItem({ "image/png": blob });
          navigator.clipboard.write([item]);
        }
      });
    });
  });
};

const mapPool = ref(["Ascent", "Bind", "Breeze", "Haven", "Icebox", "Split", "Fracture"]);

const selectedMaps = ref(false);
const selectedMap: Ref<string | null> = ref(null);
const lastSelectedMap: Ref<string> = ref("Not a map!!!");
const selectedSide: Ref<string | null> = ref(null);
const selectedTeam: Ref<string | null> = ref(null);
const times = ref(0);
const cycles = ref(0);
const finished = ref(false);
const finalMap: Ref<string | undefined> = ref(undefined);

const handleClick = () => {
  if (currentStage.value == stage.SELECT_ORDER) {
    if (
      (selectedTeam.value == "Team 1" && currentTeam.value == 2) ||
      (selectedTeam.value == "Team 2" && currentTeam.value == 1)
    ) {
      currentTeam.value = currentTeam.value == 1 ? 2 : 1;
    }

    selectedTeam.value = null;

    currentStage.value = stage.BAN;
  } else if (currentStage.value == stage.BAN) {
    mapPool.value = mapPool.value.filter((a) => a != selectedMap.value);
    mapHistory.value.push({
      type: "ban",
      team: currentTeam.value,
      map: selectedMap.value
    });
    selectedMap.value = null;
    times.value++;
    cycles.value++;

    if (times.value == 2) {
      times.value = 0;
      currentStage.value = stage.PICK;
      if (cycles.value == 4) {
        selectedMap.value = mapPool.value[0];
        finalMap.value = mapPool.value[0];
        currentStage.value = stage.SIDE;
      }
    }

    currentTeam.value = currentTeam.value == 1 ? 2 : 1;
  } else if (currentStage.value == stage.PICK) {
    mapPool.value = mapPool.value.filter((a) => a != selectedMap.value);
    mapHistory.value.push({
      type: "pick",
      team: currentTeam.value,
      map: selectedMap.value
    });
    currentStage.value = stage.SIDE;
    lastSelectedMap.value = selectedMap.value || "";
    selectedMap.value = null;

    currentTeam.value = currentTeam.value == 1 ? 2 : 1;
  } else if (currentStage.value == stage.SIDE) {
    mapHistory.value.push({
      type: "side",
      team: currentTeam.value,
      side: selectedSide.value == "Attack" ? sides.ATTACK : sides.DEFENSE
    });
    times.value++;
    currentStage.value = stage.PICK;
    selectedMap.value = null;
    selectedSide.value = null;

    if (cycles.value == 4) {
      finished.value = true;
    }

    if (times.value == 2) {
      times.value = 0;
      currentStage.value = stage.BAN;
    }
  }

  if (externalWindow.value) {
    externalWindow.value.postMessage({
      mapHistory: JSON.parse(JSON.stringify(mapHistory.value)),
      finished: finished.value,
      finalMap: finalMap.value
    });
  }

  const a = document.createElement("a");
  a.href = "#bottomScroll";
  a.click();
};

const createWindow = () => {
  externalWindow.value = window.open("/map_picker_slave", "Map picker", "width=400,height=800");
};
</script>
