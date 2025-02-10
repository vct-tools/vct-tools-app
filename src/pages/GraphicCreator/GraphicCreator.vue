<template>
  <div class="container">
    <header-container pageName="Create graphics">
      <div class="graphics-body">
        <div class="graphic">
          <div class="graphic-canvas">
            <div style="display: flex; width: 100%;">
              <UIButtonLabel>600 x {{ canvasHeight }}</UIButtonLabel>
            </div>
            <canvas width="600" :height="canvasHeight" ref="mainCanvas"></canvas>
            <div style="display: flex; width: 100%; gap: 2px;">
              <UIButtonLabel>{{ rendered ? "Done rendering" : "Rendering graphic..." }}</UIButtonLabel>
              <UIButton @click="copyImg()">Copy to clipboard</UIButton>
              <UIButton @click="saveImg()">Save image</UIButton>
              <UIButton @click="draw()">Re-render</UIButton>
            </div>
          </div>
        </div>
        <div class="options">
          <div class="panel">
            <HeaderSmall>Select Graphic</HeaderSmall>
            <UISelect prefix="Graphic Type: " :items="[`Team composition`, `Team roster`, `Game plan`]" v-model="graphicType"></UISelect>
          </div>
          <div class="panel" v-if="graphicType == `Team composition`">
            <HeaderSmall>Team Comp</HeaderSmall>
            <UISelect prefix="Map: " :items="maps.map((a) => a.name)" v-model="teamCompData.map"></UISelect>
            <div v-for="(p, i) in teamCompData.comp" :key="i" style="display: flex; gap: 2px;">
              <UISelect prefix="Agent: " :items="[`(Remove player)`, `(Show as unknown)`, ...agents.map((a) => a.name)]" v-model="teamCompData.comp[i].agent" style="width: 50%;"></UISelect>
              <UIField v-model="teamCompData.comp[i].player" style="width: 50%; text-align: center;"></UIField>
            </div>
          </div>
          <div class="panel" v-if="graphicType == `Team roster`">
            <HeaderSmall>Team Roster</HeaderSmall>
            <div class="fg">
              <UIField v-model="teamRosterData.teamName"></UIField>
              <UIField v-model="teamRosterData.tagline"></UIField>
              <UIButton @click="teamRosterData.roster.push({ name: `Player 1`, image: { imageType: `Agent Portrait`, agent: `Brimstone`, dataUri: null }, type: `Player` })" :disabled="teamRosterData.roster.length >= 8">+ Add new member</UIButton>
            </div>
            <div class="fg">
              <UIButtonLabel>Name</UIButtonLabel>
              <UIButtonLabel>Image Type</UIButtonLabel>
              <UIButtonLabel>Image/Agent</UIButtonLabel>
              <UIButtonLabel>Type</UIButtonLabel>
              <div class="fgs"></div>
            </div>
            <div class="fg" v-for="(member, i) in teamRosterData.roster" :key="i">
              <UIField v-model="teamRosterData.roster[i].name"></UIField>
              <UISelect v-model="teamRosterData.roster[i].image.imageType" :items="[`File Upload`, `Agent Portrait`]"></UISelect>
              <UISelect v-model="teamRosterData.roster[i].image.agent" :items="agents.map((a) => a.name)" v-if="teamRosterData.roster[i].image.imageType == `Agent Portrait`"></UISelect>
              <UIButton v-else @click="loadImgRoster(i)">Select image...</UIButton>
              <UISelect v-model="teamRosterData.roster[i].type" :items="[`Player`, `Substitute`, `Coach`]"></UISelect>
              <UIButton @click="teamRosterData.roster.splice(i, 1)">Delete</UIButton>
            </div>
          </div>
          <div class="panel" v-if="graphicType == `Game plan`">
            <HeaderSmall>Game Plan</HeaderSmall>
            <div style="width: 100%; height: 400px;">
              <MonacoEditor v-model:value="gamePlanCode" theme="vs-dark" language="gpnotation"></MonacoEditor>
            </div>
            <div class="panel" v-if="parseError" style="color: lightcoral;">{{ parseError }}</div>
          </div>
          <div class="panel">
            <AdsenseMultiplexAd></AdsenseMultiplexAd>
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

