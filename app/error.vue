<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<ComponentProps>();

const i18n = useI18n();

type ComponentProps = {
  error: NuxtError;
};

const request = useRequestURL();

const { getWebsite } = usePrismicClient();
const { data: options } = getWebsite();

const htmlLang = ref<"fr" | "en" | null>(null);
const ogLang = ref<"fr_FR" | "en_US" | null>(null);

switch (options.value?.data.language) {
  case "English":
    i18n.setLocale("en");
    htmlLang.value = "en";
    ogLang.value = "en_US";
    break;
  case "Français":
    i18n.setLocale("fr");
    htmlLang.value = "fr";
    ogLang.value = "fr_FR";
    break;

  default:
    htmlLang.value = "en";
    ogLang.value = "en_US";
    break;
}

const cssVariables = [
  `--accent-color: ${options.value?.data["accent-color"]}`,
  `--accent-color-80: ${options.value?.data["accent-color"]}80`,
  `--text-accent-color: ${options.value?.data["text-accent-color"]}`,
  `--text-color: ${options.value?.data["text-color"]}`,
  `--background-color: ${options.value?.data["background-color"]}`,
  `--border-color:${options.value?.data["text-color"]}80`,
  `--background-color-70: ${options.value?.data["background-color"]}B3`,
];

useHead({
  htmlAttrs: {
    lang: htmlLang.value,
  },
  style: [`:root{${cssVariables.join(";")}}`],
});

useHeadSafe({
  link: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href:
        options.value?.data["seo-favicon"].url ??
        `${request.origin}/default-favicon-32x32.png`,
    },
  ],
});

// Tout ce qui n'a pas besoin d'être réactif entre les pages ce met ici
useSeoMeta({
  ogType: "website",
  ogLocale: ogLang.value,
  twitterCard: "summary",

  colorScheme: options.value?.data["accent-color"],
  themeColor: options.value?.data["accent-color"],

  title: options.value?.data["seo-title"],
  description: options.value?.data["seo-description"],

  ogTitle: options.value?.data["seo-title"],
  ogDescription: options.value?.data["seo-description"],
  ogUrl: request.origin + request.pathname,
  ogImage: {
    url: options.value?.data["og-image"].url ?? "",
    secureUrl: options.value?.data["og-image"].url ?? "",
    width: options.value?.data["og-image"].dimensions?.width ?? "",
    height: options.value?.data["og-image"].dimensions?.height ?? "",
  },

  publisher: `${options.value?.data["first-name"]} ${options.value?.data["last-name"]}`,
});

// Permet de détecter si un des pointeurs est une souris (Il peut y avoir plusieurs pointeurs notamment sur les écrans tactiles)
const isPointerAccurate = useMediaQuery("(any-pointer: fine)");
</script>

<template>
  <ClientOnly>
    <UIBaseCursor v-if="isPointerAccurate" />
  </ClientOnly>
  <NuxtLayout v-if="options" name="404">
    <TheHeader
      :marquee-text="options.data['text-header']"
      :email="options.data.email"
    />
    <main>
      <ErrorDefault :code="error.status ?? -1" />
    </main>
    <TheFooter :links="options.data.links" class="desktop-only" />
  </NuxtLayout>
</template>
