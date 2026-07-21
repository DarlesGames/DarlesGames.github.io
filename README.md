# Darles Games

Единый статический сайт студии Darles Games на Astro. Он объединяет главный сайт, библиотеку проектов и интерактивное CV.

Основные маршруты:

- `/`, `/projects/`, `/cv/` — русская версия;
- `/en/`, `/en/projects/`, `/en/cv/` — английская версия;
- `/projects/[slug]/` и `/en/projects/[slug]/` — страницы, автоматически создаваемые из Markdown.

Проекты находятся в `src/content/projects/`, данные CV — в `src/content/cv/`, общие настройки и контакты — в `src/data/`.

## Команды

```sh
npm install
npm run build
npm run check
```

Для разработки запускайте сервер в фоновом режиме согласно `AGENTS.md`:

```sh
astro dev --background
astro dev status
astro dev logs
astro dev stop
```

`npm run check` выполняет production-сборку и затем проверяет обязательные маршруты и все внутренние `href`/`src` в статическом результате.
