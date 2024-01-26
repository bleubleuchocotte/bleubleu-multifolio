<template>
	<div class="body">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.body {
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	height: 100vh;

	@media #{$desktop-down} {
		height: auto;
		@include gap();
	}
}
</style>
