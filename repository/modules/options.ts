import type { Content } from "@prismicio/client";
import PrismicFactory from "../factory";

class OptionsModule extends PrismicFactory {
	async getOptions() {
		const { data } = await useAsyncData("GetGlobalOptions", () =>
			this.client.getSingle<Content.WebsiteDocument>("website", {
				graphQuery: `{
					website {
						accent-color
						background-color
						email
						first-name
						last-name
						links
						og-image
						seo-description
						seo-favicon
						seo-title
						text-accent-color
						text-color
						text-header
					}
				}`,
			}));

		return (data.value?.data ?? null) as (Omit<Content.WebsiteDocumentData, "about" | "description" | "ending-card-image" > | null);
	}

	async getWebsiteState() {
		const { data } = await useAsyncData("GetWebsiteState", () =>
			this.client.getSingle<Content.WebsiteDocument>("website", {
				graphQuery: `{
				website {
					website_state-color
				}
			}`,
			}));

		return (data.value?.data ?? null) as (Pick<Content.WebsiteDocumentData, "website_state" > | null);
	}
}

export default OptionsModule;
