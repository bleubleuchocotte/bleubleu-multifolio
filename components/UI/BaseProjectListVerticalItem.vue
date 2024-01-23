<script setup lang="ts">
import type { ProjectWithId } from "~/types";

type ComponentProps = {
	project: ProjectWithId
	index: number
	active: boolean
};

defineProps<ComponentProps>();
</script>

<template>
	<div class="project-list-vertical-item">
		<h3 class="project-list-vertical-item__title" :class="{ active }">
			<UIBaseIndex :index="index + 1" />
			{{ project.title }}
		</h3>
		<div class="project-list-vertical-item__data">
			<p>{{ project.date?.slice(0, 4) }}</p>
			<p>{{ project.skills[0]?.skill }}</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
.project-list-vertical-item {
	@include prop("padding-block");

	border-bottom: 1px solid var(--border-color);

	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100%;
	height: 100%;

	&__title {
		display: flex;
		text-transform: uppercase;
		align-self: flex-end;

		white-space: nowrap;

		transition: color 0.2s ease-out;
		&.active {
			color: var(--accent-color);
		}
	}

	&__data {
		text-align: right;
		& > p {
			@include font("small");
		}
	}
}
</style>
