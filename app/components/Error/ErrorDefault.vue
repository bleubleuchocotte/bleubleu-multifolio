<script setup lang="ts">
type ComponentProps = {
  code: number;
};

const props = defineProps<ComponentProps>();

useSeoMeta({
  title: `${props.code} Error`,
});

const safeRoute = "/";

const onClick: () => void = async () => {
  await clearError({
    redirect: safeRoute,
  });
};
</script>

<template>
  <main class="relative flex h-full overflow-hidden">
    <h1
      class="glitch text-text relative m-auto text-[45vw] leading-[0.9] font-black -skew-x-30"
      :data-text="code"
    >
      {{ code }}
    </h1>

    <UIBaseLinkHome @on-click="onClick">
      {{ $t("page.error.text") }}
    </UIBaseLinkHome>
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
