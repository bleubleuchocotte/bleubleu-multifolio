<template>
  <main>
    <div class="left">
      <ProjectsList />
      <div class="content-images"></div>
    </div>
    <div class="right"></div>
  </main>
</template>

<style scoped lang="scss">
main {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
}
.left {
  display: flex;
  flex-direction: column;
  flex: 1;

  .content-images {
    height: 100%;
    width: 100%;
    background-color: blue;
  }
}

.right {
  height: 100%;
  width: 50%;
  background-color: green;
}
</style>
