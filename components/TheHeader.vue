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
      <Vue3Marquee
        :direction="'reverse'"
        :duration="10"
        class="header__slider-container"
      >
        <h1 style="margin-left: 5em">{{ params.text }}</h1>
      </Vue3Marquee>
    </div>

    <UIBaseButtonContact :email="params.email" class="header__button">
      Contact
    </UIBaseButtonContact>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  @include gap();
  @include margin();

  height: 45px;

  @media #{$mobile-down} {
    height: 35px;
  }

  &__slider {
    @include transition();
    @include border(0.5, var(--border-color));

    width: 100%;

    &-container {
      align-items: center;
      height: 100%;
      overflow: hidden;
    }
  }

  &__button {
    min-width: 200px;
    flex: 1;

    @media #{$mobile-down} {
      display: none;
    }
  }
}
</style>
