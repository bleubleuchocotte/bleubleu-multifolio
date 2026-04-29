export default defineNuxtRouteMiddleware(async (to) => {
	const state = await useWebsiteState();

	const isWIP = useState<boolean>("WebsiteStateWIP", () => false);

	switch (state) {
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

			if (!import.meta.dev) {
				isWIP.value = true;
			}
			break;

		default:
			break;
	}

	if (isWIP.value && to.path !== "/wip" && !import.meta.dev) {
		// Si le site est dans l'état "WIP" et en production, on redirige toutes les requêtes vers /wip
		return navigateTo("/wip", { replace: true });
	}
	else if (!isWIP.value && to.path === "/wip") {
		return abortNavigation();
	}
});
