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
    <TheAboutMe :about="params.about" />
    <div class="main__left">
      <p>Liste des projets</p>
    </div>
    <UIBaseSeparator :width="1" />
    <div class="main__right"><p>Liste des projets scrollable</p></div>
  </main>
</template>

<style scoped lang="scss">
.main {
  flex: 1;
  display: flex;
  position: relative;

  &__left {
    @include left;
    margin-inline: $bookmark-width calc($bookmark-width * -1);
  }

  &__right {
    @include right;
  }
}
</style>
