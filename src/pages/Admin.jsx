import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Save, Plus, Trash2, LogOut, Image, HelpCircle, ChevronDown, ChevronUp, Video, Upload, Download, ImagePlus, FileText, Eye, EyeOff, Edit2 } from "lucide-react";

// 圖片調整函數（1000x1000px，品質 95）
async function normalizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 1000;
        canvas.height = 1000;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, 1000, 1000);
        
        const ratio = Math.min(1000 / img.width, 1000 / img.height);
        const x = (1000 - img.width * ratio) / 2;
        const y = (1000 - img.height * ratio) / 2;
        ctx.drawImage(img, x, y, img.width * ratio, img.height * ratio);
        
        canvas.toBlob(
          (blob) => {
            const normalized = new File([blob], file.name, { type: "image/jpeg" });
            resolve(normalized);
          },
          "image/jpeg",
          0.95
        );
      };
      img.onerror = () => reject(new Error("Image load failed"));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}

const TAB_LIST = [
  { id: "products", label: "產品管理", icon: ImagePlus },
  { id: "hero", label: "Hero 輪播", icon: Image },
  { id: "faq", label: "FAQ 問答", icon: HelpCircle },
  { id: "video", label: "影片", icon: Video },
  { id: "blog", label: "Blog 文章", icon: FileText },
];

