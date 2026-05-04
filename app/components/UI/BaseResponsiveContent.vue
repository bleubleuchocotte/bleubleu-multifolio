<script setup lang="ts">
type ComponentProps = {
  /**
   * Min-width media query used after hydration to detect viewport changes.
   * Defaults to the project's lg breakpoint (1025px).
   */
  minWidth?: string;
};

const props = withDefaults(defineProps<ComponentProps>(), {
  minWidth: "(min-width: 1025px)",
});

const isDesktop = useIsDesktop({ minWidth: props.minWidth });
</script>

<template>
  <slot v-if="isDesktop" name="desktop" />
  <slot v-else name="mobile" />
</template>
