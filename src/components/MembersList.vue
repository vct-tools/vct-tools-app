<template>
  <div class="members">
    <div class="member" v-for="(member, i) in members" :key="i">
      <div class="memberBanner">
        <img src="https://placehold.co/48x48?text=Player\nCard" />
      </div>
      <div class="memberInformation">
        <div class="memberName">
          {{ member.name }}
        </div>
        <div class="memberTagline">#{{ member.tagline }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.members {
  display: flex;
  flex-direction: column;
  gap: 1px;

  width: 100%;
  height: 100%;
}

.member {
  width: 100%;
  height: 40px;
  display: flex;

  background-color: #54758142;
}

.memberBanner {
  height: 100%;
  aspect-ratio: 1/1;
}

.memberBanner img {
  width: 100%;
  height: 100%;
}

.memberInformation {
  flex: 1;
  padding-left: 5px;
  display: flex;
  flex-direction: column;

  justify-content: center;
}

.memberInformation .memberTagline {
  font-size: 9pt;
  color: #adadad;
}
</style>

<script setup lang="ts">
defineProps<{
  members: { name: string; tagline: string }[];
}>();
</script>
