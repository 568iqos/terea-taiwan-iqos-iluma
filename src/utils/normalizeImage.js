// 把任何上傳的圖片自動轉成統一尺寸（預設 1000x1000 白底方形）
// 這樣後台上傳的每一張產品圖、輪播圖在前台看起來大小都會完全一致。
export async function normalizeImage(file, size = 1000, bg = "#ffffff") {
  // 非圖片（例如影片）直接原樣回傳，不處理
  if (!file || !file.type || !file.type.startsWith("image/")) return file;

  try {
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const img = await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = dataUrl;
    });

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // 白底，避免透明 PNG 變黑
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);

    // 等比例縮放，完整置中（contain），四周留白補滿成正方形
    const scale = Math.min(size / img.width, size / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    const x = (size - w) / 2;
    const y = (size - h) / 2;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, x, y, w, h);

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.92)
    );
    if (!blob) return file;

    const baseName = (file.name || "image").replace(/\.[^.]+$/, "");
    return new File([blob], `${baseName}.jpg`, { type: "image/jpeg" });
  } catch (e) {
    console.error("normalizeImage failed, using original", e);
    return file;
  }
}
