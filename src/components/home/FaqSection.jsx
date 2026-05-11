import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { base44 } from "@/api/base44Client";

const DEFAULT_FAQS = [
  { q: "TEREA 是什麼產品？", a: "TEREA 是專為 IQOS ILUMA 系列設計的加熱式菸草彈，採用 Smartcore™ 感應加熱技術，從菸草內部加熱，溫度不超過 350°C，不產生燃燒、無灰燼。" },
  { q: "加熱不燃燒與傳統菸草有何不同？", a: "傳統菸草透過燃燒（600°C 以上）產生煙霧，而 TEREA 使用電磁感應將菸草加熱至 350°C 以下，產生蒸氣而非煙霧，因此無燃燒氣味，也不會產生灰燼。" },
  { q: "TEREA 有哪些口味可以選擇？", a: "目前 TEREA 台灣市場提供六款風味：醇原味、淡原味、柔原味、濃郁原味、綠洲珍珠（薄荷）、日光珍珠（柑橘薄荷），涵蓋菸草系與清涼系。" },
  { q: "在哪裡可以購買 TEREA？", a: "TEREA 可於全台授權門市購買，包含台北、台中、高雄等地。請前往「門市據點」頁面查詢最近的授權販售點。" },
  { q: "TEREA 每根可以使用多久？", a: "每根 TEREA 約可使用 14 口或 6 分鐘，具體時間依個人使用方式而異。" },
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);
  const [faqs, setFaqs] = useState(DEFAULT_FAQS);

  useEffect(() => {
    base44.entities.SiteSettings.list()
      .then((records) => {
        const rec = records.find((r) => r.key === "faq_items");
        if (rec?.value) {
          const parsed = JSON.parse(rec.value);
          if (Array.isArray(parsed) && parsed.length > 0) setFaqs(parsed);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-[#fafafa]">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">FAQ</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              常見<br />問題
            </h2>
          </motion.div>

          <div className="divide-y divide-border">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="font-heading text-sm font-semibold tracking-tight pr-4 group-hover:opacity-60 transition-opacity">
                    {faq.q}
                  </span>
                  <span className="flex-shrink-0">
                    {open === i ? <Minus className="w-4 h-4 text-muted-foreground" /> : <Plus className="w-4 h-4 text-muted-foreground" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="font-body text-sm text-muted-foreground leading-relaxed pb-5">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}