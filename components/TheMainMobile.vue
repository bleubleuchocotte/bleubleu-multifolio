<script setup lang="ts">
import type BaseAccordion from "@/components/UI/BaseAccordion.vue";
import type { AboutMe, ProjectWithId } from "~/types";

type ComponentProps = {
	projects: ProjectWithId[]
	aboutMe: AboutMe
};

defineProps<ComponentProps>();

const accordions = ref<InstanceType<typeof BaseAccordion>[]>([]);
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
				:state-key="`Accordion mobile index: ${i}`"
			>
				<template #title>
					<ProjectMobileAccordionHeader
						:project="project"
						:index="i"
						:active="accordions[i]?.isOpen"
					/>
				</template>
				<template #content>
					<ProjectMobileDetails
						:project="project"
						:index="i"
						:hidden="arrAriaHidden[i] ?? true"
					/>
				</template>
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
