<script setup lang="ts">
import type { MediaType } from "@/type/types";

type ComponentProps = {
	media: MediaType
	videoSettings?: {
		controls?: boolean
		autoplay?: boolean
		loop?: boolean
		muted?: boolean
	}
};

const props = withDefaults(defineProps<ComponentProps>(), {
	videoSettings: () => {
		return {
			autoplay: true,
			loop: true,
			muted: true,
			controls: false,
		};
	},
});

const videos = ref<HTMLVideoElement[] | null>(null);

const onVisibilityChanged: (isVisible: boolean) => void = (isVisible: boolean) => {
	if (props.videoSettings.autoplay) {
		videos.value?.forEach((video) => {
			isVisible ? video.play() : video.pause();
		});
	}
};
</script>

<template>
	<UIBaseIntersectionObserver class="media" @is-visible="onVisibilityChanged">
		<template v-for="field in (Object.values(media.field))">
			<img v-if="field.kind === 'image'" :key="media.id + field.url" :src="field.url" :height="field.height ?? ''" :width="field.width ?? ''" class="media__image" :data-type="media.type">
			<video v-else v-bind="videoSettings" :key="field.url" ref="videos" class="media__video" :data-type="media.type">
				<source :src="field.url">
			</video>
		</template>
	</UIBaseIntersectionObserver>
</template>

<style scoped lang="scss">
.media {
	display: flex;
	@include prop("gap", 0.8);

	&__image, &__video {
		width: 100%;
		min-width: 0;
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
