<template>
  <div class="dialog-bg" :style="model ? `` : `display: none;`"></div>
  <div class="dialog" :style="model ? `` : `display: none;`">
    <div class="container">
      <div class="top-ornament"></div>
      <div class="left-ornament"></div>
      <div class="right-ornament"></div>

      <div class="header">
        {{ $props.header }}
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="btn">
        <UILargeButton @click="model = false">Close</UILargeButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.7);

  z-index: 100;
}

.dialog {
  position: fixed;

  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 101;

  background-color: #1d2328;

  border-top: 1px solid white;
  border-bottom: 1px solid white;
}

.container {
  position: relative;
  padding: 25px 100px;
}

.header {
  text-align: center;
  text-transform: uppercase;
  font-size: 24pt;
}

.content {
  width: 300px;
  padding-top: 25px;
  padding-bottom: 25px;
}

.top-ornament {
  position: absolute;
  width: 15px;
  height: 5px;

  left: 50%;
  transform: translateX(-50%);
  top: -3px;

  background-color: white;

  border-radius: 2px;
}

.left-ornament {
  position: absolute;
  width: 10px;
  height: 3px;

  left: 0;
  top: 100%;

  background-color: white;
}

.right-ornament {
  position: absolute;
  width: 10px;
  height: 3px;

  left: calc(100% - 10px);
  top: 100%;

  background-color: white;
}

.btn {
  display: flex;
  justify-content: center;
}
</style>

<script setup lang="ts">
import UILargeButton from "@/components/UIElement/UILargeButton.vue";

defineProps({
  header: String
});

const model = defineModel<boolean>({
  default: true
});
</script>
