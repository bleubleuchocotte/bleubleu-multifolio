<script setup lang="ts">
import type { ImageField } from "@prismicio/client";
import type { TheAboutMeProps } from "./TheAboutMe.vue";
import type { ProjetDocument } from "~~/prismicio-types";

type ComponentProps = {
  aboutMe: TheAboutMeProps;
  endingCardImage: ImageField;
  projects?: ProjetDocument[];
};

defineProps<ComponentProps>();

const scrollToProjectId = ref<string>();
const idToProject = ref<string>();

const projectInGallery = ref<ProjetDocument | null>(null);

function callback(id: string, hasToScroll: boolean) {
  idToProject.value = id;
  if (hasToScroll) {
    scrollToProjectId.value = `[data-project-h-id='${id}']`;
  } else {
    scrollToProjectId.value = undefined;
  }
}
</script>

<template>
  <main
    class="gradient-scroll-right relative flex overflow-hidden max-lg:flex-col max-lg:gap-fluid"
  >
    <TheAboutMe :data="aboutMe" />
    <div class="px-fluid flex-[0.3] max-lg:h-[20vh]">
      <section class="pb-fluid h-full lg:pl-17.5">
        <p>{{ $t("project.title.vertical") }}</p>
        <UIBaseLenis orientation="vertical">
          <ProjectListVertical
            v-if="projects"
            :projects
            :id-to-active="idToProject"
            @target="
              (id: string) =>
                (scrollToProjectId = `[data-project-h-id='${id}']`)
            "
          />
        </UIBaseLenis>
      </section>
    </div>
    <UIBaseSeparator :width="1" />
    <UIBaseLenis
      orientation="horizontal"
      class="relative flex flex-[0.7] max-lg:flex-col max-lg:gap-fluid pr-[calc(var(--spacing-fluid)*2)]"
      :target="scrollToProjectId"
      :request-lenis="true"
    >
      <ProjectListHorizontal
        v-if="projects"
        :projects
        @target="(id) => callback(id, false)"
        @target-then-scroll="(id) => callback(id, true)"
        @gallery="(project) => (projectInGallery = project)"
        @go-to-end="() => (scrollToProjectId = `end`)"
        @go-to-start="() => (scrollToProjectId = 'start')"
      />

      <ProjectEndingCard
        :email="aboutMe.email"
        :ending-card-image="endingCardImage"
        @go-to-start="() => (scrollToProjectId = 'start')"
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
