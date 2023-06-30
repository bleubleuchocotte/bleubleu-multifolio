<script setup lang="ts">
import { Main } from "@/type/types";
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
              (id) => (scrollToProjectId = `[data-project-h-id='${id}']`)
            "
          />
        </UIBaseLenis>
      </section>
    </div>
    <UIBaseSeparator :width="1" />
    <UIBaseLenis
      :orientation="'horizontal'"
      class="main__right"
      :target="scrollToProjectId"
    >
      <ProjectsListHorizontal
        :projects="params.projects"
        @target="(id) => callback(id, false)"
        @target-then-scroll="(id) => callback(id, true)"
      />
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
    @include right;
    display: flex;

    padding-left: 0;
  }
}
</style>
