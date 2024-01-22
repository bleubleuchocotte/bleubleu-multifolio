<script setup lang="ts">
import type { MediaType } from "~/type/types";

type ComponentProps = {
	medias: MediaType[]
};

defineProps<ComponentProps>();
</script>

<template>
	<UIBaseSlider>
		<UIBaseMedia
			v-for="(media) in medias" :key="media.id" :media="media" :video-settings="{
				controls: true,
				muted: true,
				autoplay: false,
				loop: false,
			}"
		/>
	</UIBaseSlider>
</template>
