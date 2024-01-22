<script setup lang="ts">
const props = defineProps({
	treshold: {
		type: Number,
		required: false,
		default: 0,
	},
	rootMargin: {
		type: String,
		required: false,
	},
});

const emits = defineEmits<{
	isVisible: [payload: boolean]
}>();

const container = ref<HTMLElement>();
useIntersectionObserver(
	container,
	([{ isIntersecting }]) => {
		emits("isVisible", isIntersecting);
	},
	{
		threshold: props.treshold,
		rootMargin: props.rootMargin,
	},
);
</script>

<template>
	<div ref="container">
		<slot />
	</div>
</template>
