<script setup lang="ts">
import type { FilledLinkToMediaField, ImageField } from "@prismicio/client";

type ComponentProps = {
	image?: ImageField
	linkToMediaField?: FilledLinkToMediaField
};

defineProps<ComponentProps>();

const isImageLoaded = ref(false);
const container = ref<HTMLDivElement | null>(null);
</script>

<template>
	<div ref="container" class="picture" :data-image-loaded="isImageLoaded">
		<div class="picture__placeholder" :class="{ rounded: linkToMediaField }" />
		<template v-if="image">
			<NuxtPicture
				v-if="image.url"

				provider="prismic"

				:src="image.url"
				:alt="image.alt ?? ''"

				:width="container?.clientWidth"
				:height="container?.clientHeight"

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

				:height="container?.clientHeight"
				:width="container?.clientWidth"

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

		&.rounded {
			@include border-radius();
		}
	}
}
</style>
