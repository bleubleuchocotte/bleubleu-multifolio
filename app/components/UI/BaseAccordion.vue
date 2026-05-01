<script setup lang="ts">
type ComponentProps = {
  /**
   * Optional key kept for API compatibility with previous usages. The
   * accordion no longer needs a globally unique state key — Vue 3.5
   * `useId()` produces an SSR-stable id per instance.
   */
  stateKey?: string;
};

defineProps<ComponentProps>();

const isOpen = ref(false);
defineExpose({ isOpen, updateHeight });

const headerId = useId();
const contentId = useId();

const toggleAccordion = useThrottleFn(() => {
  updateHeight();
  isOpen.value = !isOpen.value;
}, 100);

const isButtonFocused = ref(false);
const target = useTemplateRef<HTMLDivElement>("target");
const height = ref(0);

function updateHeight() {
  if (target.value) {
    height.value = target.value.scrollHeight;
  }
}
</script>

<template>
  <div :style="`--accordion-height: ${height}px`">
    <button
      :id="headerId"
      type="button"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-controls="contentId"
      class="w-full cursor-pointer appearance-none border-0 bg-transparent p-0"
      @click="toggleAccordion"
      @focus="isButtonFocused = true"
      @blur="isButtonFocused = false"
    >
      <slot name="title" :focus="isButtonFocused || isOpen" />
    </button>
    <div
      :id="contentId"
      ref="target"
      role="region"
      :aria-labelledby="headerId"
      :aria-hidden="isOpen ? 'false' : 'true'"
      class="max-h-0 overflow-hidden transition-all duration-200 ease-out aria-[hidden=false]:max-h-(--accordion-height)"
    >
      <slot name="content" />
    </div>
  </div>
</template>
