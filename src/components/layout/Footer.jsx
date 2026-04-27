import React from 'react';
import { Link } from 'react-router-dom';

const footerLinks = [
  { label: '使用條款', href: '#' },
  { label: '隱私權政策', href: '#' },
  { label: 'Cookie 設定', href: '#' },
  { label: '聯絡我們', href: '#' },
];

const navLinks = [
  { label: '風味系列', href: '/products' },
  { label: '核心科技', href: '/technology' },
  { label: '門市據點', href: '/stores' },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Top section */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="font-heading font-bold text-2xl tracking-[0.35em] uppercase text-white block mb-4">
              TEREA
            </Link>
            <p className="font-body text-xs text-white/40 max-w-xs leading-relaxed">
              加熱不燃燒菸草產品資訊網站。本產品含有尼古丁，尼古丁具有成癮性。
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <p className="font-body text-[10px] tracking-widest uppercase text-white/30 mb-1">網站導覽</p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-body text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* About */}
          <div className="flex flex-col gap-3">
            <p className="font-body text-[10px] tracking-widest uppercase text-white/30 mb-1">關於我們</p>
            <div className="font-body text-xs text-white/50 leading-relaxed max-w-xs space-y-3">
              <p>TEREA Taiwan 是台灣最專業的加熱不燃燒菸草產品代理商，致力提供消費者最優質的 IQOS ILUMA 搭配體驗。</p>
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">我們的團隊</p>
                <p>由一群熱愛生活品質的專業人士組成，提供完整的產品諮詢與售後服務。</p>
              </div>
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">聯絡我們</p>
                <p>📧 service@terea-taiwan.com</p>
                <p>📞 02-1234-5678</p>
                <p>週一至週五 10:00–19:00</p>
              </div>
            </div>
          </div>

          {/* Legal links */}
          <div className="flex flex-col gap-3">
            <p className="font-body text-[10px] tracking-widest uppercase text-white/30 mb-1">法律資訊</p>
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Bottom section */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-6">
        <p className="font-body text-[11px] text-white/30 leading-relaxed mb-2">
          ⚠ 吸菸有害健康——吸菸會導致肺癌、心臟病、慢性支氣管炎及動脈硬化。本產品含有尼古丁，尼古丁具有成癮性。未滿20歲請勿購買或吸菸。本網站僅供台灣地區20歲以上成年人瀏覽。
        </p>
        <p className="font-body text-[11px] text-white/20">
          © {new Date().getFullYear()} TEREA Taiwan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}