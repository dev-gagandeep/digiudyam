const origin = process.env.SEO_VERIFY_ORIGIN || "http://127.0.0.1:3210";
const publicOrigin = "https://www.digiudyam.in";
const decode = value => value.replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"');
const text = (html, pattern) => decode(html.match(pattern)?.[1]?.trim() || "");
const sitemap = await fetch(`${origin}/sitemap.xml`).then(response => response.text());
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
const pages = [];
const failures = [];
const internalLinks = new Set();

for (const url of urls) {
  const path = new URL(url).pathname;
  const response = await fetch(`${origin}${path}`, { redirect: "manual" });
  if (response.status !== 200) {
    failures.push(`${path}: HTTP ${response.status}`);
    continue;
  }
  const html = await response.text();
  const canonical = text(html, /<link rel="canonical" href="([^"]+)"/);
  const title = text(html, /<title>([^<]+)<\/title>/);
  const description = text(html, /<meta name="description" content="([^"]*)"/);
  const expectedCanonical = `${publicOrigin}${path === "/" ? "" : path}`;
  if (canonical !== expectedCanonical) failures.push(`${path}: canonical ${canonical || "missing"}`);
  if (!title) failures.push(`${path}: missing title`);
  if (!description) failures.push(`${path}: missing description`);
  for (const script of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try { JSON.parse(script[1]); } catch { failures.push(`${path}: invalid JSON-LD`); }
  }
  for (const link of html.matchAll(/href="([^"]+)"/g)) {
    const href = decode(link[1]);
    if (href.startsWith("/") && !href.startsWith("//")) internalLinks.add(href.split("#")[0] || "/");
  }
  pages.push({ path, title, description });
}

for (const field of ["title", "description"]) {
  const seen = new Map();
  for (const page of pages) {
    if (!page[field]) continue;
    if (seen.has(page[field])) failures.push(`${page.path}: duplicate ${field} with ${seen.get(page[field])}`);
    else seen.set(page[field], page.path);
  }
}

if (sitemap.includes("digiudyam.com") || sitemap.includes("https://digiudyam.in")) failures.push("sitemap: legacy domain found");
for (const path of internalLinks) {
  const response = await fetch(`${origin}${path}`, { redirect: "manual" });
  if (![200, 301, 302, 307, 308].includes(response.status)) failures.push(`${path}: broken internal link (${response.status})`);
}
console.log(`Checked ${pages.length} indexable pages.`);
console.log(`Checked ${internalLinks.size} unique internal links.`);
console.log(`Unique titles: ${new Set(pages.map(page => page.title)).size}.`);
console.log(`Unique descriptions: ${new Set(pages.map(page => page.description)).size}.`);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("Canonicals, metadata presence, metadata uniqueness and JSON-LD syntax passed.");
