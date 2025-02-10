<template>
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
</template>

<style scoped>
.no-mobile-support {
  background: radial-gradient(circle, rgba(33, 52, 66, 1) 5%, rgba(28, 66, 73, 1) 100%);
  width: 100vw;
  height: 100vh;

  z-index: 100000000000000000000 !important;
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
</style>

<script setup lang="ts">
import HeaderBig from "@/components/HeaderBig.vue";
import { computed } from "vue";

const isMobile = computed(() => {
  return window.innerWidth < window.innerHeight;
});

if (isMobile.value) {
  document.body.style.overflow = "hidden !important";
}
</script>
