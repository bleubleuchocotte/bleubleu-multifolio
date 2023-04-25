<script setup lang="ts">
const count = ref(1)

watch(count, () => {
	console.log("oui")
})
</script>

<template>

	<button @click="count += 1">{{ count }}</button>
</template>