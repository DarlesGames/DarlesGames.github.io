# Darles Games Unified Website — Astro v1.0

## 1. Назначение репозитория

`DarlesGames.github.io` — единый публичный сайт Darles Games.

## 2. Основные маршруты

- `/`
- `/projects/`
- `/cv/`
- `/en/`
- `/en/projects/`
- `/en/cv/`
- `/projects/[slug]/`
- `/en/projects/[slug]/`

## 3. Назначение каталогов

- `src/pages/` — маршруты страниц;
- `src/components/` — повторно используемые компоненты;
- `src/layouts/` — общие шаблоны страниц;
- `src/content/projects/` — Markdown-файлы проектов;
- `src/content/cv/` — данные и содержимое CV;
- `src/data/` — услуги, контакты и настройки сайта;
- `src/styles/` — глобальные стили;
- `public/images/` — изображения;
- `.github/workflows/` — автоматический деплой.

## 4. Стабильные правила архитектуры

- Сайт собирается через Astro.
- `output` должен оставаться `static`.
- `base` не используется.
- GitHub Pages публикуется через GitHub Actions.
- Папки `dist`, `node_modules` и `.astro` не коммитятся.
- Проекты создаются из Astro Content Collections.
- Русский язык используется без префикса.
- Английская версия находится под `/en/`.

## 5. Файлы, которые разрешено изменять навыку `manage-darles-website`

- `src/content/projects/`
- `src/content/cv/`
- `src/data/`
- `public/images/projects/`

## 6. Файлы, которые навык не должен менять без отдельного прямого запроса

- `src/components/`
- `src/layouts/`
- `src/styles/`
- `src/pages/`
- `astro.config.mjs`
- `package.json`
- `package-lock.json`
- `.github/workflows/`

## 7. Правило обновления контента

1. Изменить файлы контента.
2. Выполнить `npm run check`.
3. Выполнить `npm run build`.
4. Создать commit.
5. Выполнить push в `main`.
6. Дождаться успешного GitHub Actions deploy.

## 8. Правило крупных изменений

1. Создать отдельную feature-ветку.
2. Выполнить локальную проверку.
3. Создать Pull Request.
4. Объединить с `main` только после проверки.


## 09. Правило проектов

- Каждый проект должен иметь русскую и английскую версии.
- `slug` обеих версий должен совпадать.
- Обязательны название, описание, категория, порядок, обложка и ссылки.
- `featured` используется для избранных проектов.
- Изменение карточек не должно требовать ручного редактирования страниц.

