<script setup lang="ts">
const { client } = usePrismic();

// On GET les informations de la page
const { data: website } = await useAsyncData(() =>
  client.getSingle("legal_notices")
);
if (!website.value) throw new Error("Prismic document could not be accessed");
</script>

<template>
  <h1>Legal Notices</h1>

  <h2>Company Information</h2>
  <p>Last name: {{ website?.data["me-last-name"] ?? "Unknown" }}</p>
  <p>First name: {{ website?.data["me-first-name"] ?? "Unknown" }}</p>
  <p>Adress: {{ website?.data["me-address"] ?? "Unknown" }}</p>
  <p>Status: Entrepreneur individuel (EI)</p>
  <p>Email: {{ website?.data["me-email"] ?? "Unknown" }}</p>
  <p>Phone: {{ website?.data["me-phone-number"] ?? "Unknown" }}</p>

  <template v-if="website?.data['me-tva-number'] != null">
    <h2>VAT Identification Number:</h2>
    <p>{{ website.data["me-tva-number"] }}</p>
  </template>

  <h2>Website Host:</h2>
  <p>Host name: {{ website?.data["host-name"] ?? "Unknown" }}</p>
  <p>Host address: {{ website?.data["host-address"] ?? "Unknown" }}</p>
  <p></p>
  <p>Host phone: {{ website?.data["host-phone-number"] ?? "Unknown" }}</p>
</template>
