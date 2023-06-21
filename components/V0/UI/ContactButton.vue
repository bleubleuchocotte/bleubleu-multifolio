<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

const mail = "thomas.auffroy@gmail.com";

function copyToClipboard() {
  copy(mail);
  alert("copier");
}

const { copy } = useClipboard();
</script>

<template>
  <button @click="copyToClipboard">contact me</button>
</template>

<style scoped lang="scss">
button {
  margin: 10px;
  padding: 10px;
  border-radius: 12px;
  writing-mode: sideways-lr;
  text-align: center;

  cursor: pointer;

  text-transform: uppercase;
  font-weight: bold;
  background-color: $accent-color;
}
</style>
