import type { ImageField, LinkField, LinkToMediaField, RichTextField } from "@prismicio/client";

export type ImageType = {
	field: {
		[index: string]: ImageField
	}
	type: "image-full" | "image-duo"
	id: string
};
export type MediaType = {
	field: {
		[index: string]: ImageField | LinkToMediaField<"filled">
	}
	type: "media-full" | "media-duo"
	id: string
};

export type SkillType = {
	name: string
	id: string
};

export type Project = {
	id: string
	date: string
	images: ImageType[]
	medias: MediaType[]
	description: RichTextField
	skills: SkillType[]
	title: string
	"image-mobile": ImageField | null
	url: LinkField | null
};

export type LinkType = {
	name: string
	link: LinkField
	id: string
};

export type WebsiteType = {
	colors: {
		"accent-color": string
		"background-color": string
		"text-color": string
		"text-accent-color": string
	}
	header: {
		text: string
	}
	footer: {
		links: LinkType[]
	}
	me: {
		"first-name": string
		"last-name": string
		description: RichTextField
		image: ImageField
		email: string
	}
	seo: {
		title: string
		description: string
		favicon: ImageField
		og: {
			url: string
			image: ImageField
		}
	}

	"ending-card-image": ImageField
};

export type TheAboutMeType = {
	me: {
		"first-name": string
		"last-name": string
		description: RichTextField
		image: ImageField
		email: string
	}
	links: LinkType[]
};

export type HomePageProps = {
	desktop: {
		projects: Project[]
		content: {
			about: TheAboutMeType
			endindCardImage: ImageField
		}
	}
	mobile: {
		projects: Project[]
		content: TheAboutMeType
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
