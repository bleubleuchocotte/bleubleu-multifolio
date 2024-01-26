<template>
	<NuxtLink to="/" class="link-to-home">
		<UIBaseButtonEffect>
			<slot />
		</UIBaseButtonEffect>
	</NuxtLink>
</template>

<style scoped lang="scss">
	.link-to-home {
	@include font("h2");

	position: absolute;
	top: 50%;
	left: 50%;

	transform: translate3d(-50%, -50%, 0);

	width: 20vw;
	aspect-ratio: 3;

	overflow: hidden;

	border: 1px solid;
	@include border-radius(0.5);

	color: var(--text-accent-color);
	transition: border-color 0.3s ease-out;

	&:hover {
		border-color: var(--accent-color);
	}

	@media #{$mobile-down} {
		@include font("cta");

		width: 25vw;
	}
}
</style>
