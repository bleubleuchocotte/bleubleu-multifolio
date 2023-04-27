<script setup lang="ts">
import { ProjectPrismicType } from "type/types";
const { client } = usePrismic();

async function init() {
  // On récupère le document global
  const { data: website } = await useAsyncData(() =>
    client.getAllByType("website")
  );

  if (!website.value) return;

  const ids: Array<string> = [];

  // On récupère les ids de tous les projets
  website.value[0].data.projets.forEach((el: any) => {
    ids.push(el.projet.id);
  });

  // On récupère tous les projets
  await addProjects(ids);
}

async function addProjects(ids: Array<string>) {
  const { data: el } = await useAsyncData(() => client.getByIDs(ids));

  projects.value =
    el.value?.results.map((arg) => arg.data as ProjectPrismicType) ?? [];
}

init();

const projects = ref<ProjectPrismicType[]>([]);
</script>

<template>
  <div class="body">
    <HeaderComponent />
    <MainComponent v-if="projects.length > 0" :projects="projects" />
    <FooterComponent />
  </div>
</template>

<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: column;

  gap: 10px;

  height: 100vh;
  width: 100vw;
  padding-inline: $body-padding-inline;
  padding-block: $body-padding-block;

  background-color: $background-color;
  color: $text-color;
}
</style>
