<script setup lang="ts">
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
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

const target = ref();
useFocusTrap(target);
</script>

<template>
  <section ref="target" class="gallery__container">
    <div ref="ignore" class="gallery__header">
      <PrismicLink
        v-if="project.url"
        class="gallery__project-heading"
        :field="project.url"
      >
        <h2 class="gallery__project-heading-title">{{ project.title }}</h2>
        <IconBaseArrowLink
          :colors="{
            background: 'var(--accent-color)',
            arrow: 'var(--background-color)',
          }"
        />
      </PrismicLink>
      <div v-else class="gallery__project-heading">
        <h2 class="gallery__project-heading-title">{{ project.title }}</h2>
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
          <PrismicRichText :field="project['long-description']" />
        </div>
      </div>
    </UIBaseLenis>
  </section>
</template>

<style scoped lang="scss">
.gallery {
  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 30px;

    @include prop("margin-bottom", 0.5);
  }
  &__container {
    position: fixed;
    inset: 0;

    padding-inline: 15vw;
    padding-block: 2.5vh 5vh;

    background-color: var(--background-color-70);
    backdrop-filter: blur(20px);

    z-index: 10;
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

    &-images {
      display: flex;
      flex-direction: column;
      @include gap();
      height: 100%;

      img {
        @include border-radius();
        aspect-ratio: 1;
      }
      [data-type="duo"] {
        display: flex;
        @include gap();
        height: 400px;
        width: 100%;
      }
      [data-type="full"] {
        height: 70%;
      }
    }

    &-description {
      display: flex;
      flex-direction: column;
      @include gap();
      padding-bottom: 5vh;
      max-width: 50%;
    }
  }
}
</style>
