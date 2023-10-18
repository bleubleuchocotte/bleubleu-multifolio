import ProjectsModule from "@/repository/modules/projects";
import WebsiteModule from "@/repository/modules/website";

export default defineNuxtPlugin(async () => {
  const { client } = usePrismic();

  // An object containing all repositories we need to expose
  const modules = {
    website: await new WebsiteModule(client).getWebsite(),
    pages: {
      "legal-notices": await new WebsiteModule(client).getPage("legal_notices"),
    },
    projects: await new ProjectsModule(client).getProjects(),
  };

  return {
    provide: {
      api: modules,
    },
  };
});
