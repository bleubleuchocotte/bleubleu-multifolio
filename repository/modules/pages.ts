import PrismicFactory from "../factory";
import type { LegalNoticesDocument, WebsiteDocument } from "@/prismicio-types";

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

	async getLegalNotices() {
		const { data } = await useAsyncData("GetLegalNoticesPage", () => this.client.getSingle<LegalNoticesDocument>("legal_notices"));

		return data.value;
	}
}

export default PagesModule;
