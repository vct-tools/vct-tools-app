<template>
  <div :class="`button ${$props.disabled ? 'disabled' : ''}`" role="button" @click="onClick">
    <div class="disabledLabel" v-if="$props.disabled">{{ $props.disabledLabel }}</div>
    <div class="disabledWarning" v-if="$props.disabled">
      <BIconExclamationTriangle></BIconExclamationTriangle>
    </div>

    <div class="content" :style="$props.disabled ? `opacity: 0;` : ``">
      <slot></slot>
    </div>

    <div class="tl"></div>
    <div class="tr"></div>
    <div class="bl"></div>
    <div class="br"></div>
  </div>
</template>

<script setup lang="ts">
import { BIconExclamationTriangle } from "bootstrap-icons-vue";

const props = defineProps({
  disabled: Boolean,
  disabledLabel: String
});

const emit = defineEmits(["click"]);

const onClick = () => {
  if (!props.disabled) {
    emit("click");
  }
};
</script>

<style scoped>
.button {
  padding: 10px 50px;

  border: 2px solid rgba(255, 255, 255, 0.5);
  width: fit-content;

  background: radial-gradient(circle, rgba(101, 155, 143, 1) 0%, rgba(125, 188, 174, 1) 100%);

  position: relative;
  cursor: pointer;
}

.button.disabled {
  background: #222222b2;
}

.content {
  text-transform: uppercase;
  font-size: 20pt;
}

.tl {
  position: absolute;
  top: -2px;
  left: -2px;
  width: 2px;
  height: 2px;
  background-color: white;
  transition: 600ms ease-in-out;
}

.tr {
  position: absolute;
  top: -2px;
  left: 100%;
  width: 2px;
  height: 2px;
  background-color: white;
  transition: 600ms ease-in-out;
}

.bl {
  position: absolute;
  top: 100%;
  left: -2px;
  width: 2px;
  height: 2px;
  background-color: white;
  transition: 600ms ease-in-out;
}

.br {
  position: absolute;
  top: 100%;
  left: 100%;
  width: 2px;
  height: 2px;
  background-color: white;
  transition: 600ms ease-in-out;
}

.button:hover .tl {
  top: 3px;
  left: 3px;
}

.button:hover .tr {
  top: 3px;
  left: calc(100% - 3px - 2px);
}

.button:hover .bl {
  top: calc(100% - 3px - 2px);
  left: 3px;
}

.button:hover .br {
  top: calc(100% - 3px - 2px);
  left: calc(100% - 3px - 2px);
}

.disabledLabel {
  position: absolute;
  top: 4px;
  left: 0;

  font-size: 10pt;

  width: 100%;
  text-align: center;

  color: #999;
}

.disabledWarning {
  position: absolute;
  bottom: 0;
  left: 0;

  font-size: 10pt;

  width: 100%;
  text-align: center;

  color: rgb(255, 70, 70);
}
</style>
