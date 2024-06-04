<script setup lang="ts">
type ComponentProps = {
	width: number
};
withDefaults(defineProps<ComponentProps>(), {
	width: 1,
});
</script>

<template>
	<div :style="`--width: ${width}px`" />
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
