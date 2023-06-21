<script setup lang="ts">
import { Footer } from "./type/types";
defineProps({
  params: {
    type: Object as PropType<Footer>,
    required: true,
  },
});
</script>

<template>
  <footer>{{ params }}</footer>
</template>
