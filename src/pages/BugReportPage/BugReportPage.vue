<template>
  <div class="error" v-if="error">
    <div class="icon">
      <BIconXCircleFill></BIconXCircleFill>
    </div>
    <div class="message">
      <span>An error ocurred</span>
      <span>{{ error }}</span>
      <div style="margin-bottom: 1em;"></div>
      You can't really report this error from the bug reporter page, can you? Please contact admin@vcttools.net.
    </div>
  </div>
  <div class="container">
    <header-container pageName="Report problems">
      <div class="main">
        <div class="loading" v-if="!loaded">
          <UIThrobber></UIThrobber>
        </div>
        <div class="reports" v-if="loaded">
          <!-- <div class="options">
            <UIButton :disabled="true">Submit report</UIButton>
          </div> -->
          <div class="options">
            <div class="left">
              <UIButtonLabel>Filter by title</UIButtonLabel>
              <UIField placeholder="Title..." v-model="filters.title"></UIField>
              <UIButtonLabel>Filter by outcome</UIButtonLabel>
              <UISelect :items="[`None`, `Unresolved`, `Working as intended`, `Fixed`, `Will not fix`]" v-model="filters.outcome"></UISelect>
            </div>
            <div class="right">
              <UIButtonLabel>Filter by scope</UIButtonLabel>
              <UISelect :items="[`None`, ...scopes]" v-model="filters.scope"></UISelect>
              <UIButtonLabel :spacer="true">Search</UIButtonLabel>
              <UIButton @click="reloadNews()">Update</UIButton>
            </div>
          </div>
          <div class="list">
            <div class="emptystate" v-if="data.length == 0">
              Sorry, there were no bug reports matching the selected filters.
            </div>
              <div :class="`listItem ${openedReport == i ? 'selected' : ''}`" v-for="(report, i) in data" :key="i"
              @click="openedReport = i">
              <div class="title">{{ report.title }}</div>
            </div>
          </div>
        </div>
        <div class="readingPanel" v-if="loaded && openedReport != null">
          <div class="reportTitle">
            {{ data[openedReport].title }}
          </div>
          <div class="reportMetadata">
            <table>
              <tr>
                <td>Submitted by: {{ "UNKNOWN" }}</td>
                <td>Datetime: {{ new Date(data[openedReport].timestamp).toLocaleString() }}</td>
              </tr>
              <tr>
                <td>Outcome: {{ outcome_to_readable(data[openedReport].outcome) }}</td>
                <td>Scope: {{ scope_to_readable(data[openedReport].scope) }}</td>
              </tr>
            </table>
          </div>
          <div class="reportBody">
            <b style="font-size: 14pt;">The following is a description of the bug provided by the submitter.</b>
            <p>
              {{ data[openedReport].report_body }}
            </p>
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

.main {
  display: flex;
  width: 100%;
  flex: 1;
}

.loading {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -3em;
}

.reports {
  min-width: 400px;
  width: 400px;
  height: fit-content;

  margin-right: 2em;
}

.reports .options {
  margin-bottom: 1em;
  display: flex;
  gap: 5px;
}

.reports .options .left, .right {
  width: 50%;
}

.reports .list .listItem {
  padding: 10px;
  padding-right: 1em;
  font-size: 12pt;
  background-color: #54758142;

  border-right: 1px solid #6b7476;
  cursor: pointer;
}

.reports .listItem.selected {
  border-right: 4px solid #04ca8f;
  color: #04ca8f;

  position: relative;
}

.reports .listItem.selected::after {
  content: "";
  background: url(@/assets/images/tab_selected.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  width: 20px;
  height: 20px;

  position: absolute;

  top: 50%;
  left: 389px;
  transform: translateY(-50%) rotate(-90deg);
}

.readingPanel {
  flex: 1;
  background-color: #54758142;
}

.reportTitle {
  font-size: 18pt;
  padding: 20px;
}

.reportMetadata td {
  padding: 0 20px;
}

.reportBody {
  padding: 20px;
  max-width: 100%;
}

.error {
  position: fixed;

  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  gap: 1px;

  color: white;

  border-radius: 5px;
  border: 1px solid #6b7476;
}

.error .icon {
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/1;
  border-right: 1px solid #6b7476;
}

.error .message {
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

<script setup lang="ts">
import HeaderContainer from "@/components/HeaderContainer.vue";
import UIButton from "@/components/UIElement/UIButton.vue";
import UIButtonLabel from "@/components/UIElement/UIButtonLabel.vue";
import UIField from "@/components/UIElement/UIField.vue";
import UIThrobber from "@/components/UIElement/UIThrobber.vue";
import UISelect from "@/components/UIElement/UISelect.vue";
import { BIconXCircleFill } from "bootstrap-icons-vue";
import { ref } from "vue";

const scopes = [`Overlay - Config`, `Overlay - Drawing`, `Overlay - Other`, `Map picker - Other`, `UI - Other`, `News - Other`, `Bug reporter - Other`];

const openedReport = ref<number | null>(null);
const data = ref<{
  id: number;
  title: string;
  scope: string;
  outcome: string;
  report_body: string;
  timestamp: string;
  submitted_by: string;
}[]>([]);
const loaded = ref(false);
const error = ref<string | null>(null);
const filters = ref({
  title: "",
  outcome: "None",
  scope: "None"
});

const readable_to_outcome = (humanReadable: string) => {
  return {
    "Unresolved": "unresolved",
    "Working as intended": "intended",
    "Fixed": "fixed",
    "Will not fix": "will_not_fix"
  }[humanReadable];
}

const readable_to_scope = (humanReadable: string) => {
  return {
    "Overlay - Config": "overlay_config",
    "Overlay - Drawing": "overlay_drawing",
    "Overlay - Other": "overlay_other",
    "Map picker - Other": "mappicker_other",
    "UI - Other": "ui_other",
    "News - Other": "news_other",
    "Bug reporter - Other": "bugreporter_other"
  }[humanReadable];
}

const scope_to_readable = (scope: string) => {
  return {
    "overlay_config": "Overlay - Config",
    "overlay_drawing": "Overlay - Drawing",
    "overlay_other": "Overlay - Other",
    "mappicker_other": "Map picker - Other",
    "ui_other": "UI - Other",
    "news_other": "News - Other",
    "bugreporter_other": "Bug reporter - Other"
  }[scope];
}

const outcome_to_readable = (outcome: string) => {
  return {
    "unresolved": "Unresolved",
    "intended": "Working as intended",
    "fixed": "Fixed",
    "will_not_fix": "Will not fix"
  }[outcome];
}

const reloadNews = async () => {
  loaded.value = false;
  try {
    // Get filters
    let filterString = "?";
    if (filters.value.title != "") {
      filterString += `filter_name=${filters.value.title}&`;
    }
    if (filters.value.outcome != "None") {
      if (readable_to_outcome(filters.value.outcome)) {
        filterString += `filter_outcome=${readable_to_outcome(filters.value.outcome)}&`;
      }
    }
    if (filters.value.scope != "None") {
      if (readable_to_scope(filters.value.scope)) {
        filterString += `filter_scope=${readable_to_scope(filters.value.scope)}&`;
      }
    }
    // Remove trailing &
    filterString = filterString.slice(0, -1);

    const response = await fetch(`https://api.vcttools.net/v1/bugs/list${filterString}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch news. Response from server: ${response.status}, ${JSON.stringify(await response.json())}`);
    } else {
      data.value = (await response.json()).data;
      loaded.value = true;
    }
  } catch (err) {
    error.value = (err as Error).message;
  }
}

reloadNews();
</script>
