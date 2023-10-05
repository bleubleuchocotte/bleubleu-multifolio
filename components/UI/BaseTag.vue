<template>
  <span class="tag__text"><slot></slot></span>
</template>

<style scoped lang="scss">
.tag {
  &__text {
    @include padding(0.5);
    border: 1px solid var(--border-color);
    @include border-radius();

    @include font("p");
  }
}
</style>
