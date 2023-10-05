<script setup lang="ts">
import { Project } from "type/types";

defineProps({
  project: {
    type: Object as PropType<Project>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
const isOpen = ref(false);
const accordionId = `accordion-${Math.random().toString(36).substring(2, 9)}`;

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
};

const target = ref<HTMLDivElement>();
const height = ref(0);

onMounted(() => {
  if (target.value) {
    height.value = target.value.scrollHeight;
  }
});
</script>

<template>
  <div class="accordion" :style="`--accordion-height: ${height}px`">
    <button
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-controls="accordionId"
      class="accordion__button"
      @click="toggleAccordion"
    >
      <UIBaseProjectListVerticalItem
        :project="project"
        :index="index"
        :active="isOpen"
      />
    </button>
    <div
      :id="accordionId"
      ref="target"
      role="region"
      :aria-hidden="isOpen ? 'false' : 'true'"
      class="accordion__content"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.accordion {
  &__button {
    width: 100%;
  }

  &__content {
    max-height: 0;
    overflow: hidden;

    transition: max-height 0.2s ease-in-out;

    &[aria-hidden="false"] {
      max-height: var(--accordion-height);
    }
  }
}
</style>
