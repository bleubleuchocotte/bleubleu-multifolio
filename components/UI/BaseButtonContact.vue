<script setup lang="ts">
import type { KeyTextField } from "@prismicio/client";
import { useClipboard } from "@vueuse/core";

type ComponentProps = {
	email: KeyTextField
};

defineProps<ComponentProps>();

const { copy, copied } = useClipboard({ copiedDuring: 2000 });
</script>

<template>
	<button
		:data-email="email"
		type="button"
		class="button"
		:class="{ open: copied }"
		aria-label="Copy email address to clipboard"
		@click="copy(email?.toString() ?? '')"
	>
		<div class="button__text">
			<div class="button__text-bg-top">
				<span><slot /></span>
			</div>
			<div class="button__text-bg-bottom" aria-hidden="true">
				<span><slot /></span>
			</div>
		</div>

		<div class="button__reveal">
			<span>{{ copied ? $t('contact.click') : $t('contact.hover') }} </span>
		</div>
	</button>
</template>

<style scoped lang="scss">
.button {
	@include font("cta");

	position: relative;
	overflow: hidden;

	height: 100%;
	width: fit-content;

	@include border-radius(0.5);

	color: var(--text-accent-color);

	&:hover .button__text-bg,
	&.open .button__text-bg {
		&-top {
			transform: translate3d(0, -100%, 0);
		}
		&-bottom {
			transform: translate3d(0, 100%, 0);
		}
	}

	&__text {
		width: 100%;
		height: 100%;

		position: absolute;
		top: 0;
		z-index: 1;

		&-bg-top,
		&-bg-bottom {
			width: 100%;
			height: 50%;

			background-color: var(--accent-color);

			position: relative;

			overflow: hidden;
			transition: transform 0.3s ease-out;

			span {
				width: 100%;
				position: absolute;

				left: 0;

				text-align: center;
			}
		}

		&-bg-top {
			span {
				bottom: 0;

				transform: translate3d(0, 50%, 0);
			}
		}

		&-bg-bottom {
			span {
				top: 0;

				transform: translate3d(0, -50%, 0);
			}
		}
	}

	&__reveal {
		display: flex;
		align-items: center;
		justify-content: center;

		height: 100%;
		width: 100%;

		position: absolute;
		left: 0;
		top: 0;

		background-color: var(--text-accent-color);
		color: var(--accent-color);

		@include border(0.5, var(--accent-color));
	}
}
</style>
