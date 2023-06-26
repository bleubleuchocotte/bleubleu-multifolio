<script lang="ts" setup>
import { PrismicDocument } from "@prismicio/types";
const props = defineProps({
  about: {
    type: Object as PropType<{
      fullName: String;
      prismic: PrismicDocument;
    }>,
    required: true,
  },
});

console.log(props.about.prismic);
</script>

<template>
  <section class="section">
    <div class="section__text">
      <PrismicRichText :field="about.prismic.data.text" />
    </div>
    <div class="section__bookmark">
      <h1>{{ about.fullName }}</h1>
      <div class="section__bookmark-flex">
        <div>
          <p>contact & more</p>
          <p>Learn to know me here</p>
        </div>
        <div class="section__bookmark-arrow">
          <svg
            width="27"
            height="9"
            viewBox="0 0 27 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="arrow"
              d="M26.7246 4.9932C26.9199 4.79794 26.9199 4.48136 26.7246 4.2861L23.5427 1.10411C23.3474 0.908852 23.0308 0.908852 22.8356 1.10411C22.6403 1.29938 22.6403 1.61596 22.8356 1.81122L25.664 4.63965L22.8356 7.46808C22.6403 7.66334 22.6403 7.97992 22.8356 8.17518C23.0308 8.37044 23.3474 8.37044 23.5427 8.17518L26.7246 4.9932ZM0.797003 4.13965C0.52086 4.13965 0.297003 4.3635 0.297003 4.63965C0.297003 4.91579 0.52086 5.13965 0.797003 5.13965L0.797003 4.13965ZM26.3711 4.13965L0.797003 4.13965L0.797003 5.13965L26.3711 5.13965L26.3711 4.13965Z"
            />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section {
  display: flex;

  height: 100%;
  width: 100%;

  background-color: var(--accent-color);
  color: var(--text-accent-color);

  border-radius: 0 $border-radius-big $border-radius-big 0;

  &__text {
    width: 100%;
    padding: $gutter;
  }

  &__bookmark {
    writing-mode: sideways-lr;
    display: flex;
    justify-content: space-between;

    padding: 10px;

    width: 70px;

    border-left: 1px solid var(--text-accent-color);

    h1 {
      text-transform: uppercase;
    }

    &-flex {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      text-align: right;
    }

    &-arrow {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--background-color);
    }
  }
}

#arrow {
  fill: var(--accent-color);
}
</style>
