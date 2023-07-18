// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
        {
          name: "author",
          content: "Thomas Auffroy",
        },
        {
          name: "creator",
          content: "Thomas Auffroy",
        },
      ],
      htmlAttrs: {
        lang: "en",
      },
    },
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
  },
  css: ["@/assets/styles/reset.css", "@/assets/styles/lenis.css"],
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/prismic",
    "nuxt-simple-robots",
    "nuxt-simple-sitemap",
  ],
  prismic: {
    endpoint: "https://test-duofolio.cdn.prismic.io/api/v2",
    toolbar: false,
    preview: false,
  },
  plugins: [
    {
      src: "@/plugins/Vue3Marquee.client.ts",
      mode: "client",
    },
  ],
});
