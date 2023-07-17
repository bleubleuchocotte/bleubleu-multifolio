<template>
  <span class="tag__text"><slot></slot></span>
</template>

<style scoped lang="scss">
.tag {
  &__text {
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: $border-radius;

    font-size: $font-size-normal;
  }
}
</style>
