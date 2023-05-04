import {
  RichTextField,
  ImageField,
  LinkField,
  TitleField,
} from "@prismicio/types";

export type LinkPrismicType = {
  name: TitleField;
  link: LinkField;
  image: ImageField | {};
};

export type ProjectPrismicType = {
  date: string;
  description: RichTextField;
  images: { image: ImageField }[];
  skills: any[];
  title: any[];
};

export type HeaderPrismicType = {
  catchphrase: TitleField;
  links: LinkPrismicType[];
  logo: ImageField;
};

export type FooterPrismicType = {
  text: RichTextField;
  links: LinkPrismicType[];
};
