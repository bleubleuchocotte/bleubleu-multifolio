<script setup lang="ts">
import { Project } from "~/type/types";

defineProps({
  projects: {
    type: Array<Project>,
    required: true,
  },
});
</script>

<template>
  <ul class="projects-list-vertical">
    <li
      v-for="(project, i) in projects"
      :key="project.id"
      class="projects-list-vertical__element"
      tabindex="0"
    >
      <h2 class="projects-list-vertical__element-left">
        <UIBaseIndex :index="i + 1" />{{ project.title }}
      </h2>
      <div class="projects-list-vertical__element-right">
        <p>{{ project.date.slice(0, 4) }}</p>
        <p>{{ project.skills[0].skill }}</p>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.projects-list-vertical {
  height: 100%;
  overflow: scroll;
  padding-left: 5px;
  padding-top: $gutter;

  &__element {
    transition: all ease-out 0.3s;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-color);

    padding-block: calc($gutter / 2);

    cursor: pointer;

    &:hover,
    &:focus {
      color: var(--accent-color);
      border-bottom: 1px solid var(--accent-color);
    }

    &-left {
      text-transform: uppercase;
      align-self: flex-end;

      span {
        display: inline-block;
        width: calc($gutter * 2);
      }
    }

    &-right {
      text-align: right;
    }
  }
}
</style>
