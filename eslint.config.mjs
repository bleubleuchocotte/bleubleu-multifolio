// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",

      eqeqeq: ["error", "always"], // Require the use of === and !==
      curly: ["error", "all"], // Enforce consistent brace style for all control statements
      "no-await-in-loop": ["error"], // Disallow await inside of loops
      "no-nested-ternary": ["error"], // Disallow nested ternary expressions
      "prefer-template": "error", // Require template literals instead of string concatenation
      "no-console": [
        "error",
        {
          allow: ["warn", "error", "info"],
        },
      ],
      "object-shorthand": ["error", "always"],
      "vue/html-self-closing": ["error", { html: { void: "always" } }],
      "vue/no-useless-v-bind": ["error"],
      "vue/multi-word-component-names": "off",
    },
  },
  {
    ignores: ["**/*.generated.ts"],
  },
);
