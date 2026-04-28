<script setup lang="ts">
type ComponentProps = {
  mediaQuery: string;
};

const props = defineProps<ComponentProps>();

const isMobileClientSide = useMediaQuery(props.mediaQuery);
// TODO: Update
</script>

<template>
  <ClientOnly>
    <slot v-if="isMobileClientSide" name="mobile" />
    <slot v-else name="desktop" />

    <template #fallback>
      <slot v-if="isMobileClientSide" name="mobile" />
      <slot v-else name="desktop" />
    </template>
  </ClientOnly>
</template>
