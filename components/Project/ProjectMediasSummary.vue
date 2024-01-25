<script setup lang="ts">
import type { Content } from "@prismicio/client";
import type { MediaHTMLAttributes } from "vue";

import { components } from "@/slices";

type ComponentProps = {
	medias: Content.ProjetDocumentDataSlicesSlice[]
};
defineProps<ComponentProps>();

const mediaAttribute: MediaHTMLAttributes = {
	autoplay: true,
	loop: true,
	muted: true,
};
</script>

<template>
	<div class="project-images-summary__grid">
		<template v-for="media in medias" :key="media.id">
			<div class="project-images-summary__grid-item">
				<SliceZone :slices="[media]" :components="components" :context="mediaAttribute" />
			</div>
		</template>
	</div>
</template>

<style scoped lang="scss">
.project-images-summary {
	&__grid {
		height: 100%;
		cursor: pointer;

		display: flex;
		flex-direction: column;
		@include prop("gap", 0.8);

		&-item {
			display: flex;
			flex: 1;
			overflow: hidden;
			transition: transform 0.1s ease-out;

			&:first-of-type {
				transform: translate3d(calc(var(--v) * 1.5px), 0, 0)
					skewX(calc(var(--v) * -0.02deg));
			}

			&:last-of-type {
				transform: translate3d(calc(var(--v) * 0.75px), 0, 0)
					skewX(calc(var(--v) * -0.02deg));
			}
		}
	}
}
</style>
