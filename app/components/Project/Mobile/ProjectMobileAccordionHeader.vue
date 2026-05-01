<script setup lang="ts">
import type { ProjetDocument } from "~~/prismicio-types";

type ComponentProps = {
  project: ProjetDocument;
  index: number;
  active?: boolean;
};

defineProps<ComponentProps>();
</script>

<template>
  <div
    class="border-border py-fluid flex h-full w-full items-center justify-between border-b"
  >
    <h3
      class="flex self-end uppercase whitespace-nowrap transition-colors duration-200 ease-out"
      :class="{ 'text-accent': active }"
    >
      <UIBaseIndex :index="index + 1" />
      {{ project.data.title }}
    </h3>
    <div class="text-right">
      <p class="text-fluid-small">{{ project.data.date?.slice(0, 4) }}</p>
      <p class="text-fluid-small">{{ project.data.skills[0]?.skill }}</p>
    </div>
  </div>
</template>
