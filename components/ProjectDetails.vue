<script setup lang="ts">
import ProjectImagesSummary from "./ProjectImagesSummary.vue";
import { Project } from "~/type/types";
const props = defineProps({
  project: {
    type: Object as PropType<Project>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "target", payload: string): void;
  (e: "next"): void;
  (e: "previous"): void;
  (e: "gallery", payload: Project): void;
}>();

const target = ref<HTMLElement>();

useIntersectionObserver(
  target,
  ([{ isIntersecting, intersectionRatio }]) => {
    if (isIntersecting && intersectionRatio > 0.5) {
      emit("target", props.project.id);
    }
  },
  {
    threshold: [...Array(4).keys()].map((el) => el / 4),
  }
);

</script>

<template>
  <article ref="target" class="project-details" :data-project-h-id="project.id">
    <div class="project-details__left">
      <div class="project-details__content">
        <p>More info</p>
        <PrismicLink v-if="project.url" class="project-details__content-heading" :field="project.url">
          <h2 class="project-details__content-heading-title">{{ project.title }}</h2>
          <IconBaseArrowLink 
            :colors="{
              background: 'var(--accent-color)',
              arrow: 'var(--background-color)',
            }"
          />
        </PrismicLink>
        <div v-else  class="project-details__content-heading">
          <h2 class="project-details__content-heading-title">{{ project.title }}</h2> 
        </div>
        <div class="project-details__content-tags">
          <UIBaseTag v-for="(skill, i) in project.skills" :key="i">
            {{ skill.skill }}
          </UIBaseTag>
        </div>
        <PrismicRichText
          :field="project['short-description']"
          class="project-details__content-description"
        />
      </div>

      <div class="project-details__utils">
        <span class="project-details__utils-index">
          <UIBaseIndex :index="index + 1" />
        </span>
        <div class="project-details__utils-button">
          <UIBaseButtonNavigation
            :colors="{
              background: 'transparent',
              arrow: 'var(--text-color)',
              border: 'var(--text-color)',
            }"
            :orientation="'left'"
            @click="$emit('previous')"
          />
          <UIBaseButtonNavigation
            :colors="{
              background: 'var(--accent-color)',
              arrow: 'var(--text-accent-color)',
            }"
            @click="$emit('next')"
          />
        </div>
      </div>
    </div>

    <div class="project-details__right">
      <ProjectImagesSummary
        :images="project.images.slice(0, 2)"
        @click="$emit('gallery', project)"
      />
    </div>
  </article>
</template>

<style scoped lang="scss">
.project-details {
  display: flex;
  gap: $gutter;

  padding-left: $gutter;

  min-width: 100vw;
  height: 100%;

  &__left {
    @include left;
    padding-inline: 0;

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
      display: flex;
      margin-top: $gutter;
      gap: calc($gutter/3);
      align-items: center;
      
      &-title {
        pointer-events: none;
      }
    }
   
    &-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;

      margin-block: calc($gutter/2);
    }

    &-description {
      font-size: $font-size-normal;
    }
  }

  &__utils {
    display: flex;
    flex-direction: column;
    gap: calc($gutter/2);
    &-index {
      font-size: $font-size-enormous;
      font-weight: 200;
      color: var(--accent-color);
      line-height: 1;
    }
    &-button {
      display: flex;
      gap: calc($gutter / 2);
    }
  }
}
</style>
