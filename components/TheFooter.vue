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
      <IconBaseArrowLink 
        :colors="{
          background: 'var(--background-color)',
          arrow: 'var(--text-color)',
        }"
        class="footer__right-link-arrow"
        />
    </div>
    <div class="footer__right">
      <PrismicLink class="footer__right-link"
        v-for="(link, i) in params.links"
        :key="i"
        :field="link.link"
      >
        {{ link.name }}
        <IconBaseArrowLink 
        :colors="{
          background: 'var(--background-color)',
          arrow: 'var(--text-color)',
        }"
        class="footer__right-link-arrow"
        />
      </PrismicLink>
      <NuxtLink to="/legal-notices"> Legal notices </NuxtLink>
      <span>© {{ new Date().getFullYear() }} Bleubleu Chocotte</span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  display: flex;
  padding-block: $gutter;

  font-size: $font-size-normal;

  &__left {
    @include left;
    display: flex;  
  }
  &__right {
    @include right;

    display: flex;
    justify-content: space-between;

    padding-left: 0;

    &-link {
      display: flex;
    }
    
  }
}
</style>
