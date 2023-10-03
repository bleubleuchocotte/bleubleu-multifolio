<script setup lang="ts">
import { Project } from "~/type/types";

defineProps({
  project: {
    type: Object as PropType<Project>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "close"): void;
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

const callback = (e: KeyboardEvent) => {
  if (e.key === "Escape") emit("close");
};
</script>

<template>
  <section class="gallery__container">
    <PrismicLink v-if="project.url" class="gallery__project-heading" :field="project.url">
          <h2 class="gallery__project-heading-title">{{ project.title }}</h2>
          <IconBaseArrowLink 
            :colors="{
              background: 'var(--accent-color)',
              arrow: 'var(--background-color)',
            }"
          />
        </PrismicLink>
        <div v-else  class="gallery__project-heading">
          <h2 class="gallery__project-heading-title">{{ project.title }}</h2> 
        </div>
    <UIBaseLenis ref="container" class="gallery__project-lenis">
      <div class="gallery__project-images">
        <div
          v-for="(image, i) in project.images"
          :key="i"
          :data-type="image.type === 'image-duo' ? 'duo' : 'full'"
        >
          <PrismicImage
            v-for="(field, j) in image.field"
            :key="j"
            :field="field"
          />
        </div>
        <div class="gallery__project-description">
          <h3>Description</h3>
          <PrismicRichText :field="project['long-description']" />
        </div>
      </div>
    </UIBaseLenis>
  </section>
</template>

<style scoped lang="scss">
.gallery {
  &__container {
    position: fixed;
    inset: 0;

    padding-inline: 5vw;
    padding-block: 2.5vh 5vh;

    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(2px);

    z-index: 10;
  }

  &__project {
    &-heading {
      padding-bottom: $gutter;
      display: flex;
      gap: calc($gutter/3);
      align-items: center;

      &-title {
        pointer-events: none;
      }

    }

    &-lenis {
      border-radius: $border-radius-big $border-radius-big 0 0;
    }

    &-images {
      display: flex;
      flex-direction: column;
      gap: $gutter;
      height: 100%;

      img {
        border-radius: $border-radius-big;
        aspect-ratio: 1;
      }
      [data-type="duo"] {
        display: flex;
        gap: $gutter;
        height: 500px;
        width: 100%;
      }
      [data-type="full"] {
        height: 100%;
      }
    }

    &-description {
      display: flex;
      flex-direction: column;
      gap: $gutter;
      padding-bottom: 5vh;
    }
  }
}
</style>
