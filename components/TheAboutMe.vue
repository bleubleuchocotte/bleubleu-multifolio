<script lang="ts" setup>
import { PrismicDocument } from "@prismicio/types";
defineProps({
  about: {
    type: Object as PropType<{
      fullName: String;
      prismic: PrismicDocument;
    }>,
    required: true,
  },
});

onMounted(() => {
  document.addEventListener("keydown", callback);
});

onUnmounted(() => {
  document.removeEventListener("keydown", callback);
});

const callback = (e: KeyboardEvent) => {
  if (isOpen.value === true && e.key === "Escape") isOpen.value = false;
};

const isOpen = ref(false);
const target = ref();

onClickOutside(target, () => {
  if (isOpen.value === true) isOpen.value = false;
});
</script>

<template>
  <section ref="target" class="section" :class="{ open: isOpen }">
    <UIBaseLenis class="section__text">
      <div class="section__text-image">
        <PrismicImage :field="about.prismic.data.me" />
      </div>
      <PrismicRichText :field="about.prismic.data.text" />
    </UIBaseLenis>
    <div
      class="section__bookmark"
      tabindex="0"
      aria-disabled="false"
      role="button"
      @click="isOpen = !isOpen"
      @keydown.enter="isOpen = !isOpen"
      @keydown.space.prevent="isOpen = !isOpen"
    >
      <h1 class="section__bookmark-heading">{{ about.fullName }}</h1>
      <div class="section__bookmark-flex">
        <div>
          <p>contact & more</p>
          <p>Learn to know me here</p>
        </div>
        <div class="section__bookmark-arrow">
          <IconBaseArrowShort :fill="'var(--accent-color)'" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section {
  transition: transform 0.3s ease-out;
  transform: translate(calc($bookmark-width - 1px - 50vw));
  &.open {
    transform: translate(0);

    .section__bookmark-arrow {
      transform: rotate(0);
    }
  }
  display: flex;

  position: absolute;
  z-index: 10;
  left: 0;

  height: 100%;
  width: 50vw;

  background-color: var(--accent-color);
  color: var(--text-accent-color);

  border-radius: 0 $border-radius-big $border-radius-big 0;

  &__text {
    width: 100%;
    @include padding();

    border-right: 1px solid var(--text-accent-color);

    & > p {
      @include font("h2");
    }

    &-image {
      width: fit-content;
      @include prop("margin-bottom");

      border: 1px solid var(--text-accent-color);
      @include border-radius();
    }
  }

  &__bookmark {
    writing-mode: vertical-rl;
    rotate: 180deg;

    display: flex;
    justify-content: space-between;
    @include padding(calc(1 / 3));

    width: $bookmark-width;

    & > * {
      pointer-events: none;
    }

    &-heading {
      text-transform: uppercase;
    }

    &-flex {
      display: flex;
      justify-content: center;
      align-items: center;

      @include gap(calc(1 / 3));

      text-align: right;
    }

    &-arrow {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--background-color);

      transform: rotate(180deg);
    }
  }
}
</style>
