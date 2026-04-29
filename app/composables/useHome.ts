export const useHome = async () => {
	const { data, error } = await useWebsite();

	if (error.value || !data.value) {
		throw createError({
			statusCode: 500,
			statusMessage: "Could not reach home page content",
		});
	}

	return data.value.data;
};
