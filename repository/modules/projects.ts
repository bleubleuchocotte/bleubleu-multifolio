import { Client } from "@prismicio/client";
import { PrismicDocument } from "@prismicio/types";

import { useAsyncData } from "#imports";

class ProjectsModule {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getAllProjects() {
    const { data: prismicProjects } = await useAsyncData("getAllProjects", () =>
      this.client.getAllByType("projet")
    );
    if (!prismicProjects.value) {
      throw new Error("Prismic document could not be accessed");
    }

    return prismicProjects.value;
  }

  async getImagesFromProject(project: PrismicDocument) {
    // On récupère l'id non null de toutes les images
    const ids: string[] = project.data.images
      .map((a: any) => a.image.id ?? "")
      .filter((el: string) => el !== "");
    const { data: images } = await useAsyncData(project.id, () =>
      this.client.getAllByIDs(ids)
    );
    if (images.value === null) {
      throw new Error("Prismic document could not be accessed");
    }

    return images.value;
  }
}
export default ProjectsModule;
