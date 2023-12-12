import type { Client } from "@prismicio/client";
import type { PrismicDocument } from "@prismicio/types";

import type { MediaType, Project, SkillType } from "type/types";

class ProjectsModule {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	async getProjects() {
		const { data: prismicProjects } = await useAsyncData("GetAllProjects", () =>
			this.client.getSingle("website", {
				graphQuery: `{
        website {
          projects {
            project {
              title
              url
              date
              description
              skills {
                skill
              }
              medias {
                media {
                  ...on media-component-full {
                    ...media-component-fullFields
                  }
                  ...on image-duo {
                    ...image-duoFields
                  }
                  ...on image-full {
                    ...image-fullFields
                  }
                }
              }
              image-mobile
            }
          }
        }
      }`,
			}));

		const projects: Array<Project | null>
      = prismicProjects.value?.data.projects.map(
      	(el: { project: PrismicDocument }) => {
      		if (!el.project.data) {
      			// Si un champ n'a pas été remplie, renvoi null
      			return null;
      		}

      		const medias = el.project.data.medias as { media: PrismicDocument }[];

      		const mediasBuffer = medias.map((el) => {
      			let type: "media-duo" | "media-full" = "media-full";
      			switch (el.media.type) {
      				case ("media-component-full"):
      					type = "media-full";
      					break;
      				case ("image-duo"):
      					type = "media-duo";
      					break;
      				case ("image-full"):
      					type = "media-full";
      					break;

      				default:
      					break;
      			}

      			const result: MediaType = {
      				field: el.media.data,
      				type,
      				id: el.media.id,
      			};

      			return result;
      		});

      		const skills = (el.project.data.skills as { skill: string }[]).map(
      			(obj) => {
      				const result: SkillType = {
      					name: obj.skill,
      					id: useUID(),
      				};

      				return result;
      			},
      		);

      		const result: Project = {
      			"id": el.project.id,
      			"date": el.project.data.date,
      			"images": [],
      			"medias": mediasBuffer,
      			"description": el.project.data.description,
      			"title": el.project.data.title,
      			skills,
      			"image-mobile": el.project.data["image-mobile"],
      			"url": el.project.data.url ? el.project.data.url : null,
      		};

      		return result;
      	},
      ) ?? [];

		return projects.filter((el): el is Project => el !== null); // Permet de filtrer les champs null
	}
}
export default ProjectsModule;
