<script setup lang="ts">
type ComponentProps = {
  threshold?: number;
  rootMargin?: string;
};

const props = withDefaults(defineProps<ComponentProps>(), {
  threshold: 0,
  rootMargin: undefined,
});

const emits = defineEmits<{
  isVisible: [payload: boolean];
}>();

const container = useTemplateRef<HTMLElement>("container");
useIntersectionObserver(
  container,
  ([entry]) => {
    if (entry) {
      emits("isVisible", entry.isIntersecting);
    }
  },
  {
    threshold: props.threshold,
    rootMargin: props.rootMargin,
  },
);
</script>

<template>
  <div ref="container">
    <slot />
  </div>
</template>
