<template>
	<div class="slider">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.slider {
	display: flex;
	@include gap();

	width: 100%;
	height: 100%;

	overflow-x: scroll;
	scroll-snap-type: x mandatory;
}
:slotted(*) {
	scroll-snap-align: center;

	min-width: 75vw;
}
</style>
