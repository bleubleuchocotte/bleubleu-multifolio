<script setup lang="ts">
type ComponentProps = {
  index: number;
};

defineProps<ComponentProps>();
</script>

<template>
  <span class="mr-fluid inline-block tabular-nums">{{
    index < 10 ? `0${index}` : index.toString()
  }}</span>
</template>
