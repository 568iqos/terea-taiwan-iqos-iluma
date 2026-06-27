// Supabase 相容層 - 取代已停止服務的 base44
const SUPABASE_URL = 'https://tgpbpmkmklvvffabxtmh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_De2iJNucLTO12iq-PpdlOg_7budQq-V';

const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

function makeEntity(table) {
  return {
    list: async (order) => {
      let url = `${SUPABASE_URL}/rest/v1/${table}?select=*`;
      if (order) {
        const desc = order.startsWith('-');
        const col = desc ? order.slice(1) : order;
        url += `&order=${col}.${desc ? 'desc' : 'asc'}`;
      }
      try { const res = await fetch(url, { headers }); return res.ok ? await res.json() : []; } catch { return []; }
    },
    filter: async (conditions, order) => {
      let url = `${SUPABASE_URL}/rest/v1/${table}?select=*`;
      for (const [k, v] of Object.entries(conditions || {})) url += `&${k}=eq.${encodeURIComponent(v)}`;
      if (order) {
        const desc = order.startsWith('-');
        const col = desc ? order.slice(1) : order;
        url += `&order=${col}.${desc ? 'desc' : 'asc'}`;
      }
      try { const res = await fetch(url, { headers }); return res.ok ? await res.json() : []; } catch { return []; }
    },
    get: async (id) => {
      try { const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}&select=*`, { headers }); const d = res.ok ? await res.json() : []; return d[0] || null; } catch { return null; }
    },
    create: async (data) => {
      try { const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, { method: 'POST', headers: { ...headers, 'Prefer': 'return=representation' }, body: JSON.stringify(data) }); const r = res.ok ? await res.json() : []; return r[0] || null; } catch { return null; }
    },
    update: async (id, data) => {
      try { const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, { method: 'PATCH', headers: { ...headers, 'Prefer': 'return=representation' }, body: JSON.stringify(data) }); const r = res.ok ? await res.json() : []; return r[0] || null; } catch { return null; }
    },
    delete: async (id) => {
      try { await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, { method: 'DELETE', headers }); return true; } catch { return false; }
    },
  };
}

export const base44 = {
  entities: {
    Product: makeEntity('products'),
    BlogPost: makeEntity('blog_posts'),
    Faq: makeEntity('faqs'),
    SiteSettings: makeEntity('site_settings'),
    Member: makeEntity('members'),
    MemberSubmission: makeEntity('member_submissions'),
    OtpCode: makeEntity('otp_codes'),
  },
  auth: {
    me: async () => null,
    login: async () => null,
    logout: async () => {},
    redirectToLogin: async () => {},
  },
  functions: { invoke: async () => ({ data: null, error: null }) },
  integrations: {
    Core: {
      UploadFile: async ({ file }) => {
        const filename = `upload-${Date.now()}-${file.name}`;
        try {
          const res = await fetch(`${SUPABASE_URL}/storage/v1/object/uploads/${filename}`, { method: 'POST', headers: { 'Authorization': `Bearer ${SUPABASE_KEY}`, 'apikey': SUPABASE_KEY, 'x-upsert': 'true' }, body: file });
          if (res.ok) return { file_url: ${SUPABASE_URL}/storage/v1/object/public/uploads/${filename} };
        } catch {}
        return { file_url: null };
      }
    }
  }
};

export default base44;
