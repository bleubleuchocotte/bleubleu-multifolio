<script setup lang="ts">
import { Main } from "@/type/types";
defineProps({
  params: {
    type: Object as PropType<Main>,
    required: true,
  },
});
</script>

<template>
  <main class="main">
    <div class="main__left">
      <TheAboutMe :about="params.about" />
      <div>Liste des projets</div>
    </div>
    <UIBaseSeparator :width="1" />
    <div class="main__right">Liste des projets scrollable</div>
  </main>
</template>

<style scoped lang="scss">
.main {
  flex: 1;
  display: flex;

  &__left {
    @include left;
  }

  &__right {
    @include right;
  }
}
</style>
