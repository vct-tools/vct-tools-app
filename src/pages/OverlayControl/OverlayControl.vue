<template>
  <div class="container">
    <header-container pageName="Overlay">
      <div class="content-body">
        <div class="content-body-content">Helo</div>
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
</style>

<script setup lang="ts">
import HeaderContainer from "@/components/HeaderContainer.vue";
</script>
