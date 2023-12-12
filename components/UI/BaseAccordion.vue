<script setup lang="ts">
import type { Project } from "@/type/types";

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
defineExpose({ isOpen });

const accordionId = `accordion-${Math.random().toString(36).substring(2, 9)}`;

const toggleAccordion = useThrottleFn(() => {
	isOpen.value = !isOpen.value;
}, 100);

const target = ref<HTMLDivElement>();
const height = ref(0);

onMounted(() => {
	// Pas forcément néssaire vu qu'à chaque clic, onUpdated est call à cause de la varibale isOpen
	if (target.value) { height.value = target.value.scrollHeight; }
});

onUpdated(() => {
	if (target.value) { height.value = target.value.scrollHeight; }
});
</script>

<template>
	<div class="accordion" :style="`--accordion-height: ${height}px`">
		<button
			type="button"
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
			<slot />
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
