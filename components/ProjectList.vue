<script setup lang="ts">
import BoxScrollable from "./UI/BoxScrollable.vue";
import { ProjectPrismicType } from "~/type/types";

defineEmits(["project"]);

defineProps({
  projects: {
    type: Array<ProjectPrismicType>,
    required: true,
  },
});

const marker = ref<string>(
  `url("data:image/svg+xml,%3Csvg width='18' height='19' viewBox='0 0 18 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_d_30_23)'%3E%3Ccircle cx='8.9751' cy='9.56062' r='3.82178' stroke='%23FF4FD8' stroke-width='2' shape-rendering='crispEdges'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d_30_23' x='0.15332' y='0.738846' width='17.6436' height='17.6436' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation='2'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.98 0 0 0 0 0 0 0 0 0 1 0 0 0 0.4 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_30_23'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_30_23' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A");`
);
</script>

<template>
  <BoxScrollable :title="'Projets'">
    <div
      v-for="(project, index) in projects"
      :key="index"
      class="projects-list__item"
      tabindex="0"
      @click="$emit('project', project)"
    >
      <p class="projects-list__item-title">{{ project.title[0].text }}</p>
      <p>{{ index + 1 < 10 ? "0" + (index + 1) : index + 1 }}</p>
      <p>{{ project.date }}</p>
    </div>
  </BoxScrollable>
</template>

<style scoped lang="scss">
.projects-list {
  &__item {
    width: 100%;

    display: flex;
    gap: 10px;

    padding-block: 5px;

    border-bottom: 1px solid $border-color;
    cursor: pointer;

    &:focus {
      color: $accent-color;

      &::before {
        content: v-bind(marker);
        position: relative;
      }
    }
  }
}
</style>
