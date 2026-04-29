export const useWebsiteState = async () => {
	const { data } = await useWebsite();
	return data.value?.data.website_state ?? null;
};
