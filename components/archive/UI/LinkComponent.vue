<script setup lang="ts">
import { LinkPrismicType } from "~/type/types";
defineProps({
  link: {
    type: Object as PropType<LinkPrismicType>,
    required: true,
  },
  imageOverText: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <PrismicLink :field="link.link">
    <template v-if="imageOverText && Object.keys(link.image).length > 0">
      <PrismicImage :field="link.image" />
    </template>
    <template v-else>
      {{ link.name[0]?.text }}
    </template>
  </PrismicLink>
</template>

<style scoped lang="scss">
a {
  padding: 10px 32px;
  border: 1px solid $border-color;
  border-radius: 12px;
  background-color: $cta-background-color;

  display: flex;
  align-items: center;
  justify-content: center;

  max-height: 70px;
  max-width: 10vw;
}
</style>
