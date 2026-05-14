import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: '加熱設備', href: '/devices' },
  { label: '風味系列', href: '/products' },
  { label: '最新限定', href: '/limited' },
  { label: '關於我們', href: '/about' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent border-b border-white/10'
          : 'bg-white/96 backdrop-blur-md border-b border-black/8 shadow-sm'
      }`}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Left links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.slice(0, 1).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-body text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                  transparent ? 'text-white/70 hover:text-white' :
                  location.pathname === link.href ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <Link
            to="/"
            className={`absolute left-1/2 -translate-x-1/2 font-heading font-bold text-[20px] tracking-[0.4em] uppercase transition-colors duration-300 ${
              transparent ? 'text-white' : 'text-foreground'
            }`}
          >
            TEREA
          </Link>

          {/* Right links */}
          <div className="hidden md:flex items-center gap-10 ml-auto">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-body text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                  transparent ? 'text-white/70 hover:text-white' :
                  location.pathname === link.href ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className={`md:hidden ml-2 p-1 transition-colors ${transparent ? 'text-white' : 'text-foreground'}`}
            aria-label="開啟選單"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-black text-white flex flex-col"
          >
            <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
              <span className="font-heading font-bold text-[20px] tracking-[0.4em] uppercase">TEREA</span>
              <button onClick={() => setMobileOpen(false)} aria-label="關閉選單">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col pt-8 px-8 gap-0 divide-y divide-white/10">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="py-5 font-body text-sm tracking-wider text-white/60 hover:text-white transition-colors flex items-center justify-between"
              >
                首頁
                <span className="text-white/20">→</span>
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-5 font-body text-sm tracking-wider transition-colors flex items-center justify-between ${
                    location.pathname === link.href ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className="text-white/20">→</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}