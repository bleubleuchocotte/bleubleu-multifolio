<script setup lang="ts">
import { Settings, Header, Main, Footer } from "./type/types";

const { client } = usePrismic();

// On GET le document global
const { data: website } = await useAsyncData(() => client.getSingle("website"));
if (!website.value) throw new Error("Prismic document could not be accessed");

const settings = ref<Settings>({
  isDarkMode: website.value.data["dark-mode"] ?? false,
  accentColor: website.value.data["accent-color"] ?? "#000000",
  firstName: website.value.data["first-name"] ?? "John",
  lastName: website.value.data["last-name"] ?? "Doe",
});

provide("settings", settings);

// On GET la section About
const { data: about } = await useAsyncData(() => client.getSingle("about"));
if (!about.value) throw new Error("Prismic document could not be accessed");

// On GET la section Projets
const { data: projects } = await useAsyncData(() =>
  client.getAllByType("projet")
);
if (!projects.value) throw new Error("Prismic document could not be accessed");

const header = ref<Header>({
  text: website.value.data["text-header"],
});

const main = ref<Main>({
  about: about.value,
  projects: projects.value,
});

const footer = ref<Footer>({
  links: website.value.data.links,
});
</script>

<template>
  <div class="body">
    <HeaderComponent :params="header" />
    <MainComponent :params="main" />
    <FooterComponent :params="footer" />
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
