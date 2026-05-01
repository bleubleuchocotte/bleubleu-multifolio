<script setup lang="ts">
import type BaseAccordion from "@/components/UI/BaseAccordion.vue";
import type { TheAboutMeProps } from "./TheAboutMe.vue";

type ComponentProps = {
  aboutMe: TheAboutMeProps;
};

defineProps<ComponentProps>();

const accordions = ref<InstanceType<typeof BaseAccordion>[]>([]);
const arrAriaHidden = computed(() => accordions.value.map((el) => !el.isOpen));

const { getAllProjects } = usePrismicClient();
const { data: projects } = await getAllProjects();
</script>

<template>
  <div v-if="projects" class="main-mobile">
    <main>
      <p>{{ $t("project.title.vertical") }}</p>
      <UIBaseAccordion
        v-for="(project, i) in projects"
        :key="project.id"
        ref="accordions"
        :state-key="`Accordion mobile index: ${i}`"
      >
        <template #title>
          <ProjectMobileAccordionHeader
            :project
            :index="i"
            :active="accordions[i]?.isOpen"
          />
        </template>
        <template #content>
          <ProjectMobileDetails
            :project
            :index="i"
            :hidden="arrAriaHidden[i] ?? true"
          />
        </template>
      </UIBaseAccordion>
    </main>

    <footer>
      <TheAboutMeMobile :data="aboutMe" />
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
