<template>
  <div class="container-404">
    <p class="container-404__glitch" data-text="404">404</p>
    <UIBaseButtonHome class="container-404__button"
      >Let's go home</UIBaseButtonHome
    >
  </div>
</template>

<style scoped lang="scss">
.container-404 {
  position: relative;
  display: flex;
  overflow: hidden;

  &__glitch {
    color: var(--text-color);
    font-size: 45vw;
    position: relative;
    line-height: 0.9;
    margin: auto;
    font-weight: 900;
    transform: skewX(-30deg);

    &:before,
    &:after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      color: var(--text-color);
      background: var(--background-color);
      overflow: hidden;
      clip: rect(0, 900px, 0, 0);
      height: 100%;
    }

    &:after {
      left: 5px;
      text-shadow: -10px 0 var(--accent-color);
      animation: noise-anim 2s infinite linear alternate-reverse;
    }

    &:before {
      left: -5px;
      text-shadow: 10px 0 var(--border-color);
      animation: noise-anim-2 2s infinite linear alternate-reverse;
    }

    @keyframes noise-anim {
      $steps: 20;
      @for $i from 0 through $steps {
        #{percentage($i * calc(1/$steps))} {
          clip: rect(random(800) + px, 9999px, random(800) + px, 0);
        }
      }
    }

    @keyframes noise-anim-2 {
      $steps: 20;
      @for $i from 0 through $steps {
        #{percentage($i * calc(1/$steps))} {
          clip: rect(random(800) + px, 9999px, random(800) + px, 0);
        }
      }
    }
  }

  &__button {
    height: 7vw;
    width: 20vw;
    z-index: 5;
    border: 1px solid var(--background-color);
    position: absolute;
    top: calc(24vw - 7vw);
    left: calc(50vw - 10vw);
    @include font("h2");

    @media #{$mobile-down} {
      height: 10vw;
      width: 25vw;
      top: calc(24vw - 10vw);
      left: calc(50vw - 12.5vw);
      @include font("cta");
    }
  }
}
</style>
