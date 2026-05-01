<script setup lang="ts">
import type { ProjetDocument } from "~~/prismicio-types";

type ComponentProps = {
  project: ProjetDocument;
  index: number;
  hidden: boolean;
};

defineProps<ComponentProps>();
</script>

<template>
  <article
    class="gap-fluid py-fluid after:bg-border relative flex h-full flex-col after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:content-['']"
  >
    <UIBaseIndex
      :index="index + 1"
      class="text-fluid-enormous text-accent leading-none"
    />

    <ProjectUrl :url="project.data.url" tabindex="-1">
      {{ project.data.title }}
    </ProjectUrl>

    <div class="flex flex-wrap gap-[calc(var(--spacing-fluid)/6)]">
      <UIBaseTag
        v-for="item in project.data.skills"
        :key="item.skill?.toString()"
      >
        {{ item.skill }}
      </UIBaseTag>
    </div>

    <ProjectMobileSlider :medias="project.data.slices" />

    <PrismicRichText
      :field="project.data.description"
      class="text-fluid-p mb-fluid"
    />
  </article>
</template>
