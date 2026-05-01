<script setup lang="ts">
type ComponentProps = {
  colors: ColorArrow;
  orientation?: "left" | "right";
  lengthArrow?: "short" | "long";
};

withDefaults(defineProps<ComponentProps>(), {
  orientation: "right",
  lengthArrow: "long",
});
</script>

<template>
  <button
    class="h-18.75 w-18.75"
    :class="{ 'rotate-180': orientation === 'left' }"
    :aria-label="
      orientation === 'left' ? 'Go to previous project' : 'Go to next project'
    "
    :data-icon="orientation === 'left' ? 'IconArrowLeft' : 'IconArrowRight'"
  >
    <UIWrapperArrow :colors="colors" :length-arrow="lengthArrow" />
  </button>
</template>
