import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: '風味系列', href: '/products' },
  { label: '核心科技', href: '/technology' },
  { label: '門市據點', href: '/stores' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md border-b border-black/10 shadow-sm' : 'bg-white/80 backdrop-blur-md border-b border-black/10'
      }`}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Left links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 1).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-body text-[11px] tracking-widest uppercase transition-colors duration-200 ${
                  location.pathname === link.href ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 font-heading font-bold text-[22px] tracking-[0.35em] uppercase text-foreground"
          >
            TEREA
          </Link>

          {/* Right links */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-body text-[11px] tracking-widest uppercase transition-colors duration-200 ${
                  location.pathname === link.href ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden ml-auto text-foreground p-1"
            aria-label="メニューを開く"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            <div className="flex items-center justify-between h-16 px-6 border-b border-black/10">
              <span className="font-heading font-bold text-[22px] tracking-[0.35em] uppercase">TEREA</span>
              <button onClick={() => setMobileOpen(false)} aria-label="閉じる">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col pt-10 px-8 gap-0 divide-y divide-black/8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-5 font-body text-base tracking-wider text-foreground hover:text-black/60 transition-colors flex items-center justify-between"
                >
                  {link.label}
                  <span className="text-black/30">→</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}