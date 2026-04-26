import React from "react";

export default function HealthWarningBanner() {
  return (
    <div className="bg-foreground text-background text-center py-2 px-4">
      <p className="font-body text-xs text-background/70">
        ⚠ 吸菸有害健康——吸菸會導致肺癌、心臟病、慢性支氣管炎及動脈硬化。本產品含有尼古丁，尼古丁具有成癮性。未滿20歲請勿使用。
      </p>
    </div>
  );
}