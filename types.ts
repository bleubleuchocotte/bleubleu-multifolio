import type { Content } from "@prismicio/client";

export type ProjectWithId = Content.ProjetDocumentData & { id: string };

/**
 * D'après la doc de lenis :
 * number: value to scroll in pixels
 * string: CSS selector or keyword (top, left, start, bottom, right, end)
 * HTMLElement: DOM element
 */
export type LenisTarget = number | string | HTMLElement;

export type ColorArrow = {
	background: string
	arrow: string
	border?: string
};

export type CursorIconType =
	| "IconArrowRight"
	| "IconArrowLeft"
	| "IconFullscreen"
	| "IconArrowRightUp"
	| "IconBaseToward"
	| "IconBaseTowardReverse"
	| null;
