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
      let url = `${SUPABASE_URL}/rest/v1/${table}?
