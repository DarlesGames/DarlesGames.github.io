---
name: manage-darles-website
description: Maintain and publish the Darles Games Astro website in `DarlesGames/DarlesGames.github.io` from Codex. Use when adding, editing, reordering, or removing bilingual project cards and detail pages; generating, preparing, or replacing project images; adding, renaming, or removing project-library categories such as HTML5 games, desktop games, tools, web cards, or invitations; changing site text, contacts, services, or links; or updating the interactive/classic CV and its referenced RU/EN PDF files. Inspect the live repository, preserve its architecture, validate the build and visual result, commit only intended files, push safely, monitor GitHub Pages deployment, and verify the public site.
---

# Manage Darles Website

Maintain the production site end to end. Work in the user's local clone through Git; do not prepare a manual copy-and-paste package.

## Target

- Repository: `https://github.com/DarlesGames/DarlesGames.github.io`
- Expected origin: `DarlesGames/DarlesGames.github.io`
- Public site: `https://darlesgames.github.io/`
- Default production branch: `main`
- Current stack: Astro static output, RU at `/`, EN under `/en/`, GitHub Actions deployment.

Read [references/site-map.md](references/site-map.md) for the current known content locations and change boundaries. Treat the repository itself as authoritative when it differs.

## Start safely

1. Resolve the repository root with `git rev-parse --show-toplevel` and confirm `remote.origin.url` points to the expected repository. Stop rather than editing a similarly named directory.
2. Read every applicable `AGENTS.md`, then `SITE_ARCHITECTURE.md`, `README.md`, `package.json`, `src/content.config.ts`, and the files involved in the request.
3. Inspect `git status --short --branch`, recent commits, and the relevant diff. Preserve unrelated user changes; never discard or overwrite them.
4. Fetch the remote. On a clean `main`, update only with a fast-forward. If local or remote history conflicts, stop and explain instead of rebasing, force-pushing, or guessing.
5. Search the live tree with `rg` or `rg --files`. Do not assume old `projects.js`, archived repositories, or cached paths still exist.
6. Confirm only facts that materially affect public claims, URLs, status, licensing, metrics, or identity. Ask at most three short questions if those facts are missing.

## Choose the publication path

- Use `main` for bounded content, card, image, category, link, contact, service, and CV-text updates after all checks pass.
- Use a feature branch and Pull Request for redesigns, routing changes, dependency upgrades, migrations, broad component rewrites, or changes to deployment. Merge only after verification or explicit user direction.
- Never force-push. Never push when checks fail, required facts are unresolved, or unrelated changes overlap the target files.

## Manage project cards

Treat one Markdown file in `src/content/projects/` as the source for both languages and the generated detail routes.

1. Read the live project schema and several neighboring entries before editing.
2. Resolve the card by filename/slug and title. Add when absent, update in place when present, and remove only when the user explicitly identifies the target.
3. Preserve the existing slug on updates. For new entries, use a unique stable kebab-case slug.
4. Keep RU and EN claims equivalent and natural. Do not invent platforms, technologies, clients, features, awards, metrics, release status, or results.
5. Populate every current required field. At present these include order, bilingual title/type/status label/short/details, category, status, featured, accent, cover, bilingual solutions, stack, and verified links.
6. Use `featured: false` unless the user explicitly selects the project for the home page. Keep ordering deliberate and avoid duplicate order values when practical.
7. Use only supplied or verified `http`/`https` links. Keep the links list empty when a public destination is unavailable.
8. Update CV `selectedProjects` only when the user also asks to change the selected CV portfolio.
9. Before deleting a card, search all references to its slug and cover. Remove an unreferenced cover only when deletion is explicit; report both deleted paths.

## Generate and add images

Use the available image-generation workflow when a new visual is requested or a project has no suitable supplied visual.

1. Inspect supplied screenshots, art, and repository images before generating or editing.
2. Prefer official project visuals. Generate from the factual project description only when suitable source art is absent or the user requests a new image.
3. Match the product's own identity. Do not impose Darles Games magic, Asteron, the studio logo, purple, or lime on unrelated client products.
4. Avoid text, badges, HUD copy, watermarks, platform logos, copyrighted characters, and unsupported mechanics unless explicitly requested and authorized.
5. Generate outside the repository, inspect the result, then crop/convert to WebP. Use 1600×900 for a standard project cover unless the live component or request requires another size.
6. Save project covers under `public/images/projects/<slug>.webp`, reuse the live compression convention, and keep filenames stable on updates.
7. Verify dimensions, format, crop, small-thumbnail readability, file size, and the exact `cover` reference after copying.
8. If image generation is unavailable, do not create a low-quality placeholder. Ask for an asset or provide the exact missing requirement.

