<template>
  <div class="glitch" data-text="404">404</div>
</template>

<style scoped lang="scss">
.glitch {
  color: var(--text-color);
  font-size: 90vh;
  // position: relative;
  // line-height: 1;
  // margin: auto;
  // font-weight: 900;
  // transform: skewx(-30deg);
  // letter-spacing: -12vw;
  // width: 100vw;
  // height: 100vh;
}
// @keyframes noise-anim {
//   $steps: 20;
//   @for $i from 0 through $steps {
//     #{percentage($i * calc(1/$steps))} {
//       clip: rect(random(500) + px, 9999px, random(500) + px, 0);
//     }
//   }
// }
// .glitch:after {
//   content: attr(data-text);
//   position: absolute;
//   left: 20px;
//   text-shadow: -1px 0 var(--accent-color);
//   top: -40vh;
//   color: var(--text-color);
//   background: var(--background-color);
//   overflow: hidden;
//   clip: rect(0, 9000px, 0, 0);
//   animation: noise-anim 2s infinite linear alternate-reverse;
//   height: 50vh;
//   width: 100vw;
// }

// @keyframes noise-anim-2 {
//   $steps: 20;
//   @for $i from 0 through $steps {
//     #{percentage($i * calc(1/$steps))} {
//       clip: rect(random(500) + px, 9999px, random(500) + px, 0);
//     }
//   }
// }
// .glitch:before {
//   content: attr(data-text);
//   position: absolute;
//   left: -20px;
//   text-shadow: 1px 0 var(--text-color);
//   top: -40vh;
//   color: var(--text-color);
//   background: var(--background-color);
//   overflow: hidden;
//   clip: rect(0, 9000px, 0, 0);
//   animation: noise-anim-2 3s infinite linear alternate-reverse;
//   height: 50vh;
//   width: 100vw;
// }
</style>
