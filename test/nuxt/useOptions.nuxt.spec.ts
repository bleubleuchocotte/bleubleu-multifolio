import { describe, it, expect, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

const websiteRef: { value: unknown } = { value: null };
const errorRef: { value: unknown } = { value: null };

mockNuxtImport("useWebsite", () => {
	return () => Promise.resolve({
		data: websiteRef,
		error: errorRef,
	});
});

describe("useOptions", () => {
	beforeEach(() => {
		websiteRef.value = null;
		errorRef.value = null;
	});

	it("returns the website document data when fetch succeeds", async () => {
		websiteRef.value = { data: { background_color: "#fff" } };

		const result = await useOptions();

		expect(result).toEqual({ background_color: "#fff" });
	});

	it("throws a 500 with PRISMIC_UNREACHABLE code when error is set", async () => {
		errorRef.value = new Error("network");

		await expect(useOptions()).rejects.toMatchObject({
			statusCode: 500,
			data: { code: "PRISMIC_UNREACHABLE" },
		});
	});

	it("throws a 500 with PRISMIC_UNREACHABLE code when data is null", async () => {
		websiteRef.value = null;

		await expect(useOptions()).rejects.toMatchObject({
			statusCode: 500,
			data: { code: "PRISMIC_UNREACHABLE" },
		});
	});
});
