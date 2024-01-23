<script setup lang="ts">
type ComponentProps = {
	threshold?: number
	rootMargin?: string
};

const props = withDefaults(defineProps<ComponentProps>(), {
	threshold: 0,
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
		threshold: props.threshold,
		rootMargin: props.rootMargin,
	},
);
</script>

<template>
	<div ref="container">
		<slot />
	</div>
</template>
