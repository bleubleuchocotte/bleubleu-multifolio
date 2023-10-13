import { LinkField, ImageField, RichTextField } from "@prismicio/types";
import { Client } from "@prismicio/client";

export type WebsiteType = {
  colors: {
    "accent-color": string;
    "background-color": string;
    "text-color": string;
    "text-accent-color": string;
  };
  header: {
    text: string;
  };
  footer: {
    links: { name: string; link: LinkField }[];
  };
  me: {
    "first-name": string;
    "last-name": string;
    description: RichTextField;
    image: ImageField;
    email: string;
  };
  seo: {
    title: string;
    description: string;
    favicon: ImageField;
    og: {
      url: string;
      image: ImageField;
    };
  };

  "ending-card-image": ImageField;
};

class WebsiteModule {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getWebsite() {
    const { data: website } = await useAsyncData(() =>
      this.client.getSingle("website")
    );
    if (!website.value) {
      throw new Error("Prismic document could not be accessed");
    }

    const result: WebsiteType = {
      colors: {
        "accent-color": website.value.data["accent-color"] ?? "#000000",
        "background-color": website.value.data["background-color"] ?? "#ffffff",
        "text-color": website.value.data["text-color"] ?? "#000000",
        "text-accent-color":
          website.value.data["text-accent-color"] ?? "#ffffff",
      },
      header: {
        text: website.value.data["text-header"] ?? "Undefined value",
      },
      footer: {
        links: website.value.data.links,
      },
      me: {
        "first-name": website.value.data["first-name"] ?? "Undefined value",
        "last-name": website.value.data["last-name"] ?? "Undefined value",
        description: website.value.data.description ?? "Undefined value",
        email: website.value.data.email ?? "Undefined value",
        image: website.value.data["about-image"] ?? null,
      },
      seo: {
        title: website.value.data["seo-title"] ?? null,
        description: website.value.data["seo-description"] ?? null,
        favicon: website.value.data["seo-favicon"] ?? null,
        og: {
          url: website.value.data["og-url"] ?? null,
          image: website.value.data["og-image"] ?? null,
        },
      },
      "ending-card-image": website.value.data["ending-card-image"] ?? null,
    };
    return result;
  }

  async getPage(name: string) {
    const { data: page } = await useAsyncData(() =>
      this.client.getSingle(name)
    );

    if (!page.value) {
      throw new Error("Prismic document could not be accessed");
    }

    type PageType = {
      me: {
        "first-name": string;
        "last-name": string;
        address: string;
        email: string;
        phone: string;
        tva: string | null;
      };
      host: {
        name: string;
        address: string;
        phone: string;
      };
    };

    const pageInformation: PageType = {
      me: {
        "first-name": page.value.data["me-first-name"] ?? "Undefined value",
        "last-name": page.value.data["me-last-name"] ?? "Undefined value",
        address: page.value.data["me-address"] ?? "Undefined value",
        email: page.value.data["me-email"] ?? "Undefined value",
        phone: page.value.data["me-phone-number"] ?? "Undefined value",
        tva: page.value.data["me-tva-number"],
      },
      host: {
        name: page.value.data["host-name"] ?? "Undefined value",
        address: page.value.data["host-address"] ?? "Undefined value",
        phone: page.value.data["host-phone-number"] ?? "Undefined value",
      },
    };

    return pageInformation;
  }
}

export default WebsiteModule;
