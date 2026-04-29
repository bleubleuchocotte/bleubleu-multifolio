import type {
  Content,
  KeyTextField,
  ImageField,
  RichTextField,
} from "@prismicio/client";

export type ProjectWithId = Content.ProjetDocumentData & { id: string };

export type AboutMe = {
  imageOfMe: ImageField;
  description: RichTextField;
  email: KeyTextField;
  links: Content.WebsiteDocumentDataLinksItem[];
  firstName: KeyTextField;
  lastName: KeyTextField;
};

export type ColorArrow = {
  background: string;
  arrow: string;
  border?: string;
};

export type CursorIconType =
  | "IconArrowRight"
  | "IconArrowLeft"
  | "IconFullscreen"
  | "IconArrowRightUp"
  | "IconBaseToward"
  | "IconBaseTowardReverse"
  | null;
