<script setup lang="ts">
import BoxScrollable from "./UI/BoxScrollable.vue";
import { ProjectType } from "~/type/types";

defineProps({
  project: {
    type: Object as PropType<ProjectType>,
    required: true,
  },
});
</script>

<template>
  <BoxScrollable :title="''">
    <img
      v-for="(image, index) in project.images"
      :key="index"
      :src="image.url"
      alt=""
    />
  </BoxScrollable>
</template>

<style scoped lang="scss">
img {
  border-radius: 12px;
}
</style>
