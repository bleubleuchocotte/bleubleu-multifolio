import type { Content } from "@prismicio/client";

export const useLegalNotice = async () => {
	const { client } = usePrismic();
	const { data } = await useAsyncData(
		"page_legal_notice",
		() => client.getSingle<Content.PageLegalNoticeDocument>("page_legal_notice"),
	);
	return data.value;
};
