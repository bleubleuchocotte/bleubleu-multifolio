<script setup lang="ts">
import type { Content } from "@prismicio/client";

type ComponentProps = {
  links: Content.WebsiteDocumentDataLinksItem[];
};

defineProps<ComponentProps>();
</script>

<template>
  <div>
    <footer class="py-fluid flex">
      <div class="px-fluid flex-[0.3]">
        <NuxtLink
          to="https://bleubleu.studio"
          target="_blank"
          class="text-fluid-cta flex w-fit items-end"
        >
          {{ $t("misc.made-with-love") }}
          <IconBaseArrowLink
            :colors="{
              background: 'transparent',
              arrow: 'var(--text-color)',
            }"
          />
        </NuxtLink>
      </div>
      <div class="pr-fluid flex flex-[0.7] justify-between">
        <PrismicLink
          v-for="link in links"
          :key="link.name?.toString()"
          class="text-fluid-cta flex items-end"
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
        <NuxtLink to="/legal-notice" class="text-fluid-cta flex items-end">
          {{ $t("page.legal-notice.link") }}
        </NuxtLink>
        <UIBaseCopyright />
      </div>
    </footer>
  </div>
</template>
