const { readFileSync } = require("fs");
const { join } = require("path");

function loadEnv() {
  const env = {};
  for (const line of readFileSync(join(process.cwd(), ".env.local"), "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#") || !t.includes("=")) continue;
    const i = t.indexOf("=");
    env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return env;
}

async function probe(label, url) {
  const res = await fetch(url);
  const json = await res.json();
  const data = Array.isArray(json.data) ? json.data : [];
  const types = data.slice(0, 8).map((item) => ({
    type: item.media_type,
    product: item.media_product_type,
    hasMedia: Boolean(item.media_url),
    hasThumb: Boolean(item.thumbnail_url),
  }));
  console.log(
    JSON.stringify(
      {
        label,
        status: res.status,
        error: json.error ? { type: json.error.type, code: json.error.code, message: json.error.message } : null,
        count: data.length,
        types,
      },
      null,
      2,
    ),
  );
}

(async () => {
  const env = loadEnv();
  const token = env.INSTAGRAM_ACCESS_TOKEN;
  const userId = env.INSTAGRAM_USER_ID;
  const fields = "id,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp";
  const q = `fields=${fields}&limit=8&access_token=${encodeURIComponent(token)}`;
  await probe("ig-me", `https://graph.instagram.com/v21.0/me/media?${q}`);
  await probe("ig-user", `https://graph.instagram.com/v21.0/${userId}/media?${q}`);
  await probe("fb-user", `https://graph.facebook.com/v21.0/${userId}/media?${q}`);
  await probe("ig-me-debug", `https://graph.instagram.com/v21.0/me?fields=id,username,account_type&access_token=${encodeURIComponent(token)}`);
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
