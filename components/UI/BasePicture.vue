<script setup lang="ts">
import type { FilledLinkToMediaField, ImageField } from "@prismicio/client";

type ComponentProps = {
	image?: ImageField
	linkToMediaField?: FilledLinkToMediaField
};

defineProps<ComponentProps>();

const isImageLoaded = ref(false);
</script>

<template>
	<div class="picture">
		<template v-if="image">
			<NuxtPicture
				v-if="image.url"

				provider="prismic"
				loading="lazy"

				:src="image.url"
				:alt="image.alt ?? ''"

				:height="image.dimensions?.height"
				:width="image.dimensions?.width"

				@load="isImageLoaded = true"
			/>
		</template>
		<template v-else-if="linkToMediaField">
			<NuxtPicture
				provider="prismic"
				loading="lazy"

				:src="linkToMediaField.url"
				alt=""

				:height="linkToMediaField.height ?? ''"
				:width="linkToMediaField.width ?? ''"

				@load="isImageLoaded = true"
			/>
		</template>

		<div class="picture__placeholder" :data-image-loaded="isImageLoaded" />
	</div>
</template>

<style scoped lang="scss">
.picture {
	position: relative;

	&__placeholder {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		transition: all 0.3s ease-out;

		&[data-image-loaded="true"] {
			background-color: transparent;
			backdrop-filter: blur(0px);
		}

		&[data-image-loaded="false"] {
			background-color: var(--accent-color);
			backdrop-filter: blur(100px);
		}
	}
}
</style>
