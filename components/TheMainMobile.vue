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
  <div class="main-mobile">
    <main>
      <p>My projects</p>
      <UIBaseAccordion
        v-for="(project, i) in params.projects"
        :key="project.id"
        :project="project"
        :index="i"
      >
        <ProjectDetailsMobile :project="project" :index="i" />
      </UIBaseAccordion>
    </main>

    <footer>
      <TheAboutMeMobile :about="params.about" email="te" />
    </footer>
  </div>
</template>

<style scoped lang="scss">
.main-mobile {
  display: flex;
  flex-direction: column;
  @include gap(2);
  @include prop("padding-inline");
  @include prop("padding-bottom");
}
</style>
