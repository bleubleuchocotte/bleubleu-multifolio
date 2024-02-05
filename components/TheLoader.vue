<script setup lang="ts">
type ComponentProps = {
	text: string
	colors: { start: string, end: string }
};

const props = defineProps<ComponentProps>();

const emit = defineEmits<{
	unmount: []
}>();

function decodeString(
	displayString: Ref<string>,
	originalString: string,
	i: number,
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
	}
	else {
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

function interpolate(color1: string, color2: string, percent: number) {
	// Convert the hex colors to RGB values
	const r1 = Number.parseInt(color1.substring(1, 3), 16);
	const g1 = Number.parseInt(color1.substring(3, 5), 16);
	const b1 = Number.parseInt(color1.substring(5, 7), 16);

	const r2 = Number.parseInt(color2.substring(1, 3), 16);
	const g2 = Number.parseInt(color2.substring(3, 5), 16);
	const b2 = Number.parseInt(color2.substring(5, 7), 16);

	// Interpolate the RGB values
	const r = Math.round(r1 + (r2 - r1) * percent);
	const g = Math.round(g1 + (g2 - g1) * percent);
	const b = Math.round(b1 + (b2 - b1) * percent);

	// Convert the interpolated RGB values back to a hex color
	return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

const displayString = ref("Loading...");

let index = 0;
const ratio = ref(0);

const styles = reactive({
	color: `${interpolate(props.colors.start, props.colors.end, 0)}`,
});

const { pause } = useIntervalFn(() => {
	const result = decodeString(displayString, props.text, index);
	index += 1;
	ratio.value = Math.floor((100 * (index + 1)) / (props.text.length + 1));

	styles.color = interpolate(
		props.colors.start,
		props.colors.end,
		ratio.value / 100,
	);

	if (result) {
		pause();
		useTimeoutFn(() => {
			emit("unmount");
		}, 400);
	}
}, 75);
</script>

<template>
	<div class="loader" :style="styles">
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
}
</style>
