<script setup lang="ts">
import { PrismicDocument, LinkField } from "@prismicio/types";
import { FooterLinksKey } from "@/type/keys";
defineProps({
  about: {
    type: Object as PropType<{
      fullName: String;
      prismic: PrismicDocument;
    }>,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const links = inject<Array<{ name: string; link: LinkField }>>(FooterLinksKey);
</script>

<template>
  <section class="about-me-mobile">
    <div class="about-me-mobile__heading">
      <h2>{{ about.fullName }}</h2>

      <UIWrapperArrow
        class="about-me-mobile__heading-arrow"
        :length-arrow="'short'"
        :colors="{
          background: 'var(--background-color)',
          arrow: 'var(--accent-color)',
        }"
      />
    </div>

    <div class="about-me-mobile__content">
      <PrismicRichText :field="about.prismic.data.text" />
      <PrismicImage
        :field="about.prismic.data.me"
        class="about-me-mobile__content-image"
      />
      <NuxtLink :to="`mailto:${email}`" class="about-me-mobile__content-contact"
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
        v-for="(link, i) in links"
        :key="Math.floor(Math.random() * (100 + i))"
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
