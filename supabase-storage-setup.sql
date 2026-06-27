-- ============================================================
-- 520terea.com 圖片／影片上傳所需的 Supabase 儲存空間設定
-- 在 Supabase 後台 → SQL Editor 貼上整段 → 按 Run 執行一次即可
-- ============================================================

-- 1. 建立名為 site-media 的公開儲存空間（已存在則略過）
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do update set public = true;

-- 2. 允許任何人「讀取」這個空間的檔案（前台網站要顯示圖片/影片）
drop policy if exists "site_media_public_read" on storage.objects;
create policy "site_media_public_read"
on storage.objects for select
using (bucket_id = 'site-media');

-- 3. 允許「上傳」檔案到這個空間（後台上傳功能要用）
drop policy if exists "site_media_public_insert" on storage.objects;
create policy "site_media_public_insert"
on storage.objects for insert
with check (bucket_id = 'site-media');

-- 4. 允許「覆蓋／刪除」（換圖時用）
drop policy if exists "site_media_public_update" on storage.objects;
create policy "site_media_public_update"
on storage.objects for update
using (bucket_id = 'site-media');

drop policy if exists "site_media_public_delete" on storage.objects;
create policy "site_media_public_delete"
on storage.objects for delete
using (bucket_id = 'site-media');
