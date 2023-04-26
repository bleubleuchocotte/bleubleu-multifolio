<template>
  <main>
    <ProjectList
      style="grid-area: 1 / 1 / 3 / 2; border-right: 1px solid black"
    />
    <ProjectAbout style="grid-area: 1 / 2 / 3 / 3" />
    <ServicesList
      style="
        grid-area: 1 / 3 / 4 / 4;
        border: 1px solid black;
        border-top: none;
      "
    />

    <ProjectImages style="grid-area: 3 / 1 / 6 / 3" />
    <AboutMe
      style="
        grid-area: 4 / 3 / 6 / 4;
        border: 1px solid black;
        border-top: none;
      "
    />
  </main>
</template>

<style scoped lang="scss">
main {
  flex: 1;
  height: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  border: 1px solid black;
  border-bottom: none;
  border-right: none;
}
</style>
