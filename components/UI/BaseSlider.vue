<script setup lang="ts">
import { useEventListener, useMouseInElement, useVModel } from "@vueuse/core";

const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  modelValue: { type: Number, required: true },
});

const emit = defineEmits(["update:modelValue"]);

const scrubber = ref();
const scrubbing = ref(false);
const pendingValue = ref(0);
const dragUpdating = ref(false);

useEventListener("mouseup", () => (scrubbing.value = false));

const dragBallUpdate = () =>
  -960 * Math.pow(value.value / props.max - 0.5, 7) - 7.5;

const value = useVModel(props, "modelValue", emit);
const { elementX, elementWidth } = useMouseInElement(scrubber);

watch([scrubbing, elementX], () => {
  const progress = Math.max(
    0,
    Math.min(1, elementX.value / elementWidth.value)
  );
  pendingValue.value = progress * props.max;
  if (scrubbing.value) value.value = pendingValue.value;
});
</script>

<template>
  <div
    ref="scrubber"
    class="scrubber-container"
    @mousedown="scrubbing = true"
    @mouseenter="dragUpdating = true"
    @mouseleave="dragUpdating = false"
  >
    <div class="scrubber-container__bar">
      <div
        class="scrubber-container__bar-progress"
        :style="{
          transform: `translate3d(${(value / max) * 100 - 100}%, 0, 0)`,
        }"
      >
        <div
          class="scrubber-container__bar-progress-drag"
          :style="{
            transform: `translate3d(${
              dragUpdating ? dragBallUpdate() : -7.5
            }px, 0, 0)`,
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scrubber-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-x: clip;

  &:hover {
    cursor: pointer;
    .scrubber-container__bar-progress {
      background-color: var(--accent-color);
    }
    .scrubber-container__bar-progress-drag {
      display: block;
    }
  }
  &__bar {
    background-color: var(--border-color);
    position: relative;
    height: 2px;

    &-progress {
      background-color: var(--text-color);
      height: 100%;
      position: absolute;
      width: 100%;
      display: flex;
      align-items: center;

      &-drag {
        display: none;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        background-color: var(--text-color);
        z-index: 15;
        position: absolute;
        left: 100%;
      }
    }
  }
}
</style>
