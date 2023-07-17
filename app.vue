<script setup lang="ts">
import { Settings, Header, Footer } from "@/type/types";
const { client } = usePrismic();

// On GET le document global
const { data: website } = await useAsyncData(() => client.getSingle("website"));
if (!website.value) throw new Error("Prismic document could not be accessed");

const settings = ref<Settings>({
  isDarkMode: website.value.data["dark-mode"] ?? false,
  accentColor: website.value.data["accent-color"] ?? "#000000",
  email: website.value.data.email ?? "john.doe@foo.com",
});

const cssVariables = [
  "--accent-color: " + settings.value.accentColor,
  "--accent-color-80: " + settings.value.accentColor + "80",
  "--text-accent-color: #131313",
  "--text-color: " + (settings.value.isDarkMode ? "#ffffff" : "#131313"),
  "--background-color: " + (settings.value.isDarkMode ? "#131313" : "#ffffff"),
  "--border-color:" + (settings.value.isDarkMode ? "#9d9d9d" : "#131313"),
];

useHead({
  style: [`:root{${cssVariables.join(";")}}`],
});

const header = ref<Header>({
  text: website.value.data["text-header"],
  email: settings.value.email,
});

const footer = ref<Footer>({
  links: website.value.data.links,
});
</script>

<template>
  <UIBaseCursor />
  <div class="body">
    <TheHeader :params="header" />
    <NuxtPage />
    <TheFooter :params="footer" />
  </div>
</template>

<style lang="scss">
body {
  color: var(--text-color);
  background-color: var(--background-color);
  font-family: "Manrope";
  overflow: hidden;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: column;

  height: 100vh;

  justify-content: space-between;
}
</style>
