<script setup lang="ts">
import type { MediaHTMLAttributes } from "vue";

type ComponentProps = {
	context: MediaHTMLAttributes
	src: string
	state: "play" | "pause"
};

const props = defineProps<ComponentProps>();

const video = ref<HTMLVideoElement | null>(null);
const isVideoLoaded = ref(false);

watch(() => props.state, () => {
	if (video.value) {
		switch (props.state) {
			case "play":
				video.value.play();
				if (!isVideoLoaded.value) {
					isVideoLoaded.value = true;
				}
				break;
			case "pause":
				video.value.pause();
				break;

			default:
				break;
		}
	}
});
</script>

<template>
	<div class="video" :data-video-loaded="isVideoLoaded">
		<div class="video__placeholder" />

		<video ref="video" v-bind="context">
			<source :src="src">
		</video>
	</div>
</template>

<style scoped lang="scss">
.video {
	position: relative;

	video {
		height: 100%;
		width: 100%;
		object-fit: cover;
		transition: opacity 0.3s ease 0.6s;
	}

	&[data-video-loaded="true"] video {
		opacity: 1;
	}

	&[data-video-loaded="false"] video {
		opacity: 0;
	}

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
