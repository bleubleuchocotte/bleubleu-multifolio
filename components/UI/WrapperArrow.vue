<script setup lang="ts">
import type { ColorArrow } from "@/types";

type ComponentProps = {
	colors: ColorArrow
	lengthArrow?: "short" | "long"
};

const props = withDefaults(defineProps<ComponentProps>(), {
	lengthArrow: "short",
});

const styles = reactive({
	backgroundColor: props.colors.background,
	borderColor: props.colors.border,
});
</script>

<template>
	<div class="wrapper-arrow__container" :style="styles">
		<template v-if="lengthArrow === 'short'">
			<IconBaseArrowShort :fill="colors.arrow" />
		</template>
		<template v-else>
			<IconBaseArrowLong :fill="colors.arrow" />
		</template>
	</div>
</template>

<style scoped lang="scss">
.wrapper-arrow {
	&__container {
		display: flex;
		align-items: center;
		justify-content: center;

		height: 100%;
		width: 100%;

		border: 1px solid;
		border-color: transparent;
		border-radius: 50%;
	}
}
</style>
