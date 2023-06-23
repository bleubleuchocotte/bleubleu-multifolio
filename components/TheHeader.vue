<script setup lang="ts">
import { Header } from "@/type/types";
defineProps({
  params: {
    type: Object as PropType<Header>,
    required: true,
  },
});
</script>

<template>
  <header class="header">
    <UIInfiniteSlidingText :text="params.text" />
    <UIBaseLink :href="'google.com'">Contact</UIBaseLink>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  padding: $gutter;
  gap: $gutter;
}
</style>
