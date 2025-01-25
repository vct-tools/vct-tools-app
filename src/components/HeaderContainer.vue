<template>
  <DialogBox header="Account" v-model="accountDialog">
    <UIButtonLabel style="color: rgb(255, 70, 70)">YOU ARE NOT LOGGED IN</UIButtonLabel>
    <UIButtonIcon :icon="RiotGames" :disabled="true">Log in with Riot Games</UIButtonIcon>
  </DialogBox>

  <div class="version">Client version: {{ version }} {{ npmV }}</div>

  <div class="no-mobile-support" v-if="isMobile">
    <div class="content">
      <div class="title">
        <HeaderBig>VCT Tools</HeaderBig>
      </div>
      <div class="info">
        Sorry, this website is unable to be used on mobile devices, or any device with a small
        screen resolution.
      </div>
      <div class="info">
        <br />
        <a href="/stat_com">Open Stat-Com</a>
      </div>
    </div>
  </div>

  <div class="header-container">
    <header-big>VCT Tools // {{ $props.pageName }}</header-big>
  </div>
  <div class="tabs-container">
    <div :class="`tab ${$props.pageName == 'About' ? 'selected' : ''}`" @click="openLink(`/`)">
      ABOUT
    </div>
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
import DialogBox from "@/components/DialogBox.vue";
import { ref, computed } from "vue";
import UIButtonLabel from "./UIElement/UIButtonLabel.vue";
import UIButtonIcon from "./UIElement/UIButtonIcon.vue";
import RiotGames from "@/assets/images/riot_games.png";

import { version } from "vue";
import { version as npmV } from "../../package.json";

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

const isMobile = computed(() => {
  return window.innerWidth < window.innerHeight;
});

if (isMobile.value) {
  document.body.style.overflow = "hidden !important";
}
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: center;

  padding-top: 1em;
}

.tabs-container {
  color: #6b7476;

  font-size: 12pt;

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

  top: 24px;
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

.no-mobile-support {
  background: radial-gradient(circle, rgba(33, 52, 66, 1) 5%, rgba(28, 66, 73, 1) 100%);
  width: 100vw;
  height: 100vh;

  z-index: 1000 !important;
  position: fixed;
  top: 0;
  left: 0;

  padding: 1em;

  display: flex;
  justify-content: center;
  align-items: center;
}

.no-mobile-support .title {
  display: flex;
  justify-content: center;
  width: 100%;
}

.no-mobile-support .info {
  color: white;
  font-size: 14pt;
  text-align: center;
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
