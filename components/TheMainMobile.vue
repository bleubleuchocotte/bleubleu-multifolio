<script setup lang="ts">
import type { Project, TheAboutMeType } from "@/type/types";

type ComponentProps = {
	projects: Project[]
	content: TheAboutMeType
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
				:key="project.id"
				ref="accordions"
				:project="project"
				:index="i"
			>
				<ProjectDetailsMobile
					:project="project"
					:index="i"
					:hidden="arrAriaHidden[i] ?? true"
				/>
			</UIBaseAccordion>
		</main>

		<footer>
			<TheAboutMeMobile
				:params="content"
			/>
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