const ADMIN_EMAIL = "568iqos@gmail.com";
const ADMIN_PASSWORD = "568iqos";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("products");
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  // Products state
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ code: "", name: "", name_en: "", category: "", description: "", image_url: "" });
  const [productImgUploading, setProductImgUploading] = useState({});

  // Hero slides state
  const [slides, setSlides] = useState([
    {
      image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/e45ae93a9_IMG_8058.jpg",
      label: "TEREA Taiwan",
      title: "加熱不燃燒\n新科技體驗",
      sub: "每一次點燃，都多了一份儀式感",
      ctaLabel: "探索產品",
      ctaTo: "/products",
      ctaSecondaryLabel: "了解技術",
      ctaSecondaryTo: "/technology",
      align: "left",
    },
  ]);

  // FAQ state
  const [faqs, setFaqs] = useState([
    { q: "TEREA 是什麼產品？", a: "TEREA 是專為 IQOS ILUMA 系列設計的加熱式菸草彈。" },
  ]);

  // Blog state
  const [blogPosts, setBlogPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState({ title: "", slug: "", content: "", excerpt: "", cover_image: "", published: true });

  const [videoUrl, setVideoUrl] = useState("");
  const [videoUploading, setVideoUploading] = useState(false);
  const [expandedSlide, setExpandedSlide] = useState(0);

  useEffect(() => {
    if (authenticated) {
      loadAllData();
    }
  }, [authenticated]);

  useEffect(() => {
    if (authenticated && tab === "products") {
      loadProducts();
    }
    if (authenticated && tab === "blog") {
      loadBlogPosts();
    }
  }, [tab, authenticated]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await loadSettings();
      await loadProducts();
      await loadBlogPosts();
    } catch (e) {
      console.error("load error", e);
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = async () => {
    try {
      const records = await base44.entities.SiteSettings.list();
      const heroRec = records.find((r) => r.key === "hero_slides");
      const faqRec = records.find((r) => r.key === "faq_items");
      const videoRec = records.find((r) => r.key === "home_video_url");
      if (heroRec?.value) setSlides(JSON.parse(heroRec.value));
      if (faqRec?.value) setFaqs(JSON.parse(faqRec.value));
      if (videoRec?.value) setVideoUrl(videoRec.value);
    } catch (e) {
      console.error("loadSettings error", e);
    }
  };

  const loadProducts = async () => {
    try {
      const records = await base44.entities.Product.list('-created_date', 100);
      setProducts(records || []);
    } catch (e) {
      console.error("loadProducts error", e);
    }
  };

  const loadBlogPosts = async () => {
    try {
      const records = await base44.entities.BlogPost.list('-created_date', 50);
      setBlogPosts(records || []);
    } catch (e) {
      console.error("loadBlogPosts error", e);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const records = await base44.entities.SiteSettings.list();
      const heroRec = records.find((r) => r.key === "hero_slides");
      const faqRec = records.find((r) => r.key === "faq_items");

      if (heroRec) {
        await base44.entities.SiteSettings.update(heroRec.id, { value: JSON.stringify(slides) });
      } else {
        await base44.entities.SiteSettings.create({ key: "hero_slides", value: JSON.stringify(slides) });
      }

      if (faqRec) {
        await base44.entities.SiteSettings.update(faqRec.id, { value: JSON.stringify(faqs) });
      } else {
        await base44.entities.SiteSettings.create({ key: "faq_items", value: JSON.stringify(faqs) });
      }

      setSavedMsg("儲存成功！");
      setTimeout(() => setSavedMsg(""), 2500);
    } catch (e) {
      console.error("saveSettings error", e);
      setSavedMsg("儲存失敗，請重試");
      setTimeout(() => setSavedMsg(""), 2500);
    } finally {
      setSaving(false);
    }
  };

  const saveProduct = async (product) => {
    try {
      if (product.id) {
        await base44.entities.Product.update(product.id, product);
      } else {
        await base44.entities.Product.create(product);
      }
      setEditingProduct(null);
      setNewProduct({ code: "", name: "", name_en: "", category: "", description: "", image_url: "" });
      await loadProducts();
      setSavedMsg("產品儲存成功！");
      setTimeout(() => setSavedMsg(""), 2500);
    } catch (e) {
      console.error("saveProduct error", e);
      setSavedMsg("儲存失敗");
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("確定要刪除這個產品嗎？")) return;
    try {
      await base44.entities.Product.delete(id);
      await loadProducts();
      setSavedMsg("產品已刪除");
      setTimeout(() => setSavedMsg(""), 2500);
    } catch (e) {
      console.error("deleteProduct error", e);
    }
  };

  const handleProductImageUpload = async (e, productId) => {
    const raw = e.target.files[0];
    if (!raw) return;
    setProductImgUploading((prev) => ({ ...prev, [productId]: true }));
    try {
      const file = await normalizeImage(raw);
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      
      if (editingProduct && editingProduct.id === productId) {
        setEditingProduct({ ...editingProduct, image_url: file_url });
      } else if (!editingProduct && productId === "new") {
        setNewProduct({ ...newProduct, image_url: file_url });
      } else {
        const product = products.find(p => p.id === productId);
        if (product) {
          await base44.entities.Product.update(productId, { image_url: file_url });
          await loadProducts();
        }
      }
      setSavedMsg("圖片上傳成功！");
      setTimeout(() => setSavedMsg(""), 2500);
    } catch (e) {
      console.error("image upload error", e);
      setSavedMsg("圖片上傳失敗");
    } finally {
      setProductImgUploading((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const saveBlogPost = async (post) => {
    try {
      if (post.id) {
        await base44.entities.BlogPost.update(post.id, post);
      } else {
        await base44.entities.BlogPost.create(post);
      }
      setEditingPost(null);
      setNewPost({ title: "", slug: "", content: "", excerpt: "", cover_image: "", published: true });
      await loadBlogPosts();
      setSavedMsg("文章儲存成功！");
      setTimeout(() => setSavedMsg(""), 2500);
    } catch (e) {
      console.error("saveBlogPost error", e);
      setSavedMsg("儲存失敗");
    }
  };

  const deleteBlogPost = async (id) => {
    if (!confirm("確定要刪除這篇文章嗎？")) return;
    try {
      await base44.entities.BlogPost.delete(id);
      await loadBlogPosts();
      setSavedMsg("文章已刪除");
      setTimeout(() => setSavedMsg(""), 2500);
    } catch (e) {
      console.error("deleteBlogPost error", e);
    }
  };

  const togglePublish = async (post) => {
    try {
      await base44.entities.BlogPost.update(post.id, { published: !post.published });
      await loadBlogPosts();
    } catch (e) {
      console.error("togglePublish error", e);
    }
  };

  const handleVideoUrlSave = async () => {
    setSaving(true);
    try {
      const records = await base44.entities.SiteSettings.list();
      const rec = records.find((r) => r.key === "home_video_url");
      if (rec) {
        await base44.entities.SiteSettings.update(rec.id, { value: videoUrl });
      } else {
        await base44.entities.SiteSettings.create({ key: "home_video_url", value: videoUrl });
      }
      setSavedMsg("影片 URL 儲存成功！");
      setTimeout(() => setSavedMsg(""), 2500);
    } catch (e) {
      console.error("handleVideoUrlSave error", e);
      setSavedMsg("儲存失敗");
    } finally {
      setSaving(false);
    }
  };

  const handleAdminLogin = (e) => {
