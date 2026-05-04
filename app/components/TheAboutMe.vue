<script lang="ts" setup>
import type { WebsiteDocumentData } from "~~/prismicio-types";

export type TheAboutMeProps = Pick<
  WebsiteDocumentData,
  "about-image" | "description" | "email" | "links" | "first-name" | "last-name"
>;
const props = defineProps<{ data: TheAboutMeProps }>();

const isOpen = ref(false);
const target = useTemplateRef("target");

useEventListener("keydown", callback);

function callback(e: KeyboardEvent) {
  if (isOpen.value === true && e.key === "Escape") {
    isOpen.value = false;
  }
}

onClickOutside(target, () => {
  if (isOpen.value === true) {
    isOpen.value = false;
  }
});
</script>

<template>
  <section
    ref="target"
    class="invert-selection bg-accent text-text-accent rounded-fluid-r about-section absolute left-0 z-10 flex h-full w-[30vw] transition-transform duration-300 ease-out translate-x-[calc(70px-30vw)]"
    :class="{ 'translate-x-0!': isOpen }"
  >
    <UIBaseLenis class="border-text-accent p-fluid w-full border-r">
      <UIBasePicture
        :image="props.data['about-image']"
        class="border-text-accent rounded-fluid mb-fluid aspect-video overflow-hidden border"
      />

      <div class="text-fluid-h2 mb-fluid">
        <PrismicRichText :field="props.data.description" />
      </div>

      <UIBaseButtonContact
        :email="props.data.email"
        class="about-section__contact-button border-text-accent text-fluid-h2 mb-fluid z-0 h-[10%] w-full border"
      >
        {{ $t("contact.text") }}
      </UIBaseButtonContact>
      <ul>
        <li
          class="border-text-accent about-section__link not-last:border-b py-[calc(var(--spacing-fluid)/4)]"
        >
          <NuxtLink
            to="https://bleubleu.studio"
            target="_blank"
            class="flex items-center justify-between gap-[calc(var(--spacing-fluid)/2)]"
          >
            <span> Bleubleu.studio </span>
            <IconBaseArrowLink
              :colors="{
                background: 'var(--accent-color)',
                arrow: 'var(--text-accent-color)',
              }"
            />
          </NuxtLink>
        </li>
        <li
          v-for="link in props.data.links"
          :key="String(link.name)"
          class="border-text-accent about-section__link not-last:border-b py-[calc(var(--spacing-fluid)/4)]"
        >
          <PrismicLink
            :field="link.link"
            class="flex items-center justify-between gap-[calc(var(--spacing-fluid)/2)]"
          >
            <span>
              {{ link.name }}
            </span>
            <IconBaseArrowLink
              :colors="{
                background: 'var(--accent-color)',
                arrow: 'var(--text-accent-color)',
              }"
            />
          </PrismicLink>
        </li>
      </ul>
    </UIBaseLenis>
    <button
      type="button"
      class="flex min-w-17.5 justify-between [writing-mode:vertical-rl] rotate-180 *:pointer-events-none p-[calc(var(--spacing-fluid)/3)]"
      :aria-expanded="isOpen"
      :aria-label="`${props.data['first-name']} ${props.data['last-name']} — about me`"
      :data-icon="isOpen ? 'IconBaseTowardReverse' : 'IconBaseToward'"
      @click="isOpen = !isOpen"
    >
      <span class="text-fluid-h1 self-center uppercase">
        {{ props.data["first-name"] }} {{ props.data["last-name"] }}
      </span>
      <span
        class="flex items-center justify-center text-right gap-[calc(var(--spacing-fluid)/3)]"
      >
        <span class="flex flex-col">
          <span>{{ $t("misc.about-me-1") }}</span>
          <span>{{ $t("misc.about-me-2") }}</span>
        </span>
        <span
          class="bg-text-accent text-accent flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 ease-out"
          :class="isOpen ? 'rotate-0' : 'rotate-180'"
        >
          <IconBaseToward />
        </span>
      </span>
    </button>
  </section>
</template>

<style scoped>
/* Pierce into BaseButtonContact's reveal layer to drop the rounded border. */
.about-section__contact-button :deep(.button) {
  border-radius: 0;
}
.about-section__contact-button :deep(.button > div:last-of-type) {
  border-radius: 0;
  border: none;
}

.about-section__link a span {
  transition: transform 0.2s ease-out;
}
.about-section__link a:hover span {
  transform: translate3d(5px, 0, 0);
}
</style>
