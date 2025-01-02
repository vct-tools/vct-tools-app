<template>
  <div class="container">
    <header-container pageName="About">
      <div class="about-body">
        VCT Tools is an online service hosting tools for tournaments. Try navigating to different
        tabs to use each tool.
        <header-small>Tools</header-small>
        <ul style="margin: 0">
          <li>Map picker</li>
          <li>(WIP) Tournament overlays</li>
        </ul>
        <header-small>Credits</header-small>
        VCT Tools was created by <a href="https://infinity-atom.org">infinity-atom</a>. VCT Tools is
        in no way affiliated with valorantesports.com or VCT. <br /><br />
        VCT Tools uses these libraries:
        <ul style="margin: 0">
          <li>Vue 3</li>
          <li>html2canvas</li>
          <li>Bootstrap Icons</li>
        </ul>
        <br />
        <UIButton @click="openUrl(`https://github.com/infinity-atom/vct-tools`)">Source Code - GitHub</UIButton>
        <UIButton @click="openUrl(`https://buymeacoffee.com/infinityatom`)" :flush="true" disabled>Donate to support the hosting costs of VCT Tools</UIButton>
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

.about-body {
  width: 50vw;
  height: fit-content;
  padding: 1em;
  font-size: 12pt;

  border: 1px solid #6b7476;
}
</style>

<script setup lang="ts">
import HeaderContainer from "@/components/HeaderContainer.vue";
import HeaderSmall from "@/components/HeaderSmall.vue";
import UIButton from "@/components/UIElement/UIButton.vue";

const openUrl = (url: string) => {
  window.open(url, "_blank");
}
</script>
