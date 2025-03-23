<template>
  <div class="container">
    <header-container pageName="Brackets">
      <div class="brackets-body">
        <div class="options">
          <div>
            <HeaderSmall>Tournament Configuration</HeaderSmall>
            <div class="panel">
              <UIButtonLabel>Name</UIButtonLabel>
              <UIField v-model="config.name"></UIField>
            </div>
          </div>
          <div>
            <HeaderSmall>Teams</HeaderSmall>
            <div class="panel">
              <div v-for="(team, i) in config.teams" :key="i" style="display: flex; gap: 2px">
                <UIButton
                  @click="config.teams.splice(i - 1, 0, config.teams.splice(i, 1)[0])"
                  style="width: 10%"
                  :disabled="i == 0"
                >
                  <BIconChevronUp></BIconChevronUp>
                </UIButton>

                <UIButton
                  @click="config.teams.splice(i + 1, 0, config.teams.splice(i, 1)[0])"
                  style="width: 10%"
                  :disabled="i == config.teams.length - 1"
                >
                  <BIconChevronDown></BIconChevronDown>
                </UIButton>

                <UIField v-model="config.teams[i]"></UIField>

                <UIButton @click="config.teams.splice(i, 1)" style="width: 10%" :disabled="config.teams.length == 1">
                  <BIconXCircleFill></BIconXCircleFill>
                </UIButton>
              </div>
              <UIButton @click="config.teams.push('New Team')">
                <BIconPlusCircleFill></BIconPlusCircleFill>
                Add Team
              </UIButton>
            </div>
          </div>
        </div>
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

.brackets-body {
  width: 100%;
  flex: 1;

  font-size: 12pt;

  display: flex;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 1em;

  width: 30%;
}

.panel {
  background-color: #54758142;
  padding: 1em;
}
</style>

<script setup lang="ts">
import HeaderContainer from "@/components/HeaderContainer.vue";
import HeaderSmall from "@/components/HeaderSmall.vue";
import { BIconChevronDown, BIconChevronUp, BIconPlusCircleFill, BIconXCircleFill } from "bootstrap-icons-vue";
import { UIButtonLabel, UIField, UIButton } from "vct-tools-components";
import { ref } from "vue";

const config = ref({
  name: "My Tournament",
  teams: ["Team 1", "Team 2", "Team 3", "Team 4", "Team 5", "Team 6", "Team 7", "Team 8"]
});
</script>
