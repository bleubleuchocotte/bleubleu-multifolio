<script setup lang="ts">
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
  <article class="project-details-mobile">
    <UIBaseIndex :index="index + 1" class="project-details-mobile__index" />
    <h2>{{ project.title }}</h2>
    <div class="project-details-mobile__content-tags">
      <UIBaseTag v-for="(skill, i) in project.skills" :key="i">
        {{ skill.skill }}
      </UIBaseTag>
    </div>

    <div class="project-details-mobile__images">
      <div
        v-for="(image, i) in project.images"
        :key="i"
        :data-type="image.type === 'image-duo' ? 'duo' : 'full'"
      >
        <PrismicImage
          v-for="(field, j) in image.field"
          :key="j"
          :field="field"
        />
      </div>
    </div>

    <PrismicRichText
      :field="project['long-description']"
      class="project-details-mobile__content-description"
    />
  </article>
</template>

<style scoped lang="scss">
.project-details-mobile {
  display: flex;
  @include gap();
  min-width: 100vw;

  min-width: initial;
  flex-direction: column;
  @include prop("padding-bottom");

  border-bottom: 1px solid var(--border-color);

  height: 100%;

  &__index {
    @include font("enormous");
    color: var(--accent-color);
    line-height: 1;
  }

  &__content {
    @include prop("padding-bottom");
    &-heading {
      @include prop("margin-top");
    }

    &-tags {
      display: flex;
      flex-wrap: wrap;
      @include gap(calc(1 / 6));
    }

    &-description {
      @include font("p");
    }
  }

  &__images {
    display: flex;
    flex-direction: column;
    gap: $gutter;
    height: 100%;

    img {
      border-radius: $border-radius-big;
      aspect-ratio: 1;
    }
    [data-type="duo"] {
      display: flex;
      gap: $gutter;
      height: 500px;
      width: 100%;
    }
    [data-type="full"] {
      height: 100%;
    }
  }
}
</style>
