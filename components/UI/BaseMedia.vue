<script setup lang="ts">
import type { MediaType } from "type/types";

type ComponentProps = {
	media: MediaType
	videoSettings?: {
		controls?: boolean
		autoplay?: boolean
		loop?: boolean
		muted?: boolean
	}
};

withDefaults(defineProps<ComponentProps>(), {
	videoSettings: () => {
		return {
			autoplay: true,
			loop: true,
			muted: true,
			controls: false,
		};
	},
});
</script>

<template>
	<div class="media">
		<template v-for="field in Object.values(media.field)">
			<PrismicImage v-if="('alt' in field) || ('kind' in field && field.kind === 'image')" :key="media.id + field.url" :field="field" widths="defaults" class="media__image" :data-type="media.type" />
			<video v-else-if="'kind' in field" v-bind="videoSettings" :key="field.url" class="media__video" :data-type="media.type">
				<source :src="field.url">
			</video>
		</template>
	</div>
</template>

<style scoped lang="scss">
.media {
	display: flex;
	@include prop("gap", 0.8);

	&__image, &__video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		@include border-radius();

		&[data-type="media-full"] {
			aspect-ratio: 16/9;
		}

		&[data-type="media-duo"] {
			aspect-ratio: 1;
		}
	}
}
</style>
