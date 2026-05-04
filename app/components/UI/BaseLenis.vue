<script setup lang="ts">
import type { LenisOptions } from "lenis";
import type { VueLenis } from "lenis/vue";
import "lenis/dist/lenis.css";

type ComponentProps = {
  target?: number | string | HTMLElement;
  requestLenis?: boolean;
  orientation?: LenisOptions["orientation"];
};

const props = withDefaults(defineProps<ComponentProps>(), {
  requestLenis: false,
  orientation: "vertical",
  target: undefined,
});

const lenisRef = useTemplateRef<InstanceType<typeof VueLenis>>("lenis");
const velocity = ref(0);

const options = computed<LenisOptions>(() => ({
  orientation: props.orientation,
}));

const wrapperProps = computed(() => ({
  style: `--v: ${velocity.value}`,
  class:
    "pointer-coarse:overflow-[overlay] h-full overflow-hidden [&>div]:contents",
}));

watchEffect(() => {
  const lenis = lenisRef.value?.lenis;
  if (!lenis || !props.requestLenis) {
    return;
  }
  const onScroll = () => {
    velocity.value = lenis.velocity;
  };
  lenis.on("scroll", onScroll);
  onWatcherCleanup(() => lenis.off("scroll", onScroll));
});

watch(
  () => props.target,
  (target) => {
    if (target === undefined) {
      return;
    }
    lenisRef.value?.lenis?.scrollTo(target);
  },
);
</script>

<template>
  <VueLenis ref="lenis" :options :props="wrapperProps">
    <slot />
  </VueLenis>
</template>
