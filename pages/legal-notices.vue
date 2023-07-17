<script setup lang="ts">
const { client } = usePrismic();

// On GET les informations de la page
const { data: website } = await useAsyncData(() =>
  client.getSingle("legal_notices")
);
if (!website.value) throw new Error("Prismic document could not be accessed");

console.log(website);
</script>

<template>
  <div>Test</div>
</template>
