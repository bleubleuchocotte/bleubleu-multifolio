<script setup lang="ts">
import type { Content } from "@prismicio/client";
import type { MediaHTMLAttributes } from "vue";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.MediaSlice, MediaHTMLAttributes>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const { responsive_media, ...fields } = props.slice.primary;

const isContainerVisible = ref(false);
const videoState = computed(() => {
  if (isContainerVisible.value) {
    return "play";
  } else {
    return "pause";
  }
});
</script>

<template>
  <UIBaseResponsiveContent media-query="(max-width: 1025px)">
    <template #mobile>
      <UIBaseIntersectionObserver
        v-if="'kind' in responsive_media"
        class="media-mobile h-full min-w-[75vw] snap-center"
        @is-visible="(bool) => (isContainerVisible = bool)"
      >
        <UIBasePicture
          v-if="responsive_media.kind === 'image'"
          :key="slice.id + responsive_media.url"
          class="rounded-fluid aspect-9/16 max-h-[75vh] w-full overflow-hidden object-cover"
          :link-to-media-field="responsive_media"
        />

        <UIBaseVideo
          v-else
          class="rounded-fluid aspect-9/16 max-h-[75vh] w-full overflow-hidden object-cover"
          :src="responsive_media.url"
          :context="props.context"
          :state="videoState"
        />
      </UIBaseIntersectionObserver>
    </template>
    <template #desktop>
      <UIBaseIntersectionObserver
        class="flex w-full gap-[calc(var(--spacing-fluid)*0.8)]"
        @is-visible="(bool) => (isContainerVisible = bool)"
      >
        <template v-for="field in Object.values(fields)">
          <template v-if="'kind' in field">
            <UIBasePicture
              v-if="field.kind === 'image'"
              :key="slice.id + field.url"
              class="rounded-fluid h-full w-full min-w-0 overflow-hidden object-cover data-[type=media-full]:aspect-video data-[type=media-duo]:aspect-square"
              :data-type="
                slice.variation === 'default' ? 'media-duo' : 'media-full'
              "
              :link-to-media-field="field"
            />

            <UIBaseVideo
              v-else
              :key="field.url"
              class="rounded-fluid h-full w-full min-w-0 overflow-hidden object-cover data-[type=media-full]:aspect-video data-[type=media-duo]:aspect-square"
              :data-type="
                slice.variation === 'default' ? 'media-duo' : 'media-full'
              "
              :context="props.context"
              :src="field.url"
              :state="videoState"
            />
          </template>
        </template>
      </UIBaseIntersectionObserver>
    </template>
  </UIBaseResponsiveContent>
</template>
