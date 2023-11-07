<script setup lang="ts">
import { ColorArrow } from "@/type/types";

defineProps({
  colors: {
    type: Object as PropType<ColorArrow>,
    required: true,
  },
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="19"
    viewBox="0 0 17 19"
    fill="none"
  >
    <rect
      x="0.578125"
      y="1.64014"
      width="5.40493"
      height="16.7522"
      rx="1.5"
      :stroke="colors.arrow"
    />
    <rect
      x="10.2676"
      y="1.2876"
      width="5.40493"
      height="16.7522"
      rx="1.5"
      :stroke="colors.arrow"
    />
  </svg>
</template>
