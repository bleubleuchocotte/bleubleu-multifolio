import { describe, it, expect, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

const websiteRef: { value: unknown } = { value: null };

mockNuxtImport("useWebsite", () => {
	return () => Promise.resolve({
		data: websiteRef,
		error: { value: null },
	});
});

describe("useWebsiteState", () => {
	beforeEach(() => {
		websiteRef.value = null;
	});

	it("returns the website_state value from the document", async () => {
		websiteRef.value = {
			data: { website_state: "Le site est indexable et disponible via la recherche google" },
		};

		const state = await useWebsiteState();

		expect(state).toBe("Le site est indexable et disponible via la recherche google");
	});

	it("returns null when the document is missing", async () => {
		websiteRef.value = null;

		const state = await useWebsiteState();

		expect(state).toBeNull();
	});

	it("returns null when website_state is undefined", async () => {
		websiteRef.value = { data: {} };

		const state = await useWebsiteState();

		expect(state).toBeNull();
	});
});
