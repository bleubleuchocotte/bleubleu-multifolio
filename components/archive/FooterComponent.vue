<script setup lang="ts">
import LinkComponent from "./UI/LinkComponent.vue";
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
    <LinkComponent
      v-for="(link, index) in footer.links"
      :key="index"
      :link="link"
    />

    <p>Mentions légales</p>
    <p>{{ new Date().getFullYear() }}</p>
  </footer>
</template>

<style scoped lang="scss">
footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
