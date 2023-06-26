<script setup lang="ts">
const props = defineProps({
  width: {
    type: Number,
    required: true,
    default: 1,
  },
});

const styles = reactive({
  "--width": `${props.width}px`,
});
</script>

<template>
  <div :style="styles"></div>
</template>

<style scoped lang="scss">
div {
  height: 100%;
  width: var(--width);

  background-color: var(--border-color);
}
</style>
