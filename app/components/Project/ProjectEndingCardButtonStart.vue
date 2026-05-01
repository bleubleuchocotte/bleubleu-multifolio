<template>
  <button
    type="button"
    data-icon="IconArrowLeft"
    class="mx-auto inline-flex w-fit gap-[calc(var(--spacing-fluid)/2)]"
  >
    <span class="text-fluid-h3 underline">
      {{ $t("project.ending-card.button") }}
    </span>

    <UIWrapperArrow
      class="h-9.5 w-9.5 rotate-180"
      :colors="{
        background: 'var(--text-accent-color)',
        arrow: 'var(--accent-color)',
      }"
      length-arrow="short"
    />
  </button>
</template>
