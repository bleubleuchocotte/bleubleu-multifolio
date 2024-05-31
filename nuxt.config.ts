// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	app: {
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
		"@nuxtjs/sitemap",
		"nuxt-simple-robots",
		"@nuxtjs/device",
		"@nuxtjs/i18n",
		"@nuxt/image",
	],
	prismic: {
		endpoint: process.env.PRISMIC_ENDPOINT,
		preview: false,
		toolbar: false,
	},
	robots: {
		disallow: ["/legal-notice", "/wip"],
	},
	i18n: {
		vueI18n: "./i18n.config.ts",
		locales: ["en", "fr"],
		strategy: "no_prefix",
		detectBrowserLanguage: false,
	},
	image: {
		prismic: {
		},

		screens: {
			"xs": 640,
			"sm": 768,
			"md": 1024,
			"lg": 1280,
			"xl": 1440,
			"xxl": 1536,
			"2xl": 2196,
		},
	},

	experimental: {
		componentIslands: true,
	},
});
