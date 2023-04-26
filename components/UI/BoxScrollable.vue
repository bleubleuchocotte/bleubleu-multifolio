<script setup lang="ts">
import Lenis from "@studio-freight/lenis";

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: null,
  },
  hasToEmit: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["scroll"]);

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

  if (props.hasToEmit) {
    lenis.on("scroll", (e: any) => {
      emit("scroll", e);
    });
  }

  requestAnimationFrame(raf);
});
</script>

<template>
  <section class="section">
    <p v-if="title" class="section__title">{{ title }}</p>

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

  padding: 12px 15px;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 5vh;
    background: linear-gradient(
      180deg,
      hsla(0, 0%, 100%, 0),
      $background-color
    );

    pointer-events: none;
    z-index: 1;
  }

  &__title {
    padding-bottom: 10px;
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
