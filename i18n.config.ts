import en from "./locales/en.json";
import fr from "./locales/fr.json";

export default defineI18nConfig(() => {
	return {
		legacy: false,
		messages: {
			en,
			fr,
		},
	};
});
