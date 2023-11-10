<script setup lang="ts">
import IconArrowRight from "@/components/Icon/BaseArrowRight.vue";
import IconArrowLeft from "@/components/Icon/BaseArrowLeft.vue";
import IconFullscreen from "@/components/Icon/BaseFullscreen.vue";
import IconBaseArrowRightUp from "@/components/Icon/BaseArrowRightUp.vue";
import { CursorIconType } from "type/types";

const props = defineProps({
  icon: {
    type: String as PropType<CursorIconType>,
    required: false,
    default: null,
  },
});

const icon = computed(() => {
  console.log(props.icon);

  switch (props.icon) {
    case "IconArrowLeft":
      return IconArrowLeft;
    case "IconArrowRight":
      return IconArrowRight;
    case "IconFullscreen":
      return IconFullscreen;
    case "IconArrowRightUp":
      return IconBaseArrowRightUp;

    default:
      return null;
  }
});
</script>

<template>
  <component :is="icon" v-if="icon" class="cursor-icon" />
</template>

<style scoped lang="scss">
.cursor-icon {
  color: var(--background-color);
  width: 50%;
}
</style>
