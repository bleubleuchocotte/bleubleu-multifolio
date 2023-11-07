<script setup lang="ts">
import { useMediaControls } from "@vueuse/core";

const audio = ref();
const { playing, buffered, currentTime, muted, volume, duration } =
  useMediaControls(audio, {
    src: "/minecraft.mp3",
  });
const endBuffer = computed(() =>
  buffered.value.length > 0 ? buffered.value[buffered.value.length - 1][1] : 0
);

function formatDuration(seconds: number) {
  return new Date(1000 * seconds).toISOString().slice(15, 19);
}

onMounted(() => {
  volume.value = 0.5;
  currentTime.value = 0;
});
</script>

<template>
  <div
    class="player-container"
    :tabindex="0"
    autofocus
    @keydown.prevent.space="playing = !playing"
    @keydown.right="currentTime += 10"
    @keydown.left="currentTime -= 10"
    @keydown.up="volume > 0.9 ? (volume = 1) : (volume += 0.1)"
    @keydown.down="volume <= 0.1 ? (volume = 0) : (volume -= 0.1)"
    @keydown.m="muted = !muted"
  >
    <audio ref="audio" />
    <UIBasePlayer :is-playing="playing" @click="playing = !playing" />
    <p class="player-container__timecode">{{ formatDuration(currentTime) }}</p>
    <UIBaseSlider
      v-model="currentTime"
      :max="duration"
      :secondary="endBuffer"
      class="player-container__slider"
    />
    <div class="player-container__volume-container">
      <UIWrapperVolume
        class="player-container__volume-container-button"
        :volume="volume"
        :is-mute="muted"
        @click="muted = !muted"
      />
      <UIBaseSlider v-model="volume" :max="1" :min="0"></UIBaseSlider>
    </div>
  </div>
</template>

<style scoped lang="scss">
.player-container {
  display: inline-flex;
  align-items: center;
  @include gap(0.6);
  @include border-radius(0.6);
  @include padding(0.7);
  border: 1px solid var(--border-color);

  &__volume-container {
    display: inline-flex;
    align-items: center;
    @include gap(0.2);
    max-width: 35%;
    min-width: 100px;
    align-self: stretch;
  }

  &__timecode {
    min-width: 8%;
    color: var(--border-color);
  }
}
</style>
