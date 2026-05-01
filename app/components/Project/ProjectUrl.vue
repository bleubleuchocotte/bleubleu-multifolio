<script setup lang="ts">
import type { LinkField } from "@prismicio/client";

type ComponentProps = {
  url?: LinkField;
};

defineProps<ComponentProps>();
</script>

<template>
  <PrismicLink
    v-if="url"
    class="flex w-fit items-center gap-[calc(var(--spacing-fluid)/3)]"
    :field="url"
    data-icon="IconArrowRightUp"
  >
    <h2 class="pointer-events-none max-lg:text-fluid-h3">
      <slot />
    </h2>
    <IconBaseArrowLink
      :colors="{
        background: 'var(--accent-color)',
        arrow: 'var(--background-color)',
      }"
    />
  </PrismicLink>
  <div
    v-else
    class="flex w-fit items-center gap-[calc(var(--spacing-fluid)/3)]"
  >
    <h2 class="pointer-events-none max-lg:text-fluid-h3">
      <slot />
    </h2>
  </div>
</template>
