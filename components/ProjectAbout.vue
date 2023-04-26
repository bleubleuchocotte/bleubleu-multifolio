<script setup lang="ts">
import BoxScrollable from "./UI/BoxScrollable.vue";
import SkillComponent from "./UI/SkillComponent.vue";
import { ProjectType } from "~/type/types";

defineProps({
  project: {
    type: Object as PropType<ProjectType>,
    required: true,
  },
});
</script>

<template>
  <BoxScrollable :title="`À propos du projet : ${project.name}`">
    <div class="about-list__skills">
      <SkillComponent
        v-for="(skill, index) in project.about.skills"
        :key="index"
        :text="skill"
      />
    </div>
    <div class="about-list__content">
      <p>{{ project.about.content }}</p>
      <p>{{ project.about.content }}</p>
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
