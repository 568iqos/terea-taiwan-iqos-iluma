export async function normalizeImage(file) {
  // 非圖片（例如影片）直接原樣回傳
  if (!file || !file.type || !file.type.startsWith("image/")) return file;
  
  // 圖片直接上傳，不做處理（避免 Canvas 出錯）
  return file;
}
