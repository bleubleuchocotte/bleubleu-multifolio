import PagesModule from "@/repository/modules/pages";
import OptionsModule from "@/repository/modules/options";
import ProjectsModule from "@/repository/modules/projects";

export default defineNuxtPlugin(async () => {
	const { client } = usePrismic();

	// An object containing all repositories we need to expose
	const modules = {
		options: new OptionsModule(client),
		pages: new PagesModule(client),
		projects: await new ProjectsModule(client).getProjects(),
	};

	return {
		provide: {
			api: modules,
		},
	};
});
