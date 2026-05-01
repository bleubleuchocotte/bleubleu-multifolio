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

const containers = ref<Array<HTMLElement>>([]);
const projectActive = ref<HTMLElement>();

onMounted(() => {
  if (containers.value.length > 0) {
    projectActive.value = containers.value[0];

    if (projectActive.value) {
      projectActive.value.classList.add("active");
    }
  }
});

function callback(e: MouseEvent | KeyboardEvent, id: string) {
  // Si un projet est déjà actif, on remove le style
  if (projectActive.value) {
    projectActive.value.classList.remove("active");
  }

  // On attribut la nouvelle valeur
  projectActive.value = containers.value.find((el) => el === e.target);
  if (!projectActive.value) {
    return;
  }
  projectActive.value.classList.add("active");

  (e.target as HTMLElement).blur();
  emit("target", id);
}

watch(
  () => props.idToActive,
  () => {
    // Logique pour activer un projet depuis le scroll des projets horizontaux
    if (projectActive.value) {
      projectActive.value.classList.remove("active");
    }

    projectActive.value = containers.value.find(
      (el) =>
        el.attributes.getNamedItem("data-project-v-id")?.nodeValue ===
        props.idToActive,
    );
    if (!projectActive.value) {
      return;
    }
    projectActive.value.classList.add("active");
  },
);
</script>

<template>
  <ul class="h-full pt-fluid max-lg:pt-0! list-vertical">
    <li
      v-for="(project, i) in projects"
      ref="containers"
      :key="project.id"
      :data-project-v-id="project.id"
      class="list-vertical__element border-border flex cursor-pointer justify-between border-b transition-all duration-200 ease-[cubic-bezier(0.63,0,0.78,0.99)] gap-[calc(var(--spacing-fluid)/2)] py-[calc(var(--spacing-fluid)/2)] hover:text-accent hover:border-current focus-within:text-accent focus-within:border-current"
      tabindex="0"
      @click="(e) => callback(e, project.id)"
      @keypress.enter="(e) => callback(e, project.id)"
    >
      <h2
        class="text-fluid-h3 element-name pointer-events-none flex self-end whitespace-nowrap uppercase before:bg-accent before:content-[''] before:h-px before:w-0 before:self-center before:transition-all before:duration-200 before:ease-[cubic-bezier(0.63,0,0.78,0.99)]"
      >
        <UIBaseIndex :index="i + 1" />{{ project.data.title }}
      </h2>
      <div class="pointer-events-none text-right">
        <p class="text-fluid-small">{{ project.data.date?.slice(0, 4) }}</p>
        <!-- <p>{{ project.skills[0]?.skill }}</p> -->
      </div>
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
