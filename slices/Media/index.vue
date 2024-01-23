<script setup lang="ts">
import type { Content, LinkToMediaField } from "@prismicio/client";
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
type FilledLinkToMediaField<T> = {
	[K in keyof T]: T[K] extends LinkToMediaField ? LinkToMediaField<"filled"> : T[K];
};

const { responsive_media, ...fields } = props.slice.primary;

const videos = ref<HTMLVideoElement[] | null>(null);

const onVisibilityChanged: (isVisible: boolean) => void = (isVisible: boolean) => {
	if (props.context.autoplay) {
		videos.value?.forEach((video) => {
			isVisible ? video.play() : video.pause();
		});
	}
};

const isMobile = useMediaQuery("(max-width: 1025px)"); // Client side
const { isDesktop } = useDevice(); // Server side
</script>

<template>
	<ClientOnly>
		<template v-if="isMobile">
			<div class="media-mobile">
				<img v-if="(responsive_media as LinkToMediaField<'filled'>).kind === 'image'" :key="slice.id + (responsive_media as LinkToMediaField<'filled'>).url" :src="(responsive_media as LinkToMediaField<'filled'>).url" :height="(responsive_media as LinkToMediaField<'filled'>).height ?? ''" :width="(responsive_media as LinkToMediaField<'filled'>).width ?? ''" alt="" class="media-mobile__image">

				<video v-else :key="(responsive_media as LinkToMediaField<'filled'>).url" ref="videos" v-bind="props.context" class="media-mobile__video">
					<source :src="(responsive_media as LinkToMediaField<'filled'>).url">
				</video>
			</div>
		</template>

		<UIBaseIntersectionObserver v-else class="media" @is-visible="onVisibilityChanged">
			<template v-for="field in Object.values(fields as FilledLinkToMediaField<typeof fields>)">
				<img v-if="field.kind === 'image'" :key="slice.id + field.url" :src="field.url" :height="field.height ?? ''" :width="field.width ?? ''" class="media__image" :data-type="slice.variation === 'default' ? 'media-duo' : 'media-full'" alt="">

				<video v-else :key="field.url" ref="videos" class="media__video" :data-type="slice.variation === 'default' ? 'media-duo' : 'media-full'" v-bind="props.context">
					<source :src="field.url">
				</video>
			</template>
		</UIBaseIntersectionObserver>

		<template #fallback>
			<UIBaseIntersectionObserver v-if="isDesktop" class="media" @is-visible="onVisibilityChanged">
				<template v-for="field in Object.values(fields as FilledLinkToMediaField<typeof fields>)">
					<img v-if="field.kind === 'image'" :key="slice.id + field.url" :src="field.url" :height="field.height ?? ''" :width="field.width ?? ''" class="media__image" :data-type="slice.variation === 'default' ? 'media-duo' : 'media-full'" alt="">

					<video v-else :key="field.url" ref="videos" class="media__video" :data-type="slice.variation === 'default' ? 'media-duo' : 'media-full'" v-bind="props.context">
						<source :src="field.url">
					</video>
				</template>
			</UIBaseIntersectionObserver>

			<template v-else>
				<div class="media-mobile">
					<img v-if="(responsive_media as LinkToMediaField<'filled'>).kind === 'image'" :key="slice.id + (responsive_media as LinkToMediaField<'filled'>).url" :src="(responsive_media as LinkToMediaField<'filled'>).url" :height="(responsive_media as LinkToMediaField<'filled'>).height ?? ''" :width="(responsive_media as LinkToMediaField<'filled'>).width ?? ''" alt="" class="media-mobile__image">

					<video v-else :key="(responsive_media as LinkToMediaField<'filled'>).url" ref="videos" v-bind="props.context" class="media-mobile__video">
						<source :src="(responsive_media as LinkToMediaField<'filled'>).url">
					</video>
				</div>
			</template>
		</template>
	</ClientOnly>
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
