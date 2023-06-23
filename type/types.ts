import { LinkField, PrismicDocument } from "@prismicio/types";

export type Settings = {
  accentColor: string; // Couleur formatée en HEX
  isDarkMode: boolean;
  firstName: string;
  lastName: string;
  email: string;
};

export type Header = {
  text: string;
  email: string;
};

export type Main = {
  about: PrismicDocument;
  projects: PrismicDocument[];
};

export type Footer = {
  links: { name: string; linl: LinkField };
};
