import type { Content } from "@prismicio/client";
import PrismicFactory from "@/repository/factory";
import type { ProjectWithId } from "~/types";

class ProjectsModule extends PrismicFactory {
	async getAllProjects() {
		const { data } = await useAsyncData("GetAllProjects", () =>
			this.client.getSingle<Content.WebsiteDocument>("website", {
				graphQuery: `{
        website {
          projects {
            project {
							...projectFields
            }
          }
        }
      }`,
			}));

		const projectsFromPrismic = data.value?.data.projects ?? [];

		const projects = projectsFromPrismic.map((item) => {
			if (("data" in item.project) && item.project.data) {
				return (Object.assign(item.project.data, { id: item.project.id }));
			}
			else {
				return null;
			}
		});

		return projects.filter((el): el is ProjectWithId => el !== null); // Permet de filter les potentiels "undefined";
	}
}
export default ProjectsModule;
