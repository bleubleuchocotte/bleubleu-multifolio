<script setup lang="ts">
import type { ProjetDocument } from "~~/prismicio-types";

type ComponentProps = {
  idToActive?: string;
  projects: ProjetDocument[];
};

const props = defineProps<ComponentProps>();

const emit = defineEmits<{
  target: [payload: string];
}>();

const activeId = ref<string>();

onMounted(() => {
  activeId.value = props.projects[0]?.id;
});

function callback(e: MouseEvent | KeyboardEvent, id: string) {
  activeId.value = id;
  (e.currentTarget as HTMLElement).blur();
  emit("target", id);
}

watch(
  () => props.idToActive,
  (id) => {
    if (id) {
      activeId.value = id;
    }
  },
);
</script>

<template>
  <ul class="h-full pt-fluid max-lg:pt-0! list-vertical">
    <li v-for="(project, i) in projects" :key="project.id">
      <button
        type="button"
        :data-project-v-id="project.id"
        class="list-vertical__element border-border flex w-full cursor-pointer justify-between border-b transition-all duration-200 ease-[cubic-bezier(0.63,0,0.78,0.99)] gap-[calc(var(--spacing-fluid)/2)] py-[calc(var(--spacing-fluid)/2)] hover:text-accent hover:border-current focus-visible:text-accent focus-visible:border-current text-left"
        :class="{ active: project.id === activeId }"
        :aria-pressed="project.id === activeId"
        @click="(e) => callback(e, project.id)"
      >
        <h2
          class="text-fluid-h3 element-name flex self-end whitespace-nowrap uppercase before:bg-accent before:content-[''] before:h-px before:w-0 before:self-center before:transition-all before:duration-200 before:ease-[cubic-bezier(0.63,0,0.78,0.99)]"
        >
          <UIBaseIndex :index="i + 1" />{{ project.data.title }}
        </h2>
        <div class="text-right">
          <p class="text-fluid-small">{{ project.data.date?.slice(0, 4) }}</p>
          <p>{{ project.data.skills[0]?.skill }}</p>
        </div>
      </button>
    </li>
  </ul>
</template>

<style scoped>
.list-vertical__element.active {
  color: var(--accent-color);
  border-bottom-color: currentColor;
}
.list-vertical__element.active .element-name::before {
  width: 10px;
  margin-right: 5px;
}
</style>
