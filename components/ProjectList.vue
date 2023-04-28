<script setup lang="ts">
import BoxScrollable from "./UI/BoxScrollable.vue";
import { ProjectPrismicType } from "~/type/types";

const emit = defineEmits(["project"]);

defineProps({
  projects: {
    type: Array<ProjectPrismicType>,
    required: true,
  },
});

function updateActiveProject(
  e: any /* FocusEvent ne fonctionne pas, il ne connait pas target */,
  project: ProjectPrismicType
) {
  emit("project", project);

  // On recherche et supprime la classe "active" dans la liste des projets
  projectsRef.value
    .filter((el) => el.classList.contains("active"))
    .forEach((el) => el.classList.remove("active"));

  e.target.classList.add("active");
}

const projectsRef = ref<HTMLElement[]>([]);
</script>

<template>
  <BoxScrollable :title="'Projets'">
    <div
      v-for="(project, index) in projects"
      :key="index"
      ref="projectsRef"
      class="projects-list__item"
      tabindex="0"
      :class="{ active: index === 0 }"
      @focus="(e) => updateActiveProject(e, project)"
    >
      <div>
        <p class="projects-list__item-title">{{ project.title[0].text }}</p>
        <p>{{ index + 1 < 10 ? "0" + (index + 1) : index + 1 }}</p>
      </div>
      <p>{{ project.date.slice(0, 4) }}</p>
    </div>
  </BoxScrollable>
</template>

<style scoped lang="scss">
.projects-list {
  &__item {
    width: 100%;

    display: flex;
    justify-content: space-between;
    gap: 10px;

    padding-block: 5px;

    border-bottom: 1px solid $border-color;
    cursor: pointer;

    div {
      display: flex;
      flex: 1;
    }
    &-title {
      width: 25%;
    }

    &.active {
      color: $accent-color;
    }
  }
}
</style>
