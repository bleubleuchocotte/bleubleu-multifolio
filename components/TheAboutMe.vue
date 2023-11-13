<script lang="ts" setup>
import { TheAboutMeType } from "@/type/types";

defineProps({
  params: {
    type: Object as PropType<TheAboutMeType>,
    required: true,
  },
});

onMounted(() => {
  document.addEventListener("keydown", callback);
});

onUnmounted(() => {
  document.removeEventListener("keydown", callback);
});

const callback = (e: KeyboardEvent) => {
  if (isOpen.value === true && e.key === "Escape") isOpen.value = false;
};

const isOpen = ref(false);
const target = ref();

onClickOutside(target, () => {
  if (isOpen.value === true) isOpen.value = false;
});
</script>

<template>
  <section ref="target" class="section invert-selection" :class="{ open: isOpen }">
    <UIBaseLenis class="section__content">
      <div class="section__content-image">
        <PrismicImage :field="params.me.image" />
      </div>
      <PrismicRichText :field="params.me.description" class="section__content-text" />
      <UIBaseButtonContact :email="params.me.email" class="section__content-contact">Contact
      </UIBaseButtonContact>
      <ul class="section__content-links">
        <li class="section__content-links-item">
          <NuxtLink to="https://bleubleu.studio" :target="'_blank'">
            <span> Bleubleu.studio </span>
            <IconBaseArrowLink :colors="{
              background: 'var(--accent-color)',
              arrow: 'var(--text-accent-color)',
            }" />
          </NuxtLink>
        </li>
        <li v-for="link in params.links" :key="link.id" class="section__content-links-item">
          <PrismicLink :field="link.link">
            <span>
              {{ link.name }}
            </span>
            <IconBaseArrowLink :colors="{
              background: 'var(--accent-color)',
              arrow: 'var(--text-accent-color)',
            }" />
          </PrismicLink>
        </li>
      </ul>
    </UIBaseLenis>
    <div class="section__bookmark" tabindex="0" aria-disabled="false" role="button"
      :data-icon="isOpen ? 'IconBaseTowardReverse' : 'IconBaseToward'" @click="isOpen = !isOpen"
      @keydown.enter="isOpen = !isOpen" @keydown.space.prevent="isOpen = !isOpen">
      <h1 class="section__bookmark-heading">
        {{ params.me["first-name"] }} {{ params.me["last-name"] }}
      </h1>
      <div class="section__bookmark-flex">
        <div>
          <p>Explore further</p>
          <p>Get to know me here</p>
        </div>
        <div class="section__bookmark-arrow">
          <IconBaseToward />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section {
  transition: transform 0.3s ease-out;
  transform: translate(calc($bookmark-width - 30vw));

  &.open {
    transform: translate(0);

    .section__bookmark-arrow {
      transform: rotate(0);
    }
  }

  display: flex;

  position: absolute;
  z-index: 10;
  left: 0;

  height: 100%;
  width: 30vw;

  background-color: var(--accent-color);
  color: var(--text-accent-color);
  @include border-radius(1, "right");

  &__content {
    width: 100%;
    @include padding();

    border-right: 1px solid var(--text-accent-color);

    &>p {
      @include font("h2");
    }

    &-text {
      @include prop("margin-bottom");
    }

    &-contact {
      height: 10%;
      width: 100%;
      z-index: 0;
      border: 1px solid var(--text-accent-color);

      @include prop("margin-bottom");
      @include font("h2");

      &:deep(.button__reveal) {
        border-radius: 0;
        border: unset;
      }
    }

    &-image {
      overflow: hidden;
      aspect-ratio: calc(16 / 9); // Permet d'avoir le même ration que l'image prismic
      @include prop("margin-bottom");

      border: 1px solid var(--text-accent-color);
      @include border-radius();
    }

    &-links {
      &-item {
        &:not(:last-of-type) {
          border-bottom: 1px solid var(--text-accent-color);
        }

        @include prop("padding-block", 0.25);

        &>a {
          display: flex;
          justify-content: space-between;
          align-items: center;
          @include gap(0.5);

          span {
            pointer-events: none;
            transition: transform 0.2s ease-out;
          }

          &:hover span {
            transform: translate3d(5px, 0, 0);
          }
        }
      }
    }
  }

  &__bookmark {
    writing-mode: vertical-rl;
    rotate: 180deg;

    display: flex;
    justify-content: space-between;
    @include padding(calc(1 / 3));

    min-width: $bookmark-width;

    &>* {
      pointer-events: none;
    }

    &-heading {
      text-transform: uppercase;
      align-self: center;
    }

    &-flex {
      display: flex;
      justify-content: center;
      align-items: center;

      @include gap(calc(1 / 3));

      text-align: right;
    }

    &-arrow {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--text-accent-color);

      color: var(--accent-color);
      transform: rotate(180deg);
    }
  }
}
</style>
