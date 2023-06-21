<script setup lang="ts">
import { Main } from "./type/types";
defineProps({
  params: {
    type: Object as PropType<Main>,
    required: true,
  },
});
</script>

<template>
  <main>{{ params }}</main>
</template>
