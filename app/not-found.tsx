"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden px-4">
      
      {/* --- BACKGROUND ACCENTS --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-lg">
        
        {/* ICON ANIMATION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 backdrop-blur-md"
        >
            <FileQuestion size={48} className="text-gray-400" />
        </motion.div>

        {/* 404 TITANIUM TEXT */}
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-8xl md:text-9xl font-bold tracking-tighter"
        >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-600">
                404
            </span>
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
        >
            <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
            <p className="text-gray-400 font-light leading-relaxed">
                Oops! Sepertinya kamu tersesat di ruang hampa. Halaman yang kamu cari tidak ditemukan atau sudah dipindahkan.
            </p>
        </motion.div>

        {/* BUTTON HOME */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-4"
        >
            <Link 
                href="/" 
                className="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Return Home
            </Link>
        </motion.div>

      </div>
    </div>
  );
}