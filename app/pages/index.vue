<script setup lang="ts">
const page = await useHome();
const options = await useOptions();
const projects = await useProjects();

useSeoMeta({
  title: options["seo-title"],
});

const props: HomepageProps = {
  desktop: {
    projects,
    endingCardImage: page["ending-card-image"],
    aboutMe: {
      imageOfMe: page["about-image"],
      description: page.description,
      email: options.email,
      links: options.links,
      firstName: options["first-name"],
      lastName: options["last-name"],
    },
  },
  mobile: {
    projects,
    aboutMe: {
      imageOfMe: page["about-image"],
      description: page.description,
      email: options.email,
      links: options.links,
      firstName: options["first-name"],
      lastName: options["last-name"],
    },
  },
};
</script>

<template>
  <div class="index-page">
    <UIBaseResponsiveContent media-query="(max-width: 1025px)">
      <template #mobile>
        <TheMainMobile v-bind="props.mobile" />
      </template>
      <template #desktop>
        <TheMain v-bind="props.desktop" class="index-page__desktop" />
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
