<script setup lang="ts">
import Lenis from "@studio-freight/lenis";

const services = ref([
  "Strategy",
  "Visual identity",
  "web design",
  "art direction",
  "branding",
  "motion design",
]);

const container = ref<HTMLElement>();
const content = ref<HTMLElement>();

useInfiniteScroll(
  container,
  () => {
    services.value.push(...services.value); // Push à l'infinie des valeurs
  },
  {
    interval: 100,
  }
);

onMounted(() => {
  const lenis = new Lenis({
    wrapper: container.value, // element which has overflow
    content: content.value, // usually wrapper's direct child
    infinite: true,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});
</script>

<template>
  <section class="about-list">
    <p class="about-list__title">Services</p>

    <div ref="container" class="about-list__container">
      <div ref="content">
        <div class="about-list__flex">
          <span v-for="(service, index) in services" :key="index">
            {{ service }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-list {
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

    background: linear-gradient(
      180deg,
      #000000 4.2%,
      #ff4fd8 49.82%,
      #000000 96.59%
    );

    background-clip: text;
  }

  &__flex {
    display: flex;
    flex-direction: column;

    span {
      text-transform: uppercase;
      line-height: 42px;
      font-size: 28px;
      color: transparent;
    }
  }
}
</style>
