<script setup lang="ts">
import type { ImageField, KeyTextField } from "@prismicio/client";

type ComponentProps = {
	email: KeyTextField
	endingCardImage: ImageField
};

defineProps<ComponentProps>();

defineEmits<{
	goToStart: []
}>();
</script>

<template>
	<article class="ending-card invert-selection">
		<div class="ending-card__content">
			<p class="ending-card__content-caption">
				{{ $t('project.ending-card.text-1') }}
				<br>
				{{ $t('project.ending-card.text-2') }}
			</p>

			<UIBasePicture
				:image="endingCardImage"
				class="ending-card__content-image"
			/>

			<ProjectEndingCardButtonStart @click="$emit('goToStart')" />

			<UIBaseButtonContact
				:email="email"
				class="ending-card__content-contact-button"
			>
				{{ $t('contact.text') }}
			</UIBaseButtonContact>
		</div>
	</article>
</template>

<style scoped lang="scss">
.ending-card {
	@include prop("margin-right", -1);
	min-width: 40vw;
	height: 100%;

	&__content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		height: 100%;
		@include padding(0.5);
		@include gap();

		color: var(--text-accent-color);

		background-color: var(--accent-color);
		border: 0 solid var(--accent-color);
		@include border-radius();

		&-caption {
			@include prop("padding-left", 0.5);
			@include prop("padding-top", 0.25);
			text-align: left;
		}

		&-contact-button {
			height: 18%;
			width: 100%;
			z-index: 0;
			border: 1px solid var(--text-accent-color);

			@include font("h2");

			&:deep(.button__reveal) {
				border-radius: 0;
				border: unset;
			}
		}

		&-image {
			max-width: 60%;
			height: auto;
			margin: auto;
		}
	}
}
</style>
