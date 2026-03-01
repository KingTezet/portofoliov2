"use client";

import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Users, MapPin, Zap, RefreshCcw, Fingerprint, ScanFace, Lock, Sparkles, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// --- DATA NETWORK ---
const network = [
  { name: "Mick Alexandro", role: "Machine Trader", img: "https://ui-avatars.com/api/?name=Mick+Alexandra&background=0D8ABC&color=fff" },
  { name: "Evans Alexander", role: "Profesional Trader", img: "https://ui-avatars.com/api/?name=Evans+Alexander&background=0D8ABC&color=fff" },
  { name: "Dwi Rangga", role: "Investor Crypto", img: "https://ui-avatars.com/api/?name=Dwi+Rangga&background=random" },
  { name: "Pradisa Fadzra", role: "Analyst & Comm. Mgr", img: "https://ui-avatars.com/api/?name=Pradisa+Fadzra&background=random" },
  { name: "Bangkit Nugraha", role: "Founder Tradting", img: "https://ui-avatars.com/api/?name=Bangkit+Nugraha&background=random" },
  { name: "Ricky Pauji", role: "Co-Founder Tradting", img: "https://ui-avatars.com/api/?name=Ricky+Pauji&background=random" },
  // --- New Additions ---
  { name: "Fathoni Mahardika S.Kom., M.T. ", role: "IT Lecturer", img: "https://ui-avatars.com/api/?name=Fathoni+Mahardika&background=random" },
  { name: "M Iqbal Rivaldi", role: "Founder Tahungoding", img: "https://ui-avatars.com/api/?name=M+Iqbal+Rivaldi&background=random" },
  { name: "Krisna Purnama", role: "Fullstack Engineer", img: "https://ui-avatars.com/api/?name=Krisna+Purnama&background=random" },
];

type GalleryItem = {
  id: number;
  image_url: string;
  caption: string;
  category: string;
  location: string;
};

const categories = ["All", "Network", "Travel", "Life", "Work", "Certificate"];
const skills = ["Trader & Investor", "Web Developer", "Video Editor", "Graphic Designer", "IoT Developer"];

// --- TITANIUM ANIMATION VARIANTS (DEFINED HERE TO FIX RED LINES) ---
// Dipindahkan ke atas agar bisa diakses oleh semua komponen
const titaniumTextVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } // Apple-style ease
    }
};

