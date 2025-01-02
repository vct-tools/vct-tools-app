<template>
  <button
    class="ui-button"
    @click="onClick"
    :disabled="$props.disabled"
    :style="`--icon: url(${$props.icon})`"
    :data-tooltip="$props.tooltip"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  disabled: Boolean,
  icon: String,
  tooltip: String
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
  padding-left: 31px;

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

button:hover::after {
  content: attr(data-tooltip);
  position: absolute;

  top: 0;
  left: 0;

  padding: 2px;
  width: 100%;

  font-size: 9pt;

  box-sizing: border-box;

  background-color: rgba(0, 0, 0, 0.897);
}
</style>
