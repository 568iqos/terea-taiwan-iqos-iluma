import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    product: '',
    quantity: '',
    birthday: '',
    lineId: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const response = await base44.functions.invoke('sendContactForm', formData);
      setMessage(response.data.message);
      setFormData({
        name: '',
        phone: '',
        product: '',
        quantity: '',
        birthday: '',
        lineId: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || '提交失敗，請稍後重試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">聯絡我們</h1>
          <p className="text-foreground/60 text-lg">有任何問題或想購買商品？請填寫表單，我們會盡快為您服務。</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-2xl p-8 shadow-lg">
          {/* 姓名 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              姓名 <span className="text-destructive">*</span>
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="請輸入您的姓名"
              required
              className="w-full"
            />
          </div>

          {/* 電話 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              電話 <span className="text-destructive">*</span>
            </label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="請輸入您的電話號碼"
              required
              className="w-full"
            />
          </div>

          {/* 想購買商品 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              想購買商品 <span className="text-destructive">*</span>
            </label>
            <Input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleChange}
              placeholder="例：ILUMA、ILUMA Prime"
              required
              className="w-full"
            />
          </div>

          {/* 條數 */}
          <div>
            <label className="block text-sm font-medium mb-2">條數</label>
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="請輸入數量"
              className="w-full"
            />
          </div>

          {/* 生日 */}
          <div>
            <label className="block text-sm font-medium mb-2">生日</label>
            <Input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* LINE ID */}
          <div>
            <label className="block text-sm font-medium mb-2">LINE ID</label>
            <Input
              type="text"
              name="lineId"
              value={formData.lineId}
              onChange={handleChange}
              placeholder="請輸入您的 LINE ID"
              className="w-full"
            />
          </div>

          {/* 訊息 */}
          {message && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-800">{message}</p>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* 提交按鈕 */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white font-medium hover:bg-black/80 transition-colors disabled:opacity-50"
          >
            {loading ? '提交中...' : '提交表單'}
          </Button>

          <p className="text-sm text-foreground/50 text-center">
            標記 <span className="text-destructive">*</span> 的欄位為必填
          </p>
        </form>
      </div>
    </div>
  );
}