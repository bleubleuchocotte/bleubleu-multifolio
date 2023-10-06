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
    @include gap();

    &-item {
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
      }
      &.h-65 {
        height: 65%;
      }
    }
  }
}
</style>
