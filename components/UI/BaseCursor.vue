<script lang="ts" setup>
import { useMouse } from "@vueuse/core";

const props = defineProps({
  size: {
    type: Number,
    required: false,
    default: 50,
  },
});

const { x, y } = useMouse();

watch(x, () => {
  styles.value = {
    "--size": props.size + "px",
    "--x": x.value + "px",
    "--y": y.value + "px",
  };
});

const styles = ref();
</script>

<template>
  <div class="cursor__container" :style="styles"></div>
</template>

<style scoped lang="scss">
.cursor {
  &__container {
    --xCenter: calc(var(--x) - var(--size) / 2);
    --yCenter: calc(var(--y) - var(--size) / 2);
    transition: all 0.2s ease-out;
    position: absolute;
    z-index: 100;

    pointer-events: none;

    height: var(--size);
    width: var(--size);

    transform: translate(var(--xCenter), var(--yCenter));

    background-color: var(--background-color);

    border: 1px solid var(--accent-color);
    border-radius: 50%;
    mix-blend-mode: exclusion;

    overflow: hidden;

    &.expand {
      --xCenter: calc(var(--x) - var(--size));
      --yCenter: calc(var(--y) - var(--size));
      height: calc(var(--size) * 2);
      width: calc(var(--size) * 2);
    }
  }
}
</style>
