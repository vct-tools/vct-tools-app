<template>
  <div class="container">
    <header-container pageName="Learn maps">
      <div class="learn-body">
        <div class="map">
          <div class="imgContainer">
            <canvas ref="gameCanvas" width="500" height="500" @click="handleClick"></canvas>
            <img :src="maps.find((a) => a.name == currentMap)?.map" draggable="false" />
          </div>
        </div>
        <div class="options">
          <div class="panel" v-if="!inGame">
            <HeaderSmall>Select maps to learn</HeaderSmall>
            <MapPoolSelector v-model="mapPool"></MapPoolSelector>
            {{ mapPool.length == 0 ? "No" : mapPool.length }} map{{
              mapPool.length == 1 ? "" : "s"
            }}
            selected
          </div>
          <div class="panel" v-if="!inGame">
            <HeaderSmall>Select difficulty</HeaderSmall>
            <div style="display: flex; gap: 2px; width: 100%">
              <div style="flex: 1;">
                <UISelect
                  prefix="Lives: "
                  :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                  v-model="difficulty.lives"
                ></UISelect>
              </div>
              <div style="flex: 1;">
                <UISelect
                  prefix="Hints: "
                  :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                  v-model="difficulty.hints"
                ></UISelect>
              </div>
            </div>
            <UISwitch v-model="repeatMaps">Allow callouts to be repeated</UISwitch>
          </div>
          <div class="panel" v-if="!inGame">
            <UIButton :disabled="mapPool.length == 0" @click="play(true)">Start</UIButton>
          </div>
          <div class="panel" v-if="inGame">
            <div style="display: flex; justify-content: space-between; width: 100%">
              <span class="atk"
                ><BIconHeartFill style="margin-right: 5px" v-for="i in gameStats.lives" :key="i"
              /></span>
              <span class="def"
                ><BIconQuestionDiamondFill
                  style="margin-right: 5px"
                  v-for="i in gameStats.hints"
                  :key="i"
              /></span>
            </div>
          </div>
          <div class="panel" v-if="inGame">
            <HeaderSmall>Map: {{ currentMap }}</HeaderSmall>
            <span style="font-size: 20pt"
              >Click on <b class="def">{{ currentCallout.name }}</b></span
            >
          </div>
          <div class="panel" v-if="inGame">
            <UIButton :disabled="gameStats.hints == 0" @click="hint()">Use hint</UIButton>
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

.learn-body {
  width: 100%;
  flex: 1;
  font-size: 12pt;

  display: flex;
  justify-content: space-between;
}

.map {
  height: 100%;
  width: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.map .imgContainer {
  position: relative;
}

.map canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}

