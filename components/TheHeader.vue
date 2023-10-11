<script setup lang="ts">
import "vue3-marquee/dist/style.css";

defineProps({
  email: {
    type: String,
    required: true,
  },
  marqueeText: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <header class="header">
    <div class="header__slider">
      <Vue3Marquee
        :direction="'normal'"
        :duration="10"
        class="header__slider-container"
      >
        <h1 style="margin-left: 5em">{{ marqueeText }}</h1>
      </Vue3Marquee>
    </div>

    <UIBaseButtonContact :email="email" class="header__button desktop-only">
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
  }
}
</style>
