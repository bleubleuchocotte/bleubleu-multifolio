<script setup lang="ts">
type ComponentProps = {
  colors: ColorArrow;
  lengthArrow?: "short" | "long";
};

const props = withDefaults(defineProps<ComponentProps>(), {
  lengthArrow: "short",
});

const styles = reactive({
  backgroundColor: props.colors.background,
  borderColor: props.colors.border,
});
</script>

<template>
  <span
    :style="styles"
    class="flex h-full w-full items-center justify-center rounded-full border border-transparent"
  >
    <template v-if="lengthArrow === 'short'">
      <IconBaseArrowShort :fill="colors.arrow" />
    </template>
    <template v-else>
      <IconBaseArrowLong :fill="colors.arrow" />
    </template>
  </span>
</template>
