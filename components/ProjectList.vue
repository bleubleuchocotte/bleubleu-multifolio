<script setup lang="ts">
import BoxScrollable from "./UI/BoxScrollable.vue";
import { ProjectType } from "~/type/types";

const projects: ProjectType[] = [
  {
    name: "Projet 1",
    year: 2023,
  },
  {
    name: "Projet 1",
    year: 2023,
  },
  {
    name: "Projet 1",
    year: 2023,
  },
  {
    name: "Projet 1",
    year: 2023,
  },
  {
    name: "Projet 1",
    year: 2023,
  },
  {
    name: "Projet 1",
    year: 2023,
  },
  {
    name: "Projet 1",
    year: 2023,
  },
  {
    name: "Projet 1",
    year: 2023,
  },
  {
    name: "Projet 1",
    year: 2023,
  },
  {
    name: "Projet 1",
    year: 2023,
  },
  {
    name: "Projet 1",
    year: 2023,
  },
  {
    name: "Projet 1",
    year: 2023,
  },
  {
    name: "Projet 1",
    year: 2023,
  },
  {
    name: "Projet 1",
    year: 2023,
  },
  {
    name: "Projet 1",
    year: 2023,
  },
  {
    name: "Projet 1",
    year: 2023,
  },
  {
    name: "Projet 1",
    year: 2023,
  },
  {
    name: "Projet 1",
    year: 2023,
  },
];
</script>

<template>
  <BoxScrollable :title="'Projets'">
    <div
      v-for="(project, index) in projects"
      :key="index"
      class="projects-list__item"
    >
      <p>{{ project.name }}</p>
      <p>{{ index < 10 ? "0" + index : index }}</p>
      <p>{{ project.year }}</p>
    </div>
  </BoxScrollable>
</template>

<style scoped lang="scss">
.projects-list {
  &__item {
    display: flex;
    gap: 10px;

    padding-block: 5px;

    border-bottom: 1px solid black;
  }
}
</style>
