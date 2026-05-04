<script setup lang="ts">
import type { KeyTextField } from "@prismicio/client";
import { useClipboard } from "@vueuse/core";

type ComponentProps = {
  email: KeyTextField;
};

defineProps<ComponentProps>();

const { copy, copied } = useClipboard({ copiedDuring: 2000 });
</script>

<template>
  <button
    :data-email="email"
    type="button"
    class="button text-text-accent text-fluid-cta relative h-full w-fit overflow-hidden rounded-[calc(var(--radius-fluid)/2)]"
    :class="{ open: copied }"
    aria-label="Copy email address to clipboard"
    @click="copy(email?.toString() ?? '')"
  >
    <span class="absolute top-0 z-1 h-full w-full">
      <span
        class="bg-accent button__text-bg-top relative h-1/2 w-full overflow-hidden transition-transform duration-300 ease-out"
      >
        <span
          class="absolute bottom-0 left-0 w-full translate-y-1/2 text-center"
          ><slot
        /></span>
      </span>
      <span
        class="bg-accent button__text-bg-bottom relative h-1/2 w-full overflow-hidden transition-transform duration-300 ease-out"
        aria-hidden="true"
      >
        <span class="absolute top-0 left-0 w-full -translate-y-1/2 text-center"
          ><slot
        /></span>
      </span>
    </span>

    <span
      class="bg-text-accent text-accent border-accent absolute top-0 left-0 flex h-full w-full items-center justify-center border rounded-[calc(var(--radius-fluid)/2)]"
    >
      <span>{{ copied ? $t("contact.click") : $t("contact.hover") }} </span>
    </span>
  </button>
</template>

<style scoped>
.button:hover .button__text-bg-top,
.button.open .button__text-bg-top {
  transform: translate3d(0, -100%, 0);
}
.button:hover .button__text-bg-bottom,
.button.open .button__text-bg-bottom {
  transform: translate3d(0, 100%, 0);
}
</style>
