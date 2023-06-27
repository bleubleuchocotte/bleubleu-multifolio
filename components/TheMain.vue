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
      <section class="main__left-container">
        <p>My projects</p>
        <ProjectsListVertical :projects="projects" />
      </section>
    </div>
    <UIBaseSeparator :width="1" />
    <div class="main__right">
      <p>More info</p>
    </div>
  </main>
</template>

<style scoped lang="scss">
.main {
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;

  &__left {
    @include left;
    &-container {
      height: 100%;
      padding-left: $bookmark-width;
      padding-bottom: $gutter;
    }
  }

  &__right {
    @include right;
  }
}
</style>
