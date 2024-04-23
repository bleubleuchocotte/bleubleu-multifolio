<script setup lang="ts">
type ComponentProps = {
	mediaQuery: string
};

const props = defineProps<ComponentProps>();

const isMobileClientSide = useMediaQuery(props.mediaQuery);
const { isMobileOrTablet: isMobileServerSide } = useDevice();
</script>

<template>
	<ClientOnly>
		<slot v-if="isMobileClientSide" name="mobile" />
		<slot v-else name="desktop" />

		<template #fallback>
			<slot v-if="isMobileServerSide" name="mobile" />
			<slot v-else name="desktop" />
		</template>
	</ClientOnly>
</template>
