<script setup lang="ts">
const { getWebsite } = usePrismicClient();
const { data: options } = await getWebsite();

await useSiteHead(options.value);

const isWIP = useState<boolean>("WebsiteStateWIP", () => false);

// Detect a fine pointer (a touchscreen device may report several pointers).
const isPointerAccurate = useMediaQuery("(any-pointer: fine)");
</script>

<template>
  <ClientOnly>
    <UIBaseCursor v-if="isPointerAccurate" />
  </ClientOnly>

  <NuxtLoadingIndicator :throttle="0" color="var(--accent-color)" />

  <NuxtLayout v-if="options?.data">
    <TheHeader
      v-if="!isWIP"
      :marquee-text="options?.data['text-header']"
      :email="options?.data.email"
    />
    <NuxtPage />
    <TheFooter
      v-if="!isWIP"
      :links="options?.data.links"
      class="desktop-only"
    />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.translate-out-enter-active,
.translate-out-leave-active {
  transition: all 0.4s ease-out;
}

.translate-out-enter-from,
.translate-out-leave-to {
  opacity: 0;
  transform: translateY(-20vh);
}

.translate-in-enter-active,
.translate-in-leave-active {
  transition: all 0.4s ease-out;
}

.translate-in-enter-from,
.translate-in-leave-to {
  opacity: 0;
  transform: translateY(80vh);
}
</style>
