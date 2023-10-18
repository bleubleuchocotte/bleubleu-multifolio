<template>
  <div class="image-skeleton"></div>
</template>

<style scoped lang="scss">
.image-skeleton {
  width: 100%;
  aspect-ratio: 16/9;

  background: linear-gradient(
    270deg,
    var(--text-color),
    var(--text-color),
    var(--text-color),
    var(--accent-color),
    var(--text-color),
    var(--text-color),
    var(--text-color)
  );
  background-size: 1600% 1600%;

  animation: skeleton 6s ease infinite;
}

@keyframes skeleton {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
