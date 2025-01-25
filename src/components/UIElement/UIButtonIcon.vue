<template>
  <button
    class="ui-button"
    @click="onClick"
    :disabled="$props.disabled"
    :style="`--icon: url(${$props.icon}); ${$props.paddingFix ? 'padding-left: 31px;' : ''}`"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  disabled: Boolean,
  icon: String,
  paddingFix: Boolean
});

const emit = defineEmits(["click"]);

const onClick = () => {
  if (!props.disabled) {
    emit("click");
  }
};
</script>

<style scoped>
button {
  padding: 7px 0;
  width: 100%;

  text-align: center;

  border: none;
  background-color: #547581b2;
  color: #e0ebb9;

  font-size: 10pt;
  font-family: "Din Next", sans-serif;

  display: inline-block;

  position: relative;

  margin-bottom: 2px;
}

button:hover {
  background-color: #547581d0;
  cursor: pointer;
}

button:disabled {
  background-color: #54758150;
  cursor: auto;
}

button::before {
  content: "";
  height: 100%;
  aspect-ratio: 1/1;

  background-color: #547581b2;

  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: var(--icon);

  position: absolute;
  top: 0;
  left: 0;
}
</style>
