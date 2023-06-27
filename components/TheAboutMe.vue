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

const isOpen = ref(false);
</script>

<template>
  <section class="section" :class="{ open: isOpen }" @click="isOpen = !isOpen">
    <UIBaseLenis class="section__text">
      <div class="section__text-image">
        <PrismicImage :field="about.prismic.data.me" />
      </div>
      <PrismicRichText :field="about.prismic.data.text" />
    </UIBaseLenis>
    <div class="section__bookmark">
      <p class="section__bookmark-heading">{{ about.fullName }}</p>
      <div class="section__bookmark-flex">
        <div>
          <p>contact & more</p>
          <p>Learn to know me here</p>
        </div>
        <div class="section__bookmark-arrow">
          <IconBaseArrow />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section {
  transition: transform 0.3s ease-out;
  transform: translate(calc($bookmark-width - 50vw));
  &.open {
    transform: translate(0);

    .section__bookmark-arrow {
      transform: rotate(0);
    }
  }
  display: flex;

  position: absolute;
  left: 0;

  height: 100%;
  width: 50vw;

  background-color: var(--accent-color);
  color: var(--text-accent-color);

  border-radius: 0 $border-radius-big $border-radius-big 0;

  &__text {
    width: 100%;
    padding: $gutter;

    font-size: $font-size-big;

    &-image {
      width: fit-content;
      margin-bottom: $gutter;

      border: 1px solid var(--text-accent-color);
      border-radius: $border-radius;
    }
  }

  &__bookmark {
    writing-mode: vertical-rl;
    rotate: 180deg;

    display: flex;
    justify-content: space-between;

    padding: 10px;

    width: $bookmark-width;

    border-right: 1px solid var(--text-accent-color);

    &-heading {
      font-size: $font-size-big;
      text-transform: uppercase;
    }

    &-flex {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

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
