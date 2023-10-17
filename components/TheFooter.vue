<script setup lang="ts">
import { LinkField } from "@prismicio/types";
defineProps({
  links: {
    type: Array<{ name: string; link: LinkField }>,
    required: true,
  },
});
</script>

<template>
  <div>
    <footer class="footer">
      <div class="footer__left">
        <NuxtLink
          to="https://bleubleu.studio"
          target="_blank"
          class="footer__left-link"
        >
          Lovingly made with bleubleu
          <IconBaseArrowLink
            :colors="{
              background: 'transparent',
              arrow: 'var(--text-color)',
            }"
          />
        </NuxtLink>
      </div>
      <div class="footer__right">
        <PrismicLink
          v-for="(link, i) in links"
          :key="i"
          class="footer__right-link"
          :field="link.link"
        >
          {{ link.name }}
          <IconBaseArrowLink
            :colors="{
              background: 'transparent',
              arrow: 'var(--text-color)',
            }"
          />
        </PrismicLink>
        <NuxtLink to="/legal-notices"> Legal notices </NuxtLink>
        <span>© {{ new Date().getFullYear() }} Bleubleu Chocotte</span>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.footer {
  display: flex;

  @include prop("padding-block");

  &__left {
    @include left;

    &-link {
      display: flex;
      width: fit-content;
      align-items: flex-end;
    }
  }
  &__right {
    @include right;

    display: flex;
    justify-content: space-between;

    padding-left: 0;

    &-link {
      display: flex;
      align-items: flex-end;
    }
  }
}
</style>
