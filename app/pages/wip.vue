<script setup lang="ts">
definePageMeta({
  layout: "404",
});

useSeoMeta({
  title: "Work In Progress",
});
</script>

<template>
  <main class="relative flex h-full">
    <h1
      class="glitch text-text relative m-auto text-[10vw] leading-[0.9] font-black -skew-x-30"
      data-text="Work In Progress"
    >
      Work In Progress
    </h1>
  </main>
</template>

<style scoped>
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  color: var(--text-color);
  background: var(--background-color);
  overflow: hidden;
  clip: rect(0, 900px, 0, 0);
  height: 100%;
}
.glitch::after {
  left: 5px;
  text-shadow: -10px 0 var(--accent-color);
  animation: noise-anim 2s infinite linear alternate-reverse;
}
.glitch::before {
  left: -5px;
  text-shadow: 10px 0 var(--border-color);
  animation: noise-anim-2 2s infinite linear alternate-reverse;
}
</style>
