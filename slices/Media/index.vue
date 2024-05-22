<script setup lang="ts">
import type { Content } from "@prismicio/client";
import type { MediaHTMLAttributes } from "vue";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
	getSliceComponentProps<Content.MediaSlice, MediaHTMLAttributes>([
		"slice",
		"index",
		"slices",
		"context",
	]),
);

const { responsive_media, ...fields } = props.slice.primary;

const videos = ref<HTMLVideoElement[] | null>(null);

const onVisibilityChanged: (isVisible: boolean) => void = (isVisible: boolean) => {
	if (props.context.autoplay) {
		videos.value?.forEach((video) => {
			isVisible ? video.play() : video.pause();
		});
	}
};
</script>

<template>
	<UIBaseResponsiveContent media-query="(max-width: 1025px)">
		<template #mobile>
			<div v-if="('kind' in responsive_media)" class="media-mobile">
				<img v-if="responsive_media.kind === 'image'" :key="slice.id + responsive_media.url" :src="responsive_media.url" :height="responsive_media.height ?? ''" :width="responsive_media.width ?? ''" alt="" class="media-mobile__image" loading="lazy" decoding="async">

				<video v-else :key="responsive_media.url" ref="videos" v-bind="props.context" class="media-mobile__video">
					<source :src="responsive_media.url">
				</video>
			</div>
		</template>
		<template #desktop>
			<UIBaseIntersectionObserver class="media" @is-visible="onVisibilityChanged">
				<template v-for="field in Object.values(fields)">
					<template v-if="('kind' in field)">
						<img v-if="field.kind === 'image'" :key="slice.id + field.url" :src="field.url" :height="field.height ?? ''" :width="field.width ?? ''" class="media__image" :data-type="slice.variation === 'default' ? 'media-duo' : 'media-full'" alt="" loading="lazy" decoding="async">

						<video v-else :key="field.url" ref="videos" class="media__video" :data-type="slice.variation === 'default' ? 'media-duo' : 'media-full'" v-bind="props.context">
							<source :src="field.url">
						</video>
					</template>
				</template>
			</UIBaseIntersectionObserver>
		</template>
	</UIBaseResponsiveContent>
</template>

<style scoped lang="scss">
.media {
	display: flex;
	@include prop("gap", 0.8);
	width: 100%;

	&-mobile {
		scroll-snap-align: center;
		min-width: 75vw;
		height: 100%;

		&__image,
		&__video {
			width: 100%;
			max-height: 75vh;
			aspect-ratio: 9/16;
			@include border-radius();
			object-fit: cover;
		}
	}

	&__image,
	&__video {
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
