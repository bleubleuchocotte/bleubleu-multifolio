<script setup lang="ts">
import BoxScrollable from "./UI/BoxScrollable.vue";
const services = ref([
  "Strategy",
  "Visual identity",
  "web design",
  "art direction",
  "branding",
  "motion design",
]);
</script>

<template>
  <BoxScrollable :title="'Services'" class="bg">
    <div class="about-list__flex">
      <span v-for="(service, index) in services" :key="index">
        {{ service }}
      </span>
    </div>
  </BoxScrollable>
</template>

<style scoped lang="scss">
.bg {
  background: linear-gradient(
    180deg,
    #000000 4.2%,
    #ff4fd8 49.82%,
    #000000 96.59%
  );

  background-clip: text;
}

.about-list {
  &__flex {
    display: flex;
    flex-direction: column;

    span {
      text-transform: uppercase;
      line-height: 42px;
      font-size: 28px;
      color: transparent;
    }
  }
}
</style>
