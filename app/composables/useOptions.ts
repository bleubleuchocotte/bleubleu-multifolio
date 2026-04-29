export const useOptions = async () => {
	const { data, error } = await useWebsite();

	if (error.value || !data.value) {
		throw createError({
			statusCode: 500,
			statusMessage: "Could not reach options",
		});
	}

	return data.value.data;
};
