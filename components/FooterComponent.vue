<script setup lang="ts">
import { FooterPrismicType } from "~/type/types";

defineProps({
  footer: {
    type: Object as PropType<FooterPrismicType>,
    required: true,
  },
});
</script>

<template>
  <footer>
    <PrismicRichText :field="footer.text" />
    <PrismicLink
      v-for="(link, index) in footer.links"
      :key="index"
      :field="link.link"
    >
      {{ link.name[0]?.text }}
    </PrismicLink>
    <p>Mentions légales</p>
    <p>{{ new Date().getFullYear() }}</p>
  </footer>
</template>

<style scoped lang="scss">
a {
  padding: 10px 32px;
  border: 1px solid $border-color;
  border-radius: 12px;
  background-color: $cta-background-color;

  display: flex;
  align-items: center;
  justify-content: center;
}
footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
