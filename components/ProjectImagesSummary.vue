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
      <PrismicImage
        v-for="(field, j) in Object.values(image.field)"
        :key="j"
        :field="field"
        :data-index="i + j"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.project-images-summary__grid {
  height: 100%;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  cursor: pointer;

  [data-index="0"] {
    grid-area: 1 / 1 / 4 / 5;
  }
  [data-index="1"] {
    grid-area: 4 / 1 / 6 / 3;
  }
  [data-index="2"] {
    grid-area: 4 / 3 / 6 / 5;
  }

  & > img {
    border-radius: $border-radius-big;
  }
}
</style>