.map img {
  width: 500px;
  aspect-ratio: 1/1;
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
</style>

<script setup lang="ts">
import HeaderContainer from "@/components/HeaderContainer.vue";
import HeaderSmall from "@/components/HeaderSmall.vue";
import MapPoolSelector from "@/components/MapPoolSelector.vue";
import UIButton from "@/components/UIElement/UIButton.vue";
import UISelect from "@/components/UIElement/UISelect.vue";
import UISwitch from "@/components/UIElement/UISwitch.vue";
import { maps } from "@/maps";
import { BIconHeartFill, BIconQuestionDiamondFill } from "bootstrap-icons-vue";
import { ref } from "vue";

const mapPool = ref<string[]>([]);
const difficulty = ref<{ lives: number; hints: number }>({ lives: 3, hints: 5 });
const inGame = ref<boolean>(false);
const gameStats = ref<{ lives: number; hints: number }>({ lives: 0, hints: 0 });
const currentMap = ref<string>("Ascent");
const currentCallout = ref<{ x: number; y: number; name: string }>({ x: 0, y: 0, name: "" });
const gameCanvas = ref<HTMLCanvasElement | null>(null);
const alreadyUsedCallouts = ref<Record<string, string[]>>({});
const drawStack = ref<{ correct: { x: number; y: number } | null }>({ correct: null });
const repeatMaps = ref<boolean>(false);

const canClick = ref(true);

const handleClick = (e: MouseEvent) => {
  if (!inGame.value || !canClick.value) return;

  // Get the x and y of the mouse click in the image
  const x = e.offsetX;
  const y = e.offsetY;

  // Check if the click was within 60px of the callout
  if (Math.abs(x - currentCallout.value.x) <= 60 && Math.abs(y - currentCallout.value.y) <= 60) {
    alreadyUsedCallouts.value[currentMap.value] = [
      ...(alreadyUsedCallouts.value[currentMap.value] || []),
      currentCallout.value.name
    ];
    drawStack.value.correct = { x, y };
    play(false);
  } else {
    gameStats.value.lives--;
    drawX(x, y);
    if (gameStats.value.lives == 0) {
      inGame.value = false;
    } else {
      drawCorrectXL(currentCallout.value.x, currentCallout.value.y);
      delayPlay();
    }
  }
};

const delayPlay = () => {
  canClick.value = false;
  let ms = 0;

  const a = setInterval(() => {
    if (gameCanvas.value) {
      const ctx = gameCanvas.value.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, gameCanvas.value.width, 20);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, gameCanvas.value.width, 20);
        ctx.fillStyle = "white";
        ctx.fillRect(5, 5, ms - 5, 10);
      }
    }

    if (ms < 500) {
      ms += 1;
    } else {
      clearInterval(a);
      play(false);
      canClick.value = true;
    }
  }, 1);
};

const drawCorrect = (x: number, y: number) => {
  if (gameCanvas.value) {
    const ctx = gameCanvas.value.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(0, 255, 0, 1)";
      ctx.fill();
    }
  }
};

const drawCorrectXL = (x: number, y: number) => {
  if (gameCanvas.value) {
    const ctx = gameCanvas.value.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(0, 255, 0, 1)";
      ctx.fill();
    }
  }
};

const drawX = (x: number, y: number) => {
  if (gameCanvas.value) {
    const ctx = gameCanvas.value.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x - 5, y - 5);
      ctx.lineTo(x + 5, y + 5);
      ctx.moveTo(x + 5, y - 5);
      ctx.lineTo(x - 5, y + 5);
      ctx.strokeStyle = "rgba(255, 0, 0, 1)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
};

const play = (reset: boolean) => {
  if (gameCanvas.value) {
    const ctx = gameCanvas.value.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, gameCanvas.value.width, gameCanvas.value.height);
    }
  }

  inGame.value = true;
  if (reset) {
    gameStats.value = { lives: difficulty.value.lives, hints: difficulty.value.hints };
    alreadyUsedCallouts.value = {};
  }
  const oldMap = currentMap.value;
  currentMap.value = randMap();

  if (drawStack.value.correct && oldMap == currentMap.value) {
    drawCorrect(drawStack.value.correct.x, drawStack.value.correct.y);
  }

  const rMap = maps.find((a) => a.name == currentMap.value);
  if (rMap) {
    const availableCallouts = repeatMaps.value ? rMap.callouts : rMap.callouts.filter(
      (callout) => !alreadyUsedCallouts.value[currentMap.value]?.includes(callout.name)
    );
    if (availableCallouts.length === 0) {
      inGame.value = false;
      return;
    }
    const lastCallout = currentCallout.value.name;
    while (currentCallout.value.name == lastCallout) {
      currentCallout.value = availableCallouts[Math.floor(Math.random() * availableCallouts.length)];
    }
  }
};

const hint = () => {
  gameStats.value.hints--;

  if (gameCanvas.value) {
    const ctx = gameCanvas.value.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.arc(currentCallout.value.x, currentCallout.value.y, 75, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
};

const randMap = (): string => {
  return mapPool.value[Math.floor(Math.random() * mapPool.value.length)];
};
</script>
