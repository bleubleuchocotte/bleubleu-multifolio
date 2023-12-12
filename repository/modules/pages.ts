import type { LegalNoticesDocument, WebsiteDocument } from "prismicio-types";
import PrismicFactory from "../factory";

class PagesModule extends PrismicFactory {
	async getHome() {
		const { data } = await useAsyncData("GetHomePage", () => this.client.getSingle<WebsiteDocument>("website", {
			graphQuery: `{
				about-image
				description
				ending-card-image
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
