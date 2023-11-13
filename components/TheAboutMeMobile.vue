<script setup lang="ts">
import { TheAboutMeType } from "@/type/types";

defineProps({
  params: {
    type: Object as PropType<TheAboutMeType>,
    required: true,
  },
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <section class="about-me-mobile">
    <div class="about-me-mobile__heading">
      <h1>{{ params.me["first-name"] }} {{ params.me["last-name"] }}</h1>

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

    <div class="about-me-mobile__content">
      <PrismicRichText :field="params.me.description" />

      <UIBaseImage
        :field="params.me.image"
        class="about-me-mobile__content-image"
      />
      <NuxtLink
        :to="`mailto:${params.me.email}`"
        class="about-me-mobile__content-contact"
        >Contact</NuxtLink
      >
    </div>

    <ul class="about-me-mobile__links">
      <li class="about-me-mobile__links-item">
        <NuxtLink to="https://bleubleu.studio" :target="'_blank'">
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
        v-for="link in params.links"
        :key="link.id"
        class="about-me-mobile__links-item"
      >
        <PrismicLink :field="link.link">
          {{ link.name }}
          <IconBaseArrowLink
            :colors="{
              background: 'var(--accent-color)',
              arrow: 'var(--background-color)',
            }"
          />
        </PrismicLink>
      </li>

      <li class="about-me-mobile__links-item">
        <NuxtLink to="/legal-notices">Legal policy</NuxtLink>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.about-me-mobile {
  display: flex;
  flex-direction: column;
  @include gap();

  @include border-radius();
  @include prop("padding-inline", 0.5);
  @include prop("padding-block", 0.75);

  color: var(--background-color);
  background-color: var(--accent-color);

  &__heading {
    display: flex;
    justify-content: space-between;

    @include prop("padding-block", 0.5);

    border-bottom: 1px solid var(--background-color);

    &-arrow {
      width: 30px;
      height: 30px;
      padding: 1px;

      rotate: -90deg;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    @include gap(0.5);

    &-contact {
      text-align: center;
      @include padding();
      @include border(1, var(--background-color));
    }

    &-image {
      aspect-ratio: 16/9;
      @include border(1, var(--background-color));
    }
  }

  &__links {
    &-item {
      &:not(:last-of-type) {
        border-bottom: 1px solid var(--background-color);
      }
      @include prop("padding-block", 0.25);

      & > a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include gap(0.5);
      }
    }
  }
}
</style>
