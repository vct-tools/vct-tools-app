<template>
  <div class="container">
    <header-container pageName="Overlay">
      <div class="content-body">
        <div class="content-body-content">
          <div class="panel-1">
            <div class="panel-content">
              <OverlayOptionsPanel v-model="overlayOptions"></OverlayOptionsPanel>
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

import { ref } from "vue";
import OverlayOptionsPanel from "@/components/OverlayOptionsPanel.vue";
import { createDefaultOverlaySettings } from "@/renderOverlay/overlayType";

const overlayOptions = ref(createDefaultOverlaySettings());
</script>
