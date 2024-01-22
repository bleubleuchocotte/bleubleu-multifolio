import type { FilledContentRelationshipField, LinkToMediaField } from "@prismicio/client";
import type { ComponentMediaDuoDocumentData, ComponentMediaFullDocumentData, ProjetDocument, WebsiteDocument } from "@/prismicio-types";
import type { MediaType, Project, SkillType } from "@/type/types";
import PrismicFactory from "@/repository/factory";

class ProjectsModule extends PrismicFactory {
	async getProjects() {
		const { data } = await useAsyncData<WebsiteDocument>("GetAllProjects", () =>
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
                  ...on component_media_full {
                    ...component_media_fullFields
                  }
									...on component_media_duo {
                    ...component_media_duoFields
                  }
                }
              }
              image-mobile
            }
          }
        }
      }`,
			}));

		const projectsPrismic = data.value?.data.projects ?? [];

		const projects = projectsPrismic.map((el) => {
			const projectPrismic = el.project as unknown as ProjetDocument; // ProjetDocument est un objet nested dans website

			const medias = projectPrismic.data.medias.map((el) => {
				const mediaPrismic = el.media as FilledContentRelationshipField<"component_media_duo" | "component_media_full", "", ComponentMediaDuoDocumentData | ComponentMediaFullDocumentData>;

				const result: MediaType = {
					field: {},
					type: mediaPrismic.type === "component_media_duo" ? "media-duo" : "media-full",
					id: mediaPrismic.id,
				};

				switch (mediaPrismic.type) {
					case "component_media_full":
						result.field.principal = (mediaPrismic.data as ComponentMediaFullDocumentData).media_full as LinkToMediaField<"filled">;
						break;
					case "component_media_duo":
						result.field.principal = (mediaPrismic.data as ComponentMediaDuoDocumentData).media_left as LinkToMediaField<"filled">;
						result.field.secondary = (mediaPrismic.data as ComponentMediaDuoDocumentData).media_right as LinkToMediaField<"filled">;
						break;

					default:
						break;
				}

				return result;
			});

			const skills = projectPrismic.data.skills.map((obj) => {
				const result: SkillType = {
					name: obj.skill ?? "",
					id: useUID(),
				};

				return result;
			});

			const result: Project = {
				"id": projectPrismic.id,
				"date": projectPrismic.data.date ?? "",
				"images": [],
				"medias": medias,
				"description": projectPrismic.data.description,
				"title": projectPrismic.data.title ?? "",
				skills,
				"image-mobile": projectPrismic.data["image-mobile"],
				"url": projectPrismic.data.url ? projectPrismic.data.url : null,
			};

			return result;
		});

		return projects.filter((el): el is Project => el !== null); // Permet de filtrer les champs null
	}
}
export default ProjectsModule;
