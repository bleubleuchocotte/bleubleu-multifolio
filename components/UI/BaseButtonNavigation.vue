<script setup lang="ts">
import type { ColorArrow } from "@/types";

type ComponentProps = {
	colors: ColorArrow
	orientation?: "left" | "right"
	lengthArrow?: "short" | "long"
};

withDefaults(defineProps<ComponentProps>(), {
	orientation: "right",
	lengthArrow: "long",
});
</script>

<template>
	<button
		:class="{ rotate: orientation === 'left' }"
		:aria-label="
			orientation === 'left' ? 'Go to previous project' : 'Go to next project'
		"
		:data-icon="orientation === 'left' ? 'IconArrowLeft' : 'IconArrowRight'"
	>
		<UIWrapperArrow :colors="colors" :length-arrow="lengthArrow" />
	</button>
</template>

<style scoped lang="scss">
button {
	width: 75px;
	height: 75px;

	&.rotate {
		transform: rotate(180deg);
	}
}
</style>
