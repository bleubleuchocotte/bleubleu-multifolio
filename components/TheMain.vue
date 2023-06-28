<script setup lang="ts">
import ProjectsListVertical from "./ProjectsListVertical.vue";
import { Main } from "@/type/types";
defineProps({
  params: {
    type: Object as PropType<Main>,
    required: true,
  },
});
</script>

<template>
  <main class="main">
    <TheAboutMe :about="params.about" />
    <div class="main__left">
      <section class="main__left-container">
        <p>My projects</p>
        <ProjectsListVertical :projects="params.projects" />
      </section>
    </div>
    <UIBaseSeparator :width="1" />
    <UIBaseLenis :orientation="'horizontal'" class="main__right">
      <ProjectsListHorizontal :projects="params.projects" />
    </UIBaseLenis>
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
    display: flex;
    @include right;
  }
}
</style>
