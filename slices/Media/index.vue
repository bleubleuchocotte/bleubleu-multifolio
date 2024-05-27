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

const isContainerVisible = ref(false);
const videoState = computed(() => {
	if (isContainerVisible.value) {
		return "play";
	}
	else {
		return "pause";
	}
});
</script>

<template>
	<UIBaseResponsiveContent media-query="(max-width: 1025px)">
		<template #mobile>
			<UIBaseIntersectionObserver v-if="('kind' in responsive_media)" class="media-mobile" @is-visible="(bool) => isContainerVisible = bool">
				<UIBasePicture
					v-if="responsive_media.kind === 'image'"
					:key="slice.id + responsive_media.url"
					class="media-mobile__image"
					:link-to-media-field="responsive_media"
				/>

				<UIBaseVideo
					v-else
					class="media-mobile__video"
					:src="responsive_media.url"
					:context="props.context"
					:state="videoState"
				/>
			</UIBaseIntersectionObserver>
		</template>
		<template #desktop>
			<UIBaseIntersectionObserver class="media" @is-visible="(bool) => isContainerVisible = bool">
				<template v-for="field in Object.values(fields)">
					<template v-if="('kind' in field)">
						<UIBasePicture
							v-if="field.kind === 'image'"
							:key="slice.id + field.url"
							class="media__image"
							:data-type="slice.variation === 'default' ? 'media-duo' : 'media-full'"
							:link-to-media-field="field"
						/>

						<UIBaseVideo
							v-else
							:key="field.url"
							class="media__video"
							:data-type="slice.variation === 'default' ? 'media-duo' : 'media-full'"
							:context="props.context"
							:src="field.url"
							:state="videoState"
						/>
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
			overflow: hidden;
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

		overflow: hidden;

		&[data-type="media-full"] {
			aspect-ratio: 16/9;
		}

		&[data-type="media-duo"] {
			aspect-ratio: 1;
		}
	}
}
</style>
