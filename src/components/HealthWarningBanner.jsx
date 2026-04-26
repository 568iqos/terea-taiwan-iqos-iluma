import React from "react";

export default function HealthWarningBanner() {
  return (
    <div className="bg-black text-white text-center py-2 px-4">
      <p className="font-body text-[11px] text-white/70 tracking-wide">
        ⚠ 吸菸有害健康。本產品含有尼古丁，尼古丁具有成癮性。未滿20歲請勿使用。
      </p>
    </div>
  );
}