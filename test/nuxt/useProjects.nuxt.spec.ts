import { describe, it, expect, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

const websiteRef: { value: unknown } = { value: null };

mockNuxtImport("useWebsite", () => {
	return () => Promise.resolve({
		data: websiteRef,
		error: { value: null },
	});
});

const projectFixture = (id: string, title: string) => ({
	project: {
		id,
		data: { title, video: null, projectURL: null },
	},
});

describe("useProjects", () => {
	beforeEach(() => {
		websiteRef.value = null;
	});

	it("maps projects group to ProjectWithId[] with stable id", async () => {
		websiteRef.value = {
			data: {
				projects: [
					projectFixture("a1", "Alpha"),
					projectFixture("b2", "Beta"),
				],
			},
		};

		const result = await useProjects();

		expect(result).toHaveLength(2);
		expect(result[0]).toMatchObject({ id: "a1", title: "Alpha" });
		expect(result[1]).toMatchObject({ id: "b2", title: "Beta" });
	});

	it("returns an empty array when projects group is missing", async () => {
		websiteRef.value = { data: { projects: [] } };

		const result = await useProjects();

		expect(result).toEqual([]);
	});

	it("filters out items without nested project data", async () => {
		websiteRef.value = {
			data: {
				projects: [
					projectFixture("a1", "Alpha"),
					{ project: { id: "broken" } },
				],
			},
		};

		const result = await useProjects();

		expect(result).toHaveLength(1);
		expect(result[0]).toMatchObject({ id: "a1" });
	});

	it("returns an empty array when website data is null", async () => {
		websiteRef.value = null;

		const result = await useProjects();

		expect(result).toEqual([]);
	});
});
