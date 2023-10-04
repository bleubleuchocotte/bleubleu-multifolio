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
      <NuxtLink to="https://bleubleu.studio" target="_blank" class="footer__left-link">
        Made with love with bleubleu
        <IconBaseArrowLink 
        class="footer-arrows"
        :colors="{
          background: 'var(--background-color)',
          arrow: 'var(--text-color)',
        }"
        />
      </NuxtLink>
      
    </div>
    <div class="footer__right">
      <PrismicLink class="footer__right-link"
        v-for="(link, i) in params.links"
        :key="i"
        :field="link.link"
      >
        {{ link.name }}
        <IconBaseArrowLink
        class="footer-arrows"
          :colors="{
            background: 'var(--background-color)',
            arrow: 'var(--text-color)',
          }"
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

  &-arrows {
    pointer-events: none;
  }

  &__left {
    @include left;

    &-link {
      display: flex;
      width: fit-content;
    }
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
