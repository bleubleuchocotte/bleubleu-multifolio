<script setup lang="ts">
import { Project } from "~/type/types";

defineProps({
  projects: {
    type: Array<Project>,
    required: true,
  },
});
const emit = defineEmits<{
  (e: "target", payload: string): void;
}>();

const callback = (e: MouseEvent | KeyboardEvent, id: string) => {
  // Si un projet est déjà actif, on remove le style
  if (projectActive.value) {
    projectActive.value.classList.remove("active");
  }

  // On attribut la nouvelle valeur
  projectActive.value = containers.value.find((el) => el === e.target);
  if (!projectActive.value) return;
  projectActive.value.classList.add("active");

  emit("target", id);
};

const containers = ref<Array<HTMLElement>>([]);
const projectActive = ref<HTMLElement>();
</script>

<template>
  <ul class="projects-list-vertical">
    <li
      v-for="(project, i) in projects"
      ref="containers"
      :key="project.id"
      class="projects-list-vertical__element"
      tabindex="0"
      @click="(e) => callback(e, project.id)"
      @keypress.enter="(e) => callback(e, project.id)"
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
  padding-top: $gutter;

  &__element {
    transition: all cubic-bezier(0.63, 0, 0.78, 0.99) 0.2s;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-color);

    padding-block: calc($gutter / 2);

    cursor: pointer;

    &:hover,
    &:focus,
    &.active {
      color: var(--accent-color);
      border-bottom: 1px solid var(--accent-color);
    }

    &.active &-left:before {
      width: 10px;
      margin-right: 5px;
    }

    &-left,
    &-right {
      pointer-events: none;
    }

    &-left {
      display: flex;
      text-transform: uppercase;
      align-self: flex-end;

      &::before {
        transition: all cubic-bezier(0.63, 0, 0.78, 0.99) 0.2s;
        content: "";
        height: 1px;
        width: 0;
        margin-right: 0;
        background-color: var(--accent-color);

        align-self: center;
      }

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
