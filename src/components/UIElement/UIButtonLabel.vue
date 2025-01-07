<template>
  <div
    class="ui-button"
    :style="`${$props.flush ? `margin-bottom: 0;` : ``}${$props.spacer ? `opacity: 0;` : ``}`"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  flush: Boolean,
  spacer: Boolean
});
</script>

<style scoped>
.ui-button {
  padding: 7px 0;
  width: 100%;

  text-align: center;

  font-size: 10pt;
  font-family: "Din Next", sans-serif;

  display: inline-block;

  position: relative;

  margin-bottom: 2px;
}
</style>
