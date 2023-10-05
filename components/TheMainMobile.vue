<script setup lang="ts">
import { Main } from "@/type/types";
defineProps({
  params: {
    type: Object as PropType<Main>,
    required: true,
  },
});
</script>

<template>
  <main class="main-mobile">
    <p>My projects</p>
    <UIBaseAccordion
      v-for="(project, i) in params.projects"
      :key="project.id"
      :project="project"
      :index="i"
      class="main-mobile__accordion"
    >
      <ProjectDetailsMobile :project="project" :index="i" />
    </UIBaseAccordion>
  </main>
</template>

<style scoped lang="scss">
.main-mobile {
  @include padding();

  &__accordion {
    // border-bottom: 1px solid var(--border-color);
    // @include prop("padding-block");
  }
}
</style>
