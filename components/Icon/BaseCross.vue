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
        width="29" 
        height="29" 
        viewBox="0 0 29 29" 
        fill="none"
    >
    <circle 
        cx="14.185" 
        cy="14.185" 
        r="13.685" 
        transform="matrix(1 0 0 -1 0.361328 28.8334)" 
        :stroke="colors.background" 
    />
    <path 
        d="M20.76 20.8613L8.33398 8.43533M20.76 8.4353L8.334 20.8613" 
        :stroke="colors.arrow" 
        stroke-linecap="round"
    />
    </svg>
</template>

<style scoped lang="scss">

</style>