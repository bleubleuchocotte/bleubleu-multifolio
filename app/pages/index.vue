<script setup lang="ts">
const { getAllProjects, getWebsite } = usePrismicClient();
const { data: projects } = await getAllProjects();
const { data: page } = await getWebsite();
const { data: options } = getWebsite();

useSeoMeta({
  title: options.value?.data["seo-title"],
});
</script>

<template>
  <div class="index-page">
    <UIBaseResponsiveContent media-query="(max-width: 1025px)">
      <template #mobile>
        <TheMainMobile
          v-if="page && options"
          :about-me="{
            'about-image': page.data['about-image'],
            description: page.data['description'],
            email: options.data['email'],
            'first-name': options.data['first-name'],
            'last-name': options.data['last-name'],
            links: page.data.links,
          }"
        />
      </template>
      <template #desktop>
        <TheMain
          v-if="page && options"
          :ending-card-image="page.data['ending-card-image']"
          :about-me="{
            'about-image': page.data['about-image'],
            description: page.data['description'],
            email: options.data['email'],
            'first-name': options.data['first-name'],
            'last-name': options.data['last-name'],
            links: page?.data.links,
          }"
          :projects
          class="index-page__desktop"
        />
      </template>
    </UIBaseResponsiveContent>
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
