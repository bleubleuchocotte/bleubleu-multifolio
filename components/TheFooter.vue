<script setup lang="ts">
import { Footer } from "@/type/types";
defineProps({
  params: {
    type: Object as PropType<Footer>,
    required: true,
  },
});
</script>

<template>
  <footer class="footer">
    <div class="footer__left">
      <NuxtLink to="https://bleubleu.studio" target="_blank">
        Made with love with bleubleu
      </NuxtLink>
    </div>
    <div class="footer__right">
      <PrismicLink
        v-for="(link, i) in params.links"
        :key="i"
        :field="link.link"
      >
        {{ link.name }}
      </PrismicLink>
      <NuxtLink to="/termofservices"> Terms of services </NuxtLink>
      <span>2023</span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  display: flex;
  padding-block: $gutter;

  &__left {
    @include left;
  }
  &__right {
    @include right;

    display: flex;
    justify-content: space-between;
  }
}
</style>
