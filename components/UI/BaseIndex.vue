<script setup lang="ts">
type ComponentProps = {
	index: number
};

defineProps<ComponentProps>();
</script>

<template>
	<span class="project-index">{{ index < 10 ? `0${index}` : index.toString() }}</span>
</template>

<style scoped lang="scss">
.project-index {
	display: inline-block;
	@include prop("margin-right");
	font-variant-numeric: tabular-nums;
}
</style>
