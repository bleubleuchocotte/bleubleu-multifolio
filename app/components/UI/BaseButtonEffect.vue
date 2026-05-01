<template>
  <span class="button-effect relative block h-full w-full">
    <div class="pointer-events-none absolute top-0 z-1 h-full w-full">
      <div
        class="bg-accent button-effect__text-bg-top relative h-1/2 w-full overflow-hidden transition-transform duration-300 ease-out"
      >
        <span
          class="absolute bottom-0 left-0 w-full translate-y-1/2 text-center"
          ><slot
        /></span>
      </div>
      <div
        class="bg-accent button-effect__text-bg-bottom relative h-1/2 w-full overflow-hidden transition-transform duration-300 ease-out"
      >
        <span class="absolute top-0 left-0 w-full -translate-y-1/2 text-center"
          ><slot
        /></span>
      </div>
    </div>

    <div
      class="bg-text-accent text-accent pointer-events-none absolute top-0 left-0 flex h-full w-full items-center justify-center"
    >
      <span>⏎</span>
    </div>
  </span>
</template>

<style scoped>
.button-effect:hover .button-effect__text-bg-top {
  transform: translate3d(0, -100%, 0);
}
.button-effect:hover .button-effect__text-bg-bottom {
  transform: translate3d(0, 100%, 0);
}
</style>
