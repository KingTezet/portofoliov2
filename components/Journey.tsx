"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

type JourneyItem = {
  id: number;
  date_event: string;
  title: string;
  description: string;
  category: string; 
};

// Kategori Filter
const categories = ["Latest", "Education", "Product & Strategy", "Tech & AI", "Creative"];

export default function Journey() {
  const [journeys, setJourneys] = useState<JourneyItem[]>([]);
  const [activeTab, setActiveTab] = useState("Latest"); 
  const [loading, setLoading] = useState(true);
  
  // Default tampil 6 item
  const INITIAL_COUNT = 6; 
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    async function fetchJourneys() {
      const { data, error } = await supabase
        .from("journeys")
        .select("*")
        .order("date_event", { ascending: false }); 

      if (error) console.error("Error fetching data:", error);
      else setJourneys(data || []);
      
      setLoading(false);
    }

    fetchJourneys();
  }, []);

  // Reset ke 6 item setiap kali ganti tab
  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [activeTab]);

  // Logika Filter
  const getFilteredJourneys = () => {
    if (activeTab === "Latest") {
      return journeys;
    }
    
    return journeys.filter((item) => {
       // Pastikan item.category tidak undefined
       const dbCategory = item.category || "";

       // 1. Tab Tech & AI menangkap data Web Dev, IoT, AI, dll.
       if (activeTab === "Tech & AI") {
         return ["Web Developer", "IoT", "AI Automation", "Tech"].includes(dbCategory);
       }
       
       // 2. Tab Creative menangkap data Video, Grafis, dll.
       if (activeTab === "Creative") {
         return ["Editor Video", "Graphic Design", "Creative Direction"].includes(dbCategory);
       }

       // 3. Tab Product & Strategy menangkap peran manajerial
       if (activeTab === "Product & Strategy") {
         return ["Product Management", "Strategy", "Product & Strategy"].includes(dbCategory);
       }

       // 4. Fallback untuk tab lain (seperti Education) agar pencocokannya otomatis
       return dbCategory.toLowerCase() === activeTab.toLowerCase();
    });
  };

  const allFiltered = getFilteredJourneys();
  const displayedJourneys = allFiltered.slice(0, visibleCount);
  
  // Logic Tombol
  const hasMore = visibleCount < allFiltered.length;
  const canCollapse = visibleCount > INITIAL_COUNT && !hasMore;

  if (loading) return <div className="bg-[#000000] text-center py-32 text-gray-500 font-light tracking-widest animate-pulse">LOADING HISTORY...</div>;

  return (
    <section id="journey" className="relative w-full py-32 bg-[#000000] overflow-hidden">
      
      {/* --- AMBIENT GLOW ACCENTS --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-24 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500 border border-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                    Milestones
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mt-6 tracking-tight leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-[length:200%_auto] animate-shine">
                        The Journey.
                    </span>
                </h2>
            </motion.div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
                <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`
                    px-6 py-2 rounded-full text-sm font-medium transition-all duration-500
                    border backdrop-blur-md
                    ${activeTab === cat 
                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                    : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white hover:border-white/20"}
                `}
                >
                {cat}
                </button>
            ))}
            </div>
        </div>

        {/* --- TIMELINE CONTENT --- */}
        <div className="relative">
            {/* Garis Tengah */}
            {displayedJourneys.length > 0 && (
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2" />
            )}

            <div className="space-y-16">
            <AnimatePresence mode="popLayout">
                {displayedJourneys.map((item, index) => (
                <motion.div
                    layout 
                    key={item.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={`relative flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                >
                    {/* Titik Tengah */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-black rounded-full border border-white/50 z-10 -translate-x-1/2 shadow-[0_0_10px_white]" />

                    {/* Konten */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:px-12 ${
                    index % 2 === 0 ? "md:text-left" : "md:text-right"
                    }`}>
                    
                    <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 cursor-default">
                        <div className={`flex items-center gap-3 mb-4 text-xs font-mono text-gray-400 uppercase tracking-widest ${
                        index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                        }`}>
                        <span className="text-white">{item.date_event}</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full" />
                        <span className="text-blue-400/80">{item.category}</span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors tracking-tight">
                        {item.title}
                        </h3>
                        <p className="text-gray-400 text-base leading-relaxed font-light">
                        {item.description}
                        </p>
                    </div>
                    </div>
                    
                    {/* Spacer */}
                    <div className="hidden md:block w-1/2" />
                </motion.div>
                ))}
            </AnimatePresence>

            {/* Pesan Kosong */}
            {displayedJourneys.length === 0 && (
                <div className="text-center text-gray-600 py-32 font-light border border-dashed border-white/5 rounded-3xl">
                <p>No milestones found in {activeTab}.</p>
                </div>
            )}
            
            {/* BUTTON CONTROL (LOAD MORE / SHOW LESS) */}
            <div className="flex justify-center pt-10 pb-10">
                {hasMore && (
                    <button 
                        onClick={() => setVisibleCount(prev => prev + 4)}
                        className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 group"
                    >
                        View Previous Chapters
                        <span className="group-hover:translate-y-0.5 transition-transform duration-300">↓</span>
                    </button>
                )}

                {canCollapse && (
                    <button 
                        onClick={() => {
                            setVisibleCount(INITIAL_COUNT);
                            // Opsional: Scroll sedikit ke atas biar user sadar listnya memendek
                            const element = document.getElementById("journey");
                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-3 rounded-full bg-red-900/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                    >
                        Collapse History
                        <span className="group-hover:-translate-y-0.5 transition-transform duration-300">↑</span>
                    </button>
                )}
            </div>

            </div>
        </div>

      </div>
    </section>
  );
}
