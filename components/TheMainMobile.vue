<script setup lang="ts">
import type { AboutMe, ProjectWithId } from "~/types";

type ComponentProps = {
	projects: ProjectWithId[]
	aboutMe: AboutMe
};

defineProps<ComponentProps>();

const accordions = ref<any[]>([]);
const arrAriaHidden = computed(() => accordions.value.map(el => !el.isOpen));
</script>

<template>
	<div class="main-mobile">
		<main>
			<p>My projects</p>
			<UIBaseAccordion
				v-for="(project, i) in projects"
				:key="project.title?.toString()"
				ref="accordions"
				:project="project"
				:index="i"
			>
				<ProjectMobileDetails
					:project="project"
					:index="i"
					:hidden="arrAriaHidden[i] ?? true"
				/>
			</UIBaseAccordion>
		</main>

		<footer>
			<TheAboutMeMobile v-bind="aboutMe" />
		</footer>
	</div>
</template>

<style scoped lang="scss">
.main-mobile {
	display: flex;
	flex-direction: column;
	@include gap(2);
	@include prop("padding-inline");
	@include prop("padding-bottom");
}
</style>