// --- GAME COMPONENT: PROXIMITY SCANNER (SMART LOGIC V3 - STRICT MODE) ---
function ProximityScanner() {
    const [name, setName] = useState("");
    const [status, setStatus] = useState<"idle" | "scanning" | "result">("idle");
    const [percentage, setPercentage] = useState(0);
    const [message, setMessage] = useState("");

    const handleScan = () => {
        if (!name.trim()) return;
        setStatus("scanning");
        
        // Bersihkan input: Kecilkan huruf & hapus spasi berlebih
        const lowerInput = name.toLowerCase().trim().replace(/\s+/g, ' ');
        let finalScore = 0;

        // --- 1. LIST DATABASE ---
        
        // blacklist: Terdeteksi = Hancur
        const banList = [
            "ande", "suganda", "suryo", "gina", "vio", "amelina", 
            "nurdin", "dede nurdin" // Nurdin masuk sini
        ];
        
        // soulbound: 100% (The Chosen One)
        const soulboundList = ["tira", "azzahra", "tira azzahra"];
        
        // vipList: 90-99% (HARUS PERSIS / EXACT MATCH)
        // Masukkan SEMUA variasi nama lengkap yang diinginkan di sini
        const vipList = [
            "dede", 
            "dede maulana", 
            "dede maulana abdan", 
            "dede maulana abdan syakur",
            "dwi rangga", "zaidan", "zaidan riziq", "zaidan riziq hibatulwafi", "fathen", "ayala", "fathen ayala", "fathen ayala delpiero", "fhariza", "fhariza paras", "paras", "fhariza paras alghifera", "ilman", "gogon", 
            "iqbal", "iqbal fadillah", "kiki", "paras", "rinneki", "sugih", "admin"
        ];
        
        // highTierList: 80-89% (Boleh mengandung kata ini)
        const highTierList = ["arief", "arief cahya", "arief cahya subagja", "fazri", "ahmad", "bintang", "viona", "sutiawan"];

        // --- 2. LOGIKA PRIORITAS (STRICT) ---

        // A. CEK SOULBOUND (100%)
        if (soulboundList.some(key => lowerInput === key)) {
            finalScore = 100;
        } 
        
        // B. CEK BAN LIST DULUAN (Prioritas Utama untuk filter)
        // Kalau nama mengandung "nurdin" atau "ee", langsung jatuhkan.
        else if (banList.some(key => lowerInput.includes(key))) {
            finalScore = Math.floor(Math.random() * 25) + 10; // Skor: 10-35%
        }

        // C. CEK VIP LIST (STRICT / HARUS SAMA PERSIS)
        // "dede iya" TIDAK akan masuk sini karena tidak sama persis dengan "dede"
        else if (vipList.some(key => lowerInput === key)) { 
            finalScore = Math.floor(Math.random() * 10) + 90; // Skor: 90-99%
        }

        // D. CEK HIGH TIER (Boleh mengandung, misal "Ahmad Dani" masuk karena ada "Ahmad")
        else if (highTierList.some(key => lowerInput.includes(key))) {
            finalScore = Math.floor(Math.random() * 10) + 80; // Skor: 80-89%
        } 
        
        // E. USER BIASA / RANDOM (Termasuk "dede iya")
        // "dede iya" bakal masuk sini karena lolos Ban, tapi gagal di VIP (karena gak exact match)
        else {
            let hash = 0;
            for (let i = 0; i < name.length; i++) {
                hash = name.charCodeAt(i) + ((hash << 5) - hash);
            }
            finalScore = (Math.abs(hash) % 36) + 40; // Skor: 40-75%
        }

        // --- 3. TENTUKAN PESAN ---
        let msg = "";
        if (finalScore === 100) msg = "Soulbound Connection.";
        else if (finalScore >= 90) msg = "Titanium Tier Verified.";
        else if (finalScore >= 80) msg = "High Frequency Detected.";
        else if (finalScore >= 40) msg = "Standard Signal."; // "dede iya" bakal dapet pesan ini
        else msg = "Signal Lost / Restricted.";

        setTimeout(() => {
            setPercentage(finalScore);
            setMessage(msg);
            setStatus("result");
        }, 2000); 
    };

    const reset = () => {
        setName("");
        setStatus("idle");
        setPercentage(0);
    };

    return (
        <div className="relative w-full max-w-md mx-auto mt-10">
            {/* Main Container - SILVER TITANIUM */}
            <div className="relative overflow-hidden rounded-[2rem] bg-[#030303] border border-white/10 shadow-[0_0_40px_-10px_rgba(255,255,255,0.05)] min-h-[300px] flex flex-col items-center justify-center p-8 transition-all duration-500 hover:border-white/20">
                
                {/* Subtle Ambient Light - SILVER */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm" />

                <AnimatePresence mode="wait">
                    {/* STATE 1: IDLE */}
                    {status === "idle" && (
                        <motion.div 
                            key="idle"
                            initial={{ opacity: 0, scale: 0.98 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="relative z-10 w-full flex flex-col items-center space-y-8"
                        >
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                                    <ScanFace size={32} className="text-white/80" />
                                </div>
                                <h3 className="text-xs font-bold text-gray-400 tracking-[0.3em] uppercase">Frequency Check</h3>
                            </div>

                            <div className="w-full space-y-4">
                                <input 
                                    type="text" 
                                    placeholder="Enter Identity..." 
                                    suppressHydrationWarning={true}
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    onKeyDown={(e) => e.key === "Enter" && handleScan()} 
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-full px-6 py-4 text-center text-white placeholder-gray-700 outline-none focus:border-white/30 focus:bg-[#0f0f0f] transition-all font-mono uppercase tracking-widest text-xs shadow-inner" 
                                />
                                <button 
                                    onClick={handleScan} 
                                    disabled={!name.trim()} 
                                    className="w-full py-4 bg-white text-black font-bold text-[10px] tracking-[0.2em] uppercase rounded-full hover:bg-gray-200 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                >
                                    Verify
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STATE 2: SCANNING - SILVER ANIMATION */}
                    {status === "scanning" && (
                        <motion.div 
                            key="scanning"
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center h-full gap-6 w-full"
                        >
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full border-2 border-white/5 animate-spin" />
                                <div className="absolute inset-0 rounded-full border-t-2 border-white/80 animate-spin" />
                            </div>
                            <p className="text-[10px] text-gray-500 font-mono tracking-widest animate-pulse">
                                DECRYPTING...
                            </p>
                        </motion.div>
                    )}

                    {/* STATE 3: RESULT - SILVER HIGHLIGHT */}
                    {status === "result" && (
                        <motion.div 
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            className="w-full flex flex-col items-center space-y-6"
                        >
                            <div className="text-center">
                                <p className={`text-[9px] font-bold uppercase tracking-widest mb-2 ${percentage < 40 ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {percentage < 40 ? 'ACCESS DENIED' : 'COMPATIBILITY'}
                                </p>
                                <h1 className={`text-7xl font-black tracking-tighter tabular-nums ${percentage < 40 ? 'text-gray-700' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400'}`}>
                                    {percentage}%
                                </h1>
                            </div>

                            <div className={`px-6 py-3 rounded-xl border backdrop-blur-md w-full text-center ${percentage < 40 ? 'border-red-900/20 bg-red-900/5' : 'border-white/10 bg-white/5'}`}>
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    {percentage >= 90 ? <Sparkles size={12} className="text-white"/> : percentage < 40 ? <Lock size={12} className="text-gray-600"/> : <Fingerprint size={12} className="text-white"/>}
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${percentage < 40 ? 'text-gray-600' : 'text-white'}`}>{name}</span>
                                </div>
                                <p className={`text-[10px] font-medium uppercase tracking-wider ${percentage < 40 ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {message}
                                </p>
                            </div>

                            <button onClick={reset} className="mt-4 flex items-center justify-center gap-2 text-[9px] font-bold text-gray-600 hover:text-white transition-colors uppercase tracking-widest group">
                                <RefreshCcw size={10} className="group-hover:-rotate-180 transition-transform duration-500" /> 
                                Retry
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function AboutPage() {
  // --- 1. DEFINISI VARIANT (TARUH DISINI AGAR TERBACA/TIDAK MERAH) ---
  const titaniumTextVariant = {
      hidden: { opacity: 0, y: 30 },
      visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
      }
  };

  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<GalleryItem[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [projectCount, setProjectCount] = useState<number | null>(null);

  // --- 2. CEK DUPLIKAT KATEGORI (HAPUS JIKA ADA YANG GANDA) ---
  // Pastikan list ini UNIK. Kalau ada "Life" dua kali, hapus satu.
  const categories = ["All", "Network", "Travel", "Life", "Work", "Certificate"]; 

  useEffect(() => {
    async function fetchGallery() {
      const { data, error } = await supabase.from("gallery").select("*").order("id", { ascending: false });
      if (!error && data) {
        setPhotos(data);
        setFilteredPhotos(data);
      }
    }
    
    async function fetchProjectCount() {
        const { count, error } = await supabase.from("projects").select("*", { count: "exact", head: true });
        if (!error) setProjectCount(count);
    }

    fetchGallery();
    fetchProjectCount();
  }, []);

  useEffect(() => {
    if (activeTab === "All") {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(photos.filter((p) => p.category?.toLowerCase() === activeTab.toLowerCase()));
    }
  }, [activeTab, photos]);

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-blue-500/30">
      <Navbar />
      
      {/* BACKGROUND ACCENTS */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-20">
        
        {/* SECTION 1: PROFILE INTRO */}
        <div className="flex flex-col md:flex-row gap-16 items-start mb-24">
          {/* FOTO PROFIL */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="w-full md:w-1/3 space-y-6">
            <div className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <img src="profile-sugih.jpg" onError={(e) => { (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Sugih+Nugraha&background=000&color=fff&size=512"; }} alt="Moch. Sugih Nugraha" className="object-cover w-full h-full transition duration-700 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-8 z-20">
                <h2 className="text-2xl font-bold text-white tracking-tight">Moch. Sugih Nugraha</h2>
                <p className="text-gray-400 text-sm font-medium">Trader & Creative Developer</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-md">
                    <span className="block text-4xl font-light text-white mb-1">3+</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Years Exp.</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-md">
                      <span className="block text-4xl font-light text-white mb-1">
                          {projectCount !== null ? projectCount : "..."}
                      </span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Projects</span>
                </div>
            </div>
          </motion.div>

          {/* BIO & TEXT */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="w-full md:w-2/3 space-y-10">
            
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={titaniumTextVariant} 
                className="space-y-6"
            >
                <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400/80 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm bg-white/[0.02]">
                    The Profile
                </span>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-[length:200%_auto] animate-shine">
                    Beyond the Screen.
                  </span>
                </h1>
            </motion.div>

            <div className="text-gray-400 text-lg leading-relaxed space-y-6 font-light max-w-2xl">
              <p>Halo everyone! Saya <strong className="text-white font-medium">Sugih Nugraha</strong>, seorang <strong className="text-white font-medium">Multidisciplinary Creative</strong> yang juga mendalami dunia <strong className="text-white font-medium">Trading</strong>. Saya bergerak di persimpangan antara logika pasar dan kreativitas digital.</p>
              <p>Identitas saya dibangun dari disiplin yang beragam. Saya adalah seorang pembaca angka sebagai <strong className="text-white font-medium">Trader & Investor</strong>, arsitek baris kode sebagai <strong className="text-white font-medium">Web & IoT Developer</strong>, dan pencerita visual sebagai <strong className="text-white font-medium">Video Editor & Graphic Designer</strong>.</p>
              <p>Saya percaya bahwa teknologi terbaik lahir dari kombinasi logika yang tajam dan kreativitas yang tak terbatas—sebuah standar yang saya bawa di setiap pekerjaan saya: <strong className="text-white font-medium">Titanium Grade Precision</strong>.</p>
            </div>
            
            <div>
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 opacity-70 flex items-center gap-2"><Zap size={14} className="text-yellow-500" /> Areas of Focus</h3>
              <div className="flex flex-wrap gap-3 mt-4">
                {skills.map((skill) => (
                  <span key={skill} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-[11px] font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 cursor-default">{skill}</span>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6 opacity-70 flex items-center gap-2"><Users size={14} /> Connected With</h3>
                <div className="relative w-full overflow-hidden mask-gradient">
                   <motion.div className="flex gap-4 w-max" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 40 }}>
                      {[...network, ...network].map((person, idx) => (
                          <div key={idx} className="flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                             <img src={person.img} alt={person.name} className="w-9 h-9 rounded-full object-cover border border-white/10" />
                             <div className="flex flex-col">
                                <span className="text-xs font-bold text-white leading-tight">{person.name}</span>
                                <span className="text-[10px] text-gray-400 leading-tight">{person.role}</span>
                             </div>
                          </div>
                      ))}
                   </motion.div>
                </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 2: LIFE GALLERY */}
        <div className="pt-32 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={titaniumTextVariant} 
                    className="w-full md:w-auto text-center md:text-left"
                >
                    <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400/80 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm bg-white/[0.02] mb-6">
                        Visual Archives
                    </span>
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tight leading-tight text-white">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-[length:200%_auto] animate-shine">
                            Life Gallery.
                        </span>
                    </h2>
                </motion.div>

                <div className="flex flex-wrap justify-center md:justify-end gap-2 p-1.5 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 w-full md:w-auto">
                    {categories.map((cat) => (
                        <button key={cat} onClick={() => setActiveTab(cat)} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${activeTab === cat ? "bg-white text-black shadow-xl" : "text-gray-500 hover:text-white"}`}>{cat}</button>
                    ))}
                </div>
            </div>

            {/* Gallery Grid */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <AnimatePresence>
                {filteredPhotos.map((photo, index) => (
                    <motion.div layout key={photo.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: index * 0.05 }} className="relative group aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]">
                        <img src={photo.image_url} alt={photo.caption} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6 backdrop-blur-[2px]">
                            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2 mb-2"><MapPin size={10} /> {photo.location}</span>
                            <p className="text-white font-bold text-sm leading-tight">{photo.caption}</p>
                        </div>
                    </motion.div>
                ))}
                </AnimatePresence>
            </motion.div>
        </div>

        {/* SECTION 3: THE INNER CIRCLE */}
        <div className="pt-32 mt-32 border-t border-white/5 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-white/5 blur-[120px] pointer-events-none" />
            
            <div className="flex flex-col items-center justify-center text-center mb-16 relative z-10">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={titaniumTextVariant} 
                    className="space-y-6 flex flex-col items-center"
                >
                    <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400/80 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm bg-white/[0.02]">
                        <Fingerprint size={12} className="inline mr-2 text-white" fill="currentColor" /> Neural Check
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-400 bg-[length:200%_auto] animate-shine">
                            The Inner Circle.
                        </span>
                    </h2>
                    <p className="text-gray-400 text-sm font-medium max-w-md mx-auto leading-relaxed">
                        Algoritma enkripsi frekuensi untuk memvalidasi <br /> kedekatan Anda dengan Sugih.
                    </p>
                </motion.div>
            </div>
            
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <ProximityScanner />
            </motion.div>
        </div>
      </div>
    </main>
  );
}