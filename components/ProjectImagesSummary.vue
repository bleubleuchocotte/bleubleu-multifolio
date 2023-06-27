<script setup lang="ts">
import { ImageField } from "@prismicio/types";
defineProps({
  images: {
    type: Array<ImageField>,
    required: false,
    default: [],
  },
});
</script>

<template>
  <div class="project-images-summary__grid">
    <PrismicImage v-for="(image, i) in images" :key="i" :field="image" />
  </div>
</template>

<style scoped lang="scss">
.project-images-summary__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
}
</style>
