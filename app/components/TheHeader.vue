<script setup lang="ts">
import type { KeyTextField } from "@prismicio/client";

type ComponentProps = {
  email: KeyTextField;
  marqueeText: KeyTextField;
};

defineProps<ComponentProps>();

const Vue3Marquee = defineAsyncComponent(() =>
  import("vue3-marquee").then((m) => m.Vue3Marquee),
);
</script>

<template>
  <header class="gap-fluid m-fluid flex">
    <div
      class="border-border w-full border p-0 transition-all duration-200 ease-out rounded-[calc(var(--radius-fluid)/2)]"
    >
      <ClientOnly>
        <Vue3Marquee
          direction="normal"
          :duration="10"
          class="h-full items-center overflow-hidden"
        >
          <p style="margin-left: 1em" class="h1">
            {{ marqueeText }}
          </p>
        </Vue3Marquee>

        <template #fallback>
          <p style="margin-left: 1em" class="h1">
            {{ marqueeText }}
          </p>
        </template>
      </ClientOnly>
    </div>

    <UIBaseButtonContact :email="email" class="desktop-only min-w-50 flex-1">
      Contact
    </UIBaseButtonContact>
  </header>
</template>
