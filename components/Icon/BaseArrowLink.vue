<script setup lang="ts">
import type { ColorArrow } from "@/types";

type ComponentProps = {
	colors: ColorArrow
};

defineProps<ComponentProps>();
</script>

<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
	>
		<circle cx="10" cy="10.104" r="9.7207" :fill="colors.background" />
		<path
			d="M13.5371 7.06653C13.5371 6.79039 13.3133 6.56653 13.0371 6.56653L8.53711 6.56653C8.26097 6.56653 8.03711 6.79039 8.03711 7.06653C8.03711 7.34267 8.26097 7.56653 8.53711 7.56653L12.5371 7.56653L12.5371 11.5665C12.5371 11.8427 12.761 12.0665 13.0371 12.0665C13.3133 12.0665 13.5371 11.8427 13.5371 11.5665L13.5371 7.06653ZM6.60871 12.7878C6.41345 12.9831 6.41345 13.2997 6.60871 13.4949C6.80398 13.6902 7.12056 13.6902 7.31582 13.4949L6.60871 12.7878ZM12.6836 6.71297L6.60871 12.7878L7.31582 13.4949L13.3907 7.42008L12.6836 6.71297Z"
			:fill="colors.arrow"
		/>
	</svg>
</template>

<style scoped lang="scss">
svg {
	pointer-events: none;
}
</style>
