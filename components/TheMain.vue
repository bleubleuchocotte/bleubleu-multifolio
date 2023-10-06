<script setup lang="ts">
import { ImageField } from "@prismicio/types";
import { Main, Project } from "@/type/types";
import { emailKey, endingCardImageKey } from "@/type/keys";

defineProps({
  params: {
    type: Object as PropType<Main>,
    required: true,
  },
});

const callback = (id: string, hasToScroll: boolean) => {
  idToProject.value = id;
  if (hasToScroll) scrollToProjectId.value = `[data-project-h-id='${id}']`;
  else scrollToProjectId.value = undefined;
};

const scrollToProjectId = ref<string>();
const idToProject = ref<string>();

const projectInGallery = ref<Project | null>(null);

// Permet de détecter la taille de l'écran
const isDeviceMobile = useMediaQuery("(max-width: 1025px)");

const email = inject<string>(emailKey, "email not provided");
const endingCardImage = inject<ImageField>(endingCardImageKey, {});
</script>

<template>
  <main class="main">
    <TheAboutMe :about="params.about" />
    <div class="main__left">
      <section class="main__left-container">
        <p>My projects</p>
        <UIBaseLenis :orientation="'vertical'">
          <ProjectsListVertical
            :projects="params.projects"
            :id-to-active="idToProject"
            @target="
              (id: string) => (scrollToProjectId = `[data-project-h-id='${id}']`)
            "
          />
        </UIBaseLenis>
      </section>
    </div>
    <UIBaseSeparator :width="1" />
    <UIBaseLenis
      :orientation="isDeviceMobile ? 'vertical' : 'horizontal'"
      class="main__right"
      :target="scrollToProjectId"
    >
      <ProjectsListHorizontal
        :projects="params.projects"
        @target="(id: string) => callback(id, false)"
        @target-then-scroll="(id: string) => callback(id, true)"
        @gallery="(project: Project) => (projectInGallery = project)"
        @go-to-end="() => (scrollToProjectId = `end`)"
      />

      <EndingCard
        :email="email"
        :ending-card-image="endingCardImage"
        @go-to-start="
          () =>
            (scrollToProjectId = `[data-project-h-id='${params.projects[0].id}']`)
        "
      />
    </UIBaseLenis>

    <Transition name="slide-fade">
      <TheGallery
        v-if="projectInGallery != null"
        :project="projectInGallery"
        @close="projectInGallery = null"
      />
    </Transition>
  </main>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  position: relative;
  overflow: hidden;

  @media #{$desktop-down} {
    flex-direction: column;
    @include gap();
  }

  &__left {
    @include left;
    @media #{$desktop-down} {
      height: 20vh;
    }

    &-container {
      height: 100%;
      @media #{$desktop} {
        padding-left: $bookmark-width;
      }
      @include prop("padding-bottom");
    }
  }

  &__right {
    @include right;
    @include prop("padding-inline", 0);
    @include prop("margin-right");
    @include prop("padding-right");
    position: relative;
    display: flex;

    @media #{$desktop-down} {
      flex-direction: column;
      @include gap();
    }

    &::before {
      content: "";
      position: fixed;
      height: 100%;
      background: linear-gradient(
        90deg,
        hsla(0, 0%, 100%, 0),
        var(--background-color)
      );
      z-index: 1;
      pointer-events: none;
      right: 0;
      width: calc($gutter + $gutter / 2);

      @media #{$desktop-down} {
        content: none;
      }
    }
  }
}
</style>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
