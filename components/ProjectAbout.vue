<script setup lang="ts">
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
</script>

<template>
  <BoxScrollable :title="`À propos du projet : ${project.name}`">
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
  </BoxScrollable>
</template>

<style scoped lang="scss">
.about-list {
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
