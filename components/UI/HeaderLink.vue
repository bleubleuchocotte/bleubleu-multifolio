<script setup lang="ts">
import { HeaderLinkType } from "type/types";
defineProps({
  properties: {
    type: Object as PropType<HeaderLinkType>,
    required: true,
  },
});
</script>

<template>
  <a :href="properties.url" :target="properties.target">{{
    properties.text
  }}</a>
</template>

<style scoped lang="scss">
a {
  padding: 10px 32px;
  border: 1px solid $border-color;
  border-radius: 12px;
  background-color: $cta-background-color;
}
</style>
