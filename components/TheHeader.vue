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
    <UIInfiniteSlidingText :text="params.text" class="header__slider" />
    <UIBaseButton :email="params.email" class="header__button"
      >contact</UIBaseButton
    >
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  margin: $gutter;
  gap: $gutter;

  height: 40px;

  &__slider {
    flex: 0.85;
  }

  &__button {
    flex: 0.15;
  }
}
</style>
