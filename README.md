# Darles Games

A unified static website for Darles Games studio on Astro. It combines the main website, project library, and interactive CV.

Main routes:

- `/`, `/projects/`, `/cv/` — Russian version;
- `/en/`, `/en/projects/`, `/en/cv/` — English version;
- `/projects/[slug]/` and `/en/projects/[slug]/` — pages automatically generated from Markdown.

Projects are located in `src/content/projects/`, CV data is in `src/content/cv/`, general settings and contacts are in `src/data/`.

## Commands

```sh
npm install
npm run build
npm run check
```

For development, run the server in the background according to `AGENTS.md`:

```sh
astro dev --background
astro dev status
astro dev logs
astro dev stop
```

`npm run check` performs a production build and then checks the required routes and all internal `href`/`src` in the static output.
