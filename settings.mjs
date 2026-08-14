import { getStore } from "@netlify/blobs";

const DEFAULT_ORDER = [3, 4, 7];
const STORE_NAME = "password-generator-settings";
const KEY = "shared-order";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, no-cache, must-revalidate",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "content-type"
    }
  });
}

function isValidOrder(value) {
  return Array.isArray(value) && value.length === 3 && value.every(Number.isInteger);
}

export default async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204 });

  const store = getStore({ name: STORE_NAME, consistency: "strong" });

  if (req.method === "GET") {
    const saved = await store.get(KEY, { type: "json", consistency: "strong" });
    if (saved && isValidOrder(saved.order)) return json(saved);
    return json({ order: DEFAULT_ORDER, updatedAt: 0 });
  }

  if (req.method === "POST") {
    let body;
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }

    if (!isValidOrder(body?.order)) {
      return json({ error: "order must contain exactly three integers" }, 400);
    }

    const payload = { order: body.order, updatedAt: Date.now() };
    await store.setJSON(KEY, payload);
    return json(payload);
  }

  return json({ error: "Method not allowed" }, 405);
};
