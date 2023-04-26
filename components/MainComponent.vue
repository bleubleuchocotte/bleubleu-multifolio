<template>
  <main>
    <ProjectList class="project-lists" />
    <ProjectAbout class="project-about" />
    <ProjectImages class="project-images" />
    <ServicesList class="services-lists" />
    <AboutMe class="about-me" />
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

  border: 1px solid $border-color;
  border-bottom: none;
  border-right: none;
}

.project-lists {
  grid-area: 1 / 1 / 3 / 2;
  border-right: 1px solid $border-color;
}

.project-about {
  grid-area: 1 / 2 / 3 / 3;
}

.services-lists {
  grid-area: 1 / 3 / 4 / 4;
  border: 1px solid $border-color;
  border-top: none;
}

.project-images {
  grid-area: 3 / 1 / 6 / 3;
}

.about-me {
  grid-area: 4 / 3 / 6 / 4;
  border: 1px solid $border-color;
  border-top: none;
}
</style>
