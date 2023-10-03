<script setup lang="ts">
import { LinkField } from "@prismicio/types";
type Color = {
  background: string;
  arrow: string;
  border?: string;
};

defineProps({
  colors: {
    type: Object as PropType<Color>,
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
    <IconBaseArrowLink class="link__icon" :arrow="colors.arrow" :circle="colors.background"/>
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
