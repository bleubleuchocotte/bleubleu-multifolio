import {
  RichTextField,
  ImageField,
  LinkField,
  TitleField,
} from "@prismicio/types";

export type ProjectPrismicType = {
  date: string;
  description: RichTextField;
  images: { image: ImageField }[];
  skills: any[];
  title: any[];
};

export type HeaderPrismicType = {
  catchphrase: TitleField;
  links: { name: TitleField; link: LinkField; image: ImageField | {} }[];
  logo: ImageField;
};

export type FooterPrismicType = {
  text: RichTextField;
  links: { name: TitleField; link: LinkField; image: ImageField | {} }[];
};
