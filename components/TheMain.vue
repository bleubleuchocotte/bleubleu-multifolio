<script setup lang="ts">
import ProjectsListVertical from "./ProjectsListVertical.vue";
import { Main, Project } from "@/type/types";
const props = defineProps({
  params: {
    type: Object as PropType<Main>,
    required: true,
  },
});

// Permet de typer les projets venant de prismic
const projects = props.params.projects.map(
  (prismicEl) => prismicEl.data as Project
);
</script>

<template>
  <main class="main">
    <TheAboutMe :about="params.about" />
    <div class="main__left">
      <div class="main__left-container">
        <p>Liste des projets</p>
        <ProjectsListVertical :projects="projects" />
      </div>
    </div>
    <UIBaseSeparator :width="1" />
    <div class="main__right"><p>Liste des projets scrollable</p></div>
  </main>
</template>

<style scoped lang="scss">
.main {
  flex: 1;
  display: flex;
  position: relative;

  &__left {
    @include left;
    &-container {
      padding-left: $bookmark-width;
    }
  }

  &__right {
    @include right;
  }
}
</style>
