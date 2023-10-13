<script setup lang="ts">
const { client } = usePrismic();

// On GET les informations de la page
const { data: website } = await useAsyncData(() =>
  client.getSingle("legal_notices")
);
if (!website.value) throw new Error("Prismic document could not be accessed");

useSeoMeta({
  robots: "no-index",
});

const isDeviceMobile = useMediaQuery("(max-width: 768px)");
</script>

<template>
  <div class="legal-container">
    <UIBaseButtonHome class="legal-container__button"
      >Let's go home</UIBaseButtonHome
    >
    <div
      v-for="i in isDeviceMobile ? 1 : 2"
      :key="Math.floor(Math.random() * (100 + i))"
      class="legal-container__bands"
      :class="'legal-container__band-' + i"
    >
      <div
        v-for="j in isDeviceMobile ? 1 : 5"
        :key="Math.floor(Math.random() * (100 + j))"
        class="legal-container__bands-notices"
        :aria-hidden="!(j === 1 && i === 1)"
      >
        <h1>Legal Notices</h1>

        <h2>Company Information</h2>
        <p>Last name: {{ website?.data["me-last-name"] ?? "Unknown" }}</p>
        <p>First name: {{ website?.data["me-first-name"] ?? "Unknown" }}</p>
        <p>Adress: {{ website?.data["me-address"] ?? "Unknown" }}</p>
        <p>Status: Entrepreneur individuel (EI)</p>
        <p>Email: {{ website?.data["me-email"] ?? "Unknown" }}</p>
        <p>Phone: {{ website?.data["me-phone-number"] ?? "Unknown" }}</p>

        <template v-if="website?.data['me-tva-number'] != null">
          <h2>VAT Identification Number:</h2>
          <p>{{ website.data["me-tva-number"] }}</p>
        </template>

        <h2>Website Host:</h2>
        <p>Host name: {{ website?.data["host-name"] ?? "Unknown" }}</p>
        <p>Host address: {{ website?.data["host-address"] ?? "Unknown" }}</p>
        <p></p>
        <p>Host phone: {{ website?.data["host-phone-number"] ?? "Unknown" }}</p>

        <h2>BleuBleu Chocotte:</h2>
        <p>Host name: {{ website?.data["host-name"] ?? "Unknown" }}</p>
        <p>Host address: {{ website?.data["host-address"] ?? "Unknown" }}</p>
        <p></p>
        <p>Host phone: {{ website?.data["host-phone-number"] ?? "Unknown" }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.legal-container {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--border-color);
  @media #{$mobile-down} {
    z-index: -1;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    border-bottom: none;
  }

  &__button {
    height: 7vw;
    width: 20vw;
    z-index: 5;
    border: 1px solid var(--background-color);
    position: absolute;
    top: calc(50% - 3.5vw);
    left: calc(50% - 10vw);
    @include font("h2");

    @media #{$mobile-down} {
      height: 10vw;
      width: 30vw;
      position: relative;
      @include font("cta");
      @include prop("margin-top");
    }
  }

  &__bands {
    width: max-content;
    display: flex;
    flex-direction: row;
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
    border-left: none;

    @media #{$mobile-down} {
      flex-direction: column;
      width: 100%;
      border: none;
    }

    &-notices {
      @include padding(0.5);
    }
  }

  &__band-1 {
    @media #{$desktop} {
      transform: translate3d(calc(var(--v) * 2px), 0, 0)
        skewX(calc(var(--v) * -0.05deg));
    }
  }

  &__band-2 {
    @media #{$desktop} {
      transform: translate3d(calc(var(--v) * 1px), 0, 0)
        skewX(calc(var(--v) * -0.05deg));
    }
    @media #{$mobile-down} {
      display: none;
    }
  }
}
</style>
