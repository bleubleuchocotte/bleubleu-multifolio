import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2026-04-28",

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  vite: {
    plugins: [tailwindcss()],
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
  css: ["@/assets/styles/tailwind.css", "@/assets/styles/lenis.css"],
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/prismic",
    "@nuxtjs/seo",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@nuxt/eslint",
    "@nuxt/hints",
  ],
  prismic: {
    endpoint: process.env.PRISMIC_ENDPOINT,
  },
  // `url` and `name` are provided at runtime via the
  // `NUXT_SITE_URL` / `NUXT_SITE_NAME` env vars — see @nuxtjs/seo docs.
  site: {
    defaultLocale: "en",
  },
  robots: {
    disallow: ["/legal-notice", "/wip"],
  },
  routeRules: {
    "/": { swr: 600 },
    "/legal-notice": { swr: 3600 },
  },
  // The OG image is served from Prismic via `useSeoMeta` in app.vue —
  // disable the dynamic generation from the @nuxtjs/og-image module.
  ogImage: {
    enabled: false,
  },
  linkChecker: {
    enabled: false,
  },
  i18n: {
    defaultLocale: "en",
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
