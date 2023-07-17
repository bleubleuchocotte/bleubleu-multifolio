import {
  LinkField,
  PrismicDocument,
  ImageField,
  RichTextField,
} from "@prismicio/types";

export type Settings = {
  accentColor: string; // Couleur formatée en HEX
  isDarkMode: boolean;
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

/**
 * D'après la doc de lenis :
 * number: value to scroll in pixels
 * string: CSS selector or keyword (top, left, start, bottom, right, end)
 * HTMLElement: DOM element
 */
export type LenisTarget = number | string | HTMLElement;
