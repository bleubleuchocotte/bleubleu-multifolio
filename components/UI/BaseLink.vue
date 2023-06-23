<script setup lang="ts">
import { AnchorHTMLAttributes } from "nuxt/dist/app/compat/capi";

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
  target: {
    type: String as PropType<AnchorHTMLAttributes["target"]>,
    required: false,
    default: "_blank",
  },
});
</script>

<template>
  <a v-bind="props" class="link">
    <slot />
  </a>
</template>

<style scoped lang="scss">
.link {
  // cursor: pointer;
}
</style>
