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
    e.target instanceof HTMLAnchorElement ||
    (e.target instanceof HTMLDivElement &&
      e.target.attributes.getNamedItem("role")?.value === "button")
  ) {
    isExpand.value = true;
  } else {
    isExpand.value = false;
  }
};

const x = ref(0);
const y = ref(0);
const isExpand = ref(false);
const isVisible = ref(false);
const container = ref();

watch([x, y], () =>
  useAnimate(
    container,
    {
      transform: `translate3d(${x.value - props.size / 2}px, ${
        y.value - props.size / 2
      }px, 0)`,
    },
    {
      duration: 800,
      fill: "forwards",
      easing: "ease-out",
    }
  )
);
watchOnce([x, y], () => {
  isVisible.value = true;
});
</script>

<template>
  <div class="cursor__container" :class="{ 'is-visible': isVisible }">
    <div ref="container">
      <div
        class="cursor__shape"
        :class="{ expand: isExpand }"
        :style="{ '--size': `${props.size}px` }"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cursor {
  &__container {
    opacity: 0;
    &.is-visible {
      opacity: 1;
    }

    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

    height: 100vh;
    width: 100vw;

    pointer-events: none;

    overflow: hidden;
  }

  &__shape {
    transition: all 0.2s ease-out;
    height: var(--size);
    width: var(--size);

    border: 1px solid var(--accent-color);
    border-radius: 50%;

    &.expand {
      border: 1px solid var(--background-color);
      transform: scale(1.75);
      backdrop-filter: invert(1) grayscale(1);

      box-shadow: 0px 0px 30px 0px var(--accent-color-80);
    }
  }
}
</style>
