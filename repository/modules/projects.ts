import type { Content, ContentRelationshipField } from "@prismicio/client";
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

		const projects = projectsFromPrismic.map((project) => {
			const projectTyped = project.project as ContentRelationshipField<string, string, Content.ProjetDocumentData, "filled">;

			if (projectTyped.data) {
				return (Object.assign(projectTyped.data, { id: projectTyped.id }));
			}
			else {
				return null;
			}
		});

		return projects.filter((el): el is ProjectWithId => el !== null); // Permet de filter les potentiels "undefined";
	}
}
export default ProjectsModule;
