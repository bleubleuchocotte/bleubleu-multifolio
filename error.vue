<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<ComponentProps>();

const i18n = useI18n();

type ComponentProps = {
	error: NuxtError
};

const request = useRequestURL();

const { $api } = useNuxtApp();
const options = await $api.options.getOptions();

const htmlLang = ref<"fr" | "en" | null>(null);
const ogLang = ref<"fr_FR" | "en_US" | null>(null);

const languageFromCMS = await $api.options.getLanguage();
switch (languageFromCMS?.language) {
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

if (!options) {
	throw createError({
		statusCode: 500,
		statusMessage: "Could not reach options",
	});
}

const cssVariables = [
	`--accent-color: ${options["accent-color"]}`,
	`--accent-color-80: ${options["accent-color"]}80`,
	`--text-accent-color: ${options["text-accent-color"]}`,
	`--text-color: ${options["text-color"]}`,
	`--background-color: ${options["background-color"]}`,
	`--border-color:${options["text-color"]}80`,
	`--background-color-70: ${options["background-color"]}B3`,
];

useHead({
	htmlAttrs: {
		lang: htmlLang.value,
	},
	style: [`:root{${cssVariables.join(";")}}`],
});

useServerHeadSafe({
	link: [
		{
			rel: "icon",
			type: "image/png",
			sizes: "16x16",
			href: options["seo-favicon"].url ?? `${request.origin}/default-favicon-16x16.png`,
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "32x32",
			href: options["seo-favicon"].url ?? `${request.origin}/default-favicon-32x32.png`,
		},
	],
});

// Tout ce qui n'a pas besoin d'être réactif entre les pages ce met ici
useServerSeoMeta({
	ogType: "website",
	ogLocale: ogLang.value,
	twitterCard: "summary",

	colorScheme: options["accent-color"],
	themeColor: options["accent-color"],

	title: options["seo-title"],
	description: options["seo-description"],

	ogTitle: options["seo-title"],
	ogDescription: options["seo-description"],
	ogUrl: request.origin + request.pathname,
	ogImage: {
		url: options["og-image"].url ?? "",
		secureUrl: options["og-image"].url ?? "",
		width: options["og-image"].dimensions?.width ?? "",
		height: options["og-image"].dimensions?.width ?? "",
	},

	publisher: `${options["first-name"]} ${options["last-name"]}`,
});

// Permet de détecter si un des pointeurs est une souris (Il peut y avoir plusieurs pointeurs notamment sur les écrans tactiles)
const isPointerAccurate = useMediaQuery("(any-pointer: fine)");
</script>

<template>
	<ClientOnly>
		<UIBaseCursor v-if="isPointerAccurate" />
	</ClientOnly>
	<NuxtLayout name="404">
		<TheHeader :marquee-text="options['text-header']" :email="options.email" />
		<main>
			<ErrorDefault :code="error.statusCode ?? -1" />
		</main>
		<TheFooter :links="options.links" class="desktop-only" />
	</NuxtLayout>
</template>
