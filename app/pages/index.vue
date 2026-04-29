<script setup lang="ts">
const page = await useHome();
const options = await useOptions();
const projects = await useProjects();

useSeoMeta({
  title: options["seo-title"],
});

const aboutMe = {
  imageOfMe: page["about-image"],
  description: page.description,
  email: options.email,
  links: options.links,
  firstName: options["first-name"],
  lastName: options["last-name"],
};
</script>

<template>
  <div class="index-page">
    <UIBaseResponsiveContent media-query="(max-width: 1025px)">
      <template #mobile>
        <TheMainMobile :projects :about-me />
      </template>
      <template #desktop>
        <TheMain
          :projects
          :ending-card-image="page['ending-card-image']"
          :about-me
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
