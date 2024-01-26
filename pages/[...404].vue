<script setup lang="ts">
const event = useRequestEvent();
setResponseStatus(event, 404, "Page Not Found"); // Permet de réellement avoir une 404

definePageMeta({
	layout: "404",
});

useSeoMeta({
	title: "404 - Page not found",
});

// On place ici les propriétés non-réactives
useServerSeoMeta({
	robots: "noindex, nofollow",
});
</script>

<template>
	<main class="page-404">
		<h1 class="page-404__glitch" data-text="404">
			404
		</h1>

		<UIBaseLinkHome>
			Let's go home
		</UIBaseLinkHome>
	</main>
</template>

<style scoped lang="scss">
.page-404 {
	position: relative;
	display: flex;
	overflow: hidden;

	height: 100%;

	&__glitch {
		color: var(--text-color);
		font-size: 45vw;
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
