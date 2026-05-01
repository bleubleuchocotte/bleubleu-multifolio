# AGENTS.md

Guide for AI agents (Claude Code, Cursor, Copilot, Codex…) working on this repo.

## Project

**bleubleu-multifolio** — a Nuxt 4 multi-portfolio site for the Bleubleu studio. Content is sourced from Prismic CMS, the UI is bilingual (EN/FR), styling is Tailwind CSS v4, and scrolling/animations rely on Lenis and `vue3-marquee`.

## Tech stack

- **Nuxt** 4.4 / **Vue** 3.5 / **TypeScript** 6
- **Node** 24.15.0, **pnpm** 10.33.2 — versions pinned in [mise.toml](mise.toml) and [package.json](package.json) `engines`
- **Modules**: `@nuxtjs/prismic`, `@nuxtjs/i18n`, `@nuxtjs/seo`, `@nuxt/image`, `@nuxt/eslint`, `@vueuse/nuxt`
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` (CSS-first, no `tailwind.config.js`)
- **Runtime libs**: `lenis` (smooth scroll), `vue3-marquee`, `focus-trap`

## Setup & commands

Use [mise](https://mise.jdx.dev) to get the right Node/pnpm, then install:

```bash
mise install
pnpm install
```

`pnpm` and `node` are not on the default shell `PATH` — they are provided by mise. Agents must prefix every invocation with `mise exec --` (e.g. `mise exec -- pnpm lint`, `mise exec -- pnpm tc`) instead of calling `pnpm`/`node` directly.

Required env var: `PRISMIC_ENDPOINT` (Prismic repository name).

Scripts (from [package.json](package.json)):

- `pnpm dev` — Nuxt dev server
- `pnpm build` — production build (SSR)
- `pnpm generate` — static site generation
- `pnpm preview` — preview built site
- `pnpm lint` / `pnpm lint:fix` — ESLint (`lint` reports, `lint:fix` autofixes)
- `pnpm format` — Prettier on the whole repo (config: 2-space indent, trailing commas; ignores in [.prettierignore](.prettierignore))
- `pnpm tc` — typecheck (vue-tsc via `nuxt typecheck`)
- `pnpm slicemachine` — open Prismic Slice Machine UI

Run `pnpm format`, `pnpm lint` and `pnpm tc` before committing. There is no automated test suite — verify changes manually in the browser.

## Repository layout

```
app/                      Nuxt 4 application root (srcDir)
  components/             Feature-grouped: UI/, Project/{Desktop,Mobile}/, Icon/, Error/
  pages/                  Flat routes: index.vue, legal-notice.vue, wip.vue, [...404].vue
  layouts/                default.vue, 404.vue
  composables/            usePrismicClient (data fetching) + useLegalNotice
  plugins/                Vue3Marquee.client.ts
  middleware/             checkWIP.global.ts
  assets/styles/          tailwind.css (theme + utilities + base layer) and lenis.css
  app.vue                 Root; injects theme CSS variables from Prismic options
