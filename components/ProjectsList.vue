<script setup lang="ts">
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
  <section class="projects-list">
    <p class="projects-list__title">Projets</p>

    <div class="projects-list__container">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="projects-list__item"
      >
        <p>{{ project.name }}</p>
        <p>{{ index < 10 ? "0" + index : index }}</p>
        <p>{{ project.year }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.projects-list {
  display: flex;
  flex-direction: column;

  position: relative;

  height: 50%;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 5vh;
    background: linear-gradient(180deg, hsla(0, 0%, 100%, 0), #ffffff);
    pointer-events: none;
  }

  &__title {
    padding-block: 10px;
  }

  &__container {
    overflow: scroll;
    padding-bottom: 5vh;
  }

  &__item {
    display: flex;
    gap: 10px;

    padding-block: 5px;

    border-bottom: 1px solid black;
  }
}
</style>
