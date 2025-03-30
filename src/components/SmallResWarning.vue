<template>
  <div :class="`no-mobile-support ${isMobile ? 'visible' : ''}`">
    <HeaderContainer :show-tabs="false" :include-small-res-code="false" :control-page="true">
      <div class="no-mobile-support-content">
        <div class="big-text" style="margin-bottom: 30px;">
          Please visit <span style="color: #04ca8f;">VCTTools.net</span> on your desktop or tablet.
        </div>
        <div style="width: 100%; display: flex; justify-content: center;">
          <UILargeButton :disabled="!canShare" disabled-label="Device cannot share links" @click="share">Share link</UILargeButton>
        </div>
        <div style="margin-top: 30px;">VCT Tools is optimized for larger screens.</div>
      </div>
    </HeaderContainer>
  </div>
</template>

<style scoped>
.no-mobile-support {
  display: none;
}

body:has(.no-mobile-support.visible) {
  overflow: hidden !important;
}

.no-mobile-support.visible {
  display: block;

  background: radial-gradient(circle, rgba(33, 52, 66, 1) 5%, rgba(28, 66, 73, 1) 100%);
  width: 100vw;
  height: 100vh;

  z-index: 100000000000000000000 !important;
  position: fixed;
  top: 0;
  left: 0;
}

.no-mobile-support-content {
  width: 100%;
  text-align: center;

  margin-top: 10vh;
}

.big-text {
  font-size: 18pt;
  color: white;
}
</style>

<script setup lang="ts">
import { computed, type Ref, ref } from "vue";
import HeaderContainer from "./HeaderContainer.vue";
import { UILargeButton } from "vct-tools-components";

const isMobile = computed(() => {
  return window.innerWidth < window.innerHeight;
});

const canShare: Ref<boolean> = ref(false);
try {
  if (navigator.canShare()) canShare.value = true;
} catch {}

const share = () => {
  if (navigator.share) {
    navigator.share({
      title: "VCT Tools",
      text: "Map picking, overlays and more for your VALORANT tournament",
      url: "https://vcttools.net",
    });
  }
};
</script>
