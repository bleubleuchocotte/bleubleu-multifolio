<script setup lang="ts">
import type { ImageField, KeyTextField } from "@prismicio/client";

type ComponentProps = {
  email: KeyTextField;
  endingCardImage: ImageField;
};

defineProps<ComponentProps>();

defineEmits<{
  goToStart: [];
}>();
</script>

<template>
  <article
    class="ending-card invert-selection -mr-(--spacing-fluid) h-full min-w-[40vw]"
  >
    <div
      class="bg-accent border-accent text-text-accent rounded-fluid gap-fluid flex h-full flex-col justify-center border-0 text-center p-[calc(var(--spacing-fluid)/2)]"
    >
      <p
        class="text-left pt-[calc(var(--spacing-fluid)/4)] pl-[calc(var(--spacing-fluid)/2)]"
      >
        {{ $t("project.ending-card.text-1") }}
        <br />
        {{ $t("project.ending-card.text-2") }}
      </p>

      <UIBasePicture
        :image="endingCardImage"
        class="m-auto h-auto max-w-[60%]"
      />

      <ProjectEndingCardButtonStart @click="$emit('goToStart')" />

      <UIBaseButtonContact
        :email="email"
        class="ending-card__contact-button border-text-accent text-fluid-h2 z-0 h-[18%] w-full border"
      >
        {{ $t("contact.text") }}
      </UIBaseButtonContact>
    </div>
  </article>
</template>

<style scoped>
/* Pierce into BaseButtonContact's reveal layer to drop the rounded border. */
.ending-card__contact-button :deep(.button) {
  border-radius: 0;
}
.ending-card__contact-button :deep(.button > div:last-of-type) {
  border-radius: 0;
  border: none;
}
</style>
