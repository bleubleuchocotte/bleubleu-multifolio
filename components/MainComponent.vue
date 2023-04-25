<template>
  <main>
    <ProjectsList style="grid-area: 1 / 1 / 3 / 2" />
    <AboutProject style="grid-area: 1 / 2 / 3 / 3" />
    <ServicesList style="grid-area: 1 / 3 / 4 / 4" />

    <div class="content-images" style="grid-area: 3 / 1 / 6 / 3"></div>

    <div class="me" style="grid-area: 4 / 3 / 6 / 4"></div>
  </main>
</template>

<style scoped lang="scss">
main {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.services {
  height: 100%;
  width: 100%;
  background-color: green;
}

.content-images {
  height: 100%;
  width: 100%;
  background-color: blue;
}
.me {
  height: 100%;
  width: 100%;
  background-color: pink;
}
</style>
