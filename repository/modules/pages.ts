import type { Content } from "@prismicio/client";
import PrismicFactory from "../factory";

class PagesModule extends PrismicFactory {
	async getHome() {
		const { data } = await useAsyncData("GetHomePage", () => this.client.getSingle<Content.WebsiteDocument>("website", {
			graphQuery: `{
				website {
					about-image
					description
					ending-card-image
				}
			}`,
		}));

		return data.value;
	}

	async getLegalNotice() {
		const { data } = await useAsyncData("GetLegalNoticePage", () => this.client.getSingle<Content.PageLegalNoticeDocument>("page_legal_notice"));

		return data.value;
	}
}

export default PagesModule;
