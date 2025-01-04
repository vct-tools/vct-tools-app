<template>
  <div class="container">
    <header-container pageName="Overlay">
      <div class="content-body">
        <div class="content-body-content">
          <div class="panel-1">
            <header-small>Customize overlay</header-small>
            <div class="panel-content">
              <OverlayOptionsPanel v-model="overlayOptions"></OverlayOptionsPanel>
            </div>
          </div>
          <div class="panel-2">
            <header-small>Get overlay URL</header-small>
            <div class="panel-content">
              <div class="urlbar">
                <UIField v-model="overlayUrl"></UIField>
                <UIButton class="btn" disabled>Regenerate</UIButton>
                <UIButton class="btn">Copy</UIButton>
              </div>
            </div>
          </div>
        </div>
        <div class="sidebar-right">
          <header-small>Select Party</header-small>
          <div class="sidebar-right-wrapper">
            <UIButton :flush="true" tooltip="The login system is incomplete"
              >Login to Riot Games
            </UIButton>
            <div class="match-list">
              <MatchList :members="dummyData"></MatchList>
            </div>
          </div>
        </div>
      </div>
    </header-container>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  align-items: center;
}

.content-body {
  width: 90vw;
  font-size: 12pt;

  display: flex;
}

.content-body-content {
  flex: 1;

  display: flex;
  flex-direction: column;
}

.sidebar-right {
  width: 200px;
  display: flex;
  flex-direction: column;

  margin-left: 1em;
}

.sidebar-right-wrapper {
  border: 1px solid #6b7476;
  flex: 1;

  display: flex;
  flex-direction: column;
}

.match-list {
  flex: 1;
}

.panel-1 {
  flex: 1;

  display: flex;
  flex-direction: column;
}

.panel-2 {
  display: flex;
  flex-direction: column;

  margin-bottom: -1px;
}

.panel-content {
  flex: 1;
}

.urlbar {
  display: flex;
  gap: 1px;
}

.urlbar .btn {
  width: 35%;
}
</style>

<script setup lang="ts">
import HeaderContainer from "@/components/HeaderContainer.vue";
import HeaderSmall from "@/components/HeaderSmall.vue";
import UIButton from "@/components/UIElement/UIButton.vue";

import UIField from "@/components/UIElement/UIField.vue";

import { ref } from "vue";
import OverlayOptionsPanel from "@/components/OverlayOptionsPanel.vue";
import { createDefaultOverlaySettings } from "@/overlayType";
import MatchList from "@/components/MembersList.vue";

const overlayUrl = ref("https://vcttools.net/overlay_source");
const overlayOptions = ref(createDefaultOverlaySettings());

const dummyData = ref([
  {
    name: "Player 1",
    tagline: "0000"
  },
  {
    name: "Player 2",
    tagline: "0000"
  },
  {
    name: "Player 3",
    tagline: "0000"
  },
  {
    name: "Player 4",
    tagline: "0000"
  },
  {
    name: "Player 5",
    tagline: "0000"
  },
  {
    name: "Player 6",
    tagline: "0000"
  },
  {
    name: "Player 7",
    tagline: "0000"
  },
  {
    name: "Player 8",
    tagline: "0000"
  },
  {
    name: "Player 9",
    tagline: "0000"
  },
  {
    name: "Player 10",
    tagline: "0000"
  }
]);
</script>
