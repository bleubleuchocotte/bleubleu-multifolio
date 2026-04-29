export const useOptions = async () => {
	const { data, error } = await useWebsite();

	if (error.value || !data.value) {
		throwAppError("PRISMIC_UNREACHABLE", 500, "Could not reach options");
	}

	return data.value.data;
};
