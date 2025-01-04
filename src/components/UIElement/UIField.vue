<template>
  <input type="text" v-model="model" :readonly="$props.readonly" ref="mInput" />
</template>

<script setup lang="ts">
defineProps({
  readonly: Boolean
});

const model = defineModel();
</script>

<style scoped>
input {
  padding: 7px;
  width: 100%;

  border: none;
  background-color: #547581b2;
  color: #e0ebb9;

  font-size: 10pt;
  font-family: "Din Next", sans-serif;

  display: inline-block;

  position: relative;

  outline: none !important;

  margin-bottom: 2px;
}

input:hover {
  background-color: #547581d0;
}
</style>
