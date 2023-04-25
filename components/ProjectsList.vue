<script setup lang="ts">
import Lenis from "@studio-freight/lenis";
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

const container = ref<HTMLElement>();
const content = ref<HTMLElement>();

onMounted(() => {
  const lenis = new Lenis({
    wrapper: container.value, // element which has overflow
    content: content.value, // usually wrapper's direct child
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});
</script>

<template>
  <section class="projects-list">
    <p class="projects-list__title">Projets</p>

    <div ref="container" class="projects-list__container">
      <div ref="content">
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
    </div>
  </section>
</template>

<style scoped lang="scss">
.projects-list {
  display: flex;
  flex-direction: column;

  position: relative;

  height: 100%;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 5vh;
    background: linear-gradient(180deg, hsla(0, 0%, 100%, 0), #ffffff);
    pointer-events: none;
    z-index: 1;
  }

  &__title {
    padding-block: 20px 10px;
  }

  &__container {
    flex-grow: 1;
    position: relative;
    overflow-y: scroll;
    padding-bottom: 5vh;

    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  &__item {
    display: flex;
    gap: 10px;

    padding-block: 5px;

    border-bottom: 1px solid black;
  }
}
</style>
