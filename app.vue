<template>
  <div class="body">
    <HeaderComponent />
    <MainComponent />
    <FooterComponent />
  </div>
</template>

<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: column;

  gap: 10px;

  height: 100vh;
  width: 100vw;
  padding-inline: $body-padding-inline;
  padding-block: $body-padding-block;

  background-color: $background-color;
  color: $text-color;
}
</style>
