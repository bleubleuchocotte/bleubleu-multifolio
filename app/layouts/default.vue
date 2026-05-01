<script setup lang="ts">
const { getWebsite } = usePrismicClient();
const { data: options } = getWebsite();

const isLoading = ref(true);
const showContent = ref(false);
</script>

<template>
  <div v-if="options">
    <Transition
      name="translate-out"
      mode="out-in"
      @after-leave="showContent = true"
    >
      <TheLoader
        v-if="isLoading"
        :text="`${options.data['first-name']} ${options.data['last-name']}`"
        :colors="{
          start: options.data['text-color'] ?? '',
          end: options.data['accent-color'] ?? '',
        }"
        @unmount="isLoading = false"
      />
    </Transition>
    <Transition mode="out-in" name="translate-in">
      <div v-show="showContent" class="body">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: column;

  height: 100vh;

  @media #{$desktop-down} {
    height: auto;
    @include gap();
  }

  justify-content: space-between;
}
</style>
