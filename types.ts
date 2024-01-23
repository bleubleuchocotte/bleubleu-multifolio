import type { Content, ImageField, KeyTextField, RichTextField } from "@prismicio/client";

export type ProjectWithId = Content.ProjetDocumentData & { id: string };

export type AboutMe = {
	imageOfMe: ImageField
	description: RichTextField
	email: KeyTextField
	links: Content.WebsiteDocumentDataLinksItem[]
	firstName: KeyTextField
	lastName: KeyTextField
};

export type HomepageProps = {
	desktop: {
		projects: ProjectWithId[]
		endingCardImage: ImageField
		aboutMe: AboutMe
	}
	mobile: {
		projects: ProjectWithId[]
		aboutMe: AboutMe
	}
};

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
