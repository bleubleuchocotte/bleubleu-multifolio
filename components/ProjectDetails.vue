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
        <PrismicLink
          v-if="project.url"
          class="project-details__content-heading"
          :field="project.url"
        >
          <h2 class="project-details__content-heading-title">
            {{ project.title }}
          </h2>
          <IconBaseArrowLink
            :colors="{
              background: 'var(--accent-color)',
              arrow: 'var(--background-color)',
            }"
          />
        </PrismicLink>
        <div v-else class="project-details__content-heading">
          <h2 class="project-details__content-heading-title">
            {{ project.title }}
          </h2>
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
        role="button"
        aria-label="View project images"
        tabindex="0"
        @click="$emit('gallery', project)"
        @keydown.enter.space="$emit('gallery', project)"
      />
    </div>
  </article>
</template>

<style scoped lang="scss">
.project-details {
  display: flex;
  @include gap();
  min-width: 100vw;

  @media #{$desktop-down} {
    min-width: initial;
    flex-direction: column;
    @include prop("padding-bottom");

    border-bottom: 1px solid var(--border-color);
  }

  height: 100%;

  @include prop("padding-left");

  &__left {
    @include left;
    @include prop("padding-inline", 0);

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media #{$desktop-down} {
      flex-direction: column-reverse;
    }
  }
  &__right {
    @include right;
    @media #{$desktop-down} {
      padding-inline: 0;
    }
  }

  &__content {
    @include prop("padding-bottom");
    border-bottom: 1px solid var(--border-color);

    &-heading {
      @include prop("margin-top");
      display: flex;
      @include gap(calc(1 / 3));
      align-items: center;
      width: fit-content;

      &-title {
        pointer-events: none;
      }
    }

    &-tags {
      display: flex;
      flex-wrap: wrap;
      @include gap(calc(1 / 6));
      @include prop("margin-block", 0.5);
    }

    &-description {
      @include font("p");
    }
  }

  &__utils {
    display: flex;
    @media #{$desktop} {
      flex-direction: column;
    }
    @media #{$desktop-down} {
      justify-content: space-between;
    }
    @include gap(0.5);

    &-index {
      @include font("enormous");
      color: var(--accent-color);
      line-height: 1;
    }

    &-button {
      display: flex;
      @include gap(0.5);
      @media #{$desktop-down} {
        align-items: center;
        gap: $base-length;

        & > button {
          rotate: 90deg;
        }
      }
    }
  }
}
</style>
