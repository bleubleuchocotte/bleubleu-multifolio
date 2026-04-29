# Multifolio 💙

Site Nuxt 4 multi-portfolios pour le studio Bleubleu. Le contenu est piloté depuis Prismic, l'UI est bilingue (EN/FR), et les animations s'appuient sur Lenis et `vue3-marquee`.

> Pour les conventions techniques (Vue, TypeScript, tests, error handling…), se référer à [AGENTS.md](AGENTS.md). Ce fichier couvre uniquement la prise en main et le déploiement.

## Sommaire

1. [Prérequis](#prérequis)
2. [Setup](#setup)
3. [Scripts](#scripts)
4. [Variables d'environnement](#variables-denvironnement)
5. [Workflow Prismic / GitHub / Hébergeur](#workflow-prismic--github--hébergeur)
6. [Déploiement](#déploiement)

## Prérequis

- [mise](https://mise.jdx.dev) pour piloter les versions de Node et pnpm.
- Un compte [Prismic](https://prismic.io/) avec accès au repo Multifolio.

Les versions sont épinglées dans [mise.toml](mise.toml) et [package.json](package.json) (`engines`) :

- Node `24.15.0`
- pnpm `10.33.2`

## Setup

```bash
mise install        # installe Node + pnpm aux versions épinglées
mise exec -- pnpm install
```

`pnpm` et `node` ne sont pas sur le `PATH` par défaut — ils sont fournis par mise. Préfixer toutes les commandes par `mise exec --`.

Créer ensuite un fichier `.env` à partir de [`.env.example`](.env.example) avec votre `PRISMIC_ENDPOINT`.

## Scripts

| Commande | Description |
| --- | --- |
| `mise exec -- pnpm dev` | Serveur de développement Nuxt |
| `mise exec -- pnpm build` | Build de production (SSR) |
| `mise exec -- pnpm generate` | Génération statique du site |
| `mise exec -- pnpm preview` | Preview du build local |
| `mise exec -- pnpm lint` / `lint:fix` | ESLint |
| `mise exec -- pnpm tc` | Typecheck (`nuxt typecheck` / vue-tsc) |
| `mise exec -- pnpm test` | Tous les projets Vitest (unit + e2e) |
| `mise exec -- pnpm test:unit` / `test:e2e` | Un seul projet Vitest |
| `mise exec -- pnpm slicemachine` | UI Prismic Slice Machine |

Avant chaque commit : `pnpm lint`, `pnpm tc`, `pnpm test`.

## Variables d'environnement

| Variable | Obligatoire | Rôle |
| --- | --- | --- |
| `PRISMIC_ENDPOINT` | ✅ | Nom du repository Prismic (sans le `.cdn.prismic.io`). |
| `NUXT_SITE_URL` | en prod | URL canonique du site, utilisée par `@nuxtjs/seo` (sitemap, robots, canonical). |
| `NUXT_SITE_NAME` | recommandé | Nom du site exposé dans les meta SEO. |

Voir [`.env.example`](.env.example) pour le template.

## Workflow Prismic / GitHub / Hébergeur

### Première installation

1. **Prismic** — créer un espace, cloner les `customtypes` depuis le repo officiel, et remplir au moins une entrée de chaque type.
2. **GitHub** — créer une branche `website/prenom-nom` depuis la dernière release.
3. **Hébergeur** — déployer la branche, configurer les variables d'environnement (cf. tableau ci-dessus).

### Mise à jour d'un site existant

1. **Prismic** — synchroniser les `customtypes` si la release change la structure.
2. **GitHub** — rebaser la branche `website/prenom-nom` sur la dernière release.
3. **Hébergeur** — aucune action particulière, le redéploiement se déclenche au push.

## Déploiement

Le projet est conçu pour Netlify mais reste compatible avec n'importe quel hébergeur Node compatible Nuxt.

- **Build command** : `mise exec -- pnpm build` (SSR) ou `mise exec -- pnpm generate` (statique).
- **Publish directory** : `.output/public` (SSR) ou `.output/public` (statique également pour Nuxt).
- **Variables d'environnement** : `PRISMIC_ENDPOINT` (obligatoire), `NUXT_SITE_URL`, `NUXT_SITE_NAME`.
- **Node version** : `24.15.0` (déclarer via le fichier de config de l'hébergeur ou la variable `NODE_VERSION`).
