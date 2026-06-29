import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Admin() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [imageInput, setImageInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('adminUser');
    if (!user) {
      window.location.href = '/admin-login';
    } else {
      setCurrentUser(user);
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      setProducts(data || []);
      const initialImages = {};
      (data || []).forEach(product => {
        initialImages[product.id] = null;
      });
      setImageInput(initialImages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const startEditingName = (product) => {
    setEditingId(product.id);
    setEditingName(product.name || '');
  };

  const cancelEditName = () => {
    setEditingId(null);
    setEditingName('');
  };

  const saveProductName = async (productId) => {
    if (!editingName.trim()) {
      alert('產品名稱不能為空');
      return;
    }
    try {
      setLoading(true);
      const { error } = await supabase
        .from('products')
        .update({ name: editingName })
        .eq('id', productId);
      if (error) throw error;
      setProducts(products.map(p => 
        p.id === productId ? { ...p, name: editingName } : p
      ));
      setEditingId(null);
      setSaveMessage('產品名稱已保存');
      setTimeout(() => setSaveMessage(''), 2000);
    } catch (error) {
      console.error('Error saving product name:', error);
      alert('保存失敗: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (productId, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageInput(prev => ({
          ...prev,
          [productId]: {
            file: file,
            preview: e.target.result,
            name: file.name
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProductImage = async (productId) => {
    const image = imageInput[productId];
    if (!image || !image.file) {
      alert('請先選擇圖片');
      return;
    }
    try {
      setLoading(true);
      const timestamp = Date.now();
      const fileName = `product-${productId}-${timestamp}.jpg`;
      const { data, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, image.file);
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);
      const { error: updateError } = await supabase
        .from('products')
        .update({ image_url: urlData.publicUrl })
        .eq('id', productId);
      if (updateError) throw updateError;
      setProducts(products.map(p =>
        p.id === productId ? { ...p, image_url: urlData.publicUrl } : p
      ));
      setImageInput(prev => ({
        ...prev,
        [productId]: null
      }));
      setSaveMessage('圖片已上傳');
      setTimeout(() => setSaveMessage(''), 2000);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('上傳失敗: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    window.location.href = '/';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>TEREA 後台管理</h1>
        <div style={styles.userInfo}>
          <p style={styles.userEmail}>歡迎，{currentUser}</p>
          <button onClick={handleLogout} style={styles.logoutBtn}>登出</button>
        </div>
      </div>

      {saveMessage && <div style={styles.saveMessage}>{saveMessage}</div>}

      <div style={styles.tabs}>
        <button style={{...styles.tab, ...(activeTab === 'products' ? styles.tabActive : {})}} onClick={() => setActiveTab('products')}>
          📦 產品管理
        </button>
        <button style={{...styles.tab, ...(activeTab === 'hero' ? styles.tabActive : {})}} onClick={() => setActiveTab('hero')}>
          🎬 Hero 輸播
        </button>
        <button style={{...styles.tab, ...(activeTab === 'faq' ? styles.tabActive : {})}} onClick={() => setActiveTab('faq')}>
          ❓ FAQ 問答
        </button>
      </div>

      {activeTab === 'products' && (
        <div style={styles.tabContent}>
          <h2>產品圖片與名稱管理</h2>
          <p style={styles.instruction}>點擊產品名稱可編輯。點擊「上傳」選圖片。</p>
          <div style={styles.productGrid}>
            {products.map((product) => (
              <div key={product.id} style={styles.productCard}>
                <div style={styles.imageContainer}>
                  {imageInput[product.id]?.preview || product.image_url ? (
                    <img src={imageInput[product.id]?.preview || product.image_url} alt={product.name} style={styles.productImage} />
                  ) : (
                    <div style={styles.noImage}>無圖片</div>
                  )}
                </div>
                <div style={styles.productInfo}>
                  {editingId === product.id ? (
                    <div style={styles.editNameContainer}>
                      <input type="text" value={editingName} onChange={(e) => setEditingName(e.target.value)} style={styles.editNameInput} placeholder="輸入產品名稱" autoFocus />
                      <div style={styles.editNameButtons}>
                        <button onClick={() => saveProductName(product.id)} style={styles.saveNameBtn} disabled={loading}>✓</button>
                        <button onClick={cancelEditName} style={styles.cancelNameBtn} disabled={loading}>✕</button>
                      </div>
                    </div>
                  ) : (
                    <h3 onClick={() => startEditingName(product)} style={styles.productName} title="點擊編輯名稱">
                      {product.name || '(未命名)'}
                    </h3>
                  )}
                </div>
                <div style={styles.imageUpload}>
                  <input type="file" accept="image/*" onChange={(e) => handleImageSelect(product.id, e.target.files[0])} style={styles.fileInput} id={`image-${product.id}`} />
                  <label htmlFor={`image-${product.id}`} style={styles.uploadLabel}>⬆ 上傳</label>
                </div>
                {imageInput[product.id] && (
                  <button onClick={() => uploadProductImage(product.id)} style={styles.confirmUploadBtn} disabled={loading}>確認上傳</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'hero' && <div style={styles.tabContent}><h2>Hero 輸播管理</h2><p>功能開發中...</p></div>}
      {activeTab === 'faq' && <div style={styles.tabContent}><h2>FAQ 問答管理</h2><p>功能開發中...</p></div>}
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' },
  header: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  title: { fontSize: '24px', fontWeight: 'bold', margin: 0 },
  userInfo: { display: 'flex', alignItems: 'center', gap: '15px' },
  userEmail: { margin: 0, fontSize: '14px', color: '#666' },
  logoutBtn: { padding: '8px 16px', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
  saveMessage: { backgroundColor: '#4CAF50', color: 'white', padding: '12px 16px', borderRadius: '4px', marginBottom: '15px', textAlign: 'center', fontSize: '14px' },
  tabs: { display: 'flex', gap: '10px', marginBottom: '20px', backgroundColor: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  tab: { padding: '10px 20px', backgroundColor: '#f0f0f0', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' },
  tabActive: { backgroundColor: '#1a1a1a', color: '#fff' },
  tabContent: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  instruction: { fontSize: '14px', color: '#666', marginBottom: '20px' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' },
  productCard: { backgroundColor: '#f9f9f9', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px' },
  imageContainer: { width: '100%', aspectRatio: '1', marginBottom: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  productImage: { width: '100%', height: '100%', objectFit: 'cover' },
  noImage: { color: '#999', fontSize: '12px' },
  productInfo: { marginBottom: '12px', minHeight: '50px' },
  productName: { fontSize: '14px', fontWeight: '600', margin: 0, marginBottom: '8px', color: '#1a1a1a', cursor: 'pointer', padding: '4px', borderRadius: '4px' },
  editNameContainer: { display: 'flex', gap: '6px', marginBottom: '8px' },
  editNameInput: { flex: 1, padding: '6px 8px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'inherit' },
  editNameButtons: { display: 'flex', gap: '4px' },
  saveNameBtn: { width: '32px', height: '32px', padding: 0, backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '
