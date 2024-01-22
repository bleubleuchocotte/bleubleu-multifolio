<script setup lang="ts">
import type { ColorArrow } from "@/type/types";

defineProps({
	colors: {
		type: Object as PropType<ColorArrow>,
		required: true,
	},

	orientation: {
		type: String as PropType<"left" | "right">,
		required: false,
		default: "right",
	},

	lengthArrow: {
		type: String as PropType<"short" | "long">,
		required: false,
		default: "long",
	},
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
