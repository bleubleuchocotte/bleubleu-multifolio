<script setup lang="ts">
defineProps({
  isPlaying: {
    type: Boolean,
    default: false,
    required: true,
  },
});
</script>

<template>
  <button type="button" style="display: flex">
    <IconBasePause
      v-if="isPlaying"
      :colors="{
        background: 'transparent',
        arrow: 'var(--accent-color)',
      }"
    />
    <IconBasePlay
      v-else
      :colors="{
        background: 'transparent',
        arrow: 'var(--accent-color)',
      }"
    />
  </button>
</template>
