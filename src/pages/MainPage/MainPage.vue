<template>
  <video autoplay loop muted playsinline class="mainVideo">
    <source :src="HomeScreenVideo" type="video/webm">
  </video>

  <div class="leftbar">
    <div class="branding">
      <img :src="LargeLogo" draggable="false">
    </div>
    <div class="btn" @click="openUrl(`/map_picker`)">Map picker</div>
    <div class="btn" @click="openUrl(`/overlay_control`)">Overlay</div>
    <div class="btn" @click="openUrl(`/learn_maps`)">Learn Maps</div>
    <div class="btn" @click="openUrl(`/graphic_creator`)">Create Graphics</div>
  </div>

  <div class="rightbar">
    <div class="panel" style="flex: 1;">
      <div class="title">ABOUT VCT TOOLS</div>
      <div class="content" style="flex: 1;">
        Welcome to VCT Tools! We host apps that make tournaments easier for organizers, or players too!<br>
        <br>
        For tournament organizers: <a href="/map_picker">Map Picker</a> &bull; <a href="/overlay_control">Stream Overlays</a><br>
        For players: <a href="/learn_maps">Learn Maps</a> &bull; <a href="/graphic_creator">Create Graphics</a><br>
        <br>
        If you want to contact us, email contact@vcttools.net.
        <br><br>
        If you like what we do, consider donating through <a href="https://buymeacoffee.com/infinityatom">Buy me a Coffee</a>.
        <br><br>
        <div style="text-align: center;"><BIconExclamationTriangle></BIconExclamationTriangle></div>
        VCT Tools is in no way partnered or affiliated with the VALORANT Champions Tour.
      </div>
      <div class="content">
        <UIButtonIcon :icon="GithubMark" @click="openUrl(`https://github.com/infinity-atom/vct-tools`)">Source Code - Client</UIButtonIcon>
        <UIButtonIcon :icon="GithubMark" @click="openUrl(`https://github.com/infinity-atom/vct-tools-api`)">Source Code - API</UIButtonIcon>
      </div>
    </div>
    <div class="panel selectable" @click="openUrl(`/news`)">
      <div class="title">LATEST NEWS</div>
      <div class="content" v-if="latestNews[0]">
        <b>{{ latestNews[1] }}</b><br>
        {{ latestNews[2] }}
      </div>
      <div class="content" v-else>
        <UIThrobber></UIThrobber>
      </div>
    </div>
    <div class="panel">
      <div class="title">LEGAL</div>
      <div class="content">
        The background media on this page is owned by Riot Games.
        <br><br><a href="/privacy">Privacy Policy</a> &bull; <a href="/terms_of_service">Terms of Service</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainVideo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}

.rightbar {
  position: fixed;
  top: 0;
  right: 0;

  width: calc(400px + 20px);
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: end;

  padding: 20px;

  gap: 20px;
}

.leftbar {
  position: fixed;
  top: 0;
  left: 50px;

  width: 500px;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 20px;

  gap: 20px;
}

.panel {
  background-color: #54758142;
  border: 1px solid #6b7476;

  display: flex;
  flex-direction: column;
}

.panel .title {
  font-size: 16pt;

  padding: 10px;
  text-align: center;

  border-bottom: 1px solid #6b7476;
  background-color: #54758142;
}

.panel .content {
  padding: 10px;
}

.panel.selectable {
  cursor: pointer;
}

.panel.selectable:hover {
  background-color: #649cb142;
}

.btn {
  font-family: Tungsten, sans-serif;
  text-transform: uppercase;

  font-size: 4em;

  margin-left: 1em;
  position: relative;

  cursor: pointer;
  transition: 50ms ease-in-out;
}

.btn::after {
  content: "";

  position: absolute;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  left: -.5em;

  width: 10px;
  height: 10px;

  background-color: white;
  transition: 100ms ease-in-out;
}

.btn:hover {
  color: rgb(72, 239, 213);
  padding-left: 0.25em;
}

.btn:hover::after {
  transform: translateY(-50%) rotate(45deg) rotate(180deg);
  background-color: rgb(72, 239, 213);
}

.branding {
  width: 100%;
}

.branding img {
  width: 100%;
}
</style>

<script setup lang="ts">
import HomeScreenVideo from "@/assets/homescreen_10_02.webm";
import UIButtonIcon from "@/components/UIElement/UIButtonIcon.vue";
import UIThrobber from "@/components/UIElement/UIThrobber.vue";
import LargeLogo from "@/assets/images/logo-large.png";

import GithubMark from "@/assets/images/github-mark-white.png";

import { ref } from "vue";
import { BIconExclamationTriangle } from "bootstrap-icons-vue";

const latestNews = ref([false, "", ""]);

(async () => {
  const a = (await (await fetch("https://api.vcttools.net/v1/news/latest")).json()).data[0];
  latestNews.value = [
    true,
    a.title,
    a.preview
  ];
})();

const openUrl = (url: string) => {
  window.open(url, "_self");
}
</script>
