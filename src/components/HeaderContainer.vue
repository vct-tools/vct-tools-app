<template>
  <UIDialogBox header="Account" v-model="accountDialog">
    <UIButtonLabel style="color: rgb(255, 70, 70)">YOU ARE NOT LOGGED IN</UIButtonLabel>
    <UIButtonIcon :icon="RiotGames" :disabled="true">Log in with Riot Games</UIButtonIcon>
  </UIDialogBox>

  <UIDialogBox header="Status Update">
    <div style="text-align: center;">
      Server maintenance is being performed.
      Services affected: Email, API.
    </div>
  </UIDialogBox>

  <div class="version">Client version: vue{{ version }} vcttools{{ npmV }}</div>

  <SmallResWarning></SmallResWarning>

  <div class="header-container">
    <header-big>VCT Tools // {{ $props.pageName }}</header-big>
  </div>
  <div class="tabs-container">
    <div :class="`tab`" @click="openLink(`/`)">MAIN MENU</div>
    <div
      :class="`tab ${$props.pageName == 'Map picker' ? 'selected' : ''}`"
      @click="openLink(`/map_picker`)"
    >
      MAP PICKER
    </div>
    <div
      :class="`tab ${$props.pageName == 'Overlay' ? 'selected' : ''}`"
      @click="openLink(`/overlay_control`)"
    >
      OVERLAY
    </div>
    <div
      :class="`tab ${$props.pageName == 'Learn maps' ? 'selected' : ''}`"
      @click="openLink(`/learn_maps`)"
    >
      LEARN MAPS
    </div>
    <div
      :class="`tab ${$props.pageName == 'Create graphics' ? 'selected' : ''}`"
      @click="openLink(`/graphic_creator`)"
    >
      CREATE GRAPHICS
    </div>
    <div :class="`tab ${$props.pageName == 'News' ? 'selected' : ''}`" @click="openLink(`/news`)">
      NEWS
    </div>
    <!-- <div
      :class="`tab`"
      @click="accountDialog = true"
    >
      MY ACCOUNT
    </div> -->
  </div>
  <div class="body">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import HeaderBig from "@/components/HeaderBig.vue";
import { ref } from "vue";
import { UIButtonLabel, UIButtonIcon, UIDialogBox } from "vct-tools-components";
import RiotGames from "@/assets/images/riot_games.png";

import { version } from "vue";
import { version as npmV } from "../../package.json";
import SmallResWarning from "./SmallResWarning.vue";

declare global {
  interface Window {
    google_ad_modifications: unknown;
  }
}

defineProps({
  pageName: String
});

const accountDialog = ref(false);

const openLink = (link: string) => {
  window.location.href = link;
};
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: center;

  padding-top: 1em;
}

.tabs-container {
  color: #6b7476;

  font-size: 10pt;

  display: flex;
}

.tabs-container .tab {
  padding: 5px 50px;
  cursor: pointer;
  border-bottom: 1px solid #6b7476;
}

.tabs-container .tab.small {
  padding: 5px 20px;
}

.tabs-container .tab.selected {
  border-bottom: 4px solid #04ca8f;
  position: relative;
  color: #04ca8f;
}

.tabs-container .tab.selected::after {
  content: "";
  background: url(@/assets/images/tab_selected.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  width: 20px;
  height: 20px;

  position: absolute;

  top: 21px;
  left: 50%;
  transform: translateX(-50%);
}

.body {
  margin-top: 3em;
  font-size: 12pt;

  width: 100vw;
  padding: 0px 3em;
  padding-bottom: 2em;

  flex: 1;

  display: flex;
  justify-content: center;
}

.account-info {
  position: absolute;
  top: 10px;
  right: 10px;
}

.version {
  position: fixed;
  bottom: 5px;
  right: 10px;

  font-size: 9pt;
  color: rgba(201, 201, 201, 0.534);
}
</style>
