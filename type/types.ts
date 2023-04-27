import { RichTextField, ImageField } from "@prismicio/types";

export type HeaderLinkType = {
  url: string;
  text: string;
  target: "_blank" | "_self" | "_parent" | "_top";
};

export type ProjectType = {
  name: string;
  year: number;
  about: {
    skills: string[];
    content: string;
  };
  images: {
    url: string;
  }[];
};

export type ProjectPrismicType = {
  date: string;
  description: RichTextField;
  images: { image: ImageField }[];
  skills: any[];
  title: any[];
};
