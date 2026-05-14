import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-px w-16 bg-primary mb-8" />
            <p className="font-body text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-3">About Us</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-8">
              關於我們
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 lg:px-12 pb-32">
        <div className="max-w-4xl mx-auto space-y-8">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-body text-base leading-relaxed text-foreground"
          >
            TEREA 是 PHILIP MORRIS 菲利普莫里斯國際（PMI）專為 IQOS ILUMA 加熱菸設備設計的專用菸彈，核心亮點在於採用最新一代 SMARTCORE INDUCTION SYSTEM® 感應式加熱技術——採用「智能加熱技術」！徹底廢除加熱片，無需清理、沒有殘渣，內部含金屬部件直接加熱，菸彈口味眾多，由內而外加熱，口感更純淨，大幅降低了故障率（Smartcore Induction System）。
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-base leading-relaxed text-foreground"
          >
            TEREA 是一款透過 IQOS ILUMA 系列加熱的菸草產品，有超過 20 種不同的口味，初次使用者可能會不知道該選擇哪一種。因此，我們將以簡單易懂的方式解釋每種 TEREA 的口味特徵。我們將在下面的清單中介紹所有類型！我們還介紹了具有推薦點的口味，如果是剛接觸 IQOS，並且想從香煙轉換過來，請將此作為參考！TEREA 每年都會不斷推出幾種新口味，最新資訊可以在這裡找到。台灣目前已合法上架，但使用上仍需符合菸害防治法規定。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-black text-white px-8 py-3.5 font-body text-[11px] tracking-widest uppercase hover:bg-black/80 transition-colors rounded-lg"
            >
              瀏覽所有口味
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="border-t border-border pt-8"
          >
            <p className="font-body text-sm font-semibold text-foreground tracking-wider text-center">
              ｜吸煙有害健康｜未滿二十歲請勿購買｜
            </p>
          </motion.div>

        </div>
      </section>
    </div>
  );
}