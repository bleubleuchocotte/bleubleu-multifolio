<script setup lang="ts">
import { Main, Project } from "@/type/types";
defineProps({
  params: {
    type: Object as PropType<Main>,
    required: true,
  },
});

const callback = (id: string, hasToScroll: boolean) => {
  idToProject.value = id;
  if (hasToScroll) scrollToProjectId.value = `[data-project-h-id='${id}']`;
  else scrollToProjectId.value = undefined;
};

const scrollToProjectId = ref<string>();
const idToProject = ref<string>();

const projectInGallery = ref<Project | null>(null);
</script>

<template>
  <main class="main">
    <TheAboutMe :about="params.about" />
    <div class="main__left">
      <section class="main__left-container">
        <p>My projects</p>
        <UIBaseLenis :orientation="'vertical'">
          <ProjectsListVertical
            :projects="params.projects"
            :id-to-active="idToProject"
            @target="
              (id: string) => (scrollToProjectId = `[data-project-h-id='${id}']`)
            "
          />
        </UIBaseLenis>
      </section>
    </div>
    <UIBaseSeparator :width="1" class="desktop-only" />
    <UIBaseLenis
      :orientation="'horizontal'"
      class="main__right"
      :target="scrollToProjectId"
    >
      <ProjectsListHorizontal
        :projects="params.projects"
        @target="(id: string) => callback(id, false)"
        @target-then-scroll="(id: string) => callback(id, true)"
        @gallery="(project: Project) => (projectInGallery = project)"
      />
    </UIBaseLenis>

    <Transition name="slide-fade">
      <TheGallery
        v-if="projectInGallery != null"
        :project="projectInGallery"
        @close="projectInGallery = null"
      />
    </Transition>
  </main>
</template>

<style scoped lang="scss">
.main {
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
    position: relative;
    display: flex;

    padding-left: 0;

    &::before {
      content: "";
      position: fixed;
      right: 0;
      width: calc($gutter + $gutter / 2);
      height: 100%;
      background: linear-gradient(
        90deg,
        hsla(0, 0%, 100%, 0),
        var(--background-color)
      );
      z-index: 1;
      pointer-events: none;
    }
  }
}
</style>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
