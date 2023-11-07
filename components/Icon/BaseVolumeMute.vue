<script setup lang="ts">
import { ColorArrow } from "@/type/types";

defineProps({
  colors: {
    type: Object as PropType<ColorArrow>,
    required: true,
  },
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="15"
    viewBox="0 0 17 15"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.68164 6.10777L8.81018 4.30151C9.37413 3.97591 10.0573 4.27004 10.2545 4.83439H11.2834C11.0643 3.4945 9.54444 2.72288 8.31018 3.43548L5.18164 5.24175C3.18164 6.39645 3.18164 9.2832 5.18164 10.4379L8.31018 12.2442C9.61981 13.0003 11.251 12.0854 11.3086 10.5937H10.307C10.2507 11.3153 9.45297 11.7493 8.81018 11.3781L5.68164 9.57188C4.34831 8.80207 4.34831 6.87757 5.68164 6.10777Z"
      :fill="colors.arrow"
    />
    <path
      d="M13.3301 9.51709L10.0117 6.19874M13.3301 6.19873L10.0117 9.51709"
      :stroke="colors.arrow"
      stroke-linecap="round"
    />
  </svg>
</template>
