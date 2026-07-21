import { getCollection } from 'astro:content';

export async function GET() {
  const base = 'https://darlesgames.github.io';
  const projects = await getCollection('projects');
  const staticRoutes = ['/', '/projects/', '/cv/', '/en/', '/en/projects/', '/en/cv/'];
  const projectRoutes = projects.flatMap((project) => [
    `/projects/${project.id}/`,
    `/en/projects/${project.id}/`,
  ]);
  const urls = [...staticRoutes, ...projectRoutes]
    .map((route) => `<url><loc>${base}${route}</loc></url>`)
    .join('');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
