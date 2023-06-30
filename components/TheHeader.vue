<script setup lang="ts">
import "vue3-marquee/dist/style.css";
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
    <div class="header__slider">
      <Vue3Marquee :direction="'reverse'" :duration="10">
        <h1 style="margin-left: 5rem">{{ params.text }}</h1>
      </Vue3Marquee>
    </div>

    <UIBaseButtonContact :email="params.email" class="header__button">
      contact
    </UIBaseButtonContact>
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

    border: 1px solid var(--border-color);
    border-radius: $border-radius;
    background-color: var(--background-color);

    font-size: $font-size-medium;
  }

  &__button {
    flex: 0.15;
  }
}
</style>
