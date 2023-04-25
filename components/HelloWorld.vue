<script setup lang="ts">
const count = ref(1);

watch(count, () => {
  console.log("oui");
  console.log("a peu pr-s");
});
</script>

<template>
  <button @click="count += 1">{{ count }}</button>
</template>

<style scoped lang="scss">
button {
  & {
    color: red;
  }
}
</style>