## Manage project-library categories

Categories are structural filters, not separate duplicated card stores. Current known keys are `html5`, `desktop`, and `tools`.

When adding, renaming, or removing a category:

1. Choose or preserve a stable lowercase ASCII key. Change the visitor-facing RU/EN label independently of the key when only the displayed name changes.
2. Search for every use of the category key. Update the content schema enum, RU/EN labels, filter controls, filtering logic if needed, and affected project entries as one atomic change.
3. Prefer data-driven rendering when a bounded refactor removes duplicated hard-coded category lists without changing visual behavior.
4. When renaming a key, migrate every project using it and verify that the old key has no remaining live references.
5. When removing a category, require an explicit destination or deletion decision for every contained project. Never leave orphaned or invisible cards.
6. Keep “all projects,” search, empty states, accessibility labels, selected-filter behavior, and mobile layout working in both languages.

## Update site text, contacts, services, and links

- Use `src/data/` and the current content owners rather than hard-coding repeated copy into components.
- Update RU and EN together unless the user explicitly requests one locale only.
- Preserve JSON/schema validity, contact protocols, external-link safety attributes, and internal route conventions.
- Do not expose credentials, private client data, payment secrets, analytics keys, or unpublished commercial materials.
- Change components, layouts, pages, or styles only when the requested behavior cannot be expressed in the content/data layer or the user directly requests the structural/UI change.

## Update CV and PDFs

Treat CV maintenance as a content-only operation unless the user separately requests a design change.

1. Use the live files in `src/content/cv/` as the canonical content for the interactive and classic CV views.
2. Update RU and EN together, translating meaning rather than mechanically mirroring syntax. Keep claims factual and evidence-backed.
3. Do not change CV components, layout, styles, portrait, or brand images during a text-only CV request.
4. Validate all referenced project slugs, contact links, tool names, dates, roles, statistics, and public claims.
5. Read the `pdf` field in each locale and regenerate exactly the referenced RU and EN PDF files from the updated content. Do not update unreferenced legacy PDFs unless explicitly requested.
6. Use the built-in PDF workflow for regeneration and visual verification. Tell the user when this supporting skill is being used.
7. Keep the PDF professionally readable and semantically consistent with the classic/interactive version; identical layout is not required, identical public facts are.
8. Extract text from both PDFs and compare names, role, profile, skills, experience, projects, tools, contacts, and dates with the corresponding locale source. Render and inspect every page for clipping, overflow, broken glyphs, and links.
9. Do not consider a CV text change complete if either referenced PDF is stale or missing.

## Validate locally

1. Install dependencies only when needed. Prefer the repository lockfile and do not change dependencies for a content task.
2. Run the commands required by the live repository instructions. The current baseline is:

```bash
npm run check
npm run build
```

3. For card work, verify both generated detail routes, cover loading, links, filters, search data, and RU/EN copy.
4. For category or visible layout work, run the local Astro server in the repository-prescribed background mode and inspect desktop and mobile widths. Stop the server afterward.
5. For CV work, inspect `/cv/` and `/en/cv/` in interactive and classic modes plus both PDFs.
6. Review `git diff --check`, `git diff --stat`, and the complete intended diff. Ensure generated directories and dependencies such as `dist`, `.astro`, and `node_modules` are not staged.

## Commit, push, deploy, and verify

1. Stage only explicit intended paths; never use a broad staging command when unrelated changes exist.
2. Use one concise English commit message such as:
   - `feat(projects): add <slug>`
   - `content(projects): update <slug>`
   - `feat(projects): add <category> category`
   - `content(cv): update resume and PDFs`
3. Re-check the staged diff, commit, and push the current authorized branch. Do not claim publication before push succeeds.
4. For a `main` push, identify the GitHub Actions run for the pushed commit and monitor it to a successful conclusion. Use short polls and keep the user informed during longer waits.
5. After deployment, open the exact changed public routes with a cache-busting query when useful. Verify visible content, assets, internal links, language routes, and HTTP success.
6. If deployment or public verification fails, diagnose and fix only in-scope issues, then repeat checks and publish a follow-up commit. Do not hide failure behind a local success.

## Report the result

Lead with the production outcome. State:

- what changed;
- which RU/EN routes or cards were affected;
- whether both PDFs were regenerated when CV changed;
- local check result;
- commit and push result;
- GitHub Pages deployment and public verification result;
- any blocker or deliberately untouched item.

Do not return a ZIP or manual replacement snippets unless the user explicitly requests them.
