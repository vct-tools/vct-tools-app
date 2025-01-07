<template>
  <div class="main-switch">
    <div class="label">
      <slot></slot>
    </div>
    <div :class="`on switch ${enabled ? `enabled` : ``}`" @click="enabled = true">ON</div>
    <div :class="`off switch ${!enabled ? `enabled` : ``}`" @click="enabled = false">OFF</div>
  </div>
</template>

<script setup lang="ts">
const enabled = defineModel();
</script>

<style scoped>
.main-switch {
  width: 100%;

  border: none;
  color: #e0ebb9;

  font-size: 10pt;
  font-family: "Din Next", sans-serif;

  display: flex;
  gap: 1px;

  position: relative;

  margin-bottom: 2px;
}

.label {
  padding: 7px;
  text-align: center;
  background-color: #547581b2;
  flex: 1;
}

.switch {
  width: 22%;
  max-width: 50px;

  padding: 7px 0;

  background-color: #304d58;
  color: #366679;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}

.switch.enabled {
  background-color: #547581d7;
  color: unset;
}

.switch:hover {
  background-color: #304d58e0;
}

.switch.enabled:hover {
  background-color: #54758188;
}

button:disabled {
  background-color: #54758150;
  cursor: auto;
}
</style>
