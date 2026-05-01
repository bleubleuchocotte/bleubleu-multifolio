<script setup lang="ts">
import type { ProjetDocument } from "~~/prismicio-types";

type ComponentProps = {
  project: ProjetDocument;
  index: number;
};

const props = defineProps<ComponentProps>();

const emit = defineEmits<{
  target: [payload: string];
  next: [];
  previous: [];
  gallery: [payload: ProjetDocument];
}>();

const target = ref<HTMLElement>();

useIntersectionObserver(
  target,
  ([entry]) => {
    if (entry && entry.isIntersecting && entry.intersectionRatio > 0.5) {
      emit("target", props.project.id);
    }
  },
  {
    threshold: [...Array(4).keys()].map((el) => el / 4),
  },
);
</script>

<template>
  <article ref="target" class="project-details" :data-project-h-id="project.id">
    <div class="project-details__left">
      <div class="project-details__content">
        <p class="project-details__content-index">
          {{ $t("project.title.horizontal") }} #{{ index + 1 }}
        </p>
        <ProjectUrl :url="project.data.url">
          {{ project.data.title }}
        </ProjectUrl>
        <div class="project-details__content-tags">
          <UIBaseTag
            v-for="item in project.data.skills"
            :key="project.id + item.skill?.toString()"
          >
            {{ item.skill }}
          </UIBaseTag>
        </div>
        <div class="project-details__content-description">
          <PrismicRichText :field="project.data.description" />
        </div>

        <button
          data-icon="IconFullscreen"
          class="project-details__content-more"
          @click="$emit('gallery', project)"
          @keydown.enter.space="$emit('gallery', project)"
        >
          {{ $t("project.more") }}
        </button>
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
            orientation="left"
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
      <ProjectMediasSummary
        :medias="project.data.slices.slice(0, 2)"
        role="button"
        aria-label="View project images"
        data-icon="IconFullscreen"
        tabindex="0"
        @click="$emit('gallery', project)"
        @keydown.enter.space="$emit('gallery', project)"
      />
    </div>
  </article>
</template>

<style scoped lang="scss">
.project-details {
  @include gap();
  @include prop("padding-left");
  display: flex;

  height: 100%;

  &__left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-width: 500px;
  }

  &__right {
    @include prop("padding-inline");
    min-width: 80vh;
  }

  &__content {
    @include prop("padding-bottom");
    border-bottom: 1px solid var(--border-color);

    &-index {
      @include prop("margin-bottom");
    }

    &-heading {
      @include prop("margin-top");
      @include gap(calc(1 / 3));
      display: flex;
      align-items: center;
      width: fit-content;

      &-title {
        pointer-events: none;
      }
    }

    &-tags {
      @include gap(calc(1 / 6));
      @include prop("margin-block", 0.5);
      display: flex;
      flex-wrap: wrap;
    }

    &-description {
      @include font("p");

      @include line-clamp(3);
    }

    &-more {
      @include font("cta");
      color: var(--accent-color);
      text-decoration: underline;
    }
  }

  &__utils {
    @include gap(0.5);
    display: flex;
    @media #{$desktop} {
      flex-direction: column;
    }

    &-index {
      @include font("enormous");
      color: var(--accent-color);
      line-height: 1;
    }

    &-button {
      @include gap(0.5);
      display: flex;
    }
  }
}
</style>
