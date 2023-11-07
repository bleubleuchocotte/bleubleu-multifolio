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
    <path
      d="M15.0254 8.5409C16.0254 9.11825 16.0254 10.5616 15.0254 11.139L2.75 18.2262C1.75 18.8035 0.5 18.0818 0.5 16.9271L0.500001 2.75274C0.500001 1.59804 1.75 0.876351 2.75 1.4537L15.0254 8.5409Z"
      :stroke="colors.arrow"
    />
  </svg>
</template>
