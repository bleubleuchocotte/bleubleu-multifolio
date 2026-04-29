<script setup lang="ts">
import Lenis from "lenis";

type ComponentProps = {
  target?: number | string | HTMLElement;
  requestLenis?: boolean;
  orientation?: "vertical" | "horizontal";
};

const props = withDefaults(defineProps<ComponentProps>(), {
  requestLenis: false,
  orientation: "vertical",
  target: undefined,
});

const container = ref(null);
let lenis: Lenis | undefined;
let rafId: number | undefined;

const velocity = ref(0);

onMounted(() => {
  if (container.value === null) {
    return;
  }
  lenis = new Lenis({
    wrapper: container.value, // element which has overflow
    content: container.value, // usually wrapper's direct child
    orientation: props.orientation,
  });

  function raf(time: number) {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  if (props.requestLenis) {
    lenis.on("scroll", () => {
      velocity.value = lenis?.velocity ?? 0;
    });
  }

  rafId = requestAnimationFrame(raf);
});

onUnmounted(() => {
  if (rafId !== undefined) {
    cancelAnimationFrame(rafId);
  }
  lenis?.destroy();
  lenis = undefined;
});

watch(
  () => props.target,
  () => {
    if (props.target) {
      lenis?.scrollTo(props.target);
    }
  },
);
</script>

<template>
  <div ref="container" data-lenis :style="`--v: ${velocity}`">
    <slot />
  </div>
</template>

<style scoped lang="scss">
div[data-lenis] {
  height: 100%;
  overflow: hidden;
  @media #{$low-accuracy} {
    overflow: overlay;
  }
}
</style>
