<script setup lang="ts">
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import type { MediaHTMLAttributes } from "vue";
import type { ProjectWithId } from "~/types";
import { components } from "@/slices";

type ComponentProps = {
	project: ProjectWithId
};

defineProps<ComponentProps>();

const emit = defineEmits<{
	close: []
}>();

useEventListener("keydown", callback);

const container = ref(null);
const ignore = ref(null);

onClickOutside(container, () => emit("close"), {
	ignore: [ignore],
});

function callback(e: KeyboardEvent) {
	if (e.key === "Escape") {
		emit("close");
	}
}

const target = ref();
useFocusTrap(target, { immediate: true });

const mediaAttribute: MediaHTMLAttributes = {
	controls: true,
};
</script>

<template>
	<section ref="target" class="gallery">
		<div ref="ignore" class="gallery__header">
			<ProjectUrl :url="project.url">
				{{ project.title }}
			</ProjectUrl>

			<button
				type="button"
				aria-label="Close the gallery modal"
				@click="$emit('close')"
			>
				<IconBaseCross
					:colors="{
						background: 'var(--text-color)',
						arrow: 'var(--text-color)',
					}"
				/>
			</button>
		</div>
		<UIBaseLenis ref="container" class="gallery__project-lenis">
			<PrismicRichText
				:field="project.description"
				class="gallery__project-description"
			/>

			<div class="gallery__project-medias">
				<div
					v-for="media in project.slices"
					:key="media.id"
					:data-type="media.variation === 'default' ? 'duo' : 'full'"
				>
					<SliceZone :slices="[media]" :components="components" :context="mediaAttribute" />
				</div>
			</div>
		</UIBaseLenis>
	</section>
</template>

<style scoped lang="scss">
.gallery {
	position: fixed;
	inset: 0;

	display: flex;
	flex-direction: column;
	@include gap(0.5);

	padding-inline: 15vw;
	@include prop("padding-top");

	background-color: var(--background-color-70);
	backdrop-filter: blur(20px);

	z-index: 10;

	&__header {
		display: flex;
		justify-content: space-between;
		@include prop("padding-bottom", 0.5);

		border-bottom: 1px solid;
	}

	&__project {
		&-lenis {
			@include border-radius(1, "top");
		}

		&-description {
			max-width: 50%;
			@include prop("padding-left", 0.25);
			@include prop("padding-bottom");
		}

		&-medias {
			display: flex;
			flex-direction: column;
			@include gap();
			height: 100%;

			[data-type="duo"] {
				display: flex;
				@include gap();
				width: 100%;
			}

			[data-type]:last-of-type {
				@include prop("padding-bottom", 2.5);
			}
		}
	}
}
</style>
