// Supabase 相容層 - 取代已停止服務的 base44
const SUPABASE_URL = 'https://tgpbpmkmklvvffabxtmh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_De2iJNucLTO12iq-PpdlOg_7budQq-V';

const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation',
};

// 把 base44 entity 名稱對應到 Supabase table 名稱
const TABLE_MAP = {
  BlogPost: 'blog_posts',
  MemberSubmission: 'member_submissions',
  SiteSettings: 'site_settings',
  Product: 'products',
  Order: 'orders',
};

function makeEntity(entityName) {
  const table = TABLE_MAP[entityName] || entityName.toLowerCase() + 's';
  const base = `${SUPABASE_URL}/rest/v1/${table}`;

  return {
    list: async (order, limit) => {
      let url = `${base}?select=*`;
      if (order) {
        const desc = order.startsWith('-');
        const col = desc ? order.slice(1) : order;
        url += `&order=${col}.${desc ? 'desc' : 'asc'}`;
      }
      if (limit) url += `&limit=${limit}`;
      try {
        const res = await fetch(url, { headers });
        return res.ok ? await res.json() : [];
      } catch { return []; }
    },

    filter: async (conditions, order, limit) => {
      let url = `${base}?select=*`;
      if (conditions) {
        for (const [key, val] of Object.entries(conditions)) {
          url += `&${key}=eq.${encodeURIComponent(val)}`;
        }
      }
      if (order) {
        const desc = order.startsWith('-');
        const col = desc ? order.slice(1) : order;
        url += `&order=${col}.${desc ? 'desc' : 'asc'}`;
      }
      if (limit) url += `&limit=${limit}`;
      try {
        const res = await fetch(url, { headers });
        return res.ok ? await res.json() : [];
      } catch { return []; }
    },

    get: async (id) => {
      try {
        const res = await fetch(`${base}?id=eq.${id}&select=*`, { headers });
        if (!res.ok) return null;
        const data = await res.json();
        return data[0] || null;
      } catch { return null; }
    },

    create: async (data) => {
      try {
        const body = { ...data };
        if (!body.created_date) body.created_date = new Date().toISOString();
        const res = await fetch(base, {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        });
        if (!res.ok) { console.error('create failed', await res.text()); return null; }
        const result = await res.json();
        return Array.isArray(result) ? result[0] : result;
      } catch (e) { console.error('create error', e); return null; }
    },

    update: async (id, data) => {
      try {
        const res = await fetch(`${base}?id=eq.${id}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify(data),
        });
        if (!res.ok) { console.error('update failed', await res.text()); return null; }
        const result = await res.json();
        return Array.isArray(result) ? result[0] : result;
      } catch (e) { console.error('update error', e); return null; }
    },

    delete: async (id) => {
      try {
        const res = await fetch(`${base}?id=eq.${id}`, {
          method: 'DELETE',
          headers,
        });
        return res.ok;
      } catch { return false; }
    },
  };
}

// 上傳檔案到 Supabase Storage
async function uploadFile({ file }) {
  const bucket = 'site-media';
  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${bucket}/${fileName}`;
  try {
    const res = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': file.type || 'application/octet-stream',
      },
      body: file,
    });
    if (!res.ok) {
      console.error('upload failed', await res.text());
      return { file_url: '' };
    }
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${fileName}`;
    return { file_url: publicUrl };
  } catch (e) {
    console.error('upload error', e);
    return { file_url: '' };
  }
}

// 主要 export — 完整模擬 base44 SDK 介面
export const base44 = {
  auth: {
    me: async () => {
      // 這是純公開網站，不需要真實登入
      // Admin 頁面用密碼保護，不用 base44 auth
      return null;
    },
    logout: (redirectUrl) => {
      window.location.href = redirectUrl || '/';
    },
    redirectToLogin: (redirectUrl) => {
      // 沒有 base44 登入，導回首頁
      window.location.href = redirectUrl || '/';
    },
  },
  entities: new Proxy({}, {
    get: (_, entityName) => makeEntity(entityName),
  }),
  integrations: {
    Core: {
      UploadFile: uploadFile,
    },
  },
};

export default base44;
