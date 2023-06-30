<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

defineProps({
  email: {
    type: String,
    required: true,
  },
});

const { copy } = useClipboard();
</script>

<template>
  <button class="button" @click="copy(email)">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.button {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;

  border-radius: $border-radius;

  color: var(--text-accent-color);
  background-color: var(--accent-color);

  font-size: $font-size-normal;

  cursor: pointer;
}
</style>
