<script setup lang="ts">
import Lenis from "@studio-freight/lenis";
import { PropType } from "nuxt/dist/app/compat/capi";

const props = defineProps({
  orientation: {
    type: String as PropType<"vertical" | "horizontal">,
    required: false,
    default: "vertical",
  },
});

onMounted(() => {
  if (container.value === null) return;
  const lenis = new Lenis({
    wrapper: container.value, // element which has overflow
    content: container.value, // usually wrapper's direct child
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});

const container = ref(null);

const styles = reactive({
  overflow: props.orientation === "vertical" ? "auto scroll" : "scroll auto",
});
</script>

<template>
  <div ref="container" :style="styles">
    <slot></slot>
  </div>
</template>
