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
