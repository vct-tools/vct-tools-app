<template>
  <div class="select" @click="optionsVisible = !optionsVisible">
    {{ prefix }}{{ model || "Not selected" }}
    <div class="options" v-if="optionsVisible">
      <option v-for="(item, i) in props.items" :key="i" @click="model = item">
        {{ item }}
      </option>
    </div>
  </div>
</template>

<style scoped>
.select {
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

.select:hover {
  background-color: #547581d0;
}

.select .options {
  position: absolute;
  top: 31px;
  left: 0px;

  width: 100%;

  background-color: #f3efee;
  color: black;

  z-index: 100;
}

.select .options option {
  text-align: left;

  padding: 7px;
}

.select .options option:nth-child(2n) {
  background-color: #efefef;
}

.select .options option:hover {
  background-color: #ebeeb1;
}

.select::before {
  content: attr(data-prefix) attr(data-selected);
}

.select::after {
  content: "▼";
  position: absolute;
  right: 10px;
}
</style>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  items: Array<string>,
  prefix: String
});

const model = defineModel();

const optionsVisible = ref(false);
</script>
