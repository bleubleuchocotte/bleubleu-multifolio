<script setup lang="ts">
import { Project } from "~/type/types";

defineProps({
  projects: {
    type: Array<Project>,
    required: true,
  },
});

defineEmits<{
  (e: "target", payload: string): void;
  (e: "targetThenScroll", payload: string): void;
}>();
</script>

<template>
  <ProjectDetails
    v-for="(project, i) in projects"
    :key="project.id"
    :project="project"
    :index="i"
    @target="(id) => $emit('target', id)"
    @previous="i > 0 ? $emit('targetThenScroll', projects[i - 1].id) : null"
    @next="
      i < projects.length - 1
        ? $emit('targetThenScroll', projects[i + 1].id)
        : null
    "
  />
</template>
