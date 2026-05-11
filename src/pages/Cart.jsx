import React from "react";
import { motion } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const SEVEN_ELEVEN_URL = "https://www.seven-eleven.com.tw/sellgoods/index";

export default function Cart() {
  const { items, removeItem, updateQty, totalCount } = useCart();

  const handleCheckout = () => {
    window.open(SEVEN_ELEVEN_URL, "_blank");
  };

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link to="/products" className="p-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight">購物車</h1>
            {totalCount > 0 && (
              <p className="font-body text-sm text-muted-foreground mt-0.5">共 {totalCount} 件商品</p>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 gap-6 text-muted-foreground"
          >
            <ShoppingBag className="w-16 h-16 opacity-20" />
            <p className="font-body text-sm">購物車是空的</p>
            <Link
              to="/products"
              className="font-body text-sm underline underline-offset-4 hover:text-foreground transition-colors"
            >
              前往風味系列
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Items */}
            <div className="space-y-4 mb-10">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-5 items-center bg-white rounded-2xl p-4 border border-border/50 shadow-sm"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-sm font-semibold">{item.name}</p>
                    <p className="font-body text-xs text-muted-foreground mb-1">{item.nameEn}</p>
                    <span className="inline-block bg-black/5 text-black/50 font-body text-[10px] px-2 py-0.5 rounded-full">
                      {item.region}
                    </span>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-body text-sm w-6 text-center font-medium">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 hover:bg-muted rounded-full transition-colors flex-shrink-0 ml-2"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Checkout */}
            <div className="bg-white rounded-2xl border border-border/50 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="font-body text-sm text-muted-foreground">共選購</span>
                <span className="font-heading text-lg font-bold">{totalCount} 件</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-[#00A651] text-white font-body text-sm tracking-widest rounded-xl hover:bg-[#00A651]/90 transition-all flex items-center justify-center gap-3"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm4 12H8v-1c0-2.209 1.791-4 4-4s4 1.791 4 4v1z"/>
                </svg>
                前往 7-11 賣貨便結帳
              </button>
              <p className="font-body text-[10px] text-muted-foreground text-center mt-3 leading-relaxed">
                點擊後將跳轉至 7-ELEVEN 賣貨便購買頁面
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}