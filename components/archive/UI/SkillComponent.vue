<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <span>{{ text }}</span>
</template>

<style scoped lang="scss">
span {
  padding: 10px;
  border: 1px solid $border-color;
  border-radius: 12px;

  background-color: $cta-background-color;
}
</style>
