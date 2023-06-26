<script setup lang="ts">
import { Settings, Header, Main, Footer } from "@/type/types";

const { client } = usePrismic();

// On GET le document global
const { data: website } = await useAsyncData(() => client.getSingle("website"));
if (!website.value) throw new Error("Prismic document could not be accessed");

const settings = ref<Settings>({
  isDarkMode: website.value.data["dark-mode"] ?? false,
  accentColor: website.value.data["accent-color"] ?? "#000000",
  firstName: website.value.data["first-name"] ?? "John",
  lastName: website.value.data["last-name"] ?? "Doe",
  email: website.value.data.email ?? "john.doe@foo.com",
});

const cssVariables = [
  "--accent-color: " + settings.value.accentColor,
  "--text-accent-color: #131313",
  "--text-color: " + (settings.value.isDarkMode ? "#ffffff" : "#131313"),
  "--background-color: " + (settings.value.isDarkMode ? "#131313" : "#ffffff"),
  "--border-color:" + (settings.value.isDarkMode ? "#9d9d9d" : "#131313"),
];

useHead({
  style: [
    `:root{${cssVariables.join(";")}}`,
    "body{color: var(--text-color); background-color: var(--background-color);font-family: 'Manrope'}",
  ],
});

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
  email: settings.value.email,
});

const main = ref<Main>({
  about: {
    fullName: settings.value.firstName + " " + settings.value.lastName,
    prismic: about.value,
  },
  projects: projects.value,
});

const footer = ref<Footer>({
  links: website.value.data.links,
});
</script>

<template>
  <div>
    <TheHeader :params="header" />
    <TheMain :params="main" />
    <TheFooter :params="footer" />
  </div>
</template>

<style scoped lang="css">
div {
  display: flex;
  flex-direction: column;

  height: 100vh;

  justify-content: space-between;
}
</style>
