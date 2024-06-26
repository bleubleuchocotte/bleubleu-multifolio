<script setup lang="ts">
import type { ImageField } from "@prismicio/client";
import type { AboutMe, ProjectWithId } from "~/types";

type ComponentProps = {
	projects: ProjectWithId[]
	aboutMe: AboutMe
	endingCardImage: ImageField
};

defineProps<ComponentProps>();

const scrollToProjectId = ref<string>();
const idToProject = ref<string>();

const projectInGallery = ref<ProjectWithId | null>(null);

function callback(id: string, hasToScroll: boolean) {
	idToProject.value = id;
	if (hasToScroll) {
		scrollToProjectId.value = `[data-project-h-id='${id}']`;
	}
	else {
		scrollToProjectId.value = undefined;
	}
}
</script>

<template>
	<main class="main">
		<TheAboutMe v-bind="aboutMe" />
		<div class="main__left">
			<section class="main__left-container">
				<p>{{ $t('project.title.vertical') }}</p>
				<UIBaseLenis orientation="vertical">
					<ProjectListVertical
						:projects="projects"
						:id-to-active="idToProject"
						@target="
							(id: string) => (scrollToProjectId = `[data-project-h-id='${id}']`)
						"
					/>
				</UIBaseLenis>
			</section>
		</div>
		<UIBaseSeparator :width="1" />
		<UIBaseLenis
			orientation="horizontal"
			class="main__right"
			:target="scrollToProjectId"
			:request-lenis="true"
		>
			<ProjectListHorizontal
				:projects="projects"
				@target="(id) => callback(id, false)"
				@target-then-scroll="(id) => callback(id, true)"
				@gallery="(project) => (projectInGallery = project)"
				@go-to-end="() => (scrollToProjectId = `end`)"
				@go-to-start="() => (scrollToProjectId = 'start')"
			/>

			<ProjectEndingCard
				:email="aboutMe.email"
				:ending-card-image="endingCardImage"
				@go-to-start="
					() => (scrollToProjectId = `[data-project-h-id='${projects[0].id}']`)
				"
			/>
		</UIBaseLenis>

		<Transition name="slide-fade">
			<TheGallery
				v-if="projectInGallery != null"
				:project="projectInGallery"
				@close="projectInGallery = null"
			/>
		</Transition>
	</main>
</template>

<style scoped lang="scss">
.main {
	display: flex;
	position: relative;
	overflow: hidden;

	@media #{$desktop-down} {
		flex-direction: column;
		@include gap();
	}

	&__left {
		@include left;
		@media #{$desktop-down} {
			height: 20vh;
		}

		&-container {
			height: 100%;
			@media #{$desktop} {
				padding-left: $bookmark-width;
			}
			@include prop("padding-bottom");
		}
	}

	&__right {
		@include right;
		@include prop("padding-inline", 0);
		@include prop("padding-right", 2);
		position: relative;
		display: flex;

		@media #{$desktop-down} {
			flex-direction: column;
			@include gap();
		}
	}
	&::after {
		@include gradientScroll(right);
	}
}
</style>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateY(20px);
	opacity: 0;
}
</style>
