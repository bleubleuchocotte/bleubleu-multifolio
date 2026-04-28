<template>
	<button type="button" data-icon="IconArrowLeft" class="project-ending-card-button">
		<span class="project-ending-card-button__content">
			{{ $t('project.ending-card.button') }}
		</span>

		<UIWrapperArrow
			class="project-ending-card-button__arrow"
			:colors="{
				background: 'var(--text-accent-color)',
				arrow: 'var(--accent-color)',
			}" length-arrow="short"
		/>
	</button>
</template>

<style scoped lang="scss">
.project-ending-card-button {
	display: inline-flex;
	width: fit-content;
	margin: 0 auto;
	@include gap(0.5);

	&__content {
		@include font("h3");
		text-decoration: underline;
	}

	&__arrow {
		height: 38px;
		width: 38px;

		transform: rotate(180deg);
	}
}
</style>