.graphics-body {
  width: 100%;
  flex: 1;
  font-size: 12pt;

  display: flex;
  justify-content: space-between;
}

.graphic {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

canvas {
  border: 1px solid #54758142;
  width: 100%;
  background-color: #54758142;
}

.options {
  flex: 1;
  margin-left: 1em;

  display: flex;
  flex-direction: column;
  gap: 1px;
}

.options .panel {
  padding: 1em;
  background-color: #54758142;
}

.mc-editor {
  width: 100%;
  height: 40vh;
}

.fg {
  display: flex;
  width: 100%;
  gap: 2px;
}

.fgs {
  width: 100%;
}
</style>

<script setup lang="ts">
import AdsenseMultiplexAd from "@/components/Adsense/AdsenseMultiplexAd.vue";
import HeaderContainer from "@/components/HeaderContainer.vue";
import HeaderSmall from "@/components/HeaderSmall.vue";
import UISelect from "@/components/UIElement/UISelect.vue";
import agents from "@/agents";
import { maps } from "@/maps";
import { nextTick, ref, type Ref, watch } from "vue";
import UIField from "@/components/UIElement/UIField.vue";
import UIButtonLabel from "@/components/UIElement/UIButtonLabel.vue";
import UIButton from "@/components/UIElement/UIButton.vue";
import { type TeamComp, renderTeamComp } from "./Renderers/teamComp";
import { type TeamRoster, renderTeamRoster } from "./Renderers/teamRoster";
import * as monaco from "monaco-editor";
import MonacoEditor from "@guolao/vue-monaco-editor";
import { loader } from "@guolao/vue-monaco-editor";
import { renderGamePlan } from "./Renderers/gamePlan";
import { parseGamePlan } from "@/parseGamePlan";

monaco.languages.register({ id: "gpnotation" });
monaco.languages.setMonarchTokensProvider("gpnotation", {
  tokenizer: {
    root: [
      [/\b(Map|Callouts|Agent|Attacker|Defender)\b/, "keyword"],
      [/".*?"/, "string"],
      [/\/\/.*/, "comment"],
      [new RegExp(`\\b(${agents.map((a) => a.name).join("|")}|${maps.map((a) => a.name).join("|")})\\b`), "type"]
    ]
  }
});

monaco.languages.registerCompletionItemProvider("gpnotation", {
  provideCompletionItems: (model, position) => {
    // ...agents.map((a) => { return {
    //       label: a.name,
    //       kind: monaco.languages.CompletionItemKind.Enum,
    //       insertText: a.name,
    //       insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
    //     }}),
    //     ...maps.map((a) => { return {
    //       label: a.name,
    //       kind: monaco.languages.CompletionItemKind.Enum,
    //       insertText: a.name,
    //       insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
    //     }})

    const currentLineParsed = parseGamePlan(model.getLineContent(position.lineNumber))[0];
    const currentMap = parseGamePlan(model.getValue()).find((a) => a[0] == "Map")?.[1] || "Ascent";

    const suggestions: Array<object> = [];
    const addSuggestions = (items: string[], kind: monaco.languages.CompletionItemKind, itemsInsertText: string[] | null = null) => {
      suggestions.push(...items.map((a, index) => {
        return {
          label: a,
          kind: kind,
          insertText: itemsInsertText ? itemsInsertText[index] : a,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        }
      }));
    }

    if (currentLineParsed.length <= 1) {
      addSuggestions(["Map", "Callouts", "Agent"], monaco.languages.CompletionItemKind.Keyword);
    }

    if (currentLineParsed.length >= 1 && currentLineParsed[0] == "Map" && currentLineParsed.length <= 2) {
      addSuggestions(maps.map((a) => a.name), monaco.languages.CompletionItemKind.Enum);
    }

    if (currentLineParsed.length >= 1 && currentLineParsed[0] == "Agent" && currentLineParsed.length <= 2) {
      addSuggestions(["Attacker", "Defender"], monaco.languages.CompletionItemKind.Enum);
    }

    if (currentLineParsed.length >= 3 && currentLineParsed[0] == "Agent" && currentLineParsed.length <= 3) {
      addSuggestions(agents.map((a) => a.name), monaco.languages.CompletionItemKind.Enum);
    }

    if (currentLineParsed.length >= 4 && currentLineParsed[0] == "Agent" && currentLineParsed.length <= 4) {
      const cm = maps.find((a) => a.name == currentMap);
      if (cm) {
        const isAlreadyQuoted = model.getLineContent(position.lineNumber).includes("\"");
        addSuggestions(
          cm.callouts.map((a) => a.name),
          monaco.languages.CompletionItemKind.Enum, isAlreadyQuoted ? cm.callouts.map((a) => `${a.name}"`) : cm.callouts.map((a) => `"${a.name}"`));
      }
    }

    return { suggestions };
  }
});

loader.config({ monaco });

const parseError = ref<string | null>(null);
const rendered = ref(false);
const canvasHeight = ref(600);
const graphicType = ref("Game plan");
const teamCompData = ref<TeamComp>({
  map: "Ascent",
  comp: [
    { player: "Player 1", agent: "Brimstone" },
    { player: "Player 2", agent: "Jett" },
    { player: "Player 3", agent: "Phoenix" },
    { player: "Player 4", agent: "Sage" },
    { player: "Player 5", agent: "Sova" },
  ]
});
const teamRosterData = ref<TeamRoster>({
  teamName: "My Team",
  tagline: "TMN",
  roster: [
    {
      name: "Player 1",
      image: { imageType: "Agent Portrait", agent: "Brimstone", dataUri: null },
      type: "Player"
    },
    {
      name: "Player 2",
      image: { imageType: "Agent Portrait", agent: "Jett", dataUri: null },
      type: "Player"
    },
    {
      name: "Player 3",
      image: { imageType: "Agent Portrait", agent: "Phoenix", dataUri: null },
      type: "Player"
    },
    {
      name: "Player 4",
      image: { imageType: "Agent Portrait", agent: "Sage", dataUri: null },
      type: "Player"
    },
    {
      name: "Player 5",
      image: { imageType: "Agent Portrait", agent: "Sova", dataUri: null },
      type: "Player"
    },
    {
      name: "Player 6",
      image: { imageType: "Agent Portrait", agent: "Brimstone", dataUri: null },
      type: "Substitute"
    },
    {
      name: "Player 7",
      image: { imageType: "Agent Portrait", agent: "Jett", dataUri: null },
      type: "Substitute"
    },
    {
      name: "Player 8",
      image: { imageType: "Agent Portrait", agent: "Sova", dataUri: null },
      type: "Coach"
    }
  ]
});
const gamePlanCode = ref<string>("");

const mainCanvas: Ref<HTMLCanvasElement | null> = ref(null);

const draw = async () => {
  rendered.value = false;
  if (mainCanvas.value) {
    const ctx = mainCanvas.value.getContext("2d");
    if (ctx) {
      canvasHeight.value = {
        "Team composition": 470,
        "Team roster": 540,
        "Game plan": 670
      }[graphicType.value] || 500;

      await nextTick();

      ctx.clearRect(0, 0, mainCanvas.value.width, mainCanvas.value.height);

      if (graphicType.value == "Team composition") {
        await renderTeamComp(teamCompData, ctx, mainCanvas.value);
      } else if (graphicType.value == "Team roster") {
        await renderTeamRoster(teamRosterData, ctx);
      } else if (graphicType.value == "Game plan") {
        try {
          await renderGamePlan(gamePlanCode, ctx);
          parseError.value = null;
        } catch(e) {
          parseError.value = (e as Error).toString();
        }
      }
    }
  }
  rendered.value = true;
}

const loadImgRoster = (i: number) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        teamRosterData.value.roster[i].image.dataUri = e.target?.result as string;
      }
      reader.readAsDataURL(file);
    }
  }
  input.click();
}

const copyImg = () => {
  if (mainCanvas.value) {
    mainCanvas.value.toBlob((blob) => {
      if (blob) {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]);
      }
    });
  }
}

const saveImg = () => {
  if (mainCanvas.value) {
    mainCanvas.value.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "graphic.png";
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  }
}

watch([graphicType, teamCompData, teamRosterData, gamePlanCode, mainCanvas], async () => {
  await nextTick();
  draw();
}, { deep: true, immediate: true });
</script>
