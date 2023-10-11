<script setup lang="ts">
const { $api } = useNuxtApp();
const website = await $api.website.getWebsite();

const cssVariables = [
  "--accent-color: " + website.colors["accent-color"],
  "--accent-color-80: " + website.colors["accent-color"] + "80",
  "--text-accent-color: " + website.colors["text-accent-color"],
  "--text-color: " + website.colors["text-color"],
  "--background-color: " + website.colors["background-color"],
  "--border-color:" + website.colors["text-color"] + "80",
  "--background-color-70: " + website.colors["background-color"] + "B3",
];

useHead({
  style: [`:root{${cssVariables.join(";")}}`],
});

useServerHeadSafe({
  link: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: website.seo.favicon.url ?? "/default-favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: website.seo.favicon.url ?? "/default-favicon-32x32.png",
    },
  ],
});

useSeoMeta({
  robots: "follow",
});

// Tout ce qui n'a pas besoin d'être réactif entre les pages ce met ici
useServerSeoMeta({
  ogType: "website",
  ogLocale: "en_US",
  twitterCard: "summary",

  colorScheme: website.colors["accent-color"],
  themeColor: website.colors["accent-color"],

  title: website.seo.title,
  description: website.seo.description,

  ogTitle: website.seo.title,
  ogDescription: website.seo.description,
  ogUrl: website.seo.og.url,
  ogImage: {
    url: website.seo.og.image.url ?? "Undefined value",
    secureUrl: website.seo.og.image.url ?? "Undefined value",
    width: website.seo.og.image.dimensions?.width ?? "Undefined value",
    height: website.seo.og.image.dimensions?.height ?? "Undefined value",
  },
});

// Permet de détecter si un des pointeurs est une souris (Il peut y avoir plusieurs pointeurs notamment sur les écrans tactiles)
const isPointerAccurate = useMediaQuery("(any-pointer: fine)");

const isLoading = ref(true);
const showContent = ref(false);
</script>

<template>
  <ClientOnly>
    <UIBaseCursor v-if="isPointerAccurate" />
  </ClientOnly>
  <Transition
    name="translate-out"
    mode="out-in"
    @after-leave="showContent = true"
  >
    <TheLoader
      v-if="isLoading"
      :text="'Thomas Auffroy'"
      :colors="{
        start: website.colors['text-color'],
        end: website.colors['accent-color'],
      }"
      @unmount="isLoading = false"
    />
  </Transition>
  <Transition mode="out-in" name="translate-in">
    <div v-show="showContent" class="body">
      <TheHeader
        :marquee-text="website.header.text"
        :email="website.me.email"
      />
      <NuxtPage />
      <TheFooter :links="website.footer.links" class="desktop-only" />
    </div>
  </Transition>
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

<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: column;

  height: 100vh;

  @media #{$desktop-down} {
    height: auto;
    @include gap();
  }

  justify-content: space-between;
}
</style>
