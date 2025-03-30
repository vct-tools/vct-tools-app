<template>
  <div class="no-mobile-support">
    <HeaderContainer :show-tabs="false" :include-small-res-code="false" :control-page="true">
      <div class="no-mobile-support-content">
        <div class="big-text" style="margin-bottom: 30px;">
          Please visit <span style="color: #04ca8f;">VCTTools.net</span> on your desktop or tablet.
        </div>
        <div style="width: 100%; display: flex; justify-content: center;">
          <UILargeButton :disabled="linkCopied" disabled-label="Link already copied" @click="copyLink()">Copy link</UILargeButton>
        </div>
        <div style="margin-top: 30px;">VCT Tools is optimized for larger screens.</div>
      </div>
    </HeaderContainer>
  </div>
</template>

<style scoped>
.no-mobile-support {
  display: block;

  background: radial-gradient(circle, rgba(33, 52, 66, 1) 5%, rgba(28, 66, 73, 1) 100%);
  width: 100vw;
  height: 100vh;

  z-index: 100000000000000000000 !important;
  position: fixed;
  top: 0;
  left: 0;
}

.no-mobile-support-content {
  width: 100%;
  text-align: center;

  margin-top: 10vh;
}

.big-text {
  font-size: 18pt;
  color: white;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import HeaderContainer from "@/components/HeaderContainer.vue";
import { UILargeButton } from "vct-tools-components";

const linkCopied = ref(false);

const copyLink = () => {
  navigator.clipboard.writeText("https://vcttools.net");
  linkCopied.value = true;
};
</script>
