export default defineNuxtRouteMiddleware(async (to) => {
  const { getWebsite } = usePrismicClient();
  const { data: options } = getWebsite();

  const isWIP = useState<boolean>("WebsiteStateWIP", () => false);

  switch (options.value?.data.website_state) {
    case "Le site est indexable et disponible via la recherche google":
      break;
    case "Le site n'est pas indexable":
      useSeoMeta({
        robots: "noindex, nofollow",
      });
      break;
    case "Le site n'est pas indexable et présente une page temporaire de WIP":
      useSeoMeta({
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
    // In production, when the WIP state is active, redirect every request to /wip.
    return navigateTo("/wip", { replace: true });
  } else if (!isWIP.value && to.path === "/wip") {
    return abortNavigation();
  }
});
