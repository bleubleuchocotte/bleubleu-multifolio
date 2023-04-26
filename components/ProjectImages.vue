<script setup lang="ts">
import BoxScrollable from "./UI/BoxScrollable.vue";
import { ProjectType } from "~/type/types";

defineProps({
  project: {
    type: Object as PropType<ProjectType>,
    required: true,
  },
});

function updateBox(arg: any) {
  if (arg.direction === 1) {
    // On scroll vers le bas
    isBoxHidden.value = true;
  } else if (arg.targetScroll === 0) {
    // On scroll vers le haut et on atteint le début du scroll
    isBoxHidden.value = false;
  }
}

const isBoxHidden = ref<boolean>(false);
</script>

<template>
  <div class="container">
    <BoxScrollable
      :title="''"
      :has-to-emit="true"
      class="pb-0"
      @scroll="updateBox"
    >
      <img
        v-for="(image, index) in project.images"
        :key="index"
        :src="image.url"
        alt=""
      />
    </BoxScrollable>

    <div class="help" :class="{ 'hide-box': isBoxHidden }">
      <p>
        Don't forget to scroll <i><IconArrowDown /></i>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  position: relative;
  overflow: hidden;
}
.pb-0 {
  padding-bottom: 0;
}
.help {
  position: absolute;
  z-index: 1;
  bottom: 0;

  width: 100%;

  transition: all ease-out 0.4s;

  &.hide-box {
    opacity: 0;
    transform: translateY(100%);
  }

  p {
    display: flex;
    gap: 15px;
    width: fit-content;

    text-align: center;
    text-transform: uppercase;
    color: $background-color;

    padding: 10px;
    margin: 0 auto;

    border-radius: 12px 12px 0 0;
    background-color: $text-color;
  }
}
img {
  border-radius: 12px;
  width: 100%;
}
</style>
