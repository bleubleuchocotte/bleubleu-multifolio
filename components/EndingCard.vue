<script setup lang="ts">
import { ImageField } from "@prismicio/types";

defineProps({
  email: {
    type: String,
    required: true,
  },
  endingCardImage: {
    type: Object as PropType<ImageField>,
    required: true,
  },
});

defineEmits<{ (e: "goToStart"): void }>();
</script>

<template>
  <article class="ending-card">
    <div class="ending-card__content">
      <p class="ending-card__content-caption">
        You reached the end of the shortlist,<br />
        feel free to contact me!
      </p>
      <PrismicImage
        class="ending-card__content-image"
        :field="endingCardImage"
      />
      <div class="ending-card__content-start-button">
        <a @click="$emit('goToStart')">Bring me to start</a>
        <UIBaseButtonNavigation
          class="ending-card__content-arrow"
          :colors="{
            background: 'var(--background-color)',
            arrow: 'var(--accent-color)',
          }"
          :orientation="'left'"
          :length-arrow="'short'"
          @click="$emit('goToStart')"
        />
      </div>

      <UIBaseButtonContact
        :email="email"
        class="ending-card__content-contact-button"
        >Contact
      </UIBaseButtonContact>
    </div>
  </article>
</template>

<style scoped lang="scss">
.ending-card {
  @include gap();
  @include prop("padding-left");

  min-width: 40vw;
  height: 100%;

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: 100%;
    @include padding(0.5);
    @include gap();

    color: var(--background-color);

    background-color: var(--accent-color);
    border: 0 solid var(--accent-color);
    @include border-radius();

    &-caption {
      @include prop("padding-left", 0.5);
      @include prop("padding-top", 0.25);
      text-align: left;
    }

    &-contact-button {
      height: 18%;
      width: 100%;
      z-index: 0;
      border: 1px solid var(--background-color);

      @include font("h2");
    }

    &-arrow {
      height: 38px;
      width: 38px;
      display: flex;
      align-items: center;
    }

    &-image {
      max-width: 60%;
      height: auto;
      margin: auto;
    }

    &-start-button {
      display: flex;
      justify-content: center;
      @include gap(0.5);
      cursor: pointer;

      & > a {
        @include font("h3");
        text-decoration: underline;
      }
    }
  }
}
</style>
