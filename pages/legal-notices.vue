<script setup lang="ts">
import { Settings } from "~/type/types";

const { client } = usePrismic();

// On GET le document global pour avoir accès aux settings
const { data: websiteSettings } = await useAsyncData(() =>
  client.getSingle("website")
);
if (!websiteSettings.value)
  throw new Error("Prismic document could not be accessed");

const settings = ref<Settings>({
  isDarkMode: websiteSettings.value.data["dark-mode"] ?? false,
  accentColor: websiteSettings.value.data["accent-color"] ?? "#000000",
  firstName: websiteSettings.value.data["first-name"] ?? "John",
  lastName: websiteSettings.value.data["last-name"] ?? "Doe",
  email: websiteSettings.value.data.email ?? "john.doe@foo.com",
});

const cssVariables = [
  "--accent-color: " + settings.value.accentColor,
  "--accent-color-80: " + settings.value.accentColor + "80",
  "--text-accent-color: #131313",
  "--text-color: " + (settings.value.isDarkMode ? "#ffffff" : "#131313"),
  "--background-color: " + (settings.value.isDarkMode ? "#131313" : "#ffffff"),
  "--border-color:" + (settings.value.isDarkMode ? "#9d9d9d" : "#131313"),
];

useHead({
  style: [
    `:root{${cssVariables.join(";")}}`,
    "body{color: var(--text-color); background-color: var(--background-color);font-family: 'Manrope';overflow: hidden;}",
  ],
});

// On GET les informations de la page
const { data: website } = await useAsyncData(() =>
  client.getSingle("legal_notices")
);
if (!website.value) throw new Error("Prismic document could not be accessed");

console.log(website);
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
