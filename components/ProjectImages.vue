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
  <div style="position: relative">
    <BoxScrollable :title="''" class="pb-0">
      <img
        v-for="(image, index) in project.images"
        :key="index"
        :src="image.url"
        alt=""
      />
    </BoxScrollable>

    <div class="help">
      <p>
        Don't forget to scroll <i><IconArrowDown /></i>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pb-0 {
  padding-bottom: 0;
}
.help {
  position: absolute;
  z-index: 1;
  bottom: 0;

  width: 100%;

  p {
    display: flex;
    gap: 15px;
    width: fit-content;

    text-align: center;
    text-transform: uppercase;
    color: $background-color;

    padding: 10px;
    margin: 0 auto;

    border-radius: 12px 12px 0 0;
    background-color: $text-color;
  }
}
img {
  border-radius: 12px;
  width: 100%;
}
</style>
