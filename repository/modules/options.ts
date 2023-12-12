import PrismicFactory from "../factory";
import type { WebsiteDocument } from "@/prismicio-types";

class OptionsModule extends PrismicFactory {
	async getOptions() {
		const { data } = await useAsyncData<WebsiteDocument>("GetGlobalOptions", () =>
			this.client.getSingle("website", {
				graphQuery: `{
					website {
						accent-color
						background-color
						email
						first-name
						last-name
						links
						og-image
						og-url
						seo-description
						seo-favicon
						seo-title
						text-accent-color
						text-color
						text-header
					}
				}`,
			}));

		return data.value;
	}
}

export default OptionsModule;
