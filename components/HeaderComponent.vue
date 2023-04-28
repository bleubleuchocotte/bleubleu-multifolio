<script setup lang="ts">
import InfiniteSlidingText from "./UI/InfiniteSlidingText.vue";
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
      <PrismicLink
        v-for="(link, index) in header.links"
        :key="index"
        :field="link.link"
      >
        <PrismicImage
          v-if="Object.keys(link.image).length > 0"
          :field="link.image"
        />
        <template v-else>
          {{ link.name[0]?.text }}
        </template>
      </PrismicLink>
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
  }
}

a {
  padding: 10px 32px;
  border: 1px solid $border-color;
  border-radius: 12px;
  background-color: $cta-background-color;

  display: flex;
  align-items: center;
  justify-content: center;
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
