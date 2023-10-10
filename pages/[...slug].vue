<template>
  <div class="container">
    <div class="glitch" data-text="404">404</div>
    <UIBaseButtonHome class="button">Let's go home</UIBaseButtonHome>
  </div>
</template>

<style scoped lang="scss">
.container {
  position: relative;
  display: flex;
}
.button {
  height: 7vw;
  width: 20vw;
  z-index: 0;
  border: 1px solid var(--background-color);
  position: absolute;
  top: calc(24vw - 7vw);
  left: calc(50vw - 10vw);
  @include font("h2");

  &:deep(.button__reveal) {
    border-radius: 0;
    border: unset;
  }
}
.glitch {
  color: var(--text-color);
  font-size: 45vw;
  position: relative;
  line-height: 0.9;
  margin: auto;
  font-weight: 900;
  transform: skewX(-30deg);
  z-index: -5;
}
@keyframes noise-anim {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i * calc(1/$steps))} {
      clip: rect(random(800) + px, 9999px, random(800) + px, 0);
    }
  }
}
.glitch:after {
  content: attr(data-text);
  top: 0;
  left: 5px;
  position: absolute;
  text-shadow: -10px 0 var(--accent-color);
  color: var(--text-color);
  background: var(--background-color);
  overflow: hidden;
  clip: rect(0, 900px, 0, 0);
  animation: noise-anim 2s infinite linear alternate-reverse;
  height: 100vh;
}

@keyframes noise-anim-2 {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i * calc(1/$steps))} {
      clip: rect(random(800) + px, 9999px, random(800) + px, 0);
    }
  }
}
.glitch:before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: -5px;
  text-shadow: 10px 0 var(--accent-color);
  color: var(--text-color);
  background: var(--background-color);
  overflow: hidden;
  clip: rect(0, 900px, 0, 0);
  animation: noise-anim-2 3s infinite linear alternate-reverse;
  height: 100vh;
}
</style>
