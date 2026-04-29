import { defineConfig } from "vitest/config";
import { defineVitestProject } from "@nuxt/test-utils/config";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "e2e",
          include: ["test/e2e/**/*.spec.ts"],
          environment: "node",
        },
      },
      await defineVitestProject({
        test: {
          name: "nuxt",
          include: ["test/nuxt/**/*.nuxt.spec.ts"],
          environment: "nuxt",
        },
      }),
    ],
  },
});
