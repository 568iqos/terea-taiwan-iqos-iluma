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
        <div className="max-w-4xl mx-auto space-y-16">

          {/* 品牌介紹 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="font-heading text-2xl font-bold mb-4">TEREA 是什麼？</h2>
            <p className="font-body text-muted-foreground leading-relaxed text-base">
              TEREA 是 PHILIP MORRIS 菲利普莫里斯國際（PMI）專為 IQOS ILUMA 加熱菸設備設計的專用菸彈，核心亮點在於採用最新一代 SMARTCORE INDUCTION SYSTEM® 感應式加熱技術——採用「智能加熱技術」！徹底廢除加熱片，無需清理、沒有殘渣，內部含金屬部件直接加熱，由內而外加熱，口感更純淨，並大幅降低了故障率。
            </p>
          </motion.div>

          {/* 技術說明 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-secondary/50 rounded-2xl p-8"
          >
            <h2 className="font-heading text-2xl font-bold mb-2">SmartCore Induction System®</h2>
            <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-4">智能感應加熱技術</p>
            <ul className="font-body text-muted-foreground leading-relaxed text-base space-y-2">
              <li>✦ 徹底廢除傳統加熱片，零殘渣、無需清理</li>
              <li>✦ 菸彈內部金屬部件直接感應加熱，由內而外</li>
              <li>✦ 溫度更均勻、口感更純淨</li>
              <li>✦ 大幅降低設備故障率，延長使用壽命</li>
            </ul>
          </motion.div>

          {/* 口味介紹 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h2 className="font-heading text-2xl font-bold mb-4">超過 20 種口味任您選擇</h2>
            <p className="font-body text-muted-foreground leading-relaxed text-base mb-3">
              TEREA 是一款透過 IQOS ILUMA 系列加熱的菸草產品，擁有超過 20 種不同的口味。初次使用者可能不知道該選擇哪一種，因此我們將以簡單易懂的方式介紹每種 TEREA 的口味特徵。
            </p>
            <p className="font-body text-muted-foreground leading-relaxed text-base mb-3">
              如果您是剛接觸 IQOS、想從傳統香煙轉換過來，歡迎將我們的口味指南作為參考！TEREA 每年都會不斷推出幾種新口味，最新資訊都可以在這裡找到。
            </p>
            <p className="font-body text-muted-foreground leading-relaxed text-base mb-6">
              台灣目前已合法上架，但使用上仍需符合菸害防治法規定。
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-black text-white px-8 py-3.5 font-body text-[11px] tracking-widest uppercase hover:bg-black/80 transition-colors rounded-lg"
            >
              瀏覽所有口味
            </Link>
          </motion.div>

          {/* 法規聲明 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="border border-border rounded-2xl p-6 text-center"
          >
            <p className="font-body text-sm font-semibold text-foreground tracking-wider">
              ｜吸煙有害健康｜未滿二十歲請勿購買｜
            </p>
          </motion.div>

        </div>
      </section>
    </div>
  );
}