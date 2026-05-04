<script setup lang="ts">
type ComponentProps = {
  width?: number;
};
withDefaults(defineProps<ComponentProps>(), {
  width: 1,
});
</script>

<template>
  <div
    :style="`--width: ${width}px`"
    class="bg-border gradient-scroll-left relative h-full w-[var(--width)]"
  />
</template>
