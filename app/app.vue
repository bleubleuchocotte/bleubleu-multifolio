<script setup lang="ts">
const i18n = useI18n();
const request = useRequestURL();

const { getWebsite } = usePrismicClient();
const { data: options } = await getWebsite();

let htmlLang = "";
let ogLang = "";

switch (options.value?.data.language) {
  case "Français":
    await i18n.setLocale("fr");
    htmlLang = "fr";
    ogLang = "fr_FR";
    break;

  default:
    // default : english
    await i18n.setLocale("en");
    htmlLang = "en";
    ogLang = "en_US";
    break;
}

const isWIP = useState<boolean>("WebsiteStateWIP", () => false);

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
    lang: htmlLang,
  },
  style: [`:root{${cssVariables.join(";")}}`],
});

useHeadSafe({
  link: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href:
        options.value?.data["seo-favicon"].small.url ??
        `${request.origin}/default-favicon-16x16.png`,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href:
        options.value?.data["seo-favicon"].url ??
        `${request.origin}/default-favicon-32x32.png`,
    },
  ],

  meta: options.value?.data.custom_meta_tags.map((metaTag) => {
    return {
      name: metaTag.meta_name?.toString(),
      content: metaTag.meta_content?.toString(),
    };
  }),
});

// Tout ce qui n'a pas besoin d'être réactif entre les pages ce met ici
useSeoMeta({
  ogType: "website",
  ogLocale: ogLang,
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

  <NuxtLoadingIndicator :throttle="0" color="var(--accent-color)" />

  <NuxtLayout v-if="options?.data">
    <TheHeader
      v-if="!isWIP"
      :marquee-text="options?.data['text-header']"
      :email="options?.data.email"
    />
    <NuxtPage />
    <TheFooter
      v-if="!isWIP"
      :links="options?.data.links"
      class="desktop-only"
    />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.translate-out-enter-active,
.translate-out-leave-active {
  transition: all 0.4s ease-out;
}

.translate-out-enter-from,
.translate-out-leave-to {
  opacity: 0;
  transform: translateY(-20vh);
}

.translate-in-enter-active,
.translate-in-leave-active {
  transition: all 0.4s ease-out;
}

.translate-in-enter-from,
.translate-in-leave-to {
  opacity: 0;
  transform: translateY(80vh);
}
</style>
