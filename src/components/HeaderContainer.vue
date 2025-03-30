<template>
  <div class="top-nav">
    <div class="top-nav-buttons" style="justify-content: start;">
      <div class="btn" @click="openLink(`/`)" v-if="!controlPage">
        <BIconXCircleFill></BIconXCircleFill>
      </div>
    </div>
    <div class="top-nav-header">
      <img :src="LogoImage" class="top-nav-header-logo" draggable="false" :style="controlPage ? `margin-right: 0;` : ``" />
      <span v-if="!controlPage">//</span>
      <span class="top-nav-header-pagename" v-if="!controlPage">{{ $props.pageName }}</span>
    </div>
    <div class="top-nav-buttons" style="justify-content: end;">
      <div :class="`btn-label ${accountInformation.loggedIn ? `show` : ``}`" v-if="!controlPage">{{ accountInformation.gameName }}#{{ accountInformation.tagLine }}</div>
      <div class="btn" @click="openLink(`/account`)" v-if="!controlPage">
        <BIconPersonFill></BIconPersonFill>
      </div>
      <div class="btn" @click="openLink(`/news`)" v-if="!controlPage">
        <BIconNewspaper></BIconNewspaper>
      </div>
    </div>
  </div>

  <div class="version">Client version: vue{{ version }} vcttools{{ npmV }}</div>

  <SmallResWarning v-if="$props.includeSmallResCode"></SmallResWarning>
  <div class="tabs-container" v-if="$props.showTabs">
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
    <!-- <div :class="`tab ${$props.pageName == 'Brackets' ? 'selected' : ''}`" @click="openLink(`/brackets`)">
      BRACKETS
    </div> -->
  </div>
  <div class="body">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { version } from "vue";
import { version as npmV } from "../../package.json";
import SmallResWarning from "./SmallResWarning.vue";
import LogoImage from "@/assets/images/logo-large.png";
import { BIconNewspaper, BIconPersonFill, BIconXCircleFill } from "bootstrap-icons-vue";
import { ref } from "vue";

declare global {
  interface Window {
    google_ad_modifications: unknown;
  }
}

defineProps({
  pageName: String,
  showTabs: {
    type: Boolean,
    default: true
  },
  controlPage: {
    type: Boolean,
    default: false
  },
  includeSmallResCode: {
    type: Boolean,
    default: true
  }
});

const openLink = (link: string) => {
  window.location.href = link;
};

const accountInformation = ref({
  loaded: false,
  loggedIn: false,
  gameName: null,
  tagLine: null
});

(async () => {
  const b = await fetch(import.meta.env.DEV ? "http://localhost/v1/account/account_info" : "https://api.vcttools.net/v1/account/account_info", { credentials: "include" });
  if (b.ok) {
    const data = (await b.json()).data;
    accountInformation.value = {
      loaded: true,
      loggedIn: true,
      gameName: data.riotGameName,
      tagLine: data.riotTagLine
    };
  } else {
    accountInformation.value = {
      loaded: true,
      loggedIn: false,
      gameName: null,
      tagLine: null
    };
  }
})();
</script>

<style scoped>
.btn-label {
  opacity: 0;
  color: #ffffff00;
  transform: translateY(10px);
  transition: ease-out 0.3s;
}

.btn-label.show {
  color: #ffffff;
  transform: translateY(0px);
  opacity: 1;
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

.top-nav {
  width: 100%;
  padding: 1em;
  border-bottom: 1px solid #6b747642;
  background-color: #54758142;
  display: flex;

  margin-bottom: 2em;
}

.top-nav-header {
  font-size: 26pt;
  color: rgba(255, 255, 255, 0.2);
  text-transform: uppercase;
  font-family: "Tungsten", sans-serif;
}

.top-nav-header-logo {
  display: inline;
  height: 1em;
  vertical-align: bottom;
  margin-right: 15px;
}

.top-nav-header-pagename {
  color: #e0ebb9;
  margin-left: 15px;
}

.top-nav-buttons {
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  gap: 20px;
  flex: 1;
}

.top-nav .btn {
  cursor: pointer;
  font-size: 20pt;
  width: 1em;
  height: 1em;
}

.top-nav .btn:hover {
  color: #04ca8f;
}
</style>
