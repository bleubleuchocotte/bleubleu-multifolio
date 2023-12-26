// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
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
					additionalData: "@import \"@/assets/styles/main.scss\";",
				},
			},
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
		"nuxt-simple-robots",
		"nuxt-simple-sitemap",
		"@nuxtjs/device",
	],
	prismic: {
		endpoint: process.env.PRISMIC_ENDPOINT,
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
