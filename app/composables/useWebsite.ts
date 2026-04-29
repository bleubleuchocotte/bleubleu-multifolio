import type { Content } from "@prismicio/client";

export const useWebsite = () => {
	const { client } = usePrismic();
	return useAsyncData(
		"website",
		() => client.getSingle<Content.WebsiteDocument>("website"),
	);
};
