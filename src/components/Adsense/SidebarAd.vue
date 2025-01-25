<template>
  <div class="adcontainer" v-if="!hidden">
    <ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-5900837394205594"
     data-ad-slot="8283444038"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
     <UIButton @click="hidden = true;">Hide</UIButton>
  </div>
</template>

<style scoped>
.adcontainer {
  display: block;
  width: 100%;
}
</style>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import UIButton from '@/components/UIElement/UIButton.vue';

const hidden = ref(false);

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

onMounted(() => {
  if (typeof window !== 'undefined' && window.adsbygoogle) {
    window.adsbygoogle.push({});
  }
});
</script>
