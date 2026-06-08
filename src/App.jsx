import React, { useState } from 'react';
import * as XLSX from 'xlsx';

/* ── 員工密碼配置 ─────────────────────────────────────── */
const STAFF_PASSWORDS = {
  '001': '1688',
  'default': '8888'
};

const getStaffPassword = (staffId) => {
  return STAFF_PASSWORDS[staffId] || STAFF_PASSWORDS['default'];
};

/* ── Google Fonts ─────────────────────────────────────── */
const _fl = document.createElement("link");
_fl.rel = "stylesheet";
_fl.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;600;700;800;900&family=Noto+Sans+TC:wght@400;500;700;900&display=swap";
document.head.appendChild(_fl);

const _st = document.createElement("style");
_st.textContent = `
*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
html,body { height:100%; background:#070809; }
::-webkit-scrollbar { width:5px; }
::-webkit-scrollbar-track { background:transparent; }
::-webkit-scrollbar-thumb { background:#2a2200; border-radius:99px; }
@keyframes fadeUp { from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)} }
@keyframes popIn  { from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)} }
@keyframes slideR { from{opacity:0;transform:translateX(18px)}to{opacity:1;transform:translateX(0)} }
.pcard { transition: transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s ease, border-color .22s ease; }
.pcard:hover { transform:translateY(-4px) scale(1.02); box-shadow:0 24px 48px rgba(0,0,0,.7), 0 0 0 1px rgba(212,175,55,.4) !important; }
.pcard:active { transform:scale(.97) !important; }
.navbtn:hover { background:rgba(212,175,55,.08) !important; color:#d4af37 !important; }
.cobtn:hover { background:linear-gradient(135deg,#f0cc44,#c8960c) !important; box-shadow:0 10px 36px rgba(212,175,55,.55) !important; }
input:focus,select:focus { border-color:rgba(212,175,55,.6) !important; box-shadow:0 0 0 3px rgba(212,175,55,.08) !important; outline:none; }
`;
document.head.appendChild(_st);

const G = {
  bg: '#070809',
  surf: '#0f0e0a',
  card: '#1a1915',
  border: 'rgba(212,175,55,.12)',
  borderHi: 'rgba(212,175,55,.25)',
  text: '#e8e6e1',
  muted: '#a9a49f',
  gold: '#d4af37',
  goldGlow: 'rgba(212,175,55,.4)',
  goldDim: 'rgba(212,175,55,.08)',
  red: '#ff6b6b',
  green: '#51cf66',
  dimmed: 'rgba(212,175,55,.2)',
};

const fmt = (n) => new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', minimumFractionDigits: 0 }).format(n);
const genId = () => Math.random().toString(36).substr(2, 9);
const todayStr = () => new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
const nowStr = () => new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });

