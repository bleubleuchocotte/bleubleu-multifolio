<script lang="ts" setup>
type ComponentProps = {
  size?: number;
};

const props = withDefaults(defineProps<ComponentProps>(), {
  size: 30,
});

const x = ref(0);
const y = ref(0);
const delta = reactive({
  x: 0,
  y: 0,
});
const isInvert = ref(false);
const isExpand = ref(false);
const isVisible = ref(false);
const container = useTemplateRef("container");
const containerIcon = useTemplateRef("containerIcon");
const icon = ref<CursorIconType>(null);

const size = computed(() =>
  isExpand.value && icon.value ? props.size * 2 : props.size,
);

function callback(e: MouseEvent) {
  x.value = e.clientX;
  y.value = e.clientY;

  delta.x = e.movementX;
  delta.y = e.movementY;

  isInvert.value = hasParentWithClass(
    e.target as HTMLElement,
    "invert-selection",
    5,
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
}

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

    const parentAttr = parent.attributes.getNamedItem("data-icon");
    if (parentAttr?.value) {
      return parentAttr.value;
    }

    parent = parent.parentElement;
  }

  return null;
}
function hasParentWithClass(
  element: HTMLElement,
  className: string,
  depth: number,
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

watch([x, y], () => {
  useAnimate(
    container,
    {
      transform: `translate3d(${x.value - size.value / 2}px, ${
        y.value - size.value / 2
      }px, 0)`,
    },
    {
      duration: 800,
      fill: "forwards",
      easing: "ease-out",
    },
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
      },
    );
  }
});

watchOnce([x, y], () => {
  isVisible.value = true;
});
</script>

<template>
  <div
    class="pointer-events-none fixed top-0 left-0 z-100 h-screen w-screen overflow-hidden opacity-0 data-[visible=true]:opacity-100"
    :data-visible="isVisible"
  >
    <div ref="container">
      <div
        class="border-accent flex aspect-square h-(--size) items-center justify-center rounded-full border transition-all duration-200 ease-out data-[invert=true]:border-background data-[expand=true]:border-background data-[expand=true]:bg-accent"
        :data-invert="isInvert"
        :data-expand="isExpand"
        :style="{ '--size': `${size}px` }"
      >
        <UIBaseCursorIcon v-show="isExpand" ref="containerIcon" :icon="icon" />
      </div>
    </div>
  </div>
</template>
