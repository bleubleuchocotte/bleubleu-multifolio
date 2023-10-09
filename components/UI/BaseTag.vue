<template>
  <span class="tag__text"><slot></slot></span>
</template>

<style scoped lang="scss">
.tag {
  &__text {
    @include padding(0.33);
    border: 1px solid var(--border-color);
    @include border-radius(0.5);

    @include font("p");
  }
}
</style>
