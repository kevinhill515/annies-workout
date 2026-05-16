// Tiny Supabase REST wrapper, single-user variant.

const URL = import.meta.env.VITE_SUPABASE_URL || '';
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const SUPA_CONFIGURED = !!(URL && KEY);
const USER_ROW = 'annie';

const baseHeaders = () => ({
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json',
});

export async function fetchUser() {
  if (!SUPA_CONFIGURED) return null;
  try {
    const r = await fetch(
      `${URL}/rest/v1/annie_user?select=name,data,updated_at&name=eq.${USER_ROW}`,
      { headers: { ...baseHeaders(), Accept: 'application/vnd.pgrst.object+json' } }
    );
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

export async function upsertUser(data) {
  if (!SUPA_CONFIGURED) return false;
  try {
    const r = await fetch(`${URL}/rest/v1/annie_user`, {
      method: 'POST',
      headers: {
        ...baseHeaders(),
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify({ name: USER_ROW, data, updated_at: new Date().toISOString() }),
    });
    return r.ok;
  } catch {
    return false;
  }
}
