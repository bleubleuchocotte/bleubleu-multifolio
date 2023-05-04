<script setup lang="ts">
import InfiniteSlidingText from "./UI/InfiniteSlidingText.vue";
import LinkComponent from "./UI/LinkComponent.vue";
import type { HeaderPrismicType } from "type/types";

defineProps({
  header: {
    type: Object as PropType<HeaderPrismicType>,
    required: true,
  },
});
</script>

<template>
  <header class="container">
    <div class="container__logo">
      <PrismicImage :field="header.logo" />
    </div>
    <div class="container__text">
      <InfiniteSlidingText :text="header.catchphrase[0]?.text ?? ''" />
    </div>

    <div class="container__links">
      <LinkComponent
        v-for="(link, index) in header.links"
        :key="index"
        :link="link"
        :image-over-text="true"
      />
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  position: relative;
  padding-inline: 10px;

  &::before {
    content: "";
    position: absolute;
    border-inline: 1px solid $border-color;
    margin-inline: -10px;
    width: 100%;
    height: calc(100% + 20px);

    pointer-events: none;
  }
}

.container {
  display: flex;
  justify-content: space-between;
  gap: 10px;

  &__text {
    flex: 1;
  }

  &__links {
    display: flex;
    gap: 10px;
  }

  &__logo {
    background-color: $accent-color;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
