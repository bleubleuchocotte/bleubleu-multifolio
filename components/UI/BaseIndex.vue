<script setup lang="ts">
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

const i = ref(props.index < 10 ? `0${props.index}` : props.index.toString());
</script>

<template>
  <span>{{ i }}</span>
</template>
