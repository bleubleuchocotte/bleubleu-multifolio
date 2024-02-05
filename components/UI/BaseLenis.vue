<script setup lang="ts">
import Lenis from "@studio-freight/lenis";
import type { LenisTarget } from "@/types";

type ComponentProps = {
	target?: LenisTarget
	requestLenis?: boolean
	orientation?: "vertical" | "horizontal"
};

const props = withDefaults(defineProps<ComponentProps>(), {
	requestLenis: false,
	orientation: "vertical",
});

const container = ref(null);
let lenis: Lenis;

const velocity = ref(0);

onMounted(() => {
	if (container.value === null) {
		return;
	}
	lenis = new Lenis({
		wrapper: container.value, // element which has overflow
		content: container.value, // usually wrapper's direct child
		orientation: props.orientation,
	});

	function raf(time: number) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	if (props.requestLenis) {
		lenis.on("scroll", () => {
			velocity.value = lenis.velocity;
		});
	}

	requestAnimationFrame(raf);
});

watch(
	() => props.target,
	() => {
		if (props.target) {
			lenis.scrollTo(props.target);
		}
	},
);
</script>

<template>
	<div ref="container" data-lenis :style="`--v: ${velocity}`">
		<slot />
	</div>
</template>

<style scoped lang="scss">
div[data-lenis] {
	height: 100%;
	overflow: hidden;
	@media #{$low-accuracy} {
		overflow: overlay;
	}
}
</style>
