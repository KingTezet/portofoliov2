"use client";

import { motion } from "framer-motion";

// SUMBER LINK: WIKIMEDIA COMMONS & GITHUB RAW (Paling Stabil)
const tools = [
  // --- TRADING ---
  { 
    name: "TradingView", 
    // Pakai CDN SimpleIcons + Warna Putih (/white) biar kelihatan di bg gelap
    icon: "https://cdn.simpleicons.org/tradingview/white" 
  },
  { 
    name: "MetaTrader 5", 
    // PAKE FILE LOKAL (Simpan mt5.png di folder public)
    icon: "/mt5.png" 
  },
  
  // --- CODING ---
  { 
    name: "VS Code", 
    // Link SVG Murni dari Wikimedia
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"
  },
  { 
    name: "Supabase", 
    // Warna Hijau Supabase (/3ECF8E)
    icon: "https://cdn.simpleicons.org/supabase/3ECF8E"
  },
  
  // --- DESIGN ---
  { 
    name: "Figma", 
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
  },
  { 
    name: "Photoshop", 
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg"
  },
  
  // --- VIDEO EDITING ---
  { 
    name: "Premiere Pro", 
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg"
  },
  { 
    name: "After Effects", 
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg"
  },
  { 
    name: "CapCut", 
    // PAKE FILE LOKAL (Simpan capcut.png di folder public)
    icon: "/capcut.png"
  },
  
  // --- IOT ---
  { 
    name: "Arduino", 
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/87/Arduino_Logo.svg"
  },
];

export default function InfiniteTicker() {
  return (
    <div className="w-full overflow-hidden bg-[#0a0a0a] border-y border-white/5 py-6 relative z-20">
      
      {/* Gradient Fade di Kiri & Kanan */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      {/* Label Kecil di Kiri */}
      <div className="absolute top-0 bottom-0 left-0 pl-8 pr-12 bg-[#0a0a0a] z-20 hidden md:flex items-center border-r border-white/10">
          <span className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase">
              Tools I Use
          </span>
      </div>

      <motion.div
        className="flex min-w-full w-max gap-12 px-4"
        animate={{ x: ["0%", "-50%"] }} 
        transition={{ repeat: Infinity, ease: "linear", duration: 40 }} 
        whileHover={{ animationPlayState: "paused" }} 
      >
        {/* Render 2x biar seamless loop */}
        {[...tools, ...tools].map((tool, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default group grayscale hover:grayscale-0"
          >
            {/* GAMBAR ICON ASLI */}
            <div className="relative w-6 h-6 flex items-center justify-center">
                <img 
                    src={tool.icon} 
                    alt={tool.name} 
                    className="w-full h-full object-contain"
                />
            </div>
            
            {/* Nama Aplikasi */}
            <span className="font-medium tracking-wide text-sm md:text-base whitespace-nowrap">
                {tool.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}