<script setup lang="ts">
import type { LinkField } from "@prismicio/client";

type ComponentProps = {
	url?: LinkField
};

defineProps<ComponentProps>();
</script>

<template>
	<PrismicLink
		v-if="url"
		class="project-url"
		:field="url"
		data-icon="IconArrowRightUp"
	>
		<h2 class="project-url__name">
			<slot />
		</h2>
		<IconBaseArrowLink
			:colors="{
				background: 'var(--accent-color)',
				arrow: 'var(--background-color)',
			}"
		/>
	</PrismicLink>
	<div v-else class="project-url">
		<h2 class="project-url__name">
			<slot />
		</h2>
	</div>
</template>

<style scoped lang="scss">
.project-url {
	display: flex;
	@include gap(calc(1 / 3));
	align-items: center;
	width: fit-content;

	&__name {
		pointer-events: none;

		@media #{$desktop-down} {
			@include font("h3");
		}
	}
}
</style>
