<template>
	<span class="tag__text"><slot /></span>
</template>

<style scoped lang="scss">
.tag {
	&__text {
		@include padding(calc(1 / 3));
		border: 1px solid var(--border-color);
		@include border-radius(0.5);

		@include font("p");
	}
}
</style>
