<script lang="ts" setup>
import { CursorIconType } from "type/types";

const props = defineProps({
  size: {
    type: Number,
    required: false,
    default: 30,
  },
});

const callback = (e: MouseEvent) => {
  x.value = e.clientX;
  y.value = e.clientY;

  delta.x = e.movementX;
  delta.y = e.movementY;


  isInvert.value = hasParentWithClass(
    e.target as HTMLElement,
    "invert-selection",
    5
  );

  if (
    e.target instanceof HTMLButtonElement ||
    e.target instanceof HTMLLIElement ||
    e.target instanceof HTMLAnchorElement ||
    (e.target instanceof HTMLDivElement &&
      e.target.attributes.getNamedItem("role")?.value === "button")
  ) {
    isExpand.value = true;

    icon.value = typeDataIconAttribute(getParentDataIcon(e.target, 5));
  } else {
    isExpand.value = false;
  }
};

function typeDataIconAttribute(str: string | null): CursorIconType {
  if (!str) {
    return null;
  }

  switch (str) {
    case "IconArrowRight":
      return "IconArrowRight";
    case "IconArrowLeft":
      return "IconArrowLeft";
    case "IconFullscreen":
      return "IconFullscreen";
    case "IconArrowRightUp":
      return "IconArrowRightUp";
    case "IconBaseToward":
      return "IconBaseToward";
    case "IconBaseTowardReverse":
      return "IconBaseTowardReverse";

    default:
      return null;
  }
}

function getParentDataIcon(element: HTMLElement, depth: number) {
  const attr = element.attributes.getNamedItem("data-icon");
  if (attr?.value) {
    return attr.value;
  }

  let parent = element.parentElement;
  let counter = 0;

  if (parent === null) {
    return null;
  }

  while (parent && counter < depth) {
    counter += 1;

    const attr = element.attributes.getNamedItem("data-icon");
    if (attr?.value) {
      return attr.value;
    }
    parent = parent.parentElement;
  }

  return null;
}
function hasParentWithClass(
  element: HTMLElement,
  className: string,
  depth: number
) {
  if (element.classList.contains(className)) {
    return true;
  }

  let parent = element.parentElement;
  let counter = 0;

  if (parent === null) {
    return false;
  }

  while (parent && counter < depth) {
    counter += 1;

    if (parent.classList.contains(className)) {
      return true;
    }
    parent = parent.parentElement;
  }

  return false;
}

useEventListener(document, "mousemove", callback);

const x = ref(0);
const y = ref(0);
const delta = reactive({
  x: 0,
  y: 0
})
const isInvert = ref(false);
const isExpand = ref(false);
const isVisible = ref(false);
const container = ref();
const containerIcon = ref();
const icon = ref<CursorIconType>(null);

const size = computed(() => isExpand.value && icon.value ? props.size * 2 : props.size)

watch([x, y], () => {
  useAnimate(
    container,
    {
      transform: `translate3d(${x.value - size.value / 2}px, ${y.value - size.value / 2
        }px, 0)`,
    },
    {
      duration: 800,
      fill: "forwards",
      easing: "ease-out",
    }
  );

  if (icon.value) {
    useAnimate(
      containerIcon,
      {
        transform: `translate3d(${delta.x ?? 0}px, ${delta.y ?? 0}px, 0)`,
      },
      {
        duration: 400,
        fill: "forwards",
        easing: "ease-in",
      }
    );
  }
});

watchOnce([x, y], () => {
  isVisible.value = true;
});
</script>

<template>
  <div class="cursor" :class="{ 'is-visible': isVisible }">
    <div ref="container">
      <div class="cursor__shape" :class="{ expand: isExpand, invert: isInvert }" :style="{ '--size': `${size}px` }">
        <UIBaseCursorIcon v-show="isExpand" :icon="icon" ref="containerIcon" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cursor {
  opacity: 0;

  &.is-visible {
    opacity: 1;
  }

  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  height: 100vh;
  width: 100vw;

  pointer-events: none;

  overflow: hidden;

  &__shape {
    display: flex;
    justify-content: center;
    align-items: center;

    transition: all 0.2s ease-out;
    height: var(--size);
    aspect-ratio: 1;

    border: 1px solid var(--accent-color);

    &.invert {
      border: 1px solid var(--background-color);
    }

    border-radius: 50%;

    &.expand {
      border: 1px solid var(--background-color);
      background-color: var(--accent-color);
    }
  }
}
</style>
