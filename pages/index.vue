<script setup lang="ts">
import type { HomepageProps } from "~/types";

const { $api } = useNuxtApp();

const page = await $api.pages.getHome();
const options = await $api.options.getOptions();
const projects = await $api.projects.getAllProjects();

if (!options || !page) {
	throw new Error("Le contenu de la page ou le contenu des options n'a pas pu être récupéré. Vérifier l'url pour le projet prismic et assuré vous d'avoir rempli toutes les informations nécessaires sur Prismic");
}

const isMobile = useMediaQuery("(max-width: 1025px)");
const { isDesktop } = useDevice(); // Server side

const props: HomepageProps = {
	desktop: {
		projects,
		endingCardImage: page["ending-card-image"],
		aboutMe: {
			imageOfMe: page["about-image"],
			description: page.description,
			email: options.email,
			links: options.links,
			firstName: options["first-name"],
			lastName: options["last-name"],
		},
	},
	mobile: {
		projects,
		aboutMe: {
			imageOfMe: page["about-image"],
			description: page.description,
			email: options.email,
			links: options.links,
			firstName: options["first-name"],
			lastName: options["last-name"],
		},
	},
};
</script>

<template>
	<div class="index-page">
		<ClientOnly>
			<TheMainMobile v-if="isMobile" v-bind="props.mobile" />
			<TheMain v-else class="index-page__desktop" v-bind="props.desktop" />

			<template #fallback>
				<TheMain v-if="isDesktop" v-bind="props.desktop" class="index-page__desktop" />
				<TheMainMobile v-else v-bind="props.mobile" />
			</template>
		</ClientOnly>
	</div>
</template>

<style scoped lang="scss">
.index-page {
	min-height: 0;

	&__desktop {
		height: 100%;
	}
}
</style>
