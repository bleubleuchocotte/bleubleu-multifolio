<script setup lang="ts">
import type { Content } from "@prismicio/client";
import type { MediaHTMLAttributes } from "vue";
import { components } from "@/slices";

type ComponentProps = {
	medias: Content.ProjetDocumentDataSlicesSlice[]
};

defineProps<ComponentProps>();

const mediaAttribute: MediaHTMLAttributes = {
	controls: true,
	muted: true,
};
</script>

<template>
	<UIBaseSlider>
		<SliceZone v-for="(media) in medias" :key="media.id" :slices="[media]" :components="components" :context="mediaAttribute" />
	</UIBaseSlider>
</template>
