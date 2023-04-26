<script setup lang="ts">
import BoxScrollable from "./UI/BoxScrollable.vue";
</script>

<template>
  <BoxScrollable :title="''">
    <div class="content-images"></div>
  </BoxScrollable>
</template>

<style scoped lang="scss">
.content-images {
  height: 100%;
  width: 100%;
  background-color: blue;
}
</style>
