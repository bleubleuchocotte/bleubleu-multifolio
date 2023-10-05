<script setup lang="ts">
import { Main } from "@/type/types";
import { emailKey } from "@/type/keys";
defineProps({
  params: {
    type: Object as PropType<Main>,
    required: true,
  },
});

const email = inject<string>(emailKey, "email not provided");

const accordions = ref();
const indexAccordionOpen = ref<number | null>(null);

const onClick = (index: number) => {
  if (indexAccordionOpen.value !== null) {
    // Un accordéons a déjà été ouvert
    accordions.value[indexAccordionOpen.value].isOpen = false;
  }

  indexAccordionOpen.value = index;
};
</script>

<template>
  <div class="main-mobile">
    <main>
      <p>My projects</p>
      <UIBaseAccordion
        v-for="(project, i) in params.projects"
        :key="project.id"
        ref="accordions"
        :project="project"
        :index="i"
        @click="onClick(i)"
      >
        <ProjectDetailsMobile :project="project" :index="i" />
      </UIBaseAccordion>
    </main>

    <footer>
      <TheAboutMeMobile :about="params.about" :email="email" />
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
