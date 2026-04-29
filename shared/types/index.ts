import type { ProjetDocumentData } from "~~/prismicio-types";

export type ProjectWithId = ProjetDocumentData & { id: string };

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
