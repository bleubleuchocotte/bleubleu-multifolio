<script setup lang="ts">
const props = defineProps({
	width: {
		type: Number,
		required: false,
		default: 1,
	},
});

const styles = reactive({
	"--width": `${props.width}px`,
});
</script>

<template>
	<div :style="styles" />
</template>

<style scoped lang="scss">
div {
  position: relative;

  height: 100%;
  width: var(--width);

  background-color: var(--border-color);

  &::before {
    @include gradientScroll(left);
  }
}
</style>
