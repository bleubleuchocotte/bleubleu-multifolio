<script setup lang="ts">
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import type { MediaHTMLAttributes } from "vue";
import type { ProjetDocument } from "~~/prismicio-types";

import { components } from "~~/slices";

type ComponentProps = {
  project: ProjetDocument;
};

defineProps<ComponentProps>();

const emit = defineEmits<{
  close: [];
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

const target = useTemplateRef("target");
useFocusTrap(target, { immediate: true });

const mediaAttribute: MediaHTMLAttributes = {
  controls: true,
  muted: true,
};
</script>

<template>
  <section
    ref="target"
    role="dialog"
    aria-modal="true"
    aria-labelledby="gallery-title"
    class="bg-background-70 pt-fluid fixed inset-0 z-10 flex flex-col gap-[calc(var(--spacing-fluid)/2)] px-[15vw] backdrop-blur-[20px]"
  >
    <div
      ref="ignore"
      class="flex justify-between border-b pb-[calc(var(--spacing-fluid)/2)]"
    >
      <ProjectUrl id="gallery-title" :url="project.data.url">
        {{ project.data.title }}
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
    <UIBaseLenis ref="container" class="rounded-fluid-t">
      <div class="pb-fluid max-w-1/2 pl-[calc(var(--spacing-fluid)/4)]">
        <PrismicRichText :field="project.data.description" />
      </div>

      <div class="gap-fluid gallery-medias flex h-full flex-col">
        <div
          v-for="media in project.data.slices"
          :key="media.id"
          :data-type="media.variation === 'default' ? 'duo' : 'full'"
        >
          <SliceZone
            :slices="[media]"
            :components="components"
            :context="mediaAttribute"
          />
        </div>
      </div>
    </UIBaseLenis>
  </section>
</template>

<style scoped>
.gallery-medias [data-type="duo"] {
  display: flex;
  gap: var(--spacing-fluid);
  width: 100%;
}
.gallery-medias [data-type]:last-of-type {
  padding-bottom: calc(var(--spacing-fluid) * 2.5);
}
</style>
