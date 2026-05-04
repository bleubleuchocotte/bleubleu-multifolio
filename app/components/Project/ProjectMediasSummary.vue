<script setup lang="ts">
import type { Content } from "@prismicio/client";
import type { MediaHTMLAttributes } from "vue";

import { components } from "~~/slices";

type ComponentProps = {
  medias: Content.ProjetDocumentDataSlicesSlice[];
};
defineProps<ComponentProps>();

const mediaAttribute: MediaHTMLAttributes = {
  autoplay: true,
  loop: true,
  muted: true,
};
</script>

<template>
  <div
    class="medias-summary flex h-full cursor-pointer flex-col gap-[calc(var(--spacing-fluid)*0.8)]"
  >
    <template v-for="media in medias" :key="media.id">
      <div
        class="medias-summary__item flex flex-1 overflow-hidden transition-transform duration-100 ease-out"
      >
        <SliceZone
          :slices="[media]"
          :components="components"
          :context="mediaAttribute"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.medias-summary__item:first-of-type {
  transform: translate3d(calc(var(--v) * 1.5px), 0, 0)
    skewX(calc(var(--v) * -0.02deg));
}
.medias-summary__item:last-of-type {
  transform: translate3d(calc(var(--v) * 0.75px), 0, 0)
    skewX(calc(var(--v) * -0.02deg));
}
</style>
