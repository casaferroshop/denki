#!/usr/bin/env node
/**
 * IndexNow submitter for Clínica Denki (static site).
 *
 * Protocol: https://www.indexnow.org/documentation
 * - Ownership: root file  /{key}.txt  containing the key string
 * - Endpoint:  POST https://api.indexnow.org/indexnow  (also used by Bing, Yandex, etc.)
 * - Batch:     max 10 000 URLs per request
 *
 * Usage:
 *   node scripts/indexnow.mjs
 *       → all URLs from production sitemap (recommended after deploy)
 *
 *   node scripts/indexnow.mjs --local
 *       → all URLs from ./sitemap.xml
 *
 *   node scripts/indexnow.mjs --changed [git-ref]
 *       → only URLs mapped from files changed vs ref (default: origin/main)
 *
 *   node scripts/indexnow.mjs --since YYYY-MM-DD
 *       → URLs whose source file git last-commit date is on/after that day
 *
 *   node scripts/indexnow.mjs --dry-run
 *       → print payload, do not POST
 *
 * Env overrides (optional):
 *   INDEXNOW_KEY, INDEXNOW_HOST, INDEXNOW_ENDPOINT
 */

import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const HOST = process.env.INDEXNOW_HOST || 'www.clinicadenki.mx';
const ORIGIN = `https://${HOST}`;
const ENDPOINT =
  process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow';
const BATCH = 10000;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const useLocal = args.includes('--local');
const changedIdx = args.indexOf('--changed');
const sinceIdx = args.indexOf('--since');
const changedRef =
  changedIdx >= 0 ? args[changedIdx + 1] || 'origin/main' : null;
const sinceDate = sinceIdx >= 0 ? args[sinceIdx + 1] : null;

if (changedIdx >= 0 && sinceIdx >= 0) {
  fail('Use either --changed or --since, not both.');
}

/** Detect IndexNow key: env, or root *.txt that is only a hex/dash key (not robots/llms). */
function resolveKey() {
  if (process.env.INDEXNOW_KEY) {
    return process.env.INDEXNOW_KEY.trim();
  }
  const reserved = new Set(['robots.txt', 'llms.txt']);
  const files = readdirSync(ROOT).filter(
    (f) => f.endsWith('.txt') && !reserved.has(f)
  );
  for (const f of files) {
    const candidate = f.slice(0, -4);
    if (!isValidKey(candidate)) continue;
    const body = readFileSync(join(ROOT, f), 'utf8').trim();
    if (body === candidate) return candidate;
  }
  fail(
    'IndexNow key not found. Set INDEXNOW_KEY or place {key}.txt at site root with key as content.'
  );
}

function isValidKey(key) {
  return (
    typeof key === 'string' &&
    key.length >= 8 &&
    key.length <= 128 &&
    /^[a-zA-Z0-9-]+$/.test(key)
  );
}

function fail(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}

function parseSitemapXml(xml) {
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) =>
    m[1].trim()
  );
  return [...new Set(locs)].filter((u) => u.startsWith(ORIGIN));
}

async function loadSitemapUrls() {
  if (useLocal || changedRef || sinceDate) {
    const path = join(ROOT, 'sitemap.xml');
    if (!existsSync(path)) fail('Local sitemap.xml not found.');
    return parseSitemapXml(readFileSync(path, 'utf8'));
  }
  const res = await fetch(`${ORIGIN}/sitemap.xml`, {
    headers: { 'user-agent': 'clinica-denki-indexnow/1.0' },
  });
  if (!res.ok) {
    fail(`Failed to fetch production sitemap (${res.status}). Try --local.`);
  }
  return parseSitemapXml(await res.text());
}

/** Map public site paths → possible source files on disk. */
function urlToFiles(url) {
  let path = url.replace(ORIGIN, '');
  if (!path.startsWith('/')) path = `/${path}`;
  path = path.split('?')[0].split('#')[0];
  if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1);

  if (path === '' || path === '/') return ['index.html'];

  const rel = path.replace(/^\//, '');
  if (rel.startsWith('pages/')) {
    const slug = rel.slice('pages/'.length);
    return [`pages/${slug}/index.html`, `pages/${slug}.html`];
  }
  return [`${rel}/index.html`, `${rel}.html`];
}

