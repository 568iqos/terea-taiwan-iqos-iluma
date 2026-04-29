import React from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: '加熱設備', href: '/devices' },
  { label: '風味系列', href: '/products' },
  { label: '核心科技', href: '/technology' },
  { label: '門市據點', href: '/stores' },
];

const LINE_URL = 'https://lin.ee/nVwf4TD';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Top section */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="font-heading font-bold text-2xl tracking-[0.35em] uppercase text-white block mb-4">
              TEREA
            </Link>
            <p className="font-body text-xs text-white/40 max-w-xs leading-relaxed">
              加熱不燃燒菸草產品資訊網站。本產品含有尼古丁，尼古丁具有成癮性。
            </p>
          </div>

          {/* 網站導覽 */}
          <div className="flex flex-col gap-3">
            <p className="font-body text-[10px] tracking-widest uppercase text-white/30 mb-1">網站導覽</p>
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                to={link.href}
                className="font-body text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* 關於我們 */}
          <div className="flex flex-col gap-3">
            <p className="font-body text-[10px] tracking-widest uppercase text-white/30 mb-1">關於我們</p>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm text-[#06C755] hover:text-[#06C755]/80 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
              官方 LINE 客服
            </a>
          </div>

          {/* 法律資訊 */}
          <div className="flex flex-col gap-3">
            <p className="font-body text-[10px] tracking-widest uppercase text-white/30 mb-1">法律資訊</p>
            <a href="#" className="font-body text-sm text-white/60 hover:text-white transition-colors">使用條款</a>
            <a href="#" className="font-body text-sm text-white/60 hover:text-white transition-colors">隱私權政策</a>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-white/60 hover:text-white transition-colors"
            >
              聯絡我們
            </a>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Bottom */}
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