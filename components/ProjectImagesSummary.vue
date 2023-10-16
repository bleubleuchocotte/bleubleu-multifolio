<script setup lang="ts">
import { Images } from "@/type/types";

defineProps({
  images: {
    type: Array<Images>,
    required: false,
    default: [],
  },
});
</script>

<template>
  <div class="project-images-summary__grid">
    <template v-for="(image, i) in images" :key="i">
      <div
        class="project-images-summary__grid-item"
        :data-type="image.type"
        :class="{
          'h-65': image.type === 'image-full',
          'h-35':
            image.type === 'image-duo' &&
            images.some((el) => el.type === 'image-full'),
          'h-50':
            image.type === 'image-duo' &&
            !images.some((el) => el.type === 'image-full'),
        }"
      >
        <PrismicImage
          v-for="(field, j) in Object.values(image.field)"
          :key="j"
          :field="field"
          widths="defaults"
        />
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.project-images-summary {
  &__grid {
    height: 100%;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    @include prop("gap", 0.9);

    &-item {
      transition: transform 0.1s ease-out;
      &:first-of-type {
        transform: translate3d(calc(var(--v) * 1.5px), 0, 0)
          skewX(calc(var(--v) * -0.02deg));
      }

      &:last-of-type {
        transform: translate3d(calc(var(--v) * 0.75px), 0, 0)
          skewX(calc(var(--v) * -0.02deg));
      }

      display: flex;
      @include gap();

      overflow: hidden;

      & > img {
        @include border-radius();
      }

      &.h-35 {
        height: 35%;
      }
      &.h-50 {
        height: 50%;

        & > img {
          min-width: 0;
        }
      }
      &.h-65 {
        height: 65%;
      }
    }
  }
}
</style>
