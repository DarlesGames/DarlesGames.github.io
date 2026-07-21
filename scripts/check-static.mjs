import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const requiredRoutes = ['/', '/projects/', '/cv/', '/en/', '/en/projects/', '/en/cv/'];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function routeTarget(urlPath) {
  const clean = decodeURI(urlPath.split(/[?#]/, 1)[0]);
  const relative = clean.replace(/^\/+/, '');
  if (!relative || clean.endsWith('/')) return path.join(dist, relative, 'index.html');
  if (path.extname(relative)) return path.join(dist, relative);
  return path.join(dist, relative, 'index.html');
}

const missing = [];
const htmlFiles = walk(dist).filter((file) => file.endsWith('.html'));

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (!value.startsWith('/') || value.startsWith('//')) continue;
    const target = routeTarget(value);
    if (!fs.existsSync(target)) missing.push(`${path.relative(dist, file)} → ${value}`);
  }
}

for (const route of requiredRoutes) {
  const target = routeTarget(route);
  if (!fs.existsSync(target)) missing.push(`required route → ${route}`);
}

if (missing.length) {
  console.error(`Broken internal references (${missing.length}):\n${missing.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Static check passed: ${htmlFiles.length} HTML pages, no broken internal references.`);
}
