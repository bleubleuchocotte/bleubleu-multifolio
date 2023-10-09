<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{ (e: "unmount"): void }>();

function decodeString(
  displayString: Ref<string>,
  originalString: string,
  i: number
) {
  const strEncode = randomString(originalString.slice(i).length);
  const strDecode = originalString.slice(0, i);

  const chars = strDecode.concat(strEncode).split("");

  if (chars[i] !== originalString.at(i)) {
    chars[i] = originalString.at(i) ?? "";
    displayString.value = chars.join("");
  }

  if (displayString.value === originalString) {
    return true;
  } else {
    return false;
  }
}

function randomString(length: number) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/{}<>!@#$%&*|?";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const displayString = ref("Loading...");

let index = 0;
const ratio = ref(0);

const { pause } = useIntervalFn(() => {
  const result = decodeString(displayString, props.text, index);
  index += 1;
  ratio.value = Math.floor((100 * (index + 1)) / (props.text.length + 1));

  if (result) {
    pause();
    useTimeoutFn(() => {
      emit("unmount");
    }, 400);
  }
}, 75);
</script>

<template>
  <div class="loader">
    <span>{{ displayString }}_{{ ratio }}%</span>
  </div>
</template>

<style scoped lang="scss">
.loader {
  font-size: 5vw;
  text-transform: uppercase;
  line-height: 1;

  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  span {
    color: var(--text-color);
  }
}
</style>
