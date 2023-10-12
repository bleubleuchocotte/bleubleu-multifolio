<script setup lang="ts">
import { Project } from "@/type/types";

const { $api } = useNuxtApp();
const website = $api.website;
const prismicProjects = await $api.projects.getAllProjects();

const projects: Project[] = await Promise.all(
  prismicProjects.map(async (project) => {
    const images = await $api.projects.getImagesFromProject(project);

    const bufferProject: Project = {
      id: project.id,
      date: project.data.date,
      "short-description": project.data["short-description"],
      "long-description": project.data["long-description"],
      skills: project.data.skills,
      title: project.data.title,
      url: project.data.url.url ? project.data.url : null,
      images: images.map((image) => {
        if (image.type !== "image-duo" && image.type !== "image-full")
          throw new Error("Type error");
        return {
          type: image.type,
          field: image.data,
        };
      }),
      "image-mobile": project.data["image-mobile"].url
        ? project.data["image-mobile"]
        : null,
    };
    return bufferProject;
  })
);

useServerSeoMeta({
  publisher: `${website.me["first-name"]} ${website.me["last-name"]}`,
});

const isMobile = useMediaQuery("(max-width: 1025px)");
</script>

<template>
  <div class="index-page">
    <TheMainMobile v-if="isMobile" :projects="projects" :website="website" />
    <TheMain v-else :projects="projects" :website="website" />
  </div>
</template>

<style scoped lang="scss">
.index-page {
  flex: 1;
  min-height: 400px;
}
</style>
