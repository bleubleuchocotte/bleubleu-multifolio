import type { Client } from "@prismicio/client";

/*
 The FetchFactory acts as a wrapper around an HTTP client.
 It encapsulates the functionality for making API requests asynchronously
 through the call function, utilizing the provided HTTP client.
*/
class PrismicFactory {
	public client: Client;

	constructor(client:	Client) {
		this.client = client;
	}
}

export default PrismicFactory;
