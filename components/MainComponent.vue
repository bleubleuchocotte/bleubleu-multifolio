<template>
  <main>
    <div class="left">
      <ProjectsList />
    </div>
    <div class="right"></div>
  </main>
</template>

<style scoped lang="scss">
main {
  width: 100%;
  height: 100%;

  display: flex;
}
.left {
  height: 100%;
  width: 50%;
  // background-color: blue;
}

.right {
  height: 100%;
  width: 50%;
  background-color: green;
}
</style>
