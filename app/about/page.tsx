"use client";

import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Users, MapPin, Zap, RefreshCcw, Fingerprint, ScanFace, Lock, Sparkles, Award, GraduationCap, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CountUp, Parallax, Reveal, SplitText } from "@/components/motion";
import { useProjects } from "@/components/ProjectCover";

type GalleryItem = {
  id: number;
  image_url: string;
  caption: string;
  category: string;
  location: string;
};


// Ordered by relevance to frontend roles; supporting skills are labelled as such.
const skillGroups = [
  { label: "Frontend", primary: true, items: ["React", "Next.js (App Router)", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"] },
  { label: "Data & APIs", items: ["REST APIs", "Supabase", "PostgreSQL", "SQL", "Webhooks"] },
  { label: "Backend — supporting", items: ["Node.js", "PHP", "Laravel"] },
  { label: "Tools & Workflow", items: ["Git", "GitHub", "Vercel", "Docker", "CI/CD", "Linear", "Unit Testing Fundamentals"] },
  { label: "Additional experience", items: ["n8n", "LLM API Integration"] },
];

const highlights = [
  { icon: Award, title: "Awards", text: "1st Place (2024) and 2nd Place (2025), University Innovation Challenge. 1st Place (Best Mentor) among 11 instructors at Tahungoding." },
  { icon: BookOpen, title: "Research", text: "Co-authored a usability analysis of the MPP Sumedang app (Jakob Nielsen model, PLS-SEM)." },
  { icon: Sparkles, title: "Skill Badges", text: "Google Cloud LLM & Generative AI; Google Cloud Computing & ML — 8 skill badges." },
  { icon: GraduationCap, title: "Education", text: "Universitas Sebelas April (UNSAP) — B.S. in Informatics · Expected 2027 · GPA 3.90/4.00." },
];

// --- GAME COMPONENT: PROXIMITY SCANNER ---
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
        <div className="relative mx-auto mt-10 w-full max-w-md">
            <div className="relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-[0_18px_60px_rgba(24,24,27,0.06)] transition-all duration-500 hover:shadow-[0_24px_70px_rgba(24,24,27,0.1)]">
                <AnimatePresence mode="wait">
                    {status === "idle" && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="relative z-10 flex w-full flex-col items-center space-y-8"
                        >
                            <div className="flex flex-col items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                                    <ScanFace size={32} />
                                </div>
                                <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">Frequency Check</h3>
                            </div>

                            <div className="w-full space-y-4">
                                <input
                                    type="text"
                                    placeholder="Enter Identity..."
                                    suppressHydrationWarning={true}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleScan()}
                                    className="w-full rounded-full border border-zinc-200 bg-zinc-50 px-6 py-4 text-center font-mono text-xs uppercase tracking-widest text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white"
                                />
                                <button
                                    onClick={handleScan}
                                    disabled={!name.trim()}
                                    className="w-full rounded-full bg-zinc-900 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                    Verify
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {status === "scanning" && (
                        <motion.div
                            key="scanning"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex h-full w-full flex-col items-center justify-center gap-6"
                        >
                            <div className="relative">
                                <div className="h-20 w-20 animate-spin rounded-full border-2 border-zinc-100" />
                                <div className="absolute inset-0 animate-spin rounded-full border-t-2 border-zinc-900" />
                            </div>
                            <p className="animate-pulse font-mono text-[10px] tracking-widest text-zinc-500">DECRYPTING...</p>
                        </motion.div>
                    )}

                    {status === "result" && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex w-full flex-col items-center space-y-6"
                        >
                            <div className="text-center">
                                <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                                    {percentage < 40 ? "ACCESS DENIED" : "COMPATIBILITY"}
                                </p>
                                <h1 className={`text-7xl font-black tabular-nums tracking-tighter ${percentage < 40 ? "text-zinc-300" : "bg-gradient-to-b from-zinc-900 to-zinc-400 bg-clip-text text-transparent"}`}>
                                    {percentage}%
                                </h1>
                            </div>

                            <div className={`w-full rounded-xl border px-6 py-3 text-center ${percentage < 40 ? "border-red-200 bg-red-50" : "border-zinc-200 bg-zinc-50"}`}>
                                <div className="mb-1 flex items-center justify-center gap-2">
                                    {percentage >= 90 ? <Sparkles size={12} className="text-zinc-900" /> : percentage < 40 ? <Lock size={12} className="text-zinc-400" /> : <Fingerprint size={12} className="text-zinc-900" />}
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${percentage < 40 ? "text-zinc-400" : "text-zinc-900"}`}>{name}</span>
                                </div>
                                <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">{message}</p>
                            </div>

                            <button onClick={reset} className="group mt-4 flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:text-zinc-900">
                                <RefreshCcw size={10} className="transition-transform duration-500 group-hover:-rotate-180" />
                                Retry
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function SectionLabel({ n, label }: { n: string; label: string }) {
  return <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-zinc-500">({n}) {label}</span>;
}

export default function AboutPage() {
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const { projects } = useProjects();

  useEffect(() => {
    async function fetchGallery() {
      const { data, error } = await supabase.from("gallery").select("*").order("id", { ascending: false });
      if (!error && data) setPhotos(data);
    }
    fetchGallery();
  }, []);

  // Only offer filters that actually have photos.
  const categories = ["All", ...Array.from(new Set(photos.map((p) => p.category).filter(Boolean)))];
  const filteredPhotos =
    activeTab === "All" ? photos : photos.filter((p) => p.category?.toLowerCase() === activeTab.toLowerCase());
  const showGallery = photos.length >= 3;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fcfbfa] text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        {/* ===== INTRO ===== */}
        <section className="mb-32 grid grid-cols-1 items-start gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-zinc-200">
                <Parallax offset={36} className="absolute -inset-y-[8%] inset-x-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/profile-sugih.jpg"
                    alt="Moch Sugih Nugraha"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Parallax>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 sm:p-8">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">Moch Sugih Nugraha</h2>
                  <p className="text-sm font-medium text-white/70">Frontend Engineer</p>
                </div>
              </div>
            </Reveal>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(24,24,27,0.06)]">
                  <span className="font-sf-pro mb-1 block text-4xl font-semibold tracking-tight">
                    <CountUp to={5} suffix="+" />
                  </span>
                  <span className="text-xs text-zinc-500">Years building for the web</span>
                </div>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(24,24,27,0.06)]">
                  <span className="font-sf-pro mb-1 block text-4xl font-semibold tracking-tight">
                    <CountUp to={projects.length} />
                  </span>
                  <span className="text-xs text-zinc-500">Projects shipped</span>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="space-y-10 md:col-span-7">
            <div>
              <SectionLabel n="01" label="The Profile" />
              <h1 className="font-sf-pro text-5xl font-medium leading-none tracking-tight sm:text-6xl lg:text-7xl">
                <SplitText text="Beyond the" />{" "}
                <SplitText text="screen." delay={0.15} wordClassName="bg-gradient-to-b from-zinc-900 to-zinc-400 bg-clip-text text-transparent" />
              </h1>
            </div>

            <Reveal delay={0.1}>
              <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-zinc-600">
                <p>
                  I&apos;m <strong className="font-semibold text-zinc-900">Moch Sugih Nugraha</strong>, a frontend
                  engineer who enjoys building products that make everyday work simpler.
                </p>
                <p>
                  I work primarily with <strong className="font-semibold text-zinc-900">React, Next.js, and TypeScript</strong>.
                  Across business and public-sector projects, I&apos;ve built online ordering experiences, operations
                  dashboards, and map-based tools. I care about how an interface behaves in real use: clear
                  interactions, responsive layouts, reliable data states, and maintainable implementation.
                </p>
                <p>
                  I&apos;m comfortable collaborating across the frontend and the supporting data layer, including REST
                  APIs, Supabase, and PostgreSQL. I also have experience with Laravel and workflow integrations when a
                  product needs them.
                </p>
                <p>
                  I&apos;m currently pursuing a B.S. in Informatics at Universitas Sebelas April (UNSAP), expected in
                  2027, and am open to remote opportunities.
                </p>
              </div>
            </Reveal>

            <div className="space-y-5">
              <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
                <Zap size={14} /> Technical Skills
              </h3>
              {skillGroups.map((g, gi) => (
                <Reveal key={g.label} delay={gi * 0.06}>
                  <p className={`mb-2 text-sm font-semibold ${g.primary ? "text-zinc-900" : "text-zinc-500"}`}>{g.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span
                        key={s}
                        className={`cursor-default rounded-full border px-4 py-1.5 text-sm font-medium ${g.primary ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 bg-white text-zinc-700"} transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== HIGHLIGHTS ===== */}
        <section className="mb-32">
          <div className="mb-10">
            <SectionLabel n="02" label="Highlights" />
            <h2 className="font-sf-pro text-4xl font-medium tracking-tight md:text-5xl">
              <SplitText text="Awards & recognition." />
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08} className="h-full">
                <div className="group h-full rounded-3xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(24,24,27,0.06)]">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-white transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                    <Icon size={20} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-600">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== GALLERY (only when there are enough photos to be useful) ===== */}
        {showGallery && (
        <section className="mb-32">
          <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <SectionLabel n="03" label="Beyond the Work" />
              <h2 className="font-sf-pro text-5xl font-medium tracking-tight md:text-7xl">
                <SplitText text="Beyond the Work." />
              </h2>
            </div>
            <div className="flex w-full flex-wrap gap-1 rounded-full border border-zinc-200 bg-white p-1.5 md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className="relative rounded-full px-5 py-2 text-xs font-medium transition-colors duration-300"
                >
                  {activeTab === cat && (
                    <motion.span
                      layoutId="gallery-tab"
                      className="absolute inset-0 rounded-full bg-zinc-900"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={`relative ${activeTab === cat ? "text-white" : "text-zinc-500 hover:text-zinc-900"}`}>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  layout
                  key={photo.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: Math.min(index, 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-zinc-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.image_url} alt={photo.caption} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-6">
                    <span className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-white/70">
                      <MapPin size={10} /> {photo.location}
                    </span>
                    <p className="text-sm font-semibold leading-tight text-white">{photo.caption}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
        )}

        {/* ===== INNER CIRCLE ===== */}
        <section className="rounded-[2rem] border border-zinc-200 bg-[#f5f5f4] px-6 py-20 text-center">
          <div className="flex flex-col items-center">
            <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
              <Users size={14} /> Neural Check
            </span>
            <h2 className="font-sf-pro text-5xl font-medium tracking-tight md:text-6xl">
              <SplitText text="The Inner Circle." />
            </h2>
            <Reveal delay={0.15}>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-500">
                Algoritma enkripsi frekuensi untuk memvalidasi kedekatan Anda dengan Sugih.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <ProximityScanner />
          </Reveal>
        </section>
      </div>
    </main>
  );
}
