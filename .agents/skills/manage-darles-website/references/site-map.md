# Darles Games website map

Use this as a quick orientation only. Re-read the live repository before every change.

## Production contract

- Repository: `DarlesGames/DarlesGames.github.io`
- Production branch: `main`
- Site: `https://darlesgames.github.io/`
- Framework: Astro, static output
- Locales: Russian without a prefix; English under `/en/`
- Deployment: GitHub Actions to GitHub Pages after a push to `main`

## Current routes

- `/` and `/en/`
- `/projects/` and `/en/projects/`
- `/projects/[slug]/` and `/en/projects/[slug]/`
- `/cv/` and `/en/cv/`

## Current content owners

| Concern | Primary location |
| --- | --- |
| Project schema and category enum | `src/content.config.ts` |
| Project records | `src/content/projects/*.md` |
| Project covers | `public/images/projects/*.webp` |
| Project catalog filters | `src/pages/projects/index.astro` |
| Project labels and general copy | `src/data/site.json` |
| CV RU/EN content | `src/content/cv/ru.md`, `src/content/cv/en.md` |
| CV interactive/classic rendering | `src/layouts/CvLayout.astro` |
| Referenced CV PDFs | path declared by each CV file's `pdf` field, currently under `public/documents/` |
| Contacts | `src/data/contacts.json` |
| Services | `src/data/services.json` |
| Shared components | `src/components/` |
| Routes | `src/pages/` |
| Styles | `src/styles/` |
| Static integrity check | `scripts/check-static.mjs` |
| Deployment | `.github/workflows/deploy.yml` |

## Stable boundaries

Content work normally stays inside:

- `src/content/projects/`
- `src/content/cv/`
- `src/data/`
- `public/images/projects/`
- the PDF paths referenced by the live CV files

A category addition or key migration also needs the live schema and catalog filter implementation. A text-only CV request must not alter layout, styling, or portraits.

Require a feature branch and Pull Request for broad changes to components, layouts, styles, routes, dependencies, Astro configuration, or deployment. A direct user request may authorize those changes but does not remove the branch and validation requirement.

## Current project record shape

The current collection stores one bilingual project per Markdown file with JSON frontmatter. Known fields:

- `order`
- `title.ru`, `title.en`
- `category`: currently `html5`, `desktop`, or `tools`
- `type.ru`, `type.en`
- `status`: currently `released`, `development`, or `internal`
- `statusLabel.ru`, `statusLabel.en`
- `featured`
- `accent`
- `cover`
- `short.ru`, `short.en`
- `details.ru`, `details.en`
- `solutions.ru[]`, `solutions.en[]`
- `stack[]`
- `links[]` with bilingual labels and an absolute URL

Never extend this cached shape without reading `src/content.config.ts` first.

## Current CV/PDF contract

- Both CV locale files feed the interactive and classic HTML views.
- Each locale file declares the downloadable PDF path.
- A text update is complete only when both locale files and their referenced PDFs express the same current facts.
- Legacy unreferenced PDFs may remain in `public/documents/`; do not update or delete them without an explicit request.

## Publication gate

At minimum, require a clean intended diff, successful repository checks, successful push, successful Pages workflow for the pushed commit, and public-route verification. Local build success alone is not publication.
