<script setup lang="ts">
type Color = {
  background: string;
  arrow: string;
  border?: string;
};

defineProps({
  colors: {
    type: Object as PropType<Color>,
    required: true,
  },

  orientation: {
    type: String as PropType<"left" | "right">,
    required: false,
    default: "right",
  },
});
</script>

<template>
  <button :class="{ rotate: orientation === 'left' }">
    <UIWrapperArrow :colors="colors" :length-arrow="'long'" />
  </button>
</template>

<style scoped lang="scss">
button {
  cursor: pointer;
  width: 75px;
  height: 75px;

  &.rotate {
    transform: rotate(180deg);
  }
}
</style>
