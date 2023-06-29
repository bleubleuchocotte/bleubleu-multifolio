<script setup lang="ts">
import ProjectImagesSummary from "./ProjectImagesSummary.vue";
import { Project } from "~/type/types";
defineProps({
  project: {
    type: Object as PropType<Project>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <article class="project-details" :data-project-id="project.id">
    <div class="project-details__left">
      <div class="project-details__content">
        <p>More info</p>
        <h2 class="project-details__content-heading">{{ project.title }}</h2>
        <div class="project-details__content-tags">
          <UIBaseTag v-for="(skill, i) in project.skills" :key="i">
            {{ skill.skill }}
          </UIBaseTag>
        </div>
        <PrismicRichText :field="project['short-description']" />
      </div>

      <div class="project-details__utils">
        <span class="project-details__utils-index">
          <UIBaseIndex :index="index + 1" />
        </span>
        <div class="project-details__utils-button">
          <div>
            <IconBaseArrow />
          </div>
          <div>
            <IconBaseArrow />
          </div>
        </div>
      </div>
    </div>

    <div class="project-details__right">
      <ProjectImagesSummary :images="project.images.slice(0, 2)" />
    </div>
  </article>
</template>

<style scoped lang="scss">
.project-details {
  display: flex;

  min-width: 100vw;
  height: 100%;

  &__left {
    @include left;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__right {
    @include right;
  }

  &__content {
    padding-bottom: $gutter;
    border-bottom: 1px solid var(--border-color);
    &-heading {
      margin-top: $gutter;
    }

    &-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;

      margin-block: calc($gutter/2);
    }
  }

  &__utils {
    &-index {
      font-size: $font-size-enormous;
      font-weight: 200;
      color: var(--accent-color);
    }
  }
}
</style>
