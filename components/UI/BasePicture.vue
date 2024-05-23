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
	<div class="picture" :data-image-loaded="isImageLoaded">
		<div class="picture__placeholder" />
		<template v-if="image">
			<NuxtPicture
				v-if="image.url"

				:img-attrs="{ class: 'picture__content' }"
				provider="prismic"

				:src="image.url"
				:alt="image.alt ?? ''"

				:height="image.dimensions?.height"
				:width="image.dimensions?.width"

				@load="isImageLoaded = true"
			/>
		</template>
		<template v-else-if="linkToMediaField">
			<NuxtPicture
				:img-attrs="{ class: 'picture__content' }"

				provider="prismic"
				loading="lazy"

				:src="linkToMediaField.url"
				alt=""

				:height="linkToMediaField.height ?? ''"
				:width="linkToMediaField.width ?? ''"

				@load="isImageLoaded = true"
			/>
		</template>
	</div>
</template>

<style lang="scss">
.picture {
	&__content {
		transition: opacity 0.3s ease 0.6s;
	}

	&[data-image-loaded="true"] {
		.picture__content {
			opacity: 1;
		}
	}

	&[data-image-loaded="false"] {
		.picture__content {
			opacity: 0;
		}
	}
}
</style>

<style scoped lang="scss">
.picture {
	position: relative;

	&__placeholder {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		background-color: var(--text-color);
		backdrop-filter: blur(5px);
		opacity: 0.2;
		z-index: -1;
	}
}
</style>
