<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="infinite-sliding-text__container">
    <div class="infinite-sliding-text__animation">
      <h1 :data-text="text">
        {{ text }}
      </h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
.infinite-sliding-text {
  &__container {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 1px solid var(--border-color);
    border-radius: $border-radius;
    background-color: var(--background-color);

    overflow: hidden;

    font-size: $font-size-medium;
  }

  &__animation {
    position: relative;
    width: 100%;
    animation: Scroll 10s linear infinite;

    @keyframes Scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(100%);
      }
    }
    h1 {
      padding-left: $InfiniteSlidingText-gap;
      &::before {
        content: attr(data-text);
        position: absolute;
        left: calc(-100% + $InfiniteSlidingText-gap);
      }
    }
  }
}
</style>