shared/types/index.ts     Shared TS types (re-exports Prismic-generated types)
i18n/locales/             en.json, fr.json
customtypes/  slices/     Prismic Slice Machine sources
prismicio-types.d.ts      Auto-generated — do not edit
```

## Conventions

- **Vue**: `<script setup lang="ts">` only — no Options API.
- **Auto-imports** are enabled. Do not manually import `ref`, `computed`, `useState`, `useAsyncData`, `useNuxtApp`, `useMediaQuery`, etc.
- **Component naming**: PascalCase, with prefix conventions:
  - `The*` — page-level / singleton sections (`TheHeader`, `TheFooter.server.vue`)
  - `Base*` — reusable primitives, mostly under `components/UI/`
  - `Project*` — project-feature components
  - `Icon*` — SVG icons
- **Server components**: use the `*.server.vue` suffix (e.g. `TheFooter.server.vue`).
- **State**: no Pinia. Use `useState(key, init)` for shared state — see [app/components/UI/BaseAccordion.vue](app/components/UI/BaseAccordion.vue).
- **Styling**: Tailwind CSS v4, configured CSS-first in [app/assets/styles/tailwind.css](app/assets/styles/tailwind.css). Theme tokens (`text-accent`, `bg-background`, `border-border`, etc.) are bridged via `@theme inline` to runtime CSS variables (`--accent-color`, `--text-color`, `--background-color`, `--border-color`, …) injected from Prismic in [app.vue](app/app.vue) — change a Prismic color and every Tailwind class re-resolves. Fluid spacing/typography from the legacy SCSS are preserved as `--spacing-fluid`, `--radius-fluid`, `--font-fluid-*` cascading per breakpoint, exposed as `p-fluid`, `gap-fluid`, `m-fluid` (+ directional variants), `text-fluid-{p,h1..h4,cta,small,big,enormous}`, `rounded-fluid`. Custom variant `pointer-coarse:` matches `(pointer: coarse)`. Reach for `<style scoped>` only when Tailwind cannot reach the target (`:deep()` into a child component, `@keyframes`, `::before`/`::after` cascade).
- **Breakpoints**: aligned with the legacy SCSS — `xs` 480px, `sm` 768px, `md` 1024px, `lg` 1025px. Use `lg:` for "desktop only" and `max-lg:` / `max-sm:` for "mobile/tablet only".
- **i18n**: strategy is `no_prefix` — both locales share the same URLs and the language is switched via app state. Read keys in templates with `$t('page.x.y')`.

## Data fetching

Composables in `app/composables/` wrap the Prismic client and call `useAsyncData` with a stable key so Nuxt deduplicates fetches across the SSR + client lifecycle.

The single entry point is [usePrismicClient](app/composables/usePrismicClient.ts), which exposes two methods:

- `getWebsite()` — fetches the `website` Prismic document (source of truth for site config, home content, projects list and WIP state). Returns `useAsyncData(...)` transformed to the first result, so consumers read from `data.value?.data.<field>`.
- `getAllProjects()` — fetches every `projet` document.

The legal notice page lives in its own custom type and has its own composable: [useLegalNotice](app/composables/useLegalNotice.ts).

Usage:

```ts
const { getWebsite, getAllProjects } = usePrismicClient();
const { data: options } = await getWebsite();
const { data: projects } = await getAllProjects();

