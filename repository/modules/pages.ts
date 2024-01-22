import PrismicFactory from "../factory";
import type { PageLegalNoticeDocument, WebsiteDocument } from "@/prismicio-types";

class PagesModule extends PrismicFactory {
	async getHome() {
		const { data } = await useAsyncData("GetHomePage", () => this.client.getSingle<WebsiteDocument>("website", {
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
		const { data } = await useAsyncData("GetLegalNoticePage", () => this.client.getSingle<PageLegalNoticeDocument>("page_legal_notice"));

		return data.value;
	}
}

export default PagesModule;
