import { Client } from "@prismicio/client";
import { PrismicDocument } from "@prismicio/types";

import { useAsyncData } from "#imports";
import { ImageType, Project, SkillType } from "type/types";

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
              images {
                image {
                  ...on image-full {
                    ...image-fullFields
                  }
                  ...on image-duo {
                    ...image-duoFields
                  }
                }
              }
              image-mobile
            }
          }
        }
      }`,
      })
    );

    if (!prismicProjects.value) {
      throw new Error("Project could not be loaded");
    }

    const projects: Array<Project | null> =
      prismicProjects.value.data.projects.map(
        (el: { project: PrismicDocument }) => {
          if (!el.project.data) {
            // Si un champ n'a pas été remplie, renvoi null
            return null;
          }

          const images = (
            el.project.data.images as { image: PrismicDocument }[]
          ).map((img) => {
            if (
              img.image.type !== "image-duo" &&
              img.image.type !== "image-full"
            ) {
              throw new Error("Error type image");
            }

            const result: ImageType = {
              field: img.image.data,
              type: img.image.type,
              id: img.image.id,
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
            }
          );

          const result: Project = {
            id: el.project.id,
            date: el.project.data.date,
            images,
            description: el.project.data.description,
            title: el.project.data.title,
            skills,
            "image-mobile": el.project.data["image-mobile"],
            url: el.project.data.url ? el.project.data.url : null,
          };

          return result;
        }
      );

    return projects.filter((el): el is Project => el !== null); // Permet de filtrer les champs null
  }
}
export default ProjectsModule;
