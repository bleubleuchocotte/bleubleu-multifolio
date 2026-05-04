<script setup lang="ts">
import type { NuxtError } from "#app";

type ComponentProps = {
  error: NuxtError;
};

defineProps<ComponentProps>();

const { getWebsite } = usePrismicClient();
const { data: options } = await getWebsite();

await useSiteHead(options.value);

// Detect a fine pointer (a touchscreen device may report several pointers).
const isPointerAccurate = useMediaQuery("(any-pointer: fine)");
</script>

<template>
  <ClientOnly>
    <UIBaseCursor v-if="isPointerAccurate" />
  </ClientOnly>
  <NuxtLayout v-if="options" name="404">
    <TheHeader
      :marquee-text="options.data['text-header']"
      :email="options.data.email"
    />
    <main>
      <ErrorDefault :code="error.status ?? -1" />
    </main>
    <TheFooter :links="options.data.links" class="desktop-only" />
  </NuxtLayout>
</template>
