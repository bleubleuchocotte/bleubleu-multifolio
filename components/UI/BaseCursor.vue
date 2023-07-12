<script lang="ts" setup>
const props = defineProps({
  size: {
    type: Number,
    required: false,
    default: 50,
  },
});

onMounted(() => {
  document.addEventListener("mousemove", callback);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", callback);
});

const callback = (e: MouseEvent) => {
  x.value = e.clientX;
  y.value = e.clientY;

  if (
    e.target instanceof HTMLButtonElement ||
    e.target instanceof HTMLLIElement ||
    e.target instanceof HTMLAnchorElement
  ) {
    isExpand.value = true;
  } else {
    isExpand.value = false;
  }
};

const styles = ref();
const x = ref(0);
const y = ref(0);
const isExpand = ref(false);

watch(x, () => {
  styles.value = {
    "--size": props.size + "px",
    "--x": x.value + "px",
    "--y": y.value + "px",
    "--scale": isExpand.value ? "2" : "1",
  };
});
</script>

<template>
  <div class="cursor__container" :style="styles" :class="{ expand: isExpand }">
    <div class="cursor__blur"></div>
  </div>
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

    transform: translate(var(--xCenter), var(--yCenter)) scale(var(--scale));

    background-color: var(--background-color);

    border: 1px solid var(--accent-color);
    border-radius: 50%;
    mix-blend-mode: exclusion;

    overflow: hidden;

    &.expand {
      border: 1px solid var(--background-color);
      background-color: var(--accent-color);
    }
  }

  // &__blur {
  //   width: 100%;
  //   height: 100%;
  //   background-color: var(--accent-color);
  //   mix-blend-mode: exclusion;
  // }
}
</style>
