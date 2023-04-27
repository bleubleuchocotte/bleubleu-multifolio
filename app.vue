<script setup lang="ts">
import { ProjectPrismicType, HeaderPrismicType } from "type/types";
const { client } = usePrismic();

async function init() {
  // On récupère le document global
  const { data: website } = await useAsyncData(() =>
    client.getAllByType("website")
  );

  if (website.value === null) return;

  const datas = website.value[0].data;

  // On récupère tous les projets
  await addProjects(datas);

  // On récupère le header
  await addHeader(datas);
}

async function addProjects(arg: Record<string, any>) {
  const ids: Array<string> = [];

  // On récupère les ids de tous les projets
  arg.projets.forEach((el: any) => {
    ids.push(el.projet.id);
  });
  const { data: el } = await useAsyncData(() => client.getByIDs(ids));

  projects.value =
    el.value?.results.map((arg) => arg.data as ProjectPrismicType) ?? [];
}
async function addHeader(arg: Record<string, any>) {
  // On récupère les informations du header
  const { data: headerPrismic } = await useAsyncData(() =>
    client.getByID(arg.header.id)
  );

  const ids: Array<string> = [];

  // On récupère les ids de tous les liens
  headerPrismic.value?.data.links.forEach((el: any) => {
    ids.push(el.link.id);
  });

  const { data: links } = await useAsyncData(() => client.getByIDs(ids));

  header.value = {
    catchphrase: headerPrismic.value?.data.catchphrase,
    links: links.value?.results.map((el) => el.data as any) ?? [],
    logo: headerPrismic.value?.data.logo,
  };
}

init();

const projects = ref<ProjectPrismicType[]>([]);
const header = ref<HeaderPrismicType>();
</script>

<template>
  <div class="body">
    <HeaderComponent v-if="header" :header="header" />
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
