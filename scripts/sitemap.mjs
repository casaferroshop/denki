#!/usr/bin/env node
/**
 * sitemap.xml <lastmod> refresher for Clínica Denki (static site).
 *
 * Keeps every <lastmod> equal to the real last-modification date of the HTML
 * file behind that URL, so the value is a fact instead of a hand-typed date.
 * Google discounts <lastmod> it believes is fabricated, and a stale value stops
 * the URL from being prioritised for recrawl.
 *
 * Date source, in order:
 *   1. uncommitted change in the working tree → today
 *   2. otherwise → committer date of the last commit that touched the file
 *
 * Usage:
 *   node scripts/sitemap.mjs
 *       → rewrite sitemap.xml in place
 *
 *   node scripts/sitemap.mjs --check
 *       → exit 1 if any <lastmod> is stale (for CI / pre-deploy)
 *
 *   node scripts/sitemap.mjs --dry-run
 *       → print what would change, write nothing
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const HOST = process.env.SITEMAP_HOST || 'www.clinicadenki.mx';
const ORIGIN = `https://${HOST}`;
const SITEMAP = join(ROOT, 'sitemap.xml');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const checkOnly = args.includes('--check');

function fail(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}

function git(argv) {
  return execFileSync('git', argv, {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

/** Map a public site path → the source file on disk that backs it. */
function urlToFile(url) {
  let path = url.replace(ORIGIN, '').split('?')[0].split('#')[0];
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1);

  if (path === '' || path === '/') return 'index.html';

  const rel = path.replace(/^\//, '');
  // Legal/static pages exist both as pages/<slug>/index.html and pages/<slug>.html
  for (const candidate of [`${rel}/index.html`, `${rel}.html`]) {
    if (existsSync(join(ROOT, candidate))) return candidate;
  }
  return null;
}

/** Files with uncommitted edits — their real mtime is "now", not the last commit. */
function dirtyFiles() {
  const out = new Set();
  try {
    for (const line of git(['status', '--porcelain']).split('\n')) {
      const f = line.slice(3).trim().split(' -> ').pop();
      if (f) out.add(f);
    }
  } catch {
    /* not a git repo — fall back to commit dates only */
  }
  return out;
}

function lastModified(file, dirty, today) {
  if (dirty.has(file)) return today;
  try {
    const iso = git(['log', '-1', '--format=%cI', '--', file]);
    if (iso) return iso.slice(0, 10);
  } catch {
    /* untracked — fall through */
  }
  return today;
}

function main() {
  if (!existsSync(SITEMAP)) fail('sitemap.xml not found at repo root.');

  let xml = readFileSync(SITEMAP, 'utf8');
  const today = new Date().toISOString().slice(0, 10);
  const dirty = dirtyFiles();

  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
  if (!blocks.length) fail('No <url> entries found in sitemap.xml.');

  const stale = [];
  const missing = [];

  for (const block of blocks) {
    const loc = block.match(/<loc>\s*([^<\s]+)\s*<\/loc>/)?.[1];
    if (!loc || !loc.startsWith(ORIGIN)) continue;

    const file = urlToFile(loc);
    if (!file) {
      missing.push(loc);
      continue;
    }

    const current = block.match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/)?.[1];
    const actual = lastModified(file, dirty, today);
    if (current === actual) continue;

    stale.push({ loc, from: current ?? '(none)', to: actual });
    const updated = current
      ? block.replace(
          /<lastmod>\s*[^<\s]+\s*<\/lastmod>/,
          `<lastmod>${actual}</lastmod>`
        )
      : block.replace(
          /(<\/loc>)/,
          `$1\n    <lastmod>${actual}</lastmod>`
        );
    xml = xml.replace(block, updated);
  }

  for (const loc of missing) {
    console.warn(`warn: no source file found for ${loc}`);
  }

  if (!stale.length) {
    console.log(`sitemap.xml up to date (${blocks.length} URLs).`);
    return;
  }

  for (const s of stale) {
    console.log(`  ${s.from} -> ${s.to}  ${s.loc.replace(ORIGIN, '') || '/'}`);
  }

  if (checkOnly) {
    console.error(
      `\n${stale.length} stale <lastmod> of ${blocks.length}. Run: npm run sitemap`
    );
    process.exit(1);
  }

  if (dryRun) {
    console.log(`\n[--dry-run] ${stale.length} would change, nothing written.`);
    return;
  }

  writeFileSync(SITEMAP, xml);
  console.log(`\nsitemap.xml updated: ${stale.length} of ${blocks.length}.`);
}

main();
