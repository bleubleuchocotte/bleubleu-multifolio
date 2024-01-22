<script setup lang="ts">
import type { Project } from "~/type/types";

defineProps({
	project: {
		type: Object as PropType<Project>,
		required: true,
	},
	index: {
		type: Number,
		required: true,
	},
	hidden: {
		type: Boolean,
		required: true,
	},
});
</script>

<template>
	<article class="project-details-mobile">
		<UIBaseIndex :index="index + 1" class="project-details-mobile__index" />
		<template v-if="project.url">
			<PrismicLink
				class="project-details-mobile__content-heading"
				:field="project.url"
				:tabindex="hidden ? -1 : 0"
			>
				<h3>
					{{ project.title }}
				</h3>
				<IconBaseArrowLink
					:colors="{
						background: 'var(--accent-color)',
						arrow: 'var(--background-color)',
					}"
				/>
			</PrismicLink>
		</template>
		<template v-else>
			<div class="project-details-mobile__content-heading">
				<h3>
					{{ project.title }}
				</h3>
			</div>
		</template>

		<div class="project-details-mobile__content-tags">
			<UIBaseTag v-for="skill in project.skills" :key="skill.id">
				{{ skill.name }}
			</UIBaseTag>
		</div>

		<ProjectMobileSlider :medias="project.medias" />

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
