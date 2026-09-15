// Sovereign Estate — Build-Time Pre-Render Engine
// ---------------------------------------------------------------------------
// The estate is a React single-page application: index.html ships an empty
// <div id="root">, so crawlers that do not execute JavaScript (Bing, Yandex,
// LinkedIn/Facebook previews, GPTBot, ClaudeBot, PerplexityBot, SEO auditors)
// see ZERO words, NO <h1>, NO headings and NO internal links.
//
// This script closes that gap without touching a single React component.
// After `vite build`, it serves dist/ over loopback, loads it in headless
// Chrome, waits for React to paint, and writes the fully rendered DOM back
// into dist/index.html.
//
// It is safe with this codebase because src/main.tsx uses
// ReactDOM.createRoot().render() and NOT hydrateRoot(): when a real browser
// loads the pre-rendered markup, React simply clears and re-renders the
// container, so a hydration mismatch is structurally impossible.
//
// Run automatically as the final step of `npm run build`.
// Set PRERENDER_STRICT=1 to make pre-render failures fail the build.

import { createServer } from 'node:http';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const TARGET = path.join(DIST, 'index.html');

const STRICT = process.env.PRERENDER_STRICT === '1';
const RENDER_SETTLE_MS = Number(process.env.PRERENDER_SETTLE_MS || 2000);
const SELECTOR_TIMEOUT_MS = Number(process.env.PRERENDER_TIMEOUT_MS || 60000);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json'
};

/** Minimal loopback static server with SPA fallback, mirroring netlify.toml. */
function startStaticServer(dir) {
  return new Promise((resolve, reject) => {
    const server = createServer(async (req, res) => {
      try {
        const urlPath = decodeURIComponent((req.url || '/').split('?')[0].split('#')[0]);
        let filePath = path.normalize(path.join(dir, urlPath));

        if (!filePath.startsWith(dir)) {
          res.writeHead(403).end('Forbidden');
          return;
        }

        let info = await stat(filePath).catch(() => null);
        if (!info || info.isDirectory()) {
          filePath = path.join(dir, 'index.html');
          info = await stat(filePath).catch(() => null);
        }
        if (!info) {
          res.writeHead(404).end('Not found');
          return;
        }

        const body = await readFile(filePath);
        res.writeHead(200, {
          'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
          'Cache-Control': 'no-store'
        });
        res.end(body);
      } catch {
        res.writeHead(500).end('Server error');
      }
    });

    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function launchBrowser() {
  const launch = () =>
    puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--use-gl=swiftshader',
        '--enable-unsafe-swiftshader',
        '--disable-gpu',
        '--hide-scrollbars',
        '--mute-audio',
        '--no-first-run',
        '--disable-extensions'
      ]
    });

  try {
    return await launch();
  } catch (firstError) {
    // Chrome is not always present (npm may block puppeteer's postinstall,
    // and clean CI images start without it). Self-heal once, then retry.
    console.warn('[prerender] Browser launch failed, installing Chromium once…');
    try {
      execSync('npx puppeteer browsers install chrome', { stdio: 'inherit', cwd: ROOT });
      return await launch();
    } catch (secondError) {
      throw new Error(
        `Unable to launch a browser for pre-rendering.\n  first: ${firstError.message}\n  retry: ${secondError.message}`
      );
    }
  }
}

/** Count the words a text-only crawler would extract from the markup. */
function countCrawlableWords(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ');
  return text.split(/\s+/).filter((t) => t.trim().length > 1).length;
}

async function run() {
  if (!existsSync(TARGET)) {
    throw new Error('dist/index.html not found — run `vite build` first.');
  }

  const server = await startStaticServer(DIST);
  const { port } = server.address();
  const origin = `http://127.0.0.1:${port}/`;

  let browser;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();

    await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 1 });

    // Flag the pass so the app suppresses analytics, visitor telemetry,
    // geolocation lookups and audio during pre-rendering. Without this, every
    // production build would write a phantom visitor record to Supabase.
    await page.evaluateOnNewDocument(() => {
      window.__NOORISH_PRERENDER__ = true;
    });

    // Keep the build deterministic and offline-safe: only same-origin assets
    // are fetched. Fonts, Supabase, geo-IP and AI endpoints are not contacted.
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const url = request.url();
      if (url.startsWith(origin) || url.startsWith('data:') || url.startsWith('blob:')) {
        request.continue().catch(() => {});
      } else {
        request.abort().catch(() => {});
      }
    });

    page.on('pageerror', (error) => console.warn('[prerender] page error:', error.message));

    await page.goto(origin, { waitUntil: 'domcontentloaded', timeout: SELECTOR_TIMEOUT_MS });

    // The semantic <h1> lives inside HeroPrism and only exists once React has
    // painted — the ideal signal that the estate has rendered.
    await page.waitForSelector('h1', { timeout: SELECTOR_TIMEOUT_MS });

    // Allow late-mounting sections to finish.
    await new Promise((resolve) => setTimeout(resolve, RENDER_SETTLE_MS));

    const html = await page.evaluate(
      () => `<!DOCTYPE html>\n${document.documentElement.outerHTML}`
    );

    const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
    const headingCount = (html.match(/<h[1-6][\s>]/gi) || []).length;
    const linkCount = (html.match(/<a\s[^>]*href=/gi) || []).length;
    const words = countCrawlableWords(html);

    if (!h1Count) throw new Error('Pre-rendered markup is missing an <h1>.');
    if (words < 250) throw new Error(`Pre-rendered markup contains only ${words} crawlable words.`);

    await writeFile(TARGET, html, 'utf8');

    console.log('[prerender] OK — dist/index.html pre-rendered');
    console.log(`[prerender]   crawlable words : ${words}`);
    console.log(`[prerender]   headings (h1-6): ${headingCount} (h1: ${h1Count})`);
    console.log(`[prerender]   links (<a href): ${linkCount}`);
  } finally {
    if (browser) await browser.close().catch(() => {});
    await new Promise((resolve) => server.close(resolve));
  }
}

run().catch((error) => {
  console.error(`[prerender] FAILED: ${error.message}`);
  if (STRICT) {
    process.exit(1);
  }
  console.warn(
    '[prerender] Pre-rendering was skipped. The site will still deploy, but it ' +
      'will remain client-side only and invisible to non-JavaScript crawlers.'
  );
});