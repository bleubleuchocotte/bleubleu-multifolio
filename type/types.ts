import { LinkField, ImageField, RichTextField } from "@prismicio/types";

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
  description: RichTextField;
  skills: { skill: string }[];
  title: string;
  "image-mobile": ImageField | null;
  url: LinkField | null;
};

/**
 * D'après la doc de lenis :
 * number: value to scroll in pixels
 * string: CSS selector or keyword (top, left, start, bottom, right, end)
 * HTMLElement: DOM element
 */
export type LenisTarget = number | string | HTMLElement;

export type ColorArrow = {
  background: string;
  arrow: string;
  border?: string;
};
