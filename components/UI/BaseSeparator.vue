<script setup lang="ts">
const props = defineProps({
  width: {
    type: Number,
    required: false,
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
  position: relative;

  height: 100%;
  width: var(--width);

  background-color: var(--border-color);

  &::before {
    content: "";
    position: absolute;
    left: 1px;
    width: calc($gutter + $gutter / 2);
    height: 100%;
    background: linear-gradient(
      270deg,
      hsla(0, 0%, 100%, 0),
      var(--background-color)
    );
    z-index: 1;
    pointer-events: none;
  }
}
</style>