function git(args) {
  return execFileSync('git', args, {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

function mapChangedFilesToUrls(sitemapUrls) {
  const ref = changedRef;
  let out;
  try {
    out = git(['diff', '--name-only', `${ref}...HEAD`]);
  } catch {
    // uncommitted + committed vs ref
    out = git(['diff', '--name-only', ref]);
  }
  const files = new Set(
    out
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
  );
  // Also include working tree changes
  try {
    for (const l of git(['status', '--porcelain']).split('\n')) {
      const f = l.slice(3).trim().split(' -> ').pop();
      if (f) files.add(f);
    }
  } catch {
    /* ignore */
  }

  const wanted = [];
  for (const url of sitemapUrls) {
    const candidates = urlToFiles(url);
    if (candidates.some((c) => files.has(c))) wanted.push(url);
  }
  return wanted;
}

function mapSinceToUrls(sitemapUrls, since) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(since)) {
    fail('--since must be YYYY-MM-DD');
  }
  const wanted = [];
  for (const url of sitemapUrls) {
    const candidates = urlToFiles(url).filter((f) => existsSync(join(ROOT, f)));
    if (!candidates.length) continue;
    let newest = null;
    for (const f of candidates) {
      try {
        const iso = git(['log', '-1', '--format=%cI', '--', f]);
        if (iso) {
          const day = iso.slice(0, 10);
          if (!newest || day > newest) newest = day;
        }
      } catch {
        /* skip */
      }
    }
    if (newest && newest >= since) wanted.push(url);
  }
  return wanted;
}

async function submit(key, urls) {
  const keyLocation = `${ORIGIN}/${key}.txt`;
  const batches = [];
  for (let i = 0; i < urls.length; i += BATCH) {
    batches.push(urls.slice(i, i + BATCH));
  }

  console.log(`host:         ${HOST}`);
  console.log(`key:          ${key}`);
  console.log(`keyLocation:  ${keyLocation}`);
  console.log(`endpoint:     ${ENDPOINT}`);
  console.log(`urls:         ${urls.length} (${batches.length} batch/es)`);
  if (urls.length <= 60) {
    for (const u of urls) console.log(`  - ${u}`);
  } else {
    for (const u of urls.slice(0, 10)) console.log(`  - ${u}`);
    console.log(`  … +${urls.length - 10} more`);
  }

  if (dryRun) {
    console.log('\n[--dry-run] no request sent');
    return;
  }

  // Preflight: key file must be live so engines can verify ownership
  const keyRes = await fetch(keyLocation, {
    headers: { 'user-agent': 'clinica-denki-indexnow/1.0' },
  });
  const keyBody = keyRes.ok ? (await keyRes.text()).trim() : '';
  if (!keyRes.ok || keyBody !== key) {
    fail(
      `Key file not live or content mismatch at ${keyLocation} (HTTP ${keyRes.status}). Deploy the key file first, then re-run.`
    );
  }
  console.log('key file:     OK (production)');

  for (let i = 0; i < batches.length; i++) {
    const body = {
      host: HOST,
      key,
      keyLocation,
      urlList: batches[i],
    };
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'user-agent': 'clinica-denki-indexnow/1.0',
      },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    console.log(
      `\nbatch ${i + 1}/${batches.length}: HTTP ${res.status} ${res.statusText}`
    );
    if (text) console.log(text.slice(0, 500));
    // 200 = OK, 202 = Accepted (queued)
    if (res.status !== 200 && res.status !== 202) {
      fail(`IndexNow rejected batch ${i + 1} (HTTP ${res.status})`);
    }
  }
  console.log('\nIndexNow submit complete.');
}

async function main() {
  const key = resolveKey();
  if (!isValidKey(key)) fail(`Invalid IndexNow key format: ${key}`);

  // Ensure key file exists in repo root before suggesting deploy
  const keyFile = join(ROOT, `${key}.txt`);
  if (!existsSync(keyFile)) {
    fail(`Missing ${key}.txt at repo root (required for Vercel deploy).`);
  }
  if (readFileSync(keyFile, 'utf8').trim() !== key) {
    fail(`${key}.txt content must equal the key string exactly.`);
  }

  let urls = await loadSitemapUrls();
  if (!urls.length) fail('No sitemap URLs for this host.');

  if (changedRef) {
    urls = mapChangedFilesToUrls(urls);
    console.log(`mode: --changed vs ${changedRef}`);
  } else if (sinceDate) {
    urls = mapSinceToUrls(urls, sinceDate);
    console.log(`mode: --since ${sinceDate}`);
  } else if (useLocal) {
    console.log('mode: --local sitemap.xml');
  } else {
    console.log('mode: production sitemap');
  }

  if (!urls.length) {
    console.log('No matching URLs to submit. Nothing to do.');
    return;
  }

  await submit(key, urls);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
