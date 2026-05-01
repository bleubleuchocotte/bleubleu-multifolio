<script setup lang="ts">
import type { FilledLinkToMediaField, ImageField } from "@prismicio/client";

type ComponentProps = {
  image?: ImageField;
  linkToMediaField?: FilledLinkToMediaField;
  sizes?: string;
  loading?: "eager" | "lazy";
};

const props = withDefaults(defineProps<ComponentProps>(), {
  image: undefined,
  linkToMediaField: undefined,
  sizes: "100vw sm:100vw md:100vw lg:80vw xl:1440px",
  loading: "lazy",
});

const isImageLoaded = ref(false);

const imageWidth = computed(() => props.image?.dimensions?.width);
const imageHeight = computed(() => props.image?.dimensions?.height);
</script>

<template>
  <div class="picture relative" :data-image-loaded="isImageLoaded">
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
        :sizes
        :loading
        :width="imageWidth"
        :height="imageHeight"
        @load="isImageLoaded = true"
      />
    </template>
    <template v-else-if="linkToMediaField">
      <NuxtPicture
        :img-attrs="{ class: 'picture__content' }"
        provider="prismic"
        :loading
        :sizes
        :src="linkToMediaField.url"
        alt=""
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
