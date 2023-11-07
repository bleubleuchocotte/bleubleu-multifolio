<script setup lang="ts">
defineProps({
  volume: {
    type: Number,
    default: 0.5,
    required: true,
  },
  isMute: {
    type: Boolean,
    default: false,
    required: true,
  },
});
</script>

<template>
  <button type="button" style="display: flex">
    <IconBaseVolumeMute
      v-if="volume <= 0 || isMute"
      style="height: 25px; width: 25px"
      :colors="{
        background: 'transparent',
        arrow: 'var(--accent-color)',
      }"
    />
    <IconBaseVolumeLow
      v-else-if="volume > 0 && volume <= 0.3"
      style="height: 25px; width: 25px"
      :colors="{
        background: 'transparent',
        arrow: 'var(--accent-color)',
      }"
    />
    <IconBaseVolumeMed
      v-else-if="volume > 0.3 && volume <= 0.6"
      style="height: 25px; width: 25px"
      :colors="{
        background: 'transparent',
        arrow: 'var(--accent-color)',
      }"
    />
    <IconBaseVolumeHigh
      v-else
      style="height: 25px; width: 25px"
      :colors="{
        background: 'transparent',
        arrow: 'var(--accent-color)',
      }"
    />
  </button>
</template>
