export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2026-04-28",
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/main.scss";',
        },
      },
    },
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "vue3-marquee",
        "@vueuse/integrations/useFocusTrap",
        "lenis",
      ],
    },
  },
  css: [
    "@/assets/styles/reset.css",
    "@/assets/styles/lenis.css",
    "@/assets/styles/1-base/_base-default.scss",
  ],
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/prismic",
    "@nuxtjs/seo",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@nuxt/eslint",
  ],
  prismic: {
    endpoint: process.env.PRISMIC_ENDPOINT,
    preview: false,
    toolbar: false,
  },
  robots: {
    disallow: ["/legal-notice", "/wip"],
  },
  ogImage: {
    enabled: false,
  },
  linkChecker: {
    enabled: false,
  },
  i18n: {
    locales: [
      {
        code: "en",
        language: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "fr",
        language: "fr",
        name: "Français",
        file: "fr.json",
      },
    ],
    strategy: "no_prefix",
    detectBrowserLanguage: false,
  },

  image: {
    prismic: {},

    screens: {
      xs: 640,
      sm: 768,
      md: 1024,
      lg: 1280,
      xl: 1440,
      xxl: 1536,
      "2xl": 2196,
    },
  },
});
