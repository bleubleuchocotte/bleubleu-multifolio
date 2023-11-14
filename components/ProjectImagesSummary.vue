<script setup lang="ts">
import { ImageType } from "@/type/types";

defineProps({
  images: {
    type: Array<ImageType>,
    required: false,
    default: [],
  },
});
</script>

<template>
  <div class="project-images-summary__grid">
    <template v-for="image in images" :key="image.id">
      <div class="project-images-summary__grid-item" :data-type="image.type">
        <PrismicImage
          v-for="field in Object.values(image.field)"
          :key="image.id + field.url"
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
    @include prop("gap", 0.8);

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

      &[data-type="image-full"] {
        & > img {
          aspect-ratio: 16/9;
        }
      }

      &[data-type="image-duo"] {
        & > img {
          aspect-ratio: 1;
        }
      }

      display: flex;
      @include prop("gap", 0.8);

      overflow: hidden;

      & > img {
        @include border-radius();
        min-width: 0;
        height: auto;
      }
    }
  }
}
</style>
