<script setup lang="ts">
const page = await useLegalNotice();

const { getWebsite } = usePrismicClient();
const { data: options } = getWebsite();

const isDeviceMobile = useMediaQuery("(max-width: 768px)");

useSeoMeta({
  title: options.value?.data["seo-title"],
});
</script>

<template>
  <div
    class="border-border relative overflow-hidden border-b max-sm:flex max-sm:flex-col-reverse max-sm:border-b-0"
  >
    <UIBaseLinkHome>
      {{ $t("page.legal-notice.button") }}
    </UIBaseLinkHome>

    <template v-if="!isDeviceMobile">
      <div
        v-for="i in 2"
        :key="Math.floor(Math.random() * (100 + i))"
        class="border-border bg-background flex w-max border border-l-0 first-of-type:border-b-0"
      >
        <PrismicRichText
          v-for="j in 6"
          :key="Math.floor(Math.random() * (100 + j))"
          :field="page?.data.content"
          class="p-fluid flex flex-col gap-[0.6rem]"
          :aria-hidden="!(j === 1 && i === 1)"
        />
      </div>
    </template>

    <template v-else>
      <PrismicRichText
        :field="page?.data.content"
        class="p-fluid flex flex-col gap-[0.6rem]"
      />
    </template>
  </div>
</template>
