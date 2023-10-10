import ProjectsModule from "@/repository/modules/projects";
import WebsiteModule from "@/repository/modules/website";

export default defineNuxtPlugin(() => {
  const { client } = usePrismic();

  // An object containing all repositories we need to expose
  const modules = {
    website: new WebsiteModule(client),
    projects: new ProjectsModule(client),
  };

  return {
    provide: {
      api: modules,
    },
  };
});
