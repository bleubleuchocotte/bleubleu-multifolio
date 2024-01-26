export default defineNuxtRouteMiddleware((to) => {
	const isWIP = useState<boolean>("WebsiteStateWIP");

	if (isWIP && to.path !== "/wip") {
		return navigateTo("/wip");
	}
});
