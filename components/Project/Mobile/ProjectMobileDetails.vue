<script setup lang="ts">
import type { ProjectWithId } from "~/types";

type ComponentProps = {
	project: ProjectWithId
	index: number
	hidden: boolean
};

defineProps<ComponentProps>();
</script>

<template>
	<article class="project-details-mobile">
		<UIBaseIndex :index="index + 1" class="project-details-mobile__index" />

		<ProjectUrl :url="project.url">
			{{ project.title }}
		</ProjectUrl>

		<div class="project-details-mobile__content-tags">
			<UIBaseTag v-for="item in project.skills" :key="item.skill?.toString()">
				{{ item.skill }}
			</UIBaseTag>
		</div>

		<ProjectMobileSlider :medias="project.slices" />

		<PrismicRichText
			:field="project.description"
			class="project-details-mobile__content-description"
		/>
	</article>
</template>

<style scoped lang="scss">
.project-details-mobile {
	display: flex;
	@include gap();

	flex-direction: column;
	@include prop("padding-block");

	position: relative;

	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		background-color: var(--border-color);
		left: 0;
		right: 0;
		width: 100%;
		height: 1px;
	}

	height: 100%;

	&__index {
		@include font("enormous");
		color: var(--accent-color);
		line-height: 1;
	}

	&__content {
		&-heading {
			display: flex;
			align-items: center;
			@include gap(calc(1 / 3));
			@include prop("margin-top");

			& > h3 {
				@include font("h2");
			}
		}

		&-tags {
			display: flex;
			flex-wrap: wrap;
			@include gap(calc(1 / 6));
		}

		&-description {
			@include font("p");
			@include prop("margin-bottom");
		}
	}
}
</style>
