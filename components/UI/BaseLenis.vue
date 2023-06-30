<script setup lang="ts">
import Lenis from "@studio-freight/lenis";
import type { LenisTarget } from "@/type/types";

const props = defineProps({
  orientation: {
    type: String as PropType<"vertical" | "horizontal">,
    required: false,
    default: "vertical",
  },
  target: {
    type: [String, Number, Object] as PropType<LenisTarget>,
    required: false,
    default: undefined,
  },
});

onMounted(() => {
  if (container.value === null) return;
  lenis = new Lenis({
    wrapper: container.value, // element which has overflow
    content: container.value, // usually wrapper's direct child
    orientation: props.orientation,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});

const container = ref(null);
let lenis: Lenis;

const styles = reactive({
  overflow:
    props.orientation === "vertical" ? "hidden scroll" : "scroll hidden",
});

watch(
  () => props.target,
  () => {
    if (props.target) lenis.scrollTo(props.target);
  }
);
</script>

<template>
  <div ref="container" data-lenis :style="styles">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
div[data-lenis] {
  height: 100%;
}
</style>
