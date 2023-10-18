<script setup lang="ts">
import { usePrismicImage } from "@prismicio/vue";
import { ImageField } from "@prismicio/types";

const props = defineProps({
  field: {
    type: Object as PropType<ImageField>,
    required: true,
  },
});

const { src, srcset, alt } = usePrismicImage({
  field: props.field,
});

const isLoading = ref(true);
</script>

<template>
  <div class="image">
    <UIBaseImageSkeleton v-if="isLoading" />
    <img
      v-show="!isLoading"
      :src="src ?? ''"
      :alt="alt"
      :srcset="srcset ?? ''"
      @load="isLoading = false"
    />
  </div>
</template>

<style scoped lang="scss">
.image {
  width: 100%;
  @include border-radius();
  overflow: hidden;
}
</style>
