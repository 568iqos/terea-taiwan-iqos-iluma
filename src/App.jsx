import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/sonner";
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import Technology from './pages/Technology';
import Stores from './pages/Stores';
import Devices from './pages/Devices';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Limited from './pages/Limited';
import Admin from './pages/Admin';
import PageNotFound from './lib/PageNotFound';

// 全域錯誤邊界
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold mb-2">發生錯誤</h1>
            <p className="text-gray-600 mb-4">網站暫時無法使用，請稍後重試。</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-black/80 transition"
            >
              重新整理
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/* ── Google Fonts ─────────────────────────────────────── */
const _fl = document.createElement("link");
_fl.rel = "stylesheet";
_fl.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;600;700;800;900&family=Noto+Sans+TC:wght@400;500;700;900&display=swap";
document.head.appendChild(_fl);

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/limited" element={<Limited />} />
        </Route>
        
        {/* Admin Route */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/login" element={<Admin />} />
        
        {/* 404 Route */}
        <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </ErrorBoundary>
  );
}
