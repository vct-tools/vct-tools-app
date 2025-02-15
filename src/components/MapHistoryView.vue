<template>
  <div class="container-log">
    <div v-for="(action, i) in model" :key="i">
      <div class="entry" v-if="action.type == `ban`">
        <div
          class="banner"
          :style="`background-image: url(${maps.find((a) => a.name == action.map)?.image});`"
        >
          <div class="text">
            {{ action.map?.toUpperCase() }} selected by
            <span :class="action.team == 1 ? `atk` : `def`"> TEAM {{ action.team }}</span>
          </div>
        </div>
        <div class="info bg-ban">
          <span>MAP BANNED FROM PLAY</span>
          <b-icon-dash-circle></b-icon-dash-circle>
        </div>
      </div>

      <div class="entry" v-if="action.type == `pick`">
        <div
          class="banner"
          :style="`background-image: url(${maps.find((a) => a.name == action.map)?.image});`"
        >
          <div class="text">
            {{ action.map?.toUpperCase() }} selected by
            <span :class="action.team == 1 ? `atk` : `def`"> TEAM {{ action.team }}</span>
          </div>
        </div>
        <div class="info bg-pick">
          <span>MAP PICKED</span>
          <b-icon-check-circle></b-icon-check-circle>
        </div>
      </div>

      <div class="entry" v-if="action.type == `side`">
        <div
          class="banner"
          :style="`background-image: url(${maps.find((a) => a.name == $props.finalMap)?.image});`"
          v-if="finished && i == (model?.length || 0) - 1"
        >
          <div class="text">Deciding map is {{ $props.finalMap?.toUpperCase() }}</div>
        </div>
        <div class="info bg-pick">
          <span
            >TEAM {{ action.team }} PICKED
            {{ action.side == sides.DEFENSE ? "DEFENSE" : "ATTACK" }}</span
          >
          <b-icon-check-circle></b-icon-check-circle>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-log {
  display: flex;
  flex-direction: column;
}

.banner {
  width: 100%;
  aspect-ratio: 400/113;
  background-size: cover;
  background-position: center;

  position: relative;
}

.banner > .text {
  position: absolute;
  bottom: 5px;
  left: 5px;

  background-color: #01171f;
  padding: 5px;

  opacity: 0.9;
}

.info {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px;
}

.bg-ban {
  background-color: #f34453;
}

.bg-pick {
  background-color: #01171f;
}
</style>

<script setup lang="ts">
import { BIconDashCircle, BIconCheckCircle } from "bootstrap-icons-vue";
import { maps, sides } from "vct-tools-components";
import { type Ref } from "vue";

defineProps({
  finished: Boolean,
  finalMap: String
});

const model: Ref<
  | {
      type: "pick" | "ban" | "side";
      team: number;
      map?: string | null;
      side?: sides | null;
    }[]
  | undefined
> = defineModel();
</script>
