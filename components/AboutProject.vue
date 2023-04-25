<script setup lang="ts">
import Lenis from "@studio-freight/lenis";
import { ProjectInformationsType } from "~/type/types";

const project: ProjectInformationsType = {
  name: "Mo-ka",
  skills: [
    "Compétence 1",
    "Compétence 2",
    "Jeux",
    "Vidéos",
    "Débat",
    "Compétence 1",
    "Compétence 1",
  ],
  content:
    "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, inar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus. Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentessuscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.",
};

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
  <section class="about-list">
    <p class="about-list__title">À propos du projet : {{ project.name }}</p>

    <div ref="container" class="about-list__container">
      <div ref="content">
        <div class="about-list__skills">
          <SkillComponent
            v-for="(skill, index) in project.skills"
            :key="index"
            :text="skill"
          />
        </div>
        <div class="about-list__content">
          <p>{{ project.content }}</p>
          <p>{{ project.content }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-list {
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
    padding-block: 10px 20px;
  }

  &__container {
    flex-grow: 1;
    position: relative;
    overflow-y: scroll;
    padding-bottom: 5vh;

    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  &__skills {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 10px;
  }

  &__content {
    margin-top: 20px;
  }
}
</style>
