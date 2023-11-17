<script setup lang="ts">
import { Project, WebsiteType } from "@/type/types";

defineProps({
  projects: {
    type: Array<Project>,
    required: true,
  },
  website: {
    type: Object as PropType<WebsiteType>,
    required: true,
  },
});

const accordions = ref<any[]>([]);
const arrAriaHidden = computed(() => accordions.value.map((el) => !el.isOpen));
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
