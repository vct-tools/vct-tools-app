<template>
  <div class="error" v-if="error">
    <div class="icon">
      <BIconXCircleFill></BIconXCircleFill>
    </div>
    <div class="message">
      <span>An error ocurred</span>
      <span>{{ error }}</span>
      <div style="margin-bottom: 1em;"></div>
      <UIButton @click="reportError()">Report this error</UIButton>
    </div>
  </div>
  <div class="container">
    <header-container pageName="News">
      <div class="loading" v-if="!loaded">
        <UIThrobber></UIThrobber>
      </div>
      <div class="news" v-if="loaded">
        <div class="updates">
          <div :class="`listItem ${openedArticle == i ? 'selected' : ''}`" v-for="(article, i) in data" :key="i"
            @click="openedArticle = i">
            <div class="title">{{ article.title }}</div>
            <div class="preview">{{ article.preview }}</div>
          </div>
        </div>
        <div class="readingPanel">
          <div class="data">
            <div class="heading">
              {{ data[openedArticle].title }}
            </div>
            <div class="date">
              Published {{ new Date(data[openedArticle].datetime).toLocaleDateString() }} {{ new
                Date(data[openedArticle].datetime).toLocaleTimeString() }}
            </div>
          </div>
          <div class="content" v-html="data[openedArticle].contents"></div>
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

.loading {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -3em;
}

.news {
  display: flex;
  width: 100%;
  flex: 1;
}

.updates {
  width: 250px;
  height: fit-content;

  margin-right: 2em;
  background-color: #54758142;
}

.updates .listItem {
  padding: 10px;
  font-size: 9pt;

  border-right: 1px solid #6b7476;
  cursor: pointer;
}

.updates .listItem.selected {
  border-right: 4px solid #04ca8f;
  color: #04ca8f;

  position: relative;
}

.updates .listItem.selected::after {
  content: "";
  background: url(@/assets/images/tab_selected.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  width: 20px;
  height: 20px;

  position: absolute;

  top: 50%;
  left: 239px;
  transform: translateY(-50%) rotate(-90deg);
}

.updates .listItem .title {
  font-size: 12pt;
  font-weight: bold;
  text-transform: uppercase;
}

.updates .listItem:nth-child(2n) {
  background-color: #5475811f;
}

.readingPanel {
  flex: 1;
  height: 100%;

  position: sticky;
  top: 1em;

  display: flex;
  flex-direction: column;
}

.readingPanel .heading {
  padding-left: 10px;
  padding-top: 5px;

  font-family: "Tungsten", sans-serif;
  text-transform: uppercase;
  font-size: 4em;
}

.readingPanel .date {
  padding-left: 10px;
  padding-bottom: 5px;
}

.readingPanel .data {
  background-color: #54758142;
  margin-bottom: 1px;
}

.readingPanel .content {
  background-color: #54758142;
  flex: 1;
  padding: 10px;
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
import UIThrobber from "@/components/UIElement/UIThrobber.vue";
import { BIconXCircleFill } from "bootstrap-icons-vue";
import { ref } from "vue";

const openedArticle = ref(0);
const loaded = ref(false);
const error = ref<string | null>(null);


const data = ref([
  {
    title: "",
    preview: "",
    contents: "",
    datetime: new Date().toISOString()
  }
]);

(async () => {
  try {
    const response = await fetch(`https://api.vcttools.net/v1/news/latest`);

    if (!response.ok) {
      throw new Error(`Failed to fetch news. Response from server: ${response.status}, ${JSON.stringify(await response.json())}`);
    } else {
      data.value = (await response.json()).data;
      loaded.value = true;
    }
  } catch (err) {
    error.value = (err as Error).message;
  }
})();

const reportError = () => {
  const errorBody = [
    `Error message: ${error.value}`,
    `User agent: ${navigator.userAgent}`,
    `URL: ${window.location.href}`, "",
    "Please give a brief description of what you were doing when this error occurred:",
    "..."
  ]

  window.open(`/bugs?report=${encodeURIComponent(errorBody.join("\n"))}`, "_self");
}
</script>
