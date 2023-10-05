// keys for Provide/Inject type
import { ImageField, LinkField } from "@prismicio/types";

// email key
export const emailKey = Symbol("Email key") as InjectionKey<string>;

// ending card image key
export const endingCardImageKey = Symbol(
  "EndingCard Key"
) as InjectionKey<ImageField>;

// Footer links key
export const FooterLinksKey = Symbol("Footer links key") as InjectionKey<
  { name: string; link: LinkField }[]
>;
