const BASE = process.env.NEXT_PUBLIC_API || 'http://localhost:4000';
export async function api(path, opts) {
  const r = await fetch(`${BASE}${path}`, { headers:{'Content-Type':'application/json'}, ...opts });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
