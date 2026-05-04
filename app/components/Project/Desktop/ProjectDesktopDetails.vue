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

const target = useTemplateRef<HTMLElement>("target");

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
  <article
    ref="target"
    class="gap-fluid pl-fluid flex h-full"
    :data-project-h-id="project.id"
  >
    <div class="flex min-w-125 flex-col justify-between">
      <div class="border-border pb-fluid border-b">
        <p class="mb-fluid">
          {{ $t("project.title.horizontal") }} #{{ index + 1 }}
        </p>
        <ProjectUrl :url="project.data.url">
          {{ project.data.title }}
        </ProjectUrl>
        <div
          class="flex flex-wrap gap-[calc(var(--spacing-fluid)/6)] my-[calc(var(--spacing-fluid)/2)]"
        >
          <UIBaseTag
            v-for="item in project.data.skills"
            :key="project.id + item.skill?.toString()"
          >
            {{ item.skill }}
          </UIBaseTag>
        </div>
        <div class="text-fluid-p line-clamp-3">
          <PrismicRichText :field="project.data.description" />
        </div>

        <button
          data-icon="IconFullscreen"
          class="text-fluid-cta text-accent underline"
          @click="$emit('gallery', project)"
          @keydown.enter.space="$emit('gallery', project)"
        >
          {{ $t("project.more") }}
        </button>
      </div>

      <div class="flex gap-[calc(var(--spacing-fluid)/2)] lg:flex-col">
        <span class="text-fluid-enormous text-accent leading-none">
          <UIBaseIndex :index="index + 1" />
        </span>
        <div class="flex gap-[calc(var(--spacing-fluid)/2)]">
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

    <div class="px-fluid min-w-[80vh]">
      <button
        type="button"
        class="block h-full w-full"
        aria-label="View project images"
        data-icon="IconFullscreen"
        @click="$emit('gallery', project)"
      >
        <ProjectMediasSummary :medias="project.data.slices.slice(0, 2)" />
      </button>
    </div>
  </article>
</template>
