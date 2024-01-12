<script setup lang="ts">
import type { Project } from "~/type/types";

const props = defineProps({
	projects: {
		type: Array<Project>,
		required: true,
	},
});

const emits = defineEmits<{
	(e: "target", payload: string): void
	(e: "targetThenScroll", payload: string): void
	(e: "gallery", payload: Project): void
	(e: "goToEnd"): void
	(e: "goToStart"): void
}>();

const currentProjectIndex = ref(0);

onMounted(() => {
	useEventListener(document, "keydown", (e) => {
		if (
			(e.code === "ArrowLeft" || e.key === "q")
			&& currentProjectIndex.value > 0
		) {
			emits(
				"targetThenScroll",
				props.projects[currentProjectIndex.value - 1].id,
			);
		}
		else if (
			(e.code === "ArrowRight" || e.key === "d")
			&& currentProjectIndex.value < props.projects.length - 1
		) {
			emits(
				"targetThenScroll",
				props.projects[currentProjectIndex.value + 1].id,
			);
		}
		else if (
			(e.code === "ArrowRight" || e.key === "d")
			&& currentProjectIndex.value === props.projects.length - 1
		) {
			emits("goToEnd");
			currentProjectIndex.value += 1;
		}
		else if (e.key === "r") {
			emits("goToStart");
		}
	});
});

function onTarget(id: string, index: number) {
	emits("target", id);
	currentProjectIndex.value = index;
}
</script>

<template>
	<ProjectDetails
		v-for="(project, i) in projects"
		:key="project.id"
		:project="project"
		:index="i"
		@target="(id: string) => onTarget(id, i)"
		@previous="i > 0 ? $emit('targetThenScroll', projects[i - 1].id) : null"
		@next="
			i < projects.length - 1
				? $emit('targetThenScroll', projects[i + 1].id)
				: $emit('goToEnd')
		"
		@gallery="(project: Project) => $emit('gallery', project)"
	/>
</template>
