import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import type { RouteLocationNormalized } from "vue-router";
import middleware from "~/middleware/checkWIP.global";

const mocks = vi.hoisted(() => ({
	stateRef: { value: null as string | null },
	wipRef: { value: false },
	seoMeta: vi.fn(),
	navigate: vi.fn(),
	abort: vi.fn(),
}));

mockNuxtImport("useWebsiteState", () => () => Promise.resolve(mocks.stateRef.value));
mockNuxtImport("useState", () => () => mocks.wipRef);
mockNuxtImport("useServerSeoMeta", () => mocks.seoMeta);
mockNuxtImport("navigateTo", () => mocks.navigate);
mockNuxtImport("abortNavigation", () => mocks.abort);

const route = (path: string) =>
	({ path, fullPath: path, matched: [] } as unknown as RouteLocationNormalized);

describe("checkWIP middleware", () => {
	beforeEach(() => {
		mocks.stateRef.value = null;
		mocks.wipRef.value = false;
		mocks.seoMeta.mockReset();
		mocks.navigate.mockReset();
		mocks.abort.mockReset();
	});

	it("does nothing when state is the indexable one", async () => {
		mocks.stateRef.value = "Le site est indexable et disponible via la recherche google";

		const result = await middleware(route("/"), route("/"));

		expect(mocks.seoMeta).not.toHaveBeenCalled();
		expect(mocks.navigate).not.toHaveBeenCalled();
		expect(mocks.abort).not.toHaveBeenCalled();
		expect(result).toBeUndefined();
	});

	it("does not redirect for the non-indexable state on a regular path", async () => {
		mocks.stateRef.value = "Le site n'est pas indexable";

		await middleware(route("/"), route("/"));

		expect(mocks.navigate).not.toHaveBeenCalled();
		expect(mocks.abort).not.toHaveBeenCalled();
	});

	it("aborts navigation when visiting /wip while site is not in WIP", async () => {
		mocks.stateRef.value = "Le site est indexable et disponible via la recherche google";

		await middleware(route("/wip"), route("/"));

		expect(mocks.abort).toHaveBeenCalledOnce();
	});

	it("redirects to /wip when state is WIP and the path is not /wip", async () => {
		mocks.stateRef.value = "Le site n'est pas indexable et présente une page temporaire de WIP";

		await middleware(route("/"), route("/"));

		expect(mocks.navigate).toHaveBeenCalledWith("/wip", { replace: true });
	});
});
