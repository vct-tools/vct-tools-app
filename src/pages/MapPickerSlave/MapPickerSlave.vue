<template>
  <div class="logs">
    <div class="empty-state" v-if="mapHistory.length == 0">
      <b-icon-crosshair></b-icon-crosshair>
      <span>NO MAPS SELECTED</span>
      <span>PLEASE WAIT...</span>
    </div>
    <MapHistoryView
      v-model="mapHistory"
      :finished="finished"
      :finalMap="finalMap"
      data-map-history-view=""
    >
    </MapHistoryView>
  </div>
  <div class="watermark-container">
    <span class="watermark">vcttools.net</span>
  </div>
  <div id="bottomScroll"></div>
</template>

<style scoped>
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

.watermark-container {
  width: 100%;
  display: flex;
  justify-content: center;

  margin-top: 1em;
}

.watermark {
  color: rgba(255, 255, 255, 0.1);
}
</style>

<script setup lang="ts">
declare global {
  interface Window {
    mapHistoryData: {
      mapHistory: {
        type: "pick" | "ban" | "side";
        team: number;
        map?: string | null;
        side?: sides | null;
      }[];
      finished: boolean;
      finalMap: string | undefined;
    };
  }
}

import { BIconCrosshair } from "bootstrap-icons-vue";

import { ref, type Ref } from "vue";
import { sides } from "@/maps.ts";
import MapHistoryView from "@/components/MapHistoryView.vue";

const mapHistory: Ref<
  {
    type: "pick" | "ban" | "side";
    team: number;
    map?: string | null;
    side?: sides | null;
  }[]
> = ref([]);

const finished = ref(false);
const finalMap: Ref<string | undefined> = ref(undefined);

window.addEventListener("message", (event) => {
  mapHistory.value = event.data.mapHistory;
  finished.value = event.data.finished;
  finalMap.value = event.data.finalMap;

  const a = document.createElement("a");
  a.href = "#bottomScroll";
  a.click();
});
</script>
