"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Globe, Zap, ZapOff, ShieldAlert, X, Lock, Unlock } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type Message = { 
  id: number; name: string; text: string; x: number; y: number; vx: number; vy: number; radius: number;
};

const ADMIN_SECRET = "sugih-lock";
const BANNED_WORDS = [
  "kasar",
  "jahat",
  "toxic",
  "anjing",
  "anjg",
  "babi",
  "ande",
  "suganda",
  "tolol",
  "ajg",
  "hutang",
  "gay",
  "lgbt",
  "ewe",
  "ngentot",
  "kentot",
  "bangsat",
  "bajingan",
  "goblok",
  "kontol",
  "memek",
  "haram",
  "kntl",
  "mmk",
  "pukimak",
  "vio",
  "gina",
  "tt",
  "susu",
  "nigga",
  "homo",
  "ngewe",
  "tll",
  "asu",
  "anjir",
  "anjay",
  "anying",
  "njir",
  "nying",
  "bego",
  "bangke",
  "bongol",
  "keparat",
  "sialan",
  "setan",
  "tai"
];


export default function LegacyGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputName, setInputName] = useState("");
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState("");
  const [rtStatus, setRtStatus] = useState("CONNECTING");
  
  const isAdmin = inputName.toLowerCase() === ADMIN_SECRET;

  // 1. DATA SYNC (HYBRID REALTIME)
  const fetchMessages = async (isSilent = false) => {
    const { data } = await supabase.from("messages").select("*").order("id", { ascending: false }).limit(12);
    if (data) {
      setMessages(prev => {
        return data.map(m => {
          const existing = prev.find(p => p.id === m.id);
          if (existing) return existing;
          const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
          return {
            ...m,
            x: Math.random() * (isMobile ? 150 : 500) + 100,
            y: Math.random() * (isMobile ? 200 : 300) + 100,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            // Radius diperkecil agar jarak antar bubble lebih rapat secara visual
            radius: isMobile ? 35 : 45 
          };
        });
      });
    }
  };

  useEffect(() => {
    fetchMessages();
    const channel = supabase.channel("titanium_v7")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, () => fetchMessages(true))
      .subscribe((status) => setRtStatus(status));

    const backupSync = setInterval(() => fetchMessages(true), 5000);
    return () => { supabase.removeChannel(channel); clearInterval(backupSync); };
  }, []);

  // 2. INTERACTIVE PHYSICS ENGINE
  useEffect(() => {
    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const { offsetWidth: w, offsetHeight: h } = containerRef.current;
      const rect = containerRef.current.getBoundingClientRect();

      setMessages(prev => {
        const newMsgs = prev.map(m => ({ ...m }));
        
        for (let m of newMsgs) {
          // Repulsion Kursor
          const dxMouse = m.x - (mouseRef.current.x - rect.left);
          const dyMouse = m.y - (mouseRef.current.y - rect.top);
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          const pushRadius = 180;

          if (distMouse < pushRadius) {
            const force = (pushRadius - distMouse) / pushRadius;
            m.vx += (dxMouse / distMouse) * force * 1.5;
            m.vy += (dyMouse / distMouse) * force * 1.5;
          }

          // Gerakan & Friksi
          m.x += m.vx; m.y += m.vy;
          m.vx *= 0.96; 
          m.vy *= 0.96;

          // Batas Dinding (Bounce)
          if (m.x <= m.radius) { m.x = m.radius; m.vx *= -0.7; }
          if (m.x >= w - m.radius) { m.x = w - m.radius; m.vx *= -0.7; }
          if (m.y <= m.radius) { m.y = m.radius; m.vy *= -0.7; }
          if (m.y >= h - m.radius) { m.y = h - m.radius; m.vy *= -0.7; }
        }

        // Tabrakan Antar Bubble
        for (let i = 0; i < newMsgs.length; i++) {
          for (let j = i + 1; j < newMsgs.length; j++) {
            const m1 = newMsgs[i]; const m2 = newMsgs[j];
            const dx = m2.x - m1.x; const dy = m2.y - m1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            // Multiplier 1.1 untuk memberi sedikit ruang visual yang pas
            const minDist = (m1.radius + m2.radius) * 1.1; 

            if (dist < minDist) {
              const angle = Math.atan2(dy, dx);
              const overlap = minDist - dist;
              m1.x -= Math.cos(angle) * (overlap / 2);
              m1.y -= Math.sin(angle) * (overlap / 2);
              m2.x += Math.cos(angle) * (overlap / 2);
              m2.y += Math.sin(angle) * (overlap / 2);
              const tvx = m1.vx; m1.vx = m2.vx * 0.8; m2.vx = tvx * 0.8;
              const tvy = m1.vy; m1.vy = m2.vy * 0.8; m2.vy = tvy * 0.8;
            }
          }
        }
        return newMsgs;
      });
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim() || !inputText.trim()) return;

    // --- LOGIKA FILTER BANNED WORDS ---
    const combinedInput = (inputName + " " + inputText).toLowerCase();
    
    // Cek apakah ada kata di BANNED_WORDS yang muncul di input
    const isBanned = BANNED_WORDS.some(word => combinedInput.includes(word.toLowerCase()));

    if (isBanned && !isAdmin) { // Admin biasanya bypass filter, tapi bisa dihapus "!isAdmin" jika mau strict
      setError("PROHIBITED TRANSMISSION: MENGANDUNG KATA KASAR.");
      
      // Hilangkan pesan error setelah 3 detik
      setTimeout(() => setError(""), 3000);
      return;
    }

    // Jika lolos filter, baru kirim ke Supabase
    const { error: sbError } = await supabase.from("messages").insert([
      { name: inputName, text: inputText }
    ]);

    if (!sbError) { 
      setInputText(""); 
      fetchMessages(true); 
    } else {
      setError("TRANSMISSION FAILED: DATABASE REJECTED.");
      setTimeout(() => setError(""), 3000);
    }
  };
  const deleteMsg = async (id: number) => {
    if (!isAdmin) return;
    await supabase.from("messages").delete().eq("id", id);
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  return (
    <section className="relative py-28 px-4 bg-[#050505] overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* TITANIUM HEADER */}
<div className="text-center mb-20 space-y-6">
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
    >
        {/* Badge Atas - Dibikin mirip Selected Works di Project */}
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-500 border border-white/5 px-4 py-2 rounded-full backdrop-blur-sm bg-white/[0.02]">
            Public Transmission
        </span>

        {/* Judul Utama dengan Animasi Shine & Slide Up */}
        <h2 className="text-5xl md:text-7xl font-black mt-8 tracking-[-0.05em] leading-none">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-600 filter contrast-125">
                VISITOR FEEDBACK.
            </span>
        </h2>
    </motion.div>

    {/* Sub-label v7.0 dengan delay sedikit lebih lambat */}
    <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        viewport={{ once: true }}
        className="flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.5em] text-white/20"
    >
        {rtStatus === "SUBSCRIBED" ? (
            <Zap size={10} className="text-blue-400" fill="currentColor"/> 
        ) : (
            <ZapOff size={10}/>
        )} 
        <span>leave your feedback here</span>
    </motion.div>
</div>

        {/* INTERACTIVE CONTAINER */}
        <div 
          ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={() => mouseRef.current = { x: -1000, y: -1000 }}
          className="relative w-full h-[650px] bg-[#010101] rounded-[60px] border border-white/10 overflow-hidden shadow-[0_0_120px_rgba(0,0,0,1)] cursor-none"
        >
          {/* CURSOR GLOW - DIPERKUAT */}
          <div className="absolute w-64 h-64 bg-blue-500/30 rounded-full blur-[100px] pointer-events-none translate-x-[-50%] translate-y-[-50%] z-0"
               style={{ left: mouseRef.current.x - (containerRef.current?.getBoundingClientRect().left || 0), top: mouseRef.current.y - (containerRef.current?.getBoundingClientRect().top || 0) }} />
          <div className="absolute w-20 h-20 bg-blue-400/40 rounded-full blur-[40px] pointer-events-none translate-x-[-50%] translate-y-[-50%] z-0"
               style={{ left: mouseRef.current.x - (containerRef.current?.getBoundingClientRect().left || 0), top: mouseRef.current.y - (containerRef.current?.getBoundingClientRect().top || 0) }} />

          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div key={msg.id} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="absolute flex items-center justify-center pointer-events-none"
                style={{ left: msg.x - msg.radius, top: msg.y - msg.radius, zIndex: 20 }}
              >
                {/* PURE TITANIUM GLASS PILL */}
                <div className="relative group">
                  <div className="absolute -inset-[1px] bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-30 blur-[1px]"></div>
                  <div className="relative flex flex-col items-center justify-center py-3 px-8 bg-white/[0.03] backdrop-blur-[25px] rounded-full border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-0.5 bg-clip-text text-transparent bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600">
                      {msg.name}
                    </span>
                    <p className="text-[9px] text-gray-300 font-medium tracking-tight">
                      "{msg.text}"
                    </p>
                    {isAdmin && (
                      <button onClick={() => deleteMsg(msg.id)} className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center pointer-events-auto">
                        <X size={10} strokeWidth={3} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* INPUT DOCK */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[92%] md:w-[500px] z-[100] cursor-auto">
            <form onSubmit={handleSubmit} className="p-1.5 bg-black/50 backdrop-blur-3xl border border-white/10 rounded-full flex items-center gap-2 shadow-2xl">
              <div className="flex items-center gap-2 px-4 border-r border-white/10">
                {isAdmin ? <Unlock size={14} className="text-green-500"/> : <Lock size={14} className="text-white/10"/>}
                <input type="text" placeholder="NAME" maxLength={10} value={inputName} onChange={e => setInputName(e.target.value)}
                  className="w-16 bg-transparent py-2.5 text-[10px] text-white outline-none font-black tracking-widest placeholder:text-white/10 text-center" />
              </div>
              <input type="text" placeholder="TRANSMIT YOUR MESSAGE..." maxLength={35} value={inputText} onChange={e => setInputText(e.target.value)}
                className="flex-1 bg-transparent px-2 text-[11px] text-white outline-none font-medium placeholder:text-white/10" />
              <button type="submit" className="bg-white text-black h-10 w-10 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
      {error && <div className="fixed bottom-10 right-10 bg-red-600/90 text-white px-6 py-2 rounded-2xl text-[9px] font-black z-[999]">{error}</div>}
    </section>
  );
}