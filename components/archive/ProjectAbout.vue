<script setup lang="ts">
import BoxScrollable from "./UI/BoxScrollable.vue";
import SkillComponent from "./UI/SkillComponent.vue";
import { ProjectPrismicType } from "~/type/types";

defineProps({
  project: {
    type: Object as PropType<ProjectPrismicType>,
    required: true,
  },
});
</script>

<template>
  <BoxScrollable :title="`${project.title[0].text}`" :is-title-colored="true">
    <div class="about-list__skills">
      <SkillComponent
        v-for="(skill, index) in project.skills.map((el) => el.skill[0].text)"
        :key="index"
        :text="skill"
      />
    </div>
    <div class="about-list__content">
      <PrismicRichText :field="project.description" />
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
