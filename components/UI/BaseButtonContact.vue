<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

defineProps({
  email: {
    type: String,
    required: true,
  },
});

const { copy, copied } = useClipboard({ copiedDuring: 2000 });
</script>

<template>
  <button
    :data-email="email"
    class="button"
    :class="{ open: copied }"
    @click="copy(email)"
  >
    <div class="button__text">
      <div class="button__text-bg-top">
        <span><slot /></span>
      </div>
      <div class="button__text-bg-bottom">
        <span><slot /></span>
      </div>
    </div>

    <div class="button__reveal">{{ copied ? "Email copied ! ❤" : email }}</div>
  </button>
</template>

<style scoped lang="scss">
.button {
  position: relative;
  overflow: hidden;

  height: 100%;
  width: 100%;

  border-radius: $border-radius;

  color: var(--text-accent-color);

  font-size: $font-size-normal;

  &:hover .button__text-bg,
  &.open .button__text-bg {
    &-top {
      transform: translate3d(0, -100%, 0);
    }
    &-bottom {
      transform: translate3d(0, 100%, 0);
    }
  }

  &__text {
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    z-index: 1;

    &-bg-top,
    &-bg-bottom {
      width: 100%;
      height: 50%;

      background-color: var(--accent-color);

      position: relative;

      overflow: hidden;
      transition: transform 0.3s ease-out;

      span {
        width: 100%;
        height: 100%;
        position: absolute;

        left: 0;

        text-align: center;
      }
    }

    &-bg-top {
      span {
        bottom: 0;

        transform: translate3d(0, 50%, 0);
      }
    }

    &-bg-bottom {
      span {
        top: 0;

        transform: translate3d(0, -50%, 0);
      }
    }
  }

  &__reveal {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    width: 100%;

    position: absolute;
    left: 0;
    top: 0;

    background-color: var(--background-color);
    color: var(--accent-color);
    border-radius: $border-radius;
    border: 1px solid var(--accent-color);
  }
}
</style>
