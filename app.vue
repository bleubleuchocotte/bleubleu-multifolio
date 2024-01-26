<script setup lang="ts">
const request = useRequestURL();

const { $api } = useNuxtApp();
const options = await $api.options.getOptions();
const state = await $api.options.getWebsiteState();
const wip = useState("WebsiteStateWIP", () => ref(false));

if (!options) {
	throw createError({
		statusCode: 500,
		statusMessage: "Could not reach options",
	});
}

switch (state?.website_state) {
	case ("Le site est indexable et disponible via la recherche google"):
		break;
	case ("Le site n'est pas indexable"):
		useServerSeoMeta({
			robots: "noindex, nofollow",
		});
		break;
	case ("Le site n'est pas indexable et présente une page temporaire de WIP"):
		useServerSeoMeta({
			robots: "noindex, nofollow",
		});
		wip.value = true;
		break;

	default:
		wip.value = true;
		break;
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
		lang: "en",
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
	ogLocale: "en_US",
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

	<NuxtLoadingIndicator :throttle="0" color="var(--accent-color)" />

	<NuxtLayout>
		<TheHeader
			v-if="!wip"
			:marquee-text="options['text-header']"
			:email="options.email"
		/>

		<NuxtPage />

		<TheFooter v-if="!wip" :links="options.links" class="desktop-only" />
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
