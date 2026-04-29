# AGENTS.md

Guide for AI agents (Claude Code, Cursor, Copilot, Codex…) working on this repo.

## Project

**bleubleu-multifolio** — a Nuxt 4 multi-portfolio site for the Bleubleu studio. Content is sourced from Prismic CMS, the UI is bilingual (EN/FR), styling is SCSS, and scrolling/animations rely on Lenis and `vue3-marquee`.

## Tech stack

- **Nuxt** 4.4 / **Vue** 3.5 / **TypeScript** 6
- **Node** 24.15.0, **pnpm** 10.33.2 — versions pinned in [mise.toml](mise.toml) and [package.json](package.json) `engines`
- **Modules**: `@nuxtjs/prismic`, `@nuxtjs/i18n`, `@nuxtjs/seo`, `@nuxt/image`, `@nuxt/eslint`, `@vueuse/nuxt`
- **Runtime libs**: `lenis` (smooth scroll), `vue3-marquee`, `focus-trap`

## Setup & commands

Use [mise](https://mise.jdx.dev) to get the right Node/pnpm, then install:

```bash
mise install
pnpm install
```

Required env var: `PRISMIC_ENDPOINT` (Prismic repository name).

Scripts (from [package.json](package.json)):

- `pnpm dev` — Nuxt dev server
- `pnpm build` — production build (SSR)
- `pnpm generate` — static site generation
- `pnpm preview` — preview built site
- `pnpm lint` / `pnpm lint:fix` — ESLint
- `pnpm tc` — typecheck (vue-tsc via `nuxt typecheck`)
- `pnpm slicemachine` — open Prismic Slice Machine UI

Run `pnpm lint` and `pnpm tc` before committing.

## Repository layout

```
app/                      Nuxt 4 application root (srcDir)
  components/             Feature-grouped: UI/, Project/{Desktop,Mobile}/, Icon/, Error/
  pages/                  Flat routes: index.vue, legal-notice.vue, wip.vue, [...404].vue
  layouts/                default.vue, 404.vue
  composables/            Data-fetching composables wrapping the Prismic client
  plugins/                Vue3Marquee.client.ts
  middleware/             checkWIP.global.ts
  assets/styles/          SCSS (reset, base, lenis, main — main.scss auto-injected by Vite)
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
- **Styling**: `<style scoped lang="scss">`. The Vite config auto-injects `assets/styles/main.scss` into every SCSS block, so global mixins like `@include padding()` and media tokens like `#{$mobile-down}` are available without re-importing. Theme is driven by CSS variables set at runtime from Prismic options: `--border-color`, `--background-color`, `--accent-color`, `--text-color`.
- **i18n**: strategy is `no_prefix` — both locales share the same URLs and the language is switched via app state. Read keys in templates with `$t('page.x.y')`.

## Data fetching

Composables in `app/composables/` wrap the Prismic client and call `useAsyncData` with a stable key so Nuxt deduplicates fetches across the SSR + client lifecycle.

The Prismic `website` document is the source of truth for site config, the home page content, the projects list and the WIP state. A single fetch is performed by [useWebsite](app/composables/useWebsite.ts); four typed views derive from it without re-fetching:

- [useOptions](app/composables/useOptions.ts) — global config (colors, SEO, links, language). Throws a 500 if the document is unreachable.
- [useHome](app/composables/useHome.ts) — home page fields (`about-image`, `description`, `ending-card-image`).
- [useProjects](app/composables/useProjects.ts) — `projects` group mapped to `ProjectWithId[]`.
- [useWebsiteState](app/composables/useWebsiteState.ts) — `website_state` enum used by the WIP middleware.

The legal notice page lives in its own custom type and has its own composable: [useLegalNotice](app/composables/useLegalNotice.ts).

Usage:

```ts
const options = await useOptions();
const projects = await useProjects();
```

Do not reintroduce a Nuxt plugin to inject a data layer — auto-imported composables are the canonical pattern.

## Lint rules to keep in mind

From [eslint.config.mjs](eslint.config.mjs):

- `@typescript-eslint/no-unused-vars: error`, `@typescript-eslint/no-explicit-any: warn`
- `eqeqeq` (always `===`), `curly: all`, `no-nested-ternary`, `prefer-template`, `object-shorthand`
- `no-await-in-loop`
- `no-console` (only `warn`/`error`/`info` allowed)
- `vue/html-self-closing` (void elements self-close), `vue/no-useless-v-bind`
- `vue/multi-word-component-names: off` (so `index.vue`, `wip.vue`, etc. are fine)
- `**/*.generated.ts` is ignored

## Gotchas

- `assets/styles/main.scss` is auto-injected — re-importing it inside a component breaks builds with duplicate-symbol errors.
- [nuxt.config.ts](nuxt.config.ts) `compatibilityDate` is `2026-04-28`. Don't lower it.
- `robots.txt` (via `@nuxtjs/seo`) disallows `/legal-notice` and `/wip`; preserve that when changing routing.
- `legal-notice.vue` intentionally renders the same Prismic rich-text block many times to build a marquee band on desktop — only the first instance is exposed to assistive tech (`aria-hidden` on the rest). Don't "deduplicate" it.
