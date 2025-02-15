<template>
  <div class="map-pool-select">
    <div
      v-for="(map, i) in selected"
      :key="i"
      :class="map.selected ? `selected` : ``"
      @click="selected[i].selected = !selected[i].selected"
    >
      {{ map.name }}
    </div>
  </div>
</template>

<style scoped>
.map-pool-select {
  display: grid;
  gap: 1px;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  margin-bottom: 2px;
}

.map-pool-select > * {
  padding: 5px;

  background-color: #547581b2;
  cursor: pointer;
}

.map-pool-select > *:hover {
  background-color: #547581d0;
}

.map-pool-select > *.selected {
  background-color: #54758150;
}

.map-pool-select > *.selected:hover {
  background-color: #5475813f;
}
</style>

<script setup lang="ts">
import { maps } from "vct-tools-components";
import { ref, watch, type Ref } from "vue";

const model: Ref<string[] | undefined> = defineModel();

const selected = ref(
  maps.map((a) => {
    return {
      name: a.name,
      selected: model.value?.includes(a.name)
    };
  })
);

watch(
  selected,
  () => {
    model.value = selected.value.filter((a) => a.selected).map((a) => a.name);
  },
  { deep: true }
);
</script>
