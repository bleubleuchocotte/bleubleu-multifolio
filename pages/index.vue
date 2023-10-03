<script setup lang="ts">
import { Main, Project } from "@/type/types";
const { client } = usePrismic();

// On GET la section About
const { data: about } = await useAsyncData(() => client.getSingle("about"));
if (!about.value) throw new Error("Prismic document could not be accessed");

// On GET la section Projets
const { data: prismicProjects } = await useAsyncData(() =>
  client.getAllByType("projet")
);
if (!prismicProjects.value)
  throw new Error("Prismic document could not be accessed");

const projects: Project[] = await Promise.all(
  prismicProjects.value.map(async (project) => {
    // On récupère l'id de toutes les images
    const ids: string[] = project.data.images.map((a: any) => a.image.id);

    const { data: images } = await useAsyncData(project.id, () =>
      client.getAllByIDs(ids)
    );

    if (!images.value)
      throw new Error("Prismic document could not be accessed");

    const bufferProject: Project = {
      id: project.id,
      date: project.data.date,
      "short-description": project.data["short-description"],
      "long-description": project.data["long-description"],
      skills: project.data.skills,
      title: project.data.title,
      url: project.data.url.url ? project.data.url : null,
      images: images.value.map((image) => {
        if (image.type !== "image-duo" && image.type !== "image-full")
          throw new Error("Type error");
        return {
          type: image.type,
          field: image.data,
        };
      }),
    };

    return bufferProject;
  })
);

const main = ref<Main>({
  about: {
    fullName:
      about.value.data["first-name"] + " " + about.value.data["last-name"],
    prismic: about.value,
  },
  projects,
});

useServerSeoMeta({
  publisher: main.value.about.fullName.toString(),
});
</script>

<template>
  <TheMain :params="main"/>
</template>
