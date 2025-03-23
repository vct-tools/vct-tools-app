<template>
  <span class="plus-label">
    PRO
  </span>
</template>

<style scoped>
.plus-label {
  background-color: #003d53;
  color: white;
  padding: 3px 10px;

  border-radius: 5px;
  margin-left: 1em;

  cursor: help;

  position: relative;
}

.plus-label:hover::after {
  content: "This feature requires you to subscribe to VCT Tools PRO.";

  position: absolute;
  background-color: #003d53;
  color: white;

  top: 2em;
  left: 50%;
  transform: translateX(-50%);
  padding: 3px 10px;

  border-radius: 5px;

  width: 200px;

  z-index: 10000;
}
</style>