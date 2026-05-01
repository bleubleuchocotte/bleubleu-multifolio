<script setup lang="ts">
import type { TheAboutMeProps } from "./TheAboutMe.vue";

defineProps<{
  data: TheAboutMeProps;
}>();

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <section
    class="bg-accent text-background gap-fluid rounded-fluid flex flex-col px-[calc(var(--spacing-fluid)/2)] py-[calc(var(--spacing-fluid)*0.75)]"
  >
    <div
      class="border-background flex justify-between border-b py-[calc(var(--spacing-fluid)/2)]"
    >
      <h1>{{ data["first-name"] }} {{ data["last-name"] }}</h1>

      <button aria-label="Back to Top" @click="scrollToTop">
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="14.881"
            cy="15.4755"
            r="14.0724"
            transform="rotate(-90 14.881 15.4755)"
            fill="var(--background-color)"
          />
          <path
            d="M15.2344 5.67243C15.0392 5.47717 14.7226 5.47717 14.5273 5.67243L11.3453 8.85441C11.1501 9.04967 11.1501 9.36626 11.3453 9.56152C11.5406 9.75678 11.8572 9.75678 12.0524 9.56152L14.8809 6.73309L17.7093 9.56152C17.9045 9.75678 18.2211 9.75678 18.4164 9.56152C18.6117 9.36626 18.6117 9.04968 18.4164 8.85441L15.2344 5.67243ZM14.3809 24.9253C14.3809 25.2014 14.6047 25.4253 14.8809 25.4253C15.157 25.4253 15.3809 25.2014 15.3809 24.9253L14.3809 24.9253ZM14.3809 6.02599L14.3809 24.9253L15.3809 24.9253L15.3809 6.02599L14.3809 6.02599Z"
            fill="var(--accent-color)"
          />
        </svg>
      </button>
    </div>

    <div class="flex flex-col gap-[calc(var(--spacing-fluid)/2)]">
      <PrismicRichText :field="data.description" />
      <UIBasePicture
        :image="data['about-image']"
        class="border-background rounded-fluid aspect-video overflow-hidden border"
      />

      <NuxtLink
        :to="`mailto:${data.email}`"
        class="border-background p-fluid rounded-fluid border text-center"
      >
        {{ $t("contact.text") }}
      </NuxtLink>
    </div>

    <ul>
      <li
        class="border-background not-last:border-b py-[calc(var(--spacing-fluid)/4)]"
      >
        <NuxtLink
          to="https://bleubleu.studio"
          target="_blank"
          class="flex items-center justify-between gap-[calc(var(--spacing-fluid)/2)]"
        >
          Bleubleu.studio
          <IconBaseArrowLink
            :colors="{
              background: 'var(--accent-color)',
              arrow: 'var(--background-color)',
            }"
          />
        </NuxtLink>
      </li>
      <li
        v-for="link in data.links"
        :key="link.name?.toString()"
        class="border-background not-last:border-b py-[calc(var(--spacing-fluid)/4)]"
      >
        <PrismicLink
          :field="link.link"
          class="flex items-center justify-between gap-[calc(var(--spacing-fluid)/2)]"
        >
          {{ link.name }}
          <IconBaseArrowLink
            :colors="{
              background: 'var(--accent-color)',
              arrow: 'var(--background-color)',
            }"
          />
        </PrismicLink>
      </li>

      <li
        class="border-background not-last:border-b py-[calc(var(--spacing-fluid)/4)]"
      >
        <NuxtLink to="/legal-notice"> Legal notice </NuxtLink>
      </li>
    </ul>
  </section>
</template>
