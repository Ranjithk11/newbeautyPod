const { mkdirSync, writeFileSync } = require("fs");
const { join } = require("path");

const brands = [
  { slug: "cetaphil", name: "Cetaphil", sites: ["https://www.cetaphil.com/us/", "https://www.cetaphil.in/"] },
  { slug: "foxtale", name: "Foxtale", sites: ["https://foxtale.in/"] },
  { slug: "minimalist", name: "Minimalist", sites: ["https://beminimalist.co/"] },
  { slug: "plix", name: "Plix", sites: ["https://theplix.com/", "https://plixlife.com/"] },
  { slug: "aqualogica", name: "Aqualogica", sites: ["https://aqualogica.in/"] },
  { slug: "sebamed", name: "Sebamed", sites: ["https://www.sebamed.com/", "https://www.sebamed.in/"] },
  { slug: "pilgrim", name: "Pilgrim", sites: ["https://discoverpilgrim.com/"] },
  { slug: "the-derma-co", name: "The Derma Co", sites: ["https://thedermaco.com/"] },
  { slug: "cerave", name: "CeraVe", sites: ["https://www.cerave.com/", "https://www.cerave.in/"] },
  { slug: "neutrogena", name: "Neutrogena", sites: ["https://www.neutrogena.com/", "https://www.neutrogena.in/"] },
];

const extras = {
  sebamed: ["https://upload.wikimedia.org/wikipedia/commons/8/8c/Sebamed.svg"],
  neutrogena: ["https://upload.wikimedia.org/wikipedia/commons/8/80/Neutrogena_logo.svg"],
  cetaphil: ["https://logo.clearbit.com/cetaphil.com"],
  foxtale: ["https://logo.clearbit.com/foxtale.in"],
  minimalist: ["https://logo.clearbit.com/beminimalist.co"],
  plix: ["https://logo.clearbit.com/theplix.com", "https://logo.clearbit.com/plixlife.com"],
  aqualogica: ["https://logo.clearbit.com/aqualogica.in"],
  pilgrim: ["https://logo.clearbit.com/discoverpilgrim.com"],
  "the-derma-co": ["https://logo.clearbit.com/thedermaco.com"],
  cerave: ["https://logo.clearbit.com/cerave.com"],
};

const outDir = join(process.cwd(), "public", "brands");
mkdirSync(outDir, { recursive: true });

function abs(base, href) {
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
}

function pickLogos(html, pageUrl) {
  const found = [];
  const og = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  if (og) found.push(abs(pageUrl, og[1]));
  const icons = [...html.matchAll(/<link[^>]+rel=["']([^"']*icon[^"']*)["'][^>]+href=["']([^"']+)["']/gi)];
  for (const m of icons) found.push(abs(pageUrl, m[2]));
  const imgs = [...html.matchAll(/<img[^>]+(?:src|srcset)=["']([^"']+)["'][^>]*>/gi)];
  for (const m of imgs) {
    const src = m[1].split(/\s+/)[0];
    const tag = m[0].toLowerCase();
    if (/logo|brand|header/.test(tag) || /logo|brand/.test(src)) found.push(abs(pageUrl, src));
  }
  return [...new Set(found.filter(Boolean))];
}

async function download(url, dest) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; BeautyPodLogoBot/1.0)",
      Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const type = res.headers.get("content-type") || "";
  if (!/image|svg|octet-stream/i.test(type)) throw new Error(`not image: ${type} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 400) throw new Error(`too small ${buf.length} ${url}`);
  writeFileSync(dest, buf);
  return { bytes: buf.length, type };
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; BeautyPodLogoBot/1.0)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return { url: res.url, html: await res.text() };
}

(async () => {
  for (const brand of brands) {
    const dest = join(outDir, `${brand.slug}.png`);
    let saved = false;
    const candidates = [...(extras[brand.slug] || [])];
    for (const site of brand.sites) {
      try {
        const page = await fetchPage(site);
        candidates.push(...pickLogos(page.html, page.url));
      } catch (err) {
        console.log(`${brand.slug} site fail ${site}: ${err.message}`);
      }
    }
    for (const url of candidates) {
      try {
        const info = await download(url, dest);
        console.log(`${brand.slug} OK ${info.bytes} ${info.type} ${url}`);
        saved = true;
        break;
      } catch (err) {
        console.log(`${brand.slug} skip ${err.message}`);
      }
    }
    if (!saved) console.log(`${brand.slug} FAILED`);
  }
})();
