import React from "react";
import { motion } from "framer-motion";

export default function LineContactButton() {
  const LINE_OFFICIAL_URL = "https://lin.ee/oUNXRCC";

  return (
    <motion.a
      href={LINE_OFFICIAL_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#00B900] hover:bg-[#009900] shadow-lg flex items-center justify-center transition-all"
      title="加入 TEREA 官方 LINE"
    >
      <svg
        className="w-7 h-7"
        fill="white"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19.265 6.365c-.396-2.002-2.334-3.474-4.686-3.474H9.421C6.983 2.891 5 4.412 5 6.598v6.032c0 2.014 1.817 3.689 4.086 3.844l4.086 2.668c1.524 1.002 3.62.168 4.034-1.574l1.445-5.82c.365-1.459-.092-2.97-1.386-3.93zm-2.102 7.44c-.346 1.397-1.88.992-2.102.878l-3.43-2.252v-5.126c0-.654.537-1.19 1.201-1.19h5.158c1.199 0 2.224.906 2.371 2.056l1.445 5.82c.09.368.037.666-.213.896-.25.23-.653.27-1.03.112l-1.4-5.628c-.23-.926-1.043-1.545-2.015-1.545h-1.435c-.72 0-1.302.567-1.302 1.267v4.234c0 .137.038.27.108.383l2.245 1.476c.18.118.483.248.738.082.125-.078.192-.212.192-.417V13.38c0-.386.315-.698.704-.698h.467c.388 0 .703.312.703.698v2.017c0 .827-.68 1.49-1.521 1.49-.38 0-.74-.146-1.015-.411l-2.245-1.476c.07.113.108.246.108.383v.734c0 .648-.527 1.174-1.176 1.174-.648 0-1.174-.526-1.174-1.174v-4.234c0-.688.56-1.267 1.302-1.267h1.435c.973 0 1.786-.62 2.015-1.544l1.4-5.63c.073-.298.322-.524.63-.524.307 0 .548.196.636.488l1.445 5.82z"/>
      </svg>
    </motion.a>
  );
}