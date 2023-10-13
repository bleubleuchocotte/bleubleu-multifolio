<script setup lang="ts">
const { $api } = useNuxtApp();
const page = $api.pages["legal-notices"];

const isDeviceMobile = useMediaQuery("(max-width: 768px)");
</script>

<template>
  <div class="legal-container">
    <UIBaseButtonHome class="legal-container__button"
      >Let's go home</UIBaseButtonHome
    >

    <template v-if="!isDeviceMobile">
      <div
        v-for="i in 2"
        :key="Math.floor(Math.random() * (100 + i))"
        class="legal-container__bands"
      >
        <div
          v-for="j in 5"
          :key="Math.floor(Math.random() * (100 + j))"
          class="legal-container__bands-notices"
          :aria-hidden="!(j === 1 && i === 1)"
        >
          <h1>Legal Notices</h1>

          <h2>Company Information</h2>
          <p>Last name: {{ page.me["last-name"] }}</p>
          <p>First name: {{ page.me["first-name"] }}</p>
          <p>Adress: {{ page.me["address"] }}</p>
          <p>Status: Entrepreneur individuel (EI)</p>
          <p>Email: {{ page.me["email"] }}</p>
          <p>Phone: {{ page.me["phone"] }}</p>

          <template v-if="page.me['tva'] != null">
            <h2>VAT Identification Number:</h2>
            <p>{{ page.me["tva"] }}</p>
          </template>

          <h2>Website Host:</h2>
          <p>Host name: {{ page.host["name"] }}</p>
          <p>Host address: {{ page.host["address"] }}</p>
          <p></p>
          <p>Host phone: {{ page.host["phone"] }}</p>

          <h2>BleuBleu Chocotte:</h2>
          <p>Host name: {{ page.host["name"] }}</p>
          <p>Host address: {{ page.host["address"] }}</p>
          <p></p>
          <p>Host phone: {{ page.host["phone"] }}</p>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="legal-container__bands-notices">
        <h1>Legal Notices</h1>

        <h2>Company Information</h2>
        <p>Last name: {{ page.me["last-name"] }}</p>
        <p>First name: {{ page.me["first-name"] }}</p>
        <p>Adress: {{ page.me["address"] }}</p>
        <p>Status: Entrepreneur individuel (EI)</p>
        <p>Email: {{ page.me["email"] }}</p>
        <p>Phone: {{ page.me["phone"] }}</p>

        <template v-if="page.me['tva'] != null">
          <h2>VAT Identification Number:</h2>
          <p>{{ page.me["tva"] }}</p>
        </template>

        <h2>Website Host:</h2>
        <p>Host name: {{ page.host["name"] }}</p>
        <p>Host address: {{ page.host["address"] }}</p>
        <p></p>
        <p>Host phone: {{ page.host["phone"] }}</p>

        <h2>BleuBleu Chocotte:</h2>
        <p>Host name: {{ page.host["name"] }}</p>
        <p>Host address: {{ page.host["address"] }}</p>
        <p></p>
        <p>Host phone: {{ page.host["phone"] }}</p>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.legal-container {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--border-color);

  @media #{$mobile-down} {
    display: flex;
    flex-direction: column-reverse;
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
      top: initial;
      left: initial;
      @include font("cta");
      @include prop("margin-top");
    }
  }

  &__bands {
    width: max-content;
    display: flex;
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
    border-left: none;

    &-notices {
      @include padding(0.5);

      h2 {
        @include prop("margin-block", 0.5);
      }
    }
  }
}
</style>
