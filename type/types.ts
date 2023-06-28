import {
  LinkField,
  PrismicDocument,
  ImageField,
  RichTextField,
} from "@prismicio/types";

export type Settings = {
  accentColor: string; // Couleur formatée en HEX
  isDarkMode: boolean;
  firstName: string;
  lastName: string;
  email: string;
};

export type Images = {
  field: {
    [index: string]: ImageField;
  };
  type: "image-full" | "image-duo";
};

export type Project = {
  id: string;
  date: string;
  images: Images[];
  "short-description": RichTextField;
  "long-description": RichTextField;
  skills: { skill: string }[];
  title: string;
};

export type Header = {
  text: string;
  email: string;
};

export type Main = {
  about: {
    fullName: String;
    prismic: PrismicDocument;
  };
  projects: Project[];
};

export type Footer = {
  links: { name: string; link: LinkField }[];
};
