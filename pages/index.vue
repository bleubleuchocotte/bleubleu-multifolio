<script setup lang="ts">
const { $api } = useNuxtApp();
const website = $api.website;
const projects = $api.projects;

useServerSeoMeta({
  publisher: `${website.me["first-name"]} ${website.me["last-name"]}`,
});

const isMobile = useMediaQuery("(max-width: 1025px)"); // Client side
const { isDesktop } = useDevice(); // Server side
</script>

<template>
  <div class="index-page">
    <ClientOnly>
      <TheMainMobile v-if="isMobile" :projects="projects" :website="website" />
      <TheMain
        v-else
        class="index-page__desktop"
        :projects="projects"
        :website="website"
      />

      <template #fallback>
        <TheMain
          v-if="isDesktop"
          :projects="projects"
          :website="website"
          class="index-page__desktop"
        />
        <TheMainMobile v-else :projects="projects" :website="website" />
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
.index-page {
  min-height: 0;

  &__desktop {
    height: 100%;
  }
}
</style>
