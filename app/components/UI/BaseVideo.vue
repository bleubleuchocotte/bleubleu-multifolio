<script setup lang="ts">
import type { MediaHTMLAttributes } from "vue";

type ComponentProps = {
  context: MediaHTMLAttributes;
  src: string;
  state: "play" | "pause";
};

const props = defineProps<ComponentProps>();

const video = ref<HTMLVideoElement | null>(null);
const isVideoLoaded = ref(false);

watch(
  () => props.state,
  () => {
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
  },
);
</script>

<template>
  <div class="video relative" :data-video-loaded="isVideoLoaded">
    <div
      class="rounded-fluid bg-text absolute inset-0 -z-10 opacity-20 backdrop-blur-[5px]"
    />

    <video ref="video" v-bind="context">
      <source :src="src" />
    </video>
  </div>
</template>

<style scoped>
.video video {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease 0.6s;
}
.video[data-video-loaded="true"] video {
  opacity: 1;
}
.video[data-video-loaded="false"] video {
  opacity: 0;
}
</style>
