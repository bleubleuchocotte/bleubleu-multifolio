<script setup lang="ts">
definePageMeta({
	layout: "404",
});

useSeoMeta({
	title: "Work In Progress",
});
</script>

<template>
	<main class="page-wip">
		<h1 class="page-wip__glitch" data-text="Work In Progress">
			Work In Progress
		</h1>
	</main>
</template>

<style scoped lang="scss">
.page-wip {
	position: relative;
	display: flex;

	height: 100%;

	&__glitch {
		color: var(--text-color);
		font-size: 10vw;
		position: relative;
		line-height: 0.9;
		margin: auto;
		font-weight: 900;
		transform: skewX(-30deg);

		&:before,
		&:after {
			content: attr(data-text);
			position: absolute;
			top: 0;
			color: var(--text-color);
			background: var(--background-color);
			overflow: hidden;
			clip: rect(0, 900px, 0, 0);
			height: 100%;
		}

		&:after {
			left: 5px;
			text-shadow: -10px 0 var(--accent-color);
			animation: noise-anim 2s infinite linear alternate-reverse;
		}

		&:before {
			left: -5px;
			text-shadow: 10px 0 var(--border-color);
			animation: noise-anim-2 2s infinite linear alternate-reverse;
		}

		@keyframes noise-anim {
			$steps: 20;
			@for $i from 0 through $steps {
				#{percentage($i * calc(1/$steps))} {
					clip: rect(random(800) + px, 9999px, random(800) + px, 0);
				}
			}
		}

		@keyframes noise-anim-2 {
			$steps: 20;
			@for $i from 0 through $steps {
				#{percentage($i * calc(1/$steps))} {
					clip: rect(random(800) + px, 9999px, random(800) + px, 0);
				}
			}
		}
	}
}
</style>
