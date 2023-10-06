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
const indexsAccordionOpen = reactive<{
  last: number | null;
  current: number | null;
}>({ last: null, current: null });

const onClick = (index: number) => {
  indexsAccordionOpen.current = index;

  if (
    indexsAccordionOpen.last !== null &&
    indexsAccordionOpen.last !== indexsAccordionOpen.current
  ) {
    // Un accordéon est ouvert et ce n'est pas celui qui vient d'être cliqué
    accordions.value[indexsAccordionOpen.last].isOpen = false;
  }
  indexsAccordionOpen.last = index;
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
