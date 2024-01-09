// eslint.config.js
import antfu from "@antfu/eslint-config";

export default antfu({
	stylistic: {
		quotes: "double", // On force les double quotes
		indent: "tab", // On force l'indentation à être des tabs
	},
	rules: {
		"style/semi": ["error", "always"], // On force les semi-colons à la fin des lignes dans les fichiers js/ts
		"eqeqeq": ["error", "always"], // On force l'usage de === et !==
		"no-await-in-loop": ["error"], // On désactive l'usage de `await` dans les boucles
		"no-nested-ternary": ["error"], // Nested ternay interdit
		"ts/consistent-type-definitions": ["error", "type"], // On oblige l'utilisation de `type` au lieu de `interface`
		"curly": ["error", "all"], // On oblige d'avoir des curly bracket même pour les conditions uni-ligne
		"node/prefer-global/process": ["error", "always"], // On autorise l'utilisation de process au lieu de require(process)
	},
});
