<script setup lang="ts">
defineProps({
  texts: {
    type: Array<String>,
    required: true,
  },
});
</script>

<template>
  <div class="infinite-sliding-text__container">
    <div class="infinite-sliding-text__animation">
      <span v-for="(text, index) in texts" :key="index" :data-text="text">
        {{ text }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.infinite-sliding-text {
  &__container {
    width: 100%;

    border: 1px solid black;
    border-radius: 50px;

    overflow: hidden;
  }

  &__animation {
    position: relative;
    animation: Scroll 10s linear infinite;

    @keyframes Scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(100%);
      }
    }
    span {
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