// Access fields through the Prismic document shape:
options.value?.data["accent-color"];
```

The same `useAsyncData` keys (`"GetWebsite"`, `"GetAllProjects"`, `"page_legal_notice"`) are used everywhere — keep them stable so Nuxt deduplicates between SSR and client hydration. Do not reintroduce a Nuxt plugin to inject a data layer — auto-imported composables are the canonical pattern.

## Formatting & lint

- **Prettier** is the formatter — run `pnpm format` to apply (2-space indent, trailing commas). Ignore patterns are in [.prettierignore](.prettierignore) (`.claude`, `.agents`, `slices`, `customtypes`, `pnpm-lock.yaml`, `prismicio-types.d.ts`).
- **ESLint** is configured in [eslint.config.mjs](eslint.config.mjs); run `pnpm lint` to report issues or `pnpm lint:fix` to apply autofixes.

## Lint rules to keep in mind

From [eslint.config.mjs](eslint.config.mjs):

- `@typescript-eslint/no-unused-vars: error`, `@typescript-eslint/no-explicit-any: error`
- `eqeqeq` (always `===`), `curly: all`, `no-nested-ternary`, `prefer-template`, `object-shorthand`
- `no-await-in-loop`
- `no-console` (only `warn`/`error`/`info` allowed)
- `vue/html-self-closing` (void elements self-close), `vue/no-useless-v-bind`
- `vue/multi-word-component-names: off` (so `index.vue`, `wip.vue`, etc. are fine)
- `**/*.generated.ts` is ignored

## Gotchas

- All theme colors come from Prismic at runtime via [app.vue](app/app.vue) — never hard-code hex values. Use `text-accent` / `bg-background` / `border-border` etc. so the tokens stay live.
- The fluid scale is exposed only as `*-fluid` utilities and the underlying CSS vars (`var(--spacing-fluid)`, `var(--radius-fluid)`). For partial coefficients, write arbitrary values like `p-[calc(var(--spacing-fluid)/2)]`; do **not** reach for the raw Tailwind spacing scale (`p-4`, `gap-6`) for layout — it breaks the responsive coefficient story.
- The keyframes `noise-anim` / `noise-anim-2` are declared once in [tailwind.css](app/assets/styles/tailwind.css) and consumed by `pages/wip.vue` and `Error/ErrorDefault.vue`. Don't redefine them locally.
- [nuxt.config.ts](nuxt.config.ts) `compatibilityDate` is `2026-04-28`. Don't lower it.
- `robots.txt` (via `@nuxtjs/seo`) disallows `/legal-notice` and `/wip`; preserve that when changing routing.
- `legal-notice.vue` intentionally renders the same Prismic rich-text block many times to build a marquee band on desktop — only the first instance is exposed to assistive tech (`aria-hidden` on the rest). Don't "deduplicate" it.
- `useState(key, () => ref(false))` produces a `Ref<Ref<T>>` whose `.value` is always a truthy Ref object. The factory must return the **value**, not a ref: `useState<boolean>(key, () => false)`.
- For DOM template refs, prefer `useTemplateRef("name")` over `ref<HTMLElement | null>(null)` — the element type is inferred from the template's `ref="name"` binding.

## Deployment

The site targets Netlify but works on any Node host that supports Nuxt 4 SSR or static output.

- **Build command**: `mise exec -- pnpm build` (SSR) or `mise exec -- pnpm generate` (static).
- **Publish directory**: `.output/public`.
- **Node version**: `24.15.0` — declare it via the host's config (e.g. `NODE_VERSION` env var on Netlify) so it matches [mise.toml](mise.toml) and `package.json` `engines`.
- **Required env vars**:
  - `PRISMIC_ENDPOINT` — Prismic repository name.
  - `NUXT_SITE_URL` — canonical site URL, consumed by `@nuxtjs/seo` (sitemap, robots, canonical).
  - `NUXT_SITE_NAME` — site name surfaced in SEO meta.

## Glossary

- **WIP state** — value of the Prismic `website_state` field on the `website` document, with three variants:
  - `Le site est indexable et disponible via la recherche google` — the site is fully public.
  - `Le site n'est pas indexable` — the site is reachable but `noindex, nofollow` is forced.
  - `Le site n'est pas indexable et présente une page temporaire de WIP` — production redirects everything to `/wip`.
- **Prismic endpoint** — the repository name (without `.cdn.prismic.io`) passed to `@nuxtjs/prismic` via the `PRISMIC_ENDPOINT` env var.
- **Slice Machine** — the Prismic UI for editing custom types and slices, opened with `pnpm slicemachine`. The generated `prismicio-types.d.ts` and `slices/` are checked in.
- **`*.server.vue`** — Nuxt server-component suffix. The component renders only on the server and ships zero JS to the client (e.g. [TheFooter.server.vue](app/components/TheFooter.server.vue)).
- **`useAsyncData` keys** — every composable that fetches Prismic data uses a stable string key so Nuxt deduplicates the call between SSR and client hydration. Don't change a key in a hot path.

## Troubleshooting

- **`mise exec -- not recognized`** — mise isn't installed or isn't on the shell `PATH`. Install via `curl https://mise.run | sh`, then `eval "$(~/.local/bin/mise activate <shell>)"`.
- **Prismic 404 / "not found"** during fetches — the `website` (or `page_legal_notice`) document is missing or has no UID. Open Prismic and ensure each custom type has at least one published entry, then rebuild.
- **`endpoint` option is missing and `~/prismic/client` was not found** in dev — the `.env` file is absent or `PRISMIC_ENDPOINT` is empty. The Prismic module disables itself silently; `usePrismicClient()` will fail because `usePrismic()` has no client.
- **Sitemap / robots not respecting locale** — `@nuxtjs/seo` reads `NUXT_SITE_URL` at runtime. Set it on the host or the canonical URLs and sitemap entries fall back to `localhost`.
