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
					website_state
				}
			}`,
			}));

		return (data.value?.data ?? null) as (Pick<Content.WebsiteDocumentData, "website_state" > | null);
	}

	async getCustomMetaTags() {
		const { data } = await useAsyncData("GetCustomMetaTags", () =>
			this.client.getSingle<Content.WebsiteDocument>("website", {
				graphQuery: `{
				website {
					custom_meta_tags
				}
			}`,
			}));

		return (data.value?.data ?? null) as (Pick<Content.WebsiteDocumentData, "custom_meta_tags" > | null);
	}

	async getLanguage() {
		const { data } = await useAsyncData("GetLanguage", () =>
			this.client.getSingle<Content.WebsiteDocument>("website", {
				graphQuery: `{
				website {
					language
				}
			}`,
			}));

		return (data.value?.data ?? null) as (Pick<Content.WebsiteDocumentData, "language" > | null);
	}
}

export default OptionsModule;
