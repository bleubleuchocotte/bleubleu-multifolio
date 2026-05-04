import type { WebsiteDocument } from "~~/prismicio-types";

type LangCode = "en" | "fr";
type OgLocale = "en_US" | "fr_FR";

const LANG_MAP: Record<string, { html: LangCode; og: OgLocale }> = {
  Français: { html: "fr", og: "fr_FR" },
  English: { html: "en", og: "en_US" },
};

export function useSiteHead(options: WebsiteDocument | undefined) {
  const i18n = useI18n();
  const request = useRequestURL();

  const data = options?.data;
  const { html: htmlLang, og: ogLang } =
    LANG_MAP[data?.language ?? "English"] ?? LANG_MAP.English!;

  const cssVariables = [
    `--accent-color: ${data?.["accent-color"]}`,
    `--accent-color-80: ${data?.["accent-color"]}80`,
    `--text-accent-color: ${data?.["text-accent-color"]}`,
    `--text-color: ${data?.["text-color"]}`,
    `--background-color: ${data?.["background-color"]}`,
    `--border-color:${data?.["text-color"]}80`,
    `--background-color-70: ${data?.["background-color"]}B3`,
  ];

  useHead({
    htmlAttrs: { lang: htmlLang },
    style: [`:root{${cssVariables.join(";")}}`],
    link: [
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/font/Manrope-VariableFont_wght.woff2",
        crossorigin: "anonymous",
      },
    ],
  });

  useHeadSafe({
    link: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href:
          data?.["seo-favicon"].small.url ??
          `${request.origin}/default-favicon-16x16.png`,
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href:
          data?.["seo-favicon"].url ??
          `${request.origin}/default-favicon-32x32.png`,
      },
    ],
    meta: data?.custom_meta_tags.map((metaTag) => ({
      name: metaTag.meta_name?.toString(),
      content: metaTag.meta_content?.toString(),
    })),
  });

  useSeoMeta({
    ogType: "website",
    ogLocale: ogLang,
    twitterCard: "summary",

    colorScheme: data?.["accent-color"],
    themeColor: data?.["accent-color"],

    title: data?.["seo-title"],
    description: data?.["seo-description"],

    ogTitle: data?.["seo-title"],
    ogDescription: data?.["seo-description"],
    ogUrl: request.origin + request.pathname,
    ogImage: {
      url: data?.["og-image"].url ?? "",
      width: data?.["og-image"].dimensions?.width ?? "",
      height: data?.["og-image"].dimensions?.height ?? "",
    },

    publisher: `${data?.["first-name"]} ${data?.["last-name"]}`,
  });

  // Switch the locale last: i18n.setLocale() is async and awaiting it inside
  // setup loses the Nuxt instance context for any composable called after
  // (visible as "useNuxtApp called outside" when SWR re-renders the route).
  return i18n.setLocale(htmlLang);
}
