<script setup lang="ts">
import InfiniteSlidingText from "./UI/InfiniteSlidingText.vue";
import HeaderLink from "./UI/HeaderLink.vue";
import { HeaderLinkType } from "type/types";

const links: HeaderLinkType[] = [
  { url: "https://bleubleu.studio", text: "BeluBelu Studio", target: "_blank" },
  { url: "https://malt.fr", text: "Malt", target: "_blank" },
  { url: "https://github.fr", text: "Github", target: "_blank" },
  { url: "https://Linkedin.fr", text: "Linkedin", target: "_blank" },
];
</script>

<template>
  <header class="container">
    <div class="container__logo"></div>
    <div class="container__text">
      <InfiniteSlidingText
        :texts="['Salut ! Je suis Thomas, freelance en Front-End Développeur.']"
      />
    </div>

    <div class="container__links">
      <HeaderLink
        v-for="(property, index) in links"
        :key="index"
        :properties="property"
      />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  gap: 10px;

  &__text {
    flex: 1;
  }

  &__links {
    display: flex;
    gap: 10px;
  }

  &__logo {
    width: 75px;
    // height: 100%;

    background-color: gray;
  }
}
</style>
