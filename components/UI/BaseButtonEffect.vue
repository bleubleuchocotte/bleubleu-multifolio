<template>
	<span class="button-effect">
		<div class="button-effect__text">
			<div class="button-effect__text-bg-top">
				<span><slot /></span>
			</div>
			<div class="button-effect__text-bg-bottom">
				<span><slot /></span>
			</div>
		</div>

		<div class="button-effect__reveal">
			<span>⏎</span>
		</div>
	</span>
</template>

<style scoped lang="scss">
.button-effect {
	display: block;
	position: relative;

	height: 100%;
	width: 100%;

	&:hover .button-effect__text-bg {
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
	}

	&__reveal,
	&__text {
		pointer-events: none;
	}
}
</style>
