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

`pnpm` and `node` are not on the default shell `PATH` — they are provided by mise. Agents must prefix every invocation with `mise exec --` (e.g. `mise exec -- pnpm lint`, `mise exec -- pnpm tc`) instead of calling `pnpm`/`node` directly.

Required env var: `PRISMIC_ENDPOINT` (Prismic repository name).

Scripts (from [package.json](package.json)):

- `pnpm dev` — Nuxt dev server
- `pnpm build` — production build (SSR)
- `pnpm generate` — static site generation
- `pnpm preview` — preview built site
- `pnpm lint` / `pnpm lint:fix` — ESLint
- `pnpm tc` — typecheck (vue-tsc via `nuxt typecheck`)
- `pnpm test` — run all Vitest projects (`nuxt` unit + `e2e`)
- `pnpm test:watch` — Vitest in watch mode
- `pnpm test:unit` / `pnpm test:e2e` — run a single project
- `pnpm slicemachine` — open Prismic Slice Machine UI

Run `pnpm lint`, `pnpm tc` and `pnpm test` before committing.

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
shared/errors.ts          AppErrorCode union — typed error codes used across the app
i18n/locales/             en.json, fr.json
customtypes/  slices/     Prismic Slice Machine sources
prismicio-types.d.ts      Auto-generated — do not edit
test/nuxt/                Vitest specs running in the Nuxt environment (auto-imports, mocks)
test/e2e/                 SSR / browser specs ($fetch, Playwright)
vitest.config.ts          Two-project Vitest config (nuxt + e2e)
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

## Error handling

Typed error codes live in [shared/errors.ts](shared/errors.ts) (`AppErrorCode` union) and are paired with auto-imported helpers in [app/utils/errors.ts](app/utils/errors.ts).

- `throwAppError(code, statusCode, statusMessage)` — the canonical way for composables to abort with a Nuxt error. It builds `createError({ statusCode, statusMessage, data: { code } })`, so `error.value.data.code` is type-narrowed downstream.
- `isAppError(err)` — type guard for `error.vue` / `404.vue` to display a localized message conditioned by `err.data.code`.

Composables must not call `createError` directly. Add a new variant to `AppErrorCode` instead, then call `throwAppError`:

```ts
// app/composables/useOptions.ts
if (error.value || !data.value) {
  throwAppError("PRISMIC_UNREACHABLE", 500, "Could not reach options");
}
```

## Testing

Stack: **Vitest** + **@nuxt/test-utils**. The Nuxt environment provides auto-imports and `mockNuxtImport` for stubbing them.

### Layers

Each behaviour is tested at the **lowest possible level** — only move up if the lower layer cannot cover the case.

| Layer                                      | Tool                              | Covers                                                           |
| ------------------------------------------ | --------------------------------- | ---------------------------------------------------------------- |
| Unit (`test/nuxt/*.nuxt.spec.ts`)          | Vitest, `mockNuxtImport`          | Composables (mapping, error throwing), middleware logic, component interactions |
| SSR (`test/e2e/*.spec.ts` — `$fetch`)      | `@nuxt/test-utils`                | Routes return 200 and contain critical HTML (e.g. `/`, `/legal-notice`, `/wip`) |
| Browser (`test/e2e/*.spec.ts` — `createPage`) | Playwright                     | Cases that genuinely need a real browser (Lenis scroll, focus-trap, marquee viewport) |

### What to test

- **Business contracts, not static copy.** Asserting that `<h1>` contains a Prismic-driven title is a fragile test against content. Asserting that `useProjects` maps the group to `ProjectWithId[]` with a stable `id` is a contract.
- **Mapping & error paths** for every composable. The four specs in [test/nuxt/](test/nuxt/) are the templates — copy them when adding a new composable.
- **Middleware behaviour** (redirect, abortNavigation, SEO meta) — mock `useWebsiteState`, `navigateTo`, `abortNavigation`, `useSeoMeta`, and the `useState` cell when relevant.

### Mocking auto-imports

`mockNuxtImport` replaces an auto-imported symbol. Use it at the top of the file (it is hoisted):

```ts
mockNuxtImport("useWebsite", () => {
  return () => Promise.resolve({ data: ref({ … }), error: ref(null) });
});
```

The factory must return the composable itself — Nuxt calls it once and caches the result.

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

- `assets/styles/main.scss` is auto-injected — re-importing it inside a component breaks builds with duplicate-symbol errors.
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
- **`endpoint` option is missing and `~/prismic/client` was not found** in dev/test — the `.env` file is absent or `PRISMIC_ENDPOINT` is empty. The Prismic module disables itself silently; data composables will throw a 500 via `throwAppError("PRISMIC_UNREACHABLE", ...)`.
- **Sitemap / robots not respecting locale** — `@nuxtjs/seo` reads `NUXT_SITE_URL` at runtime. Set it on the host or the canonical URLs and sitemap entries fall back to `localhost`.
