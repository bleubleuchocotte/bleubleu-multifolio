<script setup lang="ts">
const { $api } = useNuxtApp();
const page = await $api.pages.getLegalNotice();

const isDeviceMobile = useMediaQuery("(max-width: 768px)");
</script>

<template>
	<div class="legal-container">
		<UIBaseButtonHome class="legal-container__button">
			Let's go home
		</UIBaseButtonHome>

		<template v-if="!isDeviceMobile">
			<div
				v-for="i in 2"
				:key="Math.floor(Math.random() * (100 + i))"
				class="legal-container__bands"
			>
				<PrismicRichText
					v-for="j in 6" :key="Math.floor(Math.random() * (100 + j))"
					:field="page?.data.content"
					class="legal-container__bands-notices"
					:aria-hidden="!(j === 1 && i === 1)"
				/>
			</div>
		</template>

		<template v-else>
			<PrismicRichText :field="page?.data.content" class="legal-container__bands-notices" />
		</template>
	</div>
</template>

<style scoped lang="scss">
.legal-container {
	position: relative;
	overflow: hidden;
	border-bottom: 1px solid var(--border-color);

	@media #{$mobile-down} {
		display: flex;
		flex-direction: column-reverse;
		border-bottom: none;
	}

	&__button {
		height: 7vw;
		width: 20vw;
		z-index: 5;
		border: 1px solid var(--background-color);
		position: absolute;
		top: calc(50% - 3.5vw);
		left: calc(50% - 10vw);
		@include font("h2");

		@media #{$mobile-down} {
			height: 10vw;
			width: 30vw;
			position: relative;
			top: initial;
			left: initial;
			@include font("cta");
			@include margin();
		}
	}

	&__bands {
		width: max-content;
		display: flex;
		border: 1px solid var(--border-color);
		background-color: var(--background-color);

		&:first-of-type {
			border-bottom: unset;
		}
		border-left: none;

		&-notices {
			display: flex;
			flex-direction: column;
			gap: 0.6rem;
			@include padding();
		}
	}
}
</style>
