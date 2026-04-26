import React from 'react';

const footerLinks = [
  { label: '使用條款', href: '#' },
  { label: '隱私權政策', href: '#' },
  { label: 'Cookie 設定', href: '#' },
  { label: '聯絡我們', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative bg-secondary min-h-[50vh] flex flex-col justify-end overflow-hidden">
      {/* Oversized TEREA logo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none">
        <span className="font-heading font-extrabold text-[18vw] md:text-[14vw] tracking-[0.2em] uppercase text-secondary-foreground/[0.03] leading-none whitespace-nowrap translate-y-[30%] block">
          TEREA
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 pt-24">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12 mb-16">
          <div>
            <span className="font-heading font-bold text-2xl tracking-[0.3em] uppercase text-secondary-foreground">
              TEREA
            </span>
            <p className="font-body text-xs text-secondary-foreground/40 mt-3 max-w-sm leading-relaxed">
              TEREA Taiwan — 加熱不燃燒菸草產品資訊網站。
            </p>
          </div>

          <div className="flex flex-wrap gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-xs text-secondary-foreground/40 hover:text-primary transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-secondary-foreground/10 mb-8" />

        {/* Legal notice */}
        <div className="space-y-3">
          <p className="font-body text-[10px] text-secondary-foreground/25 leading-relaxed max-w-3xl">
            ⚠ 吸菸有害健康——吸菸會導致肺癌、心臟病、慢性支氣管炎及動脈硬化。本產品含有尼古丁，尼古丁具有成癮性。未滿20歲請勿購買或吸菸。本網站僅供台灣地區20歲以上成年人瀏覽。
          </p>
          <p className="font-body text-[10px] text-secondary-foreground/20">
            © {new Date().getFullYear()} TEREA Taiwan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}