<script setup lang="ts">
import type { HomePageProps, LinkType } from "@/type/types";

const { $api } = useNuxtApp();

const page = await $api.pages.getHome();
const options = await $api.options.getOptions();
const projects = await $api.projects.getProjects();

if (!options || !page) {
	throw new Error("Erreur");
}

const isMobile = useMediaQuery("(max-width: 1025px)"); // Client side
const { isDesktop } = useDevice(); // Server side

const props: HomePageProps = {
	desktop: {
		projects,
		content: {
			about: {
				me: {
					"first-name": options.data["first-name"] ?? "",
					"last-name": options.data["last-name"] ?? "",
					"description": page.data.description,
					"image": page.data["about-image"],
					"email": options.data.email ?? "",
				},
				links: options.data.links.map((link) => {
					const linkTyped: LinkType = {
						id: useUID(),
						name: link.name ?? "",
						link: link.link,
					};
					return linkTyped;
				}) ?? [],
			},
			endindCardImage: page.data["ending-card-image"],
		},
	},
	mobile: {
		projects,
		content: {
			me: {
				"first-name": options.data["first-name"] ?? "",
				"last-name": options.data["last-name"] ?? "",
				"description": options.data.description,
				"image": options.data["about-image"],
				"email": options.data.email ?? "",
			},
			links: options.data.links.map((link) => {
				const linkTyped: LinkType = {
					id: useUID(),
					name: link.name ?? "",
					link: link.link,
				};
				return linkTyped;
			}) ?? [],
		},
	},
};
</script>

<template>
	<div class="index-page">
		<ClientOnly>
			<TheMainMobile v-if="isMobile" v-bind="props.mobile" />
			<TheMain
				v-else
				class="index-page__desktop"
				v-bind="props.desktop"
			/>

			<template #fallback>
				<TheMain
					v-if="isDesktop"
					v-bind="props.desktop"
					class="index-page__desktop"
				/>
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
