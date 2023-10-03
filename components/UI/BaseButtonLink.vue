<script setup lang="ts">
import { LinkField } from "@prismicio/types";
import { ColorArrow } from "@/type/types";

defineProps({
  colors: {
    type: Object as PropType<ColorArrow>,
    required: true,
  },
  link: {
    type: Object as PropType<LinkField>,
    required: true,
  }
});

</script>

<template>
  <PrismicLink
  class="link"
  :field="link">
    <IconBaseArrowLink 
      class="link__icon" 
      :colors="{
        background: 'var(--accent-color)',
        arrow: 'var(--background-color)',
      }"/>
  </PrismicLink>
</template>

<style scoped lang="scss">

.link {
  display: flex;
  align-items: center;
  & > .link__icon {
    pointer-events: none;
  }
}

</style>
