// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  modules: ["@vueuse/nuxt", "@nuxtjs/prismic"],
  prismic: { endpoint: "https://test-duofolio.cdn.prismic.io/api/v2" },
  plugins: [
    {
      src: "@/plugins/Vue3Marquee.client.ts",
      mode: "client",
    },
  ],
});
