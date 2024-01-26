export default defineNuxtRouteMiddleware(async (to) => {
	const { $api } = useNuxtApp();
	const state = await $api.options.getWebsiteState();

	const isWIP = useState("WebsiteStateWIP", () => ref(false));

	switch (state?.website_state) {
		case ("Le site est indexable et disponible via la recherche google"):
			break;
		case ("Le site n'est pas indexable"):
			useServerSeoMeta({
				robots: "noindex, nofollow",
			});
			break;
		case ("Le site n'est pas indexable et présente une page temporaire de WIP"):
			useServerSeoMeta({
				robots: "noindex, nofollow",
			});
			isWIP.value = true;
			break;

		default:
			break;
	}

	if (isWIP.value && to.path !== "/wip") {
		// Si le site est dans l'état "WIP", on redirige toutes les requêtes vers /wip
		return navigateTo("/wip", { replace: true });
	}
	else if (!isWIP.value && to.path === "/wip") {
		return navigateTo("/", { replace: true });
	}
});
