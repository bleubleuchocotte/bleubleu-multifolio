<script setup lang="ts">
const props = defineProps({
	index: {
		type: Number,
		required: true,
	},
});

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
