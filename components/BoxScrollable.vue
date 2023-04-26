<script setup lang="ts">
import Lenis from "@studio-freight/lenis";

defineProps({
  title: {
    type: String,
    required: true,
  },
});

const container = ref<HTMLElement>();
const content = ref<HTMLElement>();

onMounted(() => {
  const lenis = new Lenis({
    wrapper: container.value, // element which has overflow
    content: content.value, // usually wrapper's direct child
    infinite: false,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});
</script>

<template>
  <section class="section">
    <p class="section__title">{{ title }}</p>

    <div ref="container" class="section__container">
      <div ref="content">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section {
  display: flex;
  flex-direction: column;

  position: relative;

  height: 100%;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;

    pointer-events: none;
    z-index: 1;
  }

  &__title {
    padding-block: 10px 20px;
  }

  &__container {
    flex-grow: 1;
    position: relative;
    overflow-y: scroll;
    padding-bottom: 5vh;

    scrollbar-width: none;
    -ms-overflow-style: none;
  }
}
</style>
