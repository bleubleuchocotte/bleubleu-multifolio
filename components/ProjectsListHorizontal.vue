<script setup lang="ts">
import { Project } from "~/type/types";

defineProps({
  projects: {
    type: Array<Project>,
    required: true,
  },
});
</script>

<template>
  <ProjectDetails
    v-for="(project, i) in projects"
    :key="i"
    :project="project"
    :index="i"
  />
</template>
