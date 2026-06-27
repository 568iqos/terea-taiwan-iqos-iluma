import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Save, Plus, Trash2, LogOut, Image, HelpCircle, ChevronDown, ChevronUp, Video, Upload, Users, Download, ImagePlus, FileText, Eye, EyeOff } from "lucide-react";

const TAB_LIST = [
  { id: "hero", label: "Hero 輪播", icon: Image },
  { id: "products", label: "產品圖片", icon: ImagePlus },
  { id: "faq", label: "FAQ 問答", icon: HelpCircle },
  { id: "video", label: "影片", icon: Video },
  { id: "members", label: "會員提交", icon: Users },
  { id: "blog", label: "Blog 文章", icon: FileText },
];

const ADMIN_EMAIL = "568iqos@gmail.com";
const ADMIN_PASSWORD = "i9831221";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

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
    {
      image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/1cc1cf9ab_IMG_8122.png",
      label: "TEREA Lifestyle",
      title: "創作靈感\n自由表達",
      sub: "以風味為畫筆，描繪屬於你的生活品味",
      ctaLabel: "探索產品",
      ctaTo: "/products",
      ctaSecondaryLabel: "",
      ctaSecondaryTo: "",
      align: "left",
    },
    {
      image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/260e7c9f4_IMG_8125.jpg",
      label: "ILUMA",
      title: "你的 Q故事\n個性登場",
      sub: "多款配色設計，展現獨一無二的風格品味",
      ctaLabel: "探索產品",
      ctaTo: "/products",
      ctaSecondaryLabel: "了解技術",
      ctaSecondaryTo: "/technology",
      align: "right",
    },
  ]);

  // FAQ state
  const [faqs, setFaqs] = useState([
    { q: "TEREA 是什麼產品？", a: "TEREA 是專為 IQOS ILUMA 系列設計的加熱式菸草彈，採用 Smartcore™ 感應加熱技術，從菸草內部加熱，溫度不超過 350°C，不產生燃燒、無灰燼。" },
    { q: "加熱不燃燒與傳統菸草有何不同？", a: "傳統菸草透過燃燒（600°C 以上）產生煙霧，而 TEREA 使用電磁感應將菸草加熱至 350°C 以下，產生蒸氣而非煙霧，因此無燃燒氣味，也不會產生灰燼。" },
    { q: "TEREA 有哪些口味可以選擇？", a: "目前 TEREA 台灣市場提供六款風味：醇原味、淡原味、柔原味、濃郁原味、綠洲珍珠（薄荷）、日光珍珠（柑橘薄荷），涵蓋菸草系與清涼系。" },
    { q: "在哪裡可以購買 TEREA？", a: "TEREA 可於全台授權門市購買，包含台北、台中、高雄等地。請前往「門市據點」頁面查詢最近的授權販售點。" },
    { q: "TEREA 每根可以使用多久？", a: "每根 TEREA 約可使用 14 口或 6 分鐘，具體時間依個人使用方式而異。" },
  ]);

  // Product images state
  const [productImages, setProductImages] = useState({});
  const [productImgUploading, setProductImgUploading] = useState({});

  // Members state
  const [members, setMembers] = useState([]);

  // Blog state
  const [blogPosts, setBlogPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState({ title: "", slug: "", content: "", excerpt: "", cover_image: "", published: true });

  const [expandedSlide, setExpandedSlide] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoSettingId, setVideoSettingId] = useState(null);
  const [videoUploading, setVideoUploading] = useState(false);
  const videoInputRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        // 密碼已在前面驗證，直接設定 admin 身份
        const adminUser = { role: "admin", email: ADMIN_EMAIL };
        setUser(adminUser);
        await loadSettings();
        await loadMembers();
      } catch (e) {
        console.error("init error", e);
      } finally {
        setLoading(false);
      }
    };
    if (authenticated) init();
  }, [authenticated]);

  useEffect(() => {
    if (authenticated && tab === "members") {
      loadMembers();
    }
    if (authenticated && tab === "blog") {
      loadBlogPosts();
    }
  }, [tab, authenticated]);

  const loadMembers = async () => {
    try {
      const records = await base44.entities.MemberSubmission.list('-created_date', 100);
      setMembers(records);
    } catch {}
  };

  const loadBlogPosts = async () => {
    try {
      const records = await base44.entities.BlogPost.list('-created_date', 50);
      setBlogPosts(records);
    } catch {}
  };

  const saveBlogPost = async (post) => {
    if (post.id) {
      await base44.entities.BlogPost.update(post.id, post);
    } else {
      await base44.entities.BlogPost.create(post);
    }
    setEditingPost(null);
    setNewPost({ title: "", slug: "", content: "", excerpt: "", cover_image: "", published: true });
    await loadBlogPosts();
    setSavedMsg("儲存成功！");
    setTimeout(() => setSavedMsg(""), 2500);
  };

  const deleteBlogPost = async (id) => {
    if (!confirm("確定要刪除這篇文章嗎？")) return;
    await base44.entities.BlogPost.delete(id);
    await loadBlogPosts();
  };

  const togglePublish = async (post) => {
    await base44.entities.BlogPost.update(post.id, { published: !post.published });
    await loadBlogPosts();
  };

  const exportToCSV = () => {
    if (members.length === 0) {
      alert('沒有資料可導出');
      return;
    }

    const headers = ['姓名', '電話', 'Email', 'LINE ID', '職業', '出生年份', '出生月份', '居住縣市', '年滿20歲', '提交時間'];
    const rows = members.map(m => [
      m.name,
      m.phone,
      m.email,
      m.line_id || '-',
      m.occupation || '-',
      m.birth_year || '-',
      m.birth_month || '-',
      m.city,
      m.age_confirmed ? '是' : '否',
      new Date(m.created_date).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `TEREA會員資料_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const loadSettings = async () => {
    try {
      const records = await base44.entities.SiteSettings.list();
      const heroRec = records.find((r) => r.key === "hero_slides");
      const faqRec = records.find((r) => r.key === "faq_items");
      const videoRec = records.find((r) => r.key === "home_video_url");
      if (heroRec?.value) setSlides(JSON.parse(heroRec.value));
      if (faqRec?.value) setFaqs(JSON.parse(faqRec.value));
      if (videoRec?.value) { setVideoUrl(videoRec.value); setVideoSettingId(videoRec.id); }
      const productImgRec = records.find((r) => r.key === "product_images");
      if (productImgRec?.value) setProductImages(JSON.parse(productImgRec.value));
    } catch {}
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
      setSavedMsg("儲存失敗，請重試");
      setTimeout(() => setSavedMsg(""), 2500);
    } finally {
      setSaving(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (loginEmail === ADMIN_EMAIL && loginPassword === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setLoginError("");
      setLoading(true);
    } else {
      setLoginError("帳號或密碼錯誤");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-1 tracking-widest">TEREA</h1>
          <p className="text-xs text-gray-400 text-center mb-6 tracking-widest">後台管理系統</p>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">帳號</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => { setLoginEmail(e.target.value); setLoginError(""); }}
                placeholder="568iqos@gmail.com"
                className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">密碼</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => { setLoginPassword(e.target.value); setLoginError(""); }}
                placeholder="密碼"
                className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>
            {loginError && <p className="text-xs text-red-500 text-center">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-medium text-sm hover:bg-black/80 transition mt-6"
            >
              進入後台
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
      </div>
    );
  }



  // Video upload
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideoUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    const records = await base44.entities.SiteSettings.list();
    const rec = records.find((r) => r.key === "home_video_url");
    if (rec) {
      await base44.entities.SiteSettings.update(rec.id, { value: file_url });
      setVideoSettingId(rec.id);
    } else {
      const newRec = await base44.entities.SiteSettings.create({ key: "home_video_url", value: file_url });
      setVideoSettingId(newRec.id);
    }
    setVideoUrl(file_url);
    setVideoUploading(false);
  };

  const handleVideoUrlSave = async () => {
    setSaving(true);
    const records = await base44.entities.SiteSettings.list();
    const rec = records.find((r) => r.key === "home_video_url");
    if (rec) {
      await base44.entities.SiteSettings.update(rec.id, { value: videoUrl });
    } else {
      await base44.entities.SiteSettings.create({ key: "home_video_url", value: videoUrl });
    }
    setSavedMsg("儲存成功！");
    setTimeout(() => setSavedMsg(""), 2500);
    setSaving(false);
  };

  // Product image upload
  const handleProductImageUpload = async (e, productId) => {
    const file = e.target.files[0];
    if (!file) return;
    setProductImgUploading((prev) => ({ ...prev, [productId]: true }));
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    const updated = { ...productImages, [productId]: file_url };
    setProductImages(updated);
    // Save immediately
    const records = await base44.entities.SiteSettings.list();
    const rec = records.find((r) => r.key === "product_images");
    if (rec) {
      await base44.entities.SiteSettings.update(rec.id, { value: JSON.stringify(updated) });
    } else {
      await base44.entities.SiteSettings.create({ key: "product_images", value: JSON.stringify(updated) });
    }
    setProductImgUploading((prev) => ({ ...prev, [productId]: false }));
  };

  // Slide image upload
  const handleSlideImageUpload = async (e, i) => {
    const file = e.target.files[0];
    if (!file) return;
    updateSlide(i, "_uploading", true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setSlides((prev) => prev.map((s, idx) => idx === i ? { ...s, image: file_url, _uploading: false } : s));
  };

  // Slide helpers
  const updateSlide = (i, field, val) => {
    setSlides((prev) => prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s));
  };
  const addSlide = () => setSlides((prev) => [...prev, { image: "", label: "", title: "", sub: "", ctaLabel: "探索產品", ctaTo: "/products", ctaSecondaryLabel: "", ctaSecondaryTo: "", align: "left" }]);
  const removeSlide = (i) => setSlides((prev) => prev.filter((_, idx) => idx !== i));

  // FAQ helpers
  const updateFaq = (i, field, val) => {
    setFaqs((prev) => prev.map((f, idx) => idx === i ? { ...f, [field]: val } : f));
  };
  const addFaq = () => setFaqs((prev) => [...prev, { q: "", a: "" }]);
  const removeFaq = (i) => setFaqs((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg tracking-tight">TEREA 後台管理</h1>
          <p className="text-xs text-gray-400 mt-0.5">歡迎，{user.full_name || user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          {savedMsg && (
            <span className={`text-sm font-medium ${savedMsg.includes("成功") ? "text-green-600" : "text-red-500"}`}>
              {savedMsg}
            </span>
          )}
          <button
            onClick={saveSettings}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "儲存中..." : "儲存變更"}
          </button>
          <button
            onClick={() => base44.auth.logout("/")}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50 transition"
          >
            <LogOut className="w-4 h-4" />
            登出
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-1 px-1" style={{scrollbarWidth: 'none'}}>
          {TAB_LIST.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition whitespace-nowrap flex-shrink-0 ${
                tab === t.id ? "bg-black text-white" : "bg-white border text-gray-600 hover:border-black"
              }`}
            >
              <t.icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Hero Slides Editor */}
        {tab === "hero" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="space-y-4">
              {slides.map((slide, i) => (
                <div key={i} className="bg-white rounded-xl border overflow-hidden">
                  <button
                    onClick={() => setExpandedSlide(expandedSlide === i ? -1 : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      {slide.image && (
                        <img src={slide.image} alt="" className="w-10 h-10 object-cover rounded" />
                      )}
                      <div>
                        <p className="font-semibold text-sm">{slide.label || `第 ${i + 1} 張`}</p>
                        <p className="text-xs text-gray-400 line-clamp-1">{slide.title?.replace("\n", " ")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); removeSlide(i); }}
                        className="p-1.5 rounded hover:bg-red-50 text-red-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {expandedSlide === i ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                  </button>

                  {expandedSlide === i && (
                    <div className="px-5 pb-5 border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 mb-2">輪播圖片</label>
                        <label className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-black hover:text-black transition cursor-pointer mb-2">
                          <ImagePlus className="w-4 h-4" />
                          {slide._uploading ? "上傳中..." : "點此上傳圖片（手機可直接選相簿）"}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleSlideImageUpload(e, i)}
                            disabled={slide._uploading}
                          />
                        </label>
                        <p className="text-xs text-gray-400 mb-1">或直接貼上圖片網址：</p>
                        <input
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          value={slide.image}
                          onChange={(e) => updateSlide(i, "image", e.target.value)}
                          placeholder="https://..."
                        />
                        {slide.image && !slide._uploading && (
                          <img src={slide.image} alt="" className="mt-2 h-28 w-full object-cover rounded-lg" />
                        )}
                        {slide._uploading && (
                          <div className="mt-2 h-28 w-full rounded-lg bg-gray-100 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">標籤文字（英文小字）</label>
                        <input
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          value={slide.label}
                          onChange={(e) => updateSlide(i, "label", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">對齊方向</label>
                        <select
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          value={slide.align}
                          onChange={(e) => updateSlide(i, "align", e.target.value)}
                        >
                          <option value="left">靠左</option>
                          <option value="right">靠右</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">主標題（換行用 \n）</label>
                        <textarea
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          rows={2}
                          value={slide.title}
                          onChange={(e) => updateSlide(i, "title", e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">副標題</label>
                        <input
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          value={slide.sub}
                          onChange={(e) => updateSlide(i, "sub", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">主按鈕文字</label>
                        <input
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          value={slide.ctaLabel}
                          onChange={(e) => updateSlide(i, "ctaLabel", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">主按鈕連結</label>
                        <input
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          value={slide.ctaTo}
                          onChange={(e) => updateSlide(i, "ctaTo", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">次按鈕文字（空白=不顯示）</label>
                        <input
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          value={slide.ctaSecondaryLabel}
                          onChange={(e) => updateSlide(i, "ctaSecondaryLabel", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">次按鈕連結</label>
                        <input
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          value={slide.ctaSecondaryTo}
                          onChange={(e) => updateSlide(i, "ctaSecondaryTo", e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={addSlide}
                className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-black hover:text-black transition w-full justify-center"
              >
                <Plus className="w-4 h-4" /> 新增輪播
              </button>
            </div>
          </motion.div>
        )}

        {/* Video Editor */}
        {tab === "video" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="bg-white rounded-xl border p-6 space-y-6">
              <div>
                <h2 className="font-semibold text-base mb-1">首頁影片</h2>
                <p className="text-xs text-gray-400">可上傳影片檔案，或輸入影片網址（YouTube embed、CDN 連結等）</p>
              </div>

              {/* Upload */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">上傳影片檔案</label>
                <button
                  onClick={() => videoInputRef.current?.click()}
                  disabled={videoUploading}
                  className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-black hover:text-black transition disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  {videoUploading ? "上傳中..." : "選擇影片檔案"}
                </button>
                <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
              </div>

              {/* URL input */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">或輸入影片網址</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              {/* Preview */}
              {videoUrl && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">預覽</label>
                  <video src={videoUrl} className="w-full max-h-64 rounded-lg object-cover bg-black" controls muted />
                </div>
              )}

              <button
                onClick={handleVideoUrlSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                儲存影片設定
              </button>
            </div>
          </motion.div>
        )}

        {/* Product Images Editor */}
        {tab === "products" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <p className="text-xs text-gray-400 mb-4">點擊「上傳」可從手機相簿選圖，圖片上傳後立即儲存。</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { id: "rich-regular", name: "特濃原味", defaultImg: "https://terea-device.com/wp-content/uploads/2025/12/2030100099_00S-300x300.jpg" },
                { id: "regular", name: "醇原味", defaultImg: "https://terea-device.com/wp-content/uploads/2025/12/2030100085_00S-300x300.jpg" },
                { id: "smooth-regular", name: "淡原味", defaultImg: "https://terea-device.com/wp-content/uploads/2025/12/2030100086_00S-300x300.jpg" },
                { id: "balanced-regular", name: "堅果原味", defaultImg: "https://terea-device.com/wp-content/uploads/2025/12/2030100087_00S-300x300.jpg" },
                { id: "black-menthol", name: "黑薄荷", defaultImg: "https://terea-device.com/wp-content/uploads/2025/12/2030100093_00S-300x300.jpg" },
                { id: "menthol", name: "濃薄荷", defaultImg: "https://terea-device.com/wp-content/uploads/2025/12/2030100088_00S-300x300.jpg" },
                { id: "mint", name: "淡薄荷", defaultImg: "https://terea-device.com/wp-content/uploads/2025/12/2030100089_00S-300x300.jpg" },
                { id: "purple-menthol", name: "藍莓薄荷", defaultImg: "https://terea-device.com/wp-content/uploads/2025/12/2030100090_00S-300x300.jpg" },
                { id: "yellow-menthol", name: "青檸薄荷", defaultImg: "https://terea-device.com/wp-content/uploads/2025/12/2030100091_00S-300x300.jpg" },
                { id: "tropical-menthol", name: "熱帶水果", defaultImg: "https://terea-device.com/wp-content/uploads/2025/12/2030100092_00S-300x300.jpg" },
                { id: "oasis-pearl", name: "綠洲爆珠", defaultImg: "https://terea-device.com/wp-content/uploads/2025/12/2030100098_00S-300x300.jpg" },
                { id: "sunshine-pearl", name: "太陽爆珠", defaultImg: "https://terea-device.com/wp-content/uploads/2025/12/2030100121_00S-300x300.jpg" },
                { id: "black-purple-menthol", name: "黑藍莓薄荷", defaultImg: "https://terea-device.com/wp-content/uploads/2025/12/2030100096_00S-300x300.jpg" },
                { id: "black-tropical", name: "黑熱帶水果", defaultImg: "https://terea-device.com/wp-content/uploads/2025/12/2030100127_00S-300x300.jpg" },
                { id: "kr-sun-pearl", name: "日光爆珠(韓)", defaultImg: "https://terea-kim.com/wp-content/uploads/2025/05/Sun-Pearl.png" },
                { id: "kr-green-zing", name: "青檸/抹茶(韓)", defaultImg: "https://terea-kim.com/wp-content/uploads/2025/05/green_zing.png" },
                { id: "kr-starling-pearl", name: "櫻桃爆珠(韓)", defaultImg: "https://terea-kim.com/wp-content/uploads/2025/05/Starling-Pearl.png" },
                { id: "kr-yugen", name: "花香(韓)", defaultImg: "https://terea-kim.com/wp-content/uploads/2025/05/terea-yugen.png" },
                { id: "kr-blue", name: "濃薄荷(韓)", defaultImg: "https://terea-kim.com/wp-content/uploads/2025/05/blue.png" },
                { id: "kr-summer-wave", name: "熱帶水果(韓)", defaultImg: "https://terea-kim.com/wp-content/uploads/2025/05/summer_wave.png" },
                { id: "kr-amber", name: "琥珀(韓)", defaultImg: "https://terea-kim.com/wp-content/uploads/2025/05/amber.png" },
                { id: "kr-oasis-pearl", name: "綠洲爆珠(韓)", defaultImg: "https://terea-kim.com/wp-content/uploads/2025/05/Oasis-Pearl.png" },
                { id: "kr-purple-wave", name: "葡萄(韓)", defaultImg: "https://terea-kim.com/wp-content/uploads/2025/05/purple_wave.png" },
                { id: "kr-green", name: "薄荷(韓)", defaultImg: "https://terea-kim.com/wp-content/uploads/2025/05/green.png" },
                { id: "kr-silver", name: "閃銀(韓)", defaultImg: "https://terea-kim.com/wp-content/uploads/2025/05/silver.png" },
                { id: "kr-abora-pearl", name: "青蘋果爆珠(韓)", defaultImg: "https://terea-kim.com/wp-content/uploads/2025/05/Abora-Pearl.png" },
                { id: "kr-black-ruby", name: "黑紅莓果(韓)", defaultImg: "https://terea-kim.com/wp-content/uploads/2025/05/Black-Ruby.png" },
                { id: "kr-black-purple", name: "黑葡萄(韓)", defaultImg: "https://terea-kim.com/wp-content/uploads/2025/05/black_purple.png" },
                { id: "kr-black-green", name: "黑冰薄荷(韓)", defaultImg: "https://terea-kim.com/wp-content/uploads/2025/05/black_green.png" },
              ].map((product) => {
                const currentImg = productImages[product.id] || product.defaultImg;
                const isUploading = productImgUploading[product.id];
                return (
                  <div key={product.id} className="bg-white rounded-xl border p-3 flex flex-col items-center gap-2">
                    <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                      {isUploading ? (
                        <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
                      ) : (
                        <img src={currentImg} alt={product.name} className="w-full h-full object-contain" />
                      )}
                    </div>
                    <p className="text-xs font-medium text-center text-gray-700 leading-tight">{product.name}</p>
                    <label className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-gray-300 rounded-lg text-xs text-gray-500 hover:border-black hover:text-black transition cursor-pointer">
                      <Upload className="w-3 h-3" />
                      {isUploading ? "上傳中..." : "換圖"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleProductImageUpload(e, product.id)}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* FAQ Editor */}
        {tab === "faq" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-xs font-medium text-gray-400 mt-2">Q{i + 1}</span>
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">問題</label>
                        <input
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          value={faq.q}
                          onChange={(e) => updateFaq(i, "q", e.target.value)}
                          placeholder="常見問題"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">回答</label>
                        <textarea
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          rows={3}
                          value={faq.a}
                          onChange={(e) => updateFaq(i, "a", e.target.value)}
                          placeholder="詳細說明..."
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removeFaq(i)}
                      className="p-1.5 mt-1 rounded hover:bg-red-50 text-red-400 hover:text-red-600 transition flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addFaq}
                className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-black hover:text-black transition w-full justify-center"
              >
                <Plus className="w-4 h-4" /> 新增問答
              </button>
            </div>
          </motion.div>
        )}

        {/* Blog Posts */}
        {tab === "blog" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* New / Edit Form */}
            {(editingPost !== null || newPost.title !== "" || newPost.content !== "") ? (
              <div className="bg-white rounded-xl border p-6 mb-6 space-y-4">
                <h2 className="font-semibold text-base">{editingPost ? "編輯文章" : "新增文章"}</h2>
                {["title", "slug", "excerpt", "cover_image"].map((field) => (
                  <div key={field}>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      {field === "title" ? "標題" : field === "slug" ? "網址 slug（英文）" : field === "excerpt" ? "摘要" : "封面圖片網址"}
                    </label>
                    <input
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                      value={editingPost ? editingPost[field] : newPost[field]}
                      onChange={(e) => editingPost ? setEditingPost({ ...editingPost, [field]: e.target.value }) : setNewPost({ ...newPost, [field]: e.target.value })}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">內容（支援 Markdown）</label>
                  <textarea
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black font-mono"
                    rows={16}
                    value={editingPost ? editingPost.content : newPost.content}
                    onChange={(e) => editingPost ? setEditingPost({ ...editingPost, content: e.target.value }) : setNewPost({ ...newPost, content: e.target.value })}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingPost ? editingPost.published : newPost.published}
                      onChange={(e) => editingPost ? setEditingPost({ ...editingPost, published: e.target.checked }) : setNewPost({ ...newPost, published: e.target.checked })}
                      className="w-4 h-4"
                    />
                    立即發布
                  </label>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => saveBlogPost(editingPost || newPost)}
                    className="flex items-center gap-2 px-5 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition"
                  >
                    <Save className="w-4 h-4" /> 儲存文章
                  </button>
                  <button
                    onClick={() => { setEditingPost(null); setNewPost({ title: "", slug: "", content: "", excerpt: "", cover_image: "", published: true }); }}
                    className="px-5 py-2 border text-sm rounded-lg hover:bg-gray-50 transition"
                  >
                    取消
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setNewPost({ ...newPost, title: " " })}
                className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-black hover:text-black transition w-full justify-center mb-6"
              >
                <Plus className="w-4 h-4" /> 新增文章
              </button>
            )}

            {/* Post List */}
            <div className="space-y-3">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl border p-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {post.published ? "已發布" : "草稿"}
                      </span>
                    </div>
                    <p className="font-semibold text-sm truncate">{post.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{new Date(post.created_date).toLocaleDateString('zh-TW')}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => togglePublish(post)} className="p-1.5 rounded hover:bg-gray-100 transition" title={post.published ? "取消發布" : "發布"}>
                      {post.published ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                    </button>
                    <button onClick={() => setEditingPost(post)} className="p-1.5 rounded hover:bg-gray-100 transition">
                      <Save className="w-4 h-4 text-gray-400" />
                    </button>
                    <button onClick={() => deleteBlogPost(post.id)} className="p-1.5 rounded hover:bg-red-50 text-red-400 hover:text-red-600 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {blogPosts.length === 0 && (
                <div className="text-center text-gray-400 py-8 text-sm">還沒有文章</div>
              )}
            </div>
          </motion.div>
        )}

        {/* Members Submissions */}
        {tab === "members" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="bg-white rounded-xl border overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50 flex items-center justify-between">
                <h2 className="font-semibold text-base">會員提交紀錄</h2>
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition"
                >
                  <Download className="w-4 h-4" />
                  導出 CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">姓名</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Email</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">電話</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">LINE ID</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">職業</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">居住地</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">提交時間</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((m) => (
                      <tr key={m.id} className="border-b hover:bg-gray-50 transition">
                        <td className="px-4 py-3">{m.name}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{m.email}</td>
                        <td className="px-4 py-3">{m.phone}</td>
                        <td className="px-4 py-3">{m.line_id || '-'}</td>
                        <td className="px-4 py-3">{m.occupation || '-'}</td>
                        <td className="px-4 py-3">{m.city}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">
                          {new Date(m.created_date).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {members.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                  <p className="text-sm">還沒有會員提交資料</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}