<script setup lang="ts">
import { HeaderLinkType } from "type/types";

const links: HeaderLinkType[] = [
  { url: "https://bleubleu.studio", text: "BeluBelu Studio", target: "_blank" },
];
</script>

<template>
  <div class="container">
    <div class="logo"></div>
    <div>
      <InfiniteSlidingText
        :texts="['Salut ! Je suis Thomas, freelance en Front-End Développeur.']"
      />
    </div>

    <div>
      <HeaderLink
        v-for="(property, index) in links"
        :key="index"
        :properties="property"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
}
</style>
