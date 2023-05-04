<script setup lang="ts">
import {
  ProjectPrismicType,
  HeaderPrismicType,
  FooterPrismicType,
} from "type/types";
const { client } = usePrismic();

// On récupère le document global
const { data: website } = await useAsyncData(() =>
  client.getAllByType("website")
);
const projects = ref<ProjectPrismicType[]>([]);
const header = ref<HeaderPrismicType>();
const footer = ref<FooterPrismicType>();

if (website.value) {
  const datas = website.value[0].data;

  const idsProject: Array<string> = [];

  // On récupère les ids de tous les projets présents pour le site
  datas.projets.forEach((el: any) => {
    idsProject.push(el.projet.id);
  });
  const { data: el } = await useAsyncData(() => client.getByIDs(idsProject));

  projects.value =
    el.value?.results.map((arg) => arg.data as ProjectPrismicType) ?? [];

  // On récupère les informations du header
  const { data: headerPrismic } = await useAsyncData(() =>
    client.getByID(datas.header.id)
  );

  const idsHeader: Array<string> = [];

  // On récupère les ids de tous les liens du header
  headerPrismic.value?.data.links.forEach((el: any) => {
    idsHeader.push(el.link.id);
  });

  const { data: headerLinks } = await useAsyncData(() =>
    client.getByIDs(idsHeader)
  );

  header.value = {
    catchphrase: headerPrismic.value?.data.catchphrase,
    links: headerLinks.value?.results.map((el) => el.data as any) ?? [],
    logo: headerPrismic.value?.data.logo,
  };

  // On récupère les informations du footer
  const { data: footerPrismic } = await useAsyncData(() =>
    client.getByID(datas.footer.id)
  );

  const idsFooter: Array<string> = [];

  // On récupère les ids de tous les liens du header
  headerPrismic.value?.data.links.forEach((el: any) => {
    idsFooter.push(el.link.id);
  });

  const { data: footerLinks } = await useAsyncData(() =>
    client.getByIDs(idsFooter)
  );

  footer.value = {
    text: footerPrismic.value?.data.text,
    links: footerLinks.value?.results.map((el) => el.data as any) ?? [],
  };
}
</script>

<template>
  <div class="body">
    <HeaderComponent v-if="header" :header="header" />
    <MainComponent v-if="projects.length > 0" :projects="projects" />
    <FooterComponent v-if="footer" :footer="footer" />
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
