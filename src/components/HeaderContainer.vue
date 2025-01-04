<template>
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
  </div>
  <div class="body">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import HeaderBig from "@/components/HeaderBig.vue";

defineProps({
  pageName: String
});

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

  font-size: 12pt;

  display: flex;
}

.tabs-container .tab {
  padding: 5px 50px;
  cursor: pointer;
  border-bottom: 1px solid #6b7476;
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
</style>
