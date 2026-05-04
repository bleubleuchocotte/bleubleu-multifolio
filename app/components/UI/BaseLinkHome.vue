<template>
  <NuxtLink
    to="/"
    class="text-text-accent text-fluid-h2 max-sm:text-fluid-cta hover:border-accent absolute top-1/2 left-1/2 aspect-3 w-[20vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden border transition-[border-color] duration-300 ease-out rounded-[calc(var(--radius-fluid)/2)] max-sm:w-[25vw]"
  >
    <UIBaseButtonEffect>
      <slot />
    </UIBaseButtonEffect>
  </NuxtLink>
</template>
