<script setup lang="ts">
import type { FilledLinkToMediaField, ImageField } from "@prismicio/client";

type ComponentProps = {
  image?: ImageField;
  linkToMediaField?: FilledLinkToMediaField;
};

defineProps<ComponentProps>();

const isImageLoaded = ref(false);
const container = ref<HTMLDivElement | null>(null);
</script>

<template>
  <div
    ref="container"
    class="picture relative"
    :data-image-loaded="isImageLoaded"
  >
    <div
      class="bg-text absolute inset-0 -z-10 opacity-20 backdrop-blur-[5px]"
      :class="{ 'rounded-fluid': linkToMediaField }"
    />
    <template v-if="image">
      <NuxtPicture
        v-if="image.url"
        provider="prismic"
        :src="image.url"
        :alt="image.alt ?? ''"
        :width="container?.clientWidth"
        :height="container?.clientHeight"
        @load="isImageLoaded = true"
      />
    </template>
    <template v-else-if="linkToMediaField">
      <NuxtPicture
        :img-attrs="{ class: 'picture__content' }"
        provider="prismic"
        loading="lazy"
        :src="linkToMediaField.url"
        alt=""
        :height="container?.clientHeight"
        :width="container?.clientWidth"
        @load="isImageLoaded = true"
      />
    </template>
  </div>
</template>

<style>
/* The img rendered by NuxtPicture is unreachable from a scoped block
   and only the linkToMediaField branch tags it with `picture__content`. */
.picture__content {
  transition: opacity 0.3s ease 0.6s;
}
.picture[data-image-loaded="true"] .picture__content {
  opacity: 1;
}
.picture[data-image-loaded="false"] .picture__content {
  opacity: 0;
}
</style>
