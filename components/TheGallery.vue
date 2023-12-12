<script setup lang="ts">
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import type { Project } from "~/type/types";

defineProps({
	project: {
		type: Object as PropType<Project>,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "close"): void
}>();

onMounted(() => {
	document.addEventListener("keydown", callback);
});

onUnmounted(() => {
	document.removeEventListener("keydown", callback);
});

const container = ref(null);
const ignore = ref(null);

onClickOutside(container, () => emit("close"), {
	ignore: [ignore],
});

function callback(e: KeyboardEvent) {
	if (e.key === "Escape")
		emit("close");
}

const target = ref();
useFocusTrap(target, { immediate: true });
</script>

<template>
	<section ref="target" class="gallery">
		<div ref="ignore" class="gallery__header">
			<PrismicLink
				v-if="project.url"
				class="gallery__project-heading"
				:field="project.url"
			>
				<h2 class="gallery__project-heading-title">
					{{ project.title }}
				</h2>
				<IconBaseArrowLink
					:colors="{
						background: 'var(--accent-color)',
						arrow: 'var(--background-color)',
					}"
				/>
			</PrismicLink>
			<div v-else class="gallery__project-heading">
				<h2 class="gallery__project-heading-title">
					{{ project.title }}
				</h2>
			</div>
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

			<div class="gallery__project-images">
				<div
					v-for="media in project.medias"
					:key="media.id"
					:data-type="media.type === 'media-duo' ? 'duo' : 'full'"
				>
					<UIBaseMedia :media="media" :video-settings="{ controls: true }" />
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
    @include prop('padding-bottom', 0.5);

    border-bottom: 1px solid;
  }

  &__project {
    &-heading {
      display: flex;
      @include gap(calc(1 / 3));
      align-items: center;

      &-title {
        pointer-events: none;
      }
    }

    &-lenis {
      @include border-radius(1, "top");
    }

    &-description {
      max-width: 50%;
      @include prop('padding-left', 0.25);
      @include prop('padding-bottom');
    }

    &-images {
      display: flex;
      flex-direction: column;
      @include gap();
      height: 100%;

      img {
        @include border-radius();
        min-width: 0;
      }
      [data-type="duo"] {
        display: flex;
        @include gap();
        width: 100%;

        img {
          aspect-ratio: 1;
        }
      }
      [data-type="full"] {
        img {
          aspect-ratio: 16/9;
        }
      }

      [data-type]:last-of-type {
        @include prop("padding-bottom", 2.5);
      }
    }
  }
}
</style>
