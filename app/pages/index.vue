<script setup lang="ts">
const { getAllProjects, getWebsite } = usePrismicClient();
const { data: projects } = await getAllProjects();
const { data: page } = await getWebsite();

useSeoMeta({
  title: page.value?.data["seo-title"],
});
</script>

<template>
  <div class="min-h-0">
    <UIBaseResponsiveContent>
      <template #mobile>
        <TheMainMobile
          v-if="page"
          :about-me="{
            'about-image': page.data['about-image'],
            description: page.data['description'],
            email: page.data['email'],
            'first-name': page.data['first-name'],
            'last-name': page.data['last-name'],
            links: page.data.links,
          }"
        />
      </template>
      <template #desktop>
        <TheMain
          v-if="page"
          :ending-card-image="page.data['ending-card-image']"
          :about-me="{
            'about-image': page.data['about-image'],
            description: page.data['description'],
            email: page.data['email'],
            'first-name': page.data['first-name'],
            'last-name': page.data['last-name'],
            links: page?.data.links,
          }"
          :projects
          class="h-full"
        />
      </template>
    </UIBaseResponsiveContent>
  </div>
</template>
