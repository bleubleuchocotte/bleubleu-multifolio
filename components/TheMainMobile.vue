<script setup lang="ts">
import { Project } from "@/type/types";

defineProps({
  projects: {
    type: Array<Project>,
    required: true,
  },
});

const { $api } = useNuxtApp();
const website = $api.website;

const accordions = ref<any[]>([]);
const arrAriaHidden = computed(() => accordions.value.map((el) => !el.isOpen));

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
        v-for="(project, i) in projects"
        :key="project.id"
        ref="accordions"
        :project="project"
        :index="i"
        @click="onClick(i)"
      >
        <ProjectDetailsMobile
          :project="project"
          :index="i"
          :hidden="arrAriaHidden[i] ?? true"
        />
      </UIBaseAccordion>
    </main>

    <footer>
      <TheAboutMeMobile
        :params="{ me: website.me, links: website.footer.links }"
      />
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
