<script setup lang="ts">
import { Project } from "~/type/types";

const props = defineProps({
  projects: {
    type: Array<Project>,
    required: true,
  },

  idToActive: {
    type: String,
    required: false,
    default: undefined,
  },
});
const emit = defineEmits<{
  (e: "target", payload: string): void;
}>();

onMounted(() => {
  projectActive.value = containers.value[0];
  projectActive.value.classList.add("active");
});

const callback = (e: MouseEvent | KeyboardEvent, id: string) => {
  // Si un projet est déjà actif, on remove le style
  if (projectActive.value) {
    projectActive.value.classList.remove("active");
  }

  // On attribut la nouvelle valeur
  projectActive.value = containers.value.find((el) => el === e.target);
  if (!projectActive.value) return;
  projectActive.value.classList.add("active");

  (e.target as HTMLElement).blur();
  emit("target", id);
};

const containers = ref<Array<HTMLElement>>([]);
const projectActive = ref<HTMLElement>();

watch(
  () => props.idToActive,
  () => {
    // Logique pour activer un projet depuis le scroll des projets horizontaux
    if (projectActive.value) {
      projectActive.value.classList.remove("active");
    }
    projectActive.value = containers.value.find(
      (el) =>
        el.attributes.getNamedItem("data-project-v-id")?.nodeValue ===
        props.idToActive
    );
    if (!projectActive.value) return;
    projectActive.value.classList.add("active");
  }
);
</script>

<template>
  <ul class="projects-list-vertical">
    <li
      v-for="(project, i) in projects"
      ref="containers"
      :key="project.id"
      :data-project-v-id="project.id"
      class="projects-list-vertical__element"
      tabindex="0"
      @click="(e) => callback(e, project.id)"
      @keypress.enter="(e) => callback(e, project.id)"
    >
      <h3 class="projects-list-vertical__element-name">
        <UIBaseIndex :index="i + 1" />{{ project.title }}
      </h3>
      <div class="projects-list-vertical__element-data">
        <p>{{ project.date.slice(0, 4) }}</p>
        <p>{{ project.skills[0].skill }}</p>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.projects-list-vertical {
  height: 100%;
  @include prop("padding-top");

  &__element {
    @include transition(all, 0.2s, cubic-bezier(0.63, 0, 0.78, 0.99));
    display: flex;
    justify-content: space-between;
    @include gap(0.5);
    border-bottom: 1px solid var(--border-color);

    @include prop("padding-block", 0.5);

    cursor: pointer;

    &:hover,
    &:focus-within,
    &.active {
      color: var(--accent-color);
      border-bottom: 1px solid;
    }

    &.active &-name:before {
      width: 10px;
      margin-right: 5px;
    }

    &-name,
    &-data {
      pointer-events: none;
    }

    &-name {
      display: flex;
      text-transform: uppercase;
      align-self: flex-end;

      white-space: nowrap;

      &::before {
        @include transition(all, 0.2s, cubic-bezier(0.63, 0, 0.78, 0.99));
        content: "";
        height: 1px;
        width: 0;
        margin-right: 0;
        background-color: var(--accent-color);

        align-self: center;
      }
    }

    &-data {
      text-align: right;
      & > p {
        @include font("small");
      }
    }
  }
}
</style>
