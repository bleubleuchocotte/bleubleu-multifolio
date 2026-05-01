<script setup lang="ts">
const { getWebsite, getPageLegalNotice } = usePrismicClient();
const { data: options } = await getWebsite();
const { data: page } = await getPageLegalNotice();

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
        class="flex border-border bg-background w-max border border-l-0 first-of-type:border-b-0"
      >
        <div
          v-for="j in 6"
          :key="Math.floor(Math.random() * (100 + j))"
          :aria-hidden="!(j === 1 && i === 1)"
          class="p-fluid flex flex-col gap-[0.6rem]"
        >
          <PrismicRichText :field="page?.data.content" />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="p-fluid flex flex-col gap-[0.6rem]">
        <PrismicRichText :field="page?.data.content" />
      </div>
    </template>
  </div>
</template>