/* ── 商品數據（包含圖片 URL） ─────────────────────────────────────── */
const INIT_PRODUCTS = [
  // 日本 Terea (NT$1,900)
  { id: 'jp1', name: '日本藍莓', category: '日本', price: 1900, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/JRpbTtYoYIUiIhZp.PNG' },
  { id: 'jp2', name: '日本檸檬', category: '日本', price: 1900, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/JRpbTtYoYIUiIhZp.PNG' },
  { id: 'jp3', name: '日本草莓', category: '日本', price: 1900, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/JRpbTtYoYIUiIhZp.PNG' },
  { id: 'jp4', name: '日本薄荷', category: '日本', price: 1900, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/JRpbTtYoYIUiIhZp.PNG' },
  { id: 'jp5', name: '日本葡萄', category: '日本', price: 1900, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/JRpbTtYoYIUiIhZp.PNG' },
  // 韓國 Terea (NT$1,700)
  { id: 'kr1', name: '韓國櫻花', category: '韓國', price: 1700, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/XMiuGInLbZeKMdtN.PNG' },
  { id: 'kr2', name: '韓國蜜桃', category: '韓國', price: 1700, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/XMiuGInLbZeKMdtN.PNG' },
  { id: 'kr3', name: '韓國冰薄荷', category: '韓國', price: 1700, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/XMiuGInLbZeKMdtN.PNG' },
  { id: 'kr4', name: '韓國紅參', category: '韓國', price: 1700, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/XMiuGInLbZeKMdtN.PNG' },
  { id: 'kr5', name: '韓國柚子', category: '韓國', price: 1700, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/XMiuGInLbZeKMdtN.PNG' },
  // 台灣 Terea (NT$1,250)
  { id: 'tw1', name: '台灣檸檬', category: '台灣', price: 1250, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/DYfkNhfiNnmDjJhV.JPG' },
  { id: 'tw2', name: '台灣芒果', category: '台灣', price: 1250, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/DYfkNhfiNnmDjJhV.JPG' },
  { id: 'tw3', name: '台灣烏龍', category: '台灣', price: 1250, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/DYfkNhfiNnmDjJhV.JPG' },
  { id: 'tw4', name: '台灣蜜香', category: '台灣', price: 1250, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/DYfkNhfiNnmDjJhV.JPG' },
  { id: 'tw5', name: '台灣青蘋果', category: '台灣', price: 1250, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/DYfkNhfiNnmDjJhV.JPG' },
  // IQOS 主機
  { id: 'dev1', name: '8代 ONE i', category: '主機', price: 1980, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/SeBgfcpWhVaebcrc.JPG' },
  { id: 'dev2', name: '台灣 ONE', category: '主機', price: 680, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/IuwwSqrCFlsRSWln.JPG' },
  { id: 'dev3', name: '8代 ILUMA i', category: '主機', price: 2800, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/SeBgfcpWhVaebcrc.JPG' },
  { id: 'dev4', name: '星空版', category: '主機', price: 3950, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/wLLrqKtuTXmrlmhP.JPG' },
  { id: 'dev5', name: '美人魚 ONE i', category: '主機', price: 3400, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/mdorvcMrkiXdKYwi.JPG' },
  { id: 'dev6', name: '美人魚 ILUMA i', category: '主機', price: 4800, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663667572344/jBxVvwxFrDSLcjhd.PNG' },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginStep, setLoginStep] = useState('staffId');
  const [loginStaffId, setLoginStaffId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [currentStaffId, setCurrentStaffId] = useState(null);
  const [memberCode, setMemberCode] = useState('');
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState('pos');
  const [category, setCategory] = useState('日本');
  const [products, setProducts] = useState(INIT_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState(null);
  const categories = ['日本', '韓國', '台灣', '主機'];

  const handleLogin = () => {
    const requiredPassword = getStaffPassword(loginStaffId);
    if (loginPassword === requiredPassword) {
      setIsLoggedIn(true);
      setCurrentStaffId(loginStaffId);
      setLoginError('');
      setLoginStaffId('');
      setLoginPassword('');
      setLoginStep('staffId');
    } else {
      setLoginError('密碼錯誤');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentStaffId(null);
    setCart([]);
    setMemberCode('');
    setPage('pos');
    setEditingProduct(null);
  };

  const handleAddToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('購物車為空');
      return;
    }
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const receipt = {
      id: genId(),
      date: todayStr(),
      time: nowStr(),
      staffId: currentStaffId,
      memberCode: memberCode || '非會員',
      items: cart,
      total: total
    };
    exportToExcel([receipt]);
    setCart([]);
    setMemberCode('');
    alert(`結帳完成！總金額：${fmt(total)}\n發票已下載`);
  };

  const exportToExcel = (receipts) => {
    const data = receipts.flatMap(receipt =>
      receipt.items.map(item => ({
        '日期': receipt.date,
        '時間': receipt.time,
        '員工編號': receipt.staffId,
        '會員編號': receipt.memberCode,
        '商品名稱': item.name,
        '數量': item.quantity,
        '單價': item.price,
        '小計': item.price * item.quantity
      }))
    );
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '銷售記錄');
    XLSX.writeFile(wb, `銷售記錄_${todayStr()}.xlsx`);
  };

  const handleUpdateProduct = () => {
    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === editingProduct.id ? editingProduct : p
      ));
      setEditingProduct(null);
      alert('商品已更新');
    }
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: genId() }]);
    alert('商品已添加');
  };

  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: G.bg }}>
        <div style={{ textAlign: 'center', padding: '40px', background: G.card, borderRadius: '12px', border: `1px solid ${G.border}`, maxWidth: '400px' }}>
          <h1 style={{ color: G.gold, marginBottom: '30px', fontSize: '28px' }}>POS 系統</h1>
          {loginStep === 'staffId' ? (
            <>
              <input
                type="text"
                placeholder="員工編號"
                value={loginStaffId}
                onChange={(e) => setLoginStaffId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '15px',
                  background: G.surf,
                  border: `1px solid ${G.border}`,
                  color: G.text,
                  borderRadius: '6px',
                  fontSize: '16px'
                }}
              />
              <button
                onClick={() => setLoginStep('password')}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: G.gold,
                  color: '#000',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                下一步
              </button>
            </>
          ) : (
            <>
              <p style={{ color: G.muted, marginBottom: '15px' }}>員工編號: {loginStaffId}</p>
              <input
                type="password"
                placeholder="密碼"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '15px',
                  background: G.surf,
                  border: `1px solid ${G.border}`,
                  color: G.text,
                  borderRadius: '6px',
                  fontSize: '16px'
                }}
              />
              {loginError && <p style={{ color: G.red, marginBottom: '10px' }}>{loginError}</p>}
              <button
                onClick={handleLogin}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: G.gold,
                  color: '#000',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginBottom: '10px'
                }}
              >
                登入
              </button>
              <button
                onClick={() => { setLoginStep('staffId'); setLoginStaffId(''); setLoginPassword(''); }}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: G.surf,
                  color: G.text,
                  border: `1px solid ${G.border}`,
                  borderRadius: '6px',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                返回
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: G.bg, color: G.text, display: 'flex', flexDirection: 'column' }}>
      {/* 頂部導航 */}
      <div style={{ background: G.card, borderBottom: `1px solid ${G.border}`, padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '20px', color: G.gold }}>POS 系統</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ color: G.muted }}>員工 #{currentStaffId}</span>
          {currentStaffId === '001' && (
            <button
              onClick={() => setPage(page === 'pos' ? 'admin' : 'pos')}
              style={{
                padding: '8px 16px',
                background: G.gold,
                color: '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {page === 'pos' ? '管理' : '銷售'}
            </button>
          )}
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              background: G.red,
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            登出
          </button>
        </div>
      </div>

      {/* 主要內容 */}
      <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
        {page === 'pos' ? (
          // POS 頁面
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
            {/* 商品區 */}
            <div>
              {/* 分類按鈕 */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    style={{
                      padding: '10px 20px',
                      background: category === cat ? G.gold : G.card,
                      color: category === cat ? '#000' : G.text,
                      border: `1px solid ${G.border}`,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: category === cat ? 'bold' : 'normal'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* 商品網格 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                {products.filter(p => p.category === category).map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleAddToCart(product)}
                    style={{
                      background: G.card,
                      border: `1px solid ${G.border}`,
                      borderRadius: '8px',
                      padding: '12px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      minHeight: '200px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = G.gold;
                      e.currentTarget.style.boxShadow = `0 0 12px ${G.goldGlow}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = G.border;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }}
                    />
                    <p style={{ fontSize: '14px', marginBottom: '5px', flex: 1 }}>{product.name}</p>
                    <p style={{ color: G.gold, fontWeight: 'bold', fontSize: '16px' }}>{fmt(product.price)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 購物車 */}
            <div style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: '8px', padding: '15px', display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
              <h3 style={{ color: G.gold, marginBottom: '15px' }}>購物車</h3>
              
              <input
                type="text"
                placeholder="會員編號"
                value={memberCode}
                onChange={(e) => setMemberCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginBottom: '15px',
                  background: G.surf,
                  border: `1px solid ${G.border}`,
                  color: G.text,
                  borderRadius: '4px'
                }}
              />

              <div style={{ flex: 1, overflowY: 'auto', marginBottom: '15px', maxHeight: '300px' }}>
                {cart.map(item => (
                  <div key={item.id} style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: `1px solid ${G.border}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontSize: '12px' }}>{item.name}</span>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: G.red,
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        ✕
                      </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: G.muted }}>
                      <span>{item.quantity} × {fmt(item.price)}</span>
                      <span>{fmt(item.price * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ paddingTop: '15px', borderTop: `1px solid ${G.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontWeight: 'bold' }}>
                  <span>合計:</span>
                  <span style={{ color: G.gold, fontSize: '18px' }}>
                    {fmt(cart.reduce((sum, item) => sum + item.price * item.quantity, 0))}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: G.gold,
                    color: '#000',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  結帳下載 Excel
                </button>
              </div>
            </div>
          </div>
        ) : (
          // 後台管理頁面（僅員工 001）
          <div>
            <h2 style={{ color: G.gold, marginBottom: '20px' }}>商品管理</h2>
            
            {editingProduct ? (
              <div style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                <h3 style={{ marginBottom: '15px' }}>編輯商品</h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="商品名稱"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    style={{
                      padding: '10px',
                      background: G.surf,
                      border: `1px solid ${G.border}`,
                      color: G.text,
                      borderRadius: '4px'
                    }}
                  />
                  <input
                    type="number"
                    placeholder="價格"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseInt(e.target.value) })}
                    style={{
                      padding: '10px',
                      background: G.surf,
                      border: `1px solid ${G.border}`,
                      color: G.text,
                      borderRadius: '4px'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={handleUpdateProduct}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: G.green,
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      保存
                    </button>
                    <button
                      onClick={() => setEditingProduct(null)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: G.red,
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      取消
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
              {products.map(product => (
                <div
                  key={product.id}
                  style={{
                    background: G.card,
                    border: `1px solid ${G.border}`,
                    borderRadius: '8px',
                    padding: '15px'
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }}
                  />
                  <p style={{ marginBottom: '5px' }}>{product.name}</p>
                  <p style={{ color: G.gold, marginBottom: '10px' }}>{fmt(product.price)}</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setEditingProduct(product)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        background: G.gold,
                        color: '#000',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      編輯
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        background: G.red,
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      刪除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
