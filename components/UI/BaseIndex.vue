<script setup lang="ts">
type ComponentProps = {
	index: number
};

const props = defineProps<ComponentProps>();

const i = ref(props.index < 10 ? `0${props.index}` : props.index.toString());
</script>

<template>
	<span class="project-index">{{ i }}</span>
</template>

<style scoped lang="scss">
.project-index {
	display: inline-block;
	@include prop("margin-right");
	font-variant-numeric: tabular-nums;
}
</style>
