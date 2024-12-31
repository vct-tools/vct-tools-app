<template>
    <button class="ui-button" @click="onClick" :disabled="$props.disabled">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    disabled: Boolean
});

const emit = defineEmits(["click"]);

const onClick = () => {
    if (!props.disabled) {
        emit("click");
    }
}
</script>

<style scoped>
button {
    padding: 7px 0;
    width: 100%;

    text-align: center;

    border: none;
    background-color: #547581b2;
    color: #e0ebb9;

    font-size: 10pt;
    font-family: "Din Next", sans-serif;

    display: inline-block;

    position: relative;

    margin-bottom: 2px;
}

button:hover {
    background-color: #547581d0;
    cursor: pointer;
}

button:disabled {
    background-color: #54758150;
    cursor: auto;
}
</style>