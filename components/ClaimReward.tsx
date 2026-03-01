"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Loader2, X, ArrowRight, Copy, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// --- OFFICIAL DANA LOGO (Premium Titanium Silver Style) ---
const DanaIcon = ({ className }: { className?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    {/* Background Glow Halus */}
    <div className="absolute inset-0 bg-white/5 blur-xl rounded-full" />
    
    <img 
      src="/dana.png" 
      alt="Dana Official" 
      className="w-full h-full object-contain grayscale brightness-[2] contrast-[1.2] drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
    />
  </div>
);

export default function ClaimReward() {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; link?: string } | null>(null);

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    setLoading(true);
    setResult(null);

    try {
      // 1. Cek Kode di Database
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('code', code)
        .eq('is_active', true)
        .single();

      if (error || !data) throw new Error("KODE TIDAK VALID / EVENT BERAKHIR");

      // 2. Cek Kuota
      if (data.current_claims >= data.max_claims) {
        throw new Error("KUOTA DANA KAGET HABIS (SOLD OUT)");
      }

      // 3. Update Kuota
      const { error: updateError } = await supabase
        .from('rewards')
        .update({ current_claims: data.current_claims + 1 })
        .eq('id', data.id);

      if (updateError) throw new Error("SYSTEM ERROR. TRY AGAIN.");

      // 4. Sukses
      setResult({
        success: true,
        message: "DANA KAGET UNLOCKED.",
        link: data.link_url
      });

    } catch (err: any) {
      setResult({ success: false, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOATING BUTTON (Icon Kado Premium) */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 group"
      >
        <div className="relative w-14 h-14 rounded-full flex items-center justify-center overflow-hidden bg-[#0a0a0a] border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500 hover:border-white/40 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            <Gift className="text-white w-6 h-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
        </div>
      </motion.button>

      {/* MODAL OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setIsOpen(false)} 
              className="absolute inset-0 bg-black/80 backdrop-blur-xl" 
            />
            
            {/* MAIN CARD: TITANIUM VAULT */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-[32px] p-8 relative z-10 shadow-2xl overflow-hidden ring-1 ring-white/5"
            >
              {/* Background Ambient Lighting (Silver) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-white/5 to-transparent blur-3xl pointer-events-none" />

              {/* HEADER SECTION */}
              <div className="relative z-10 text-center mb-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-b from-[#1a1a1a] to-black border border-white/10 flex items-center justify-center shadow-2xl relative group">
                    {/* Dana Icon Premium */}
                    <DanaIcon className="w-10 h-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                    
                    {/* Subtle Ring Animation */}
                    <div className="absolute inset-0 rounded-3xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                
                <h2 className="text-2xl font-bold text-white tracking-tight">
                    DANA KAGET <span className="text-gray-500">VAULT</span>
                </h2>
                <p className="text-[11px] text-gray-500 font-medium uppercase tracking-[0.2em] mt-2">
                    Exclusive Reward for Early Supporters
                </p>
              </div>

              {/* LOGIC: FORM VS SUCCESS */}
              {!result?.success ? (
                <form onSubmit={handleClaim} className="space-y-6 relative z-10">
                  
                  {/* Input Field */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-gray-600 ml-2 tracking-widest uppercase">
                        &gt;_ Enter Access Code
                    </label>
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="CODE..." 
                            suppressHydrationWarning={true} // <--- FIX HYDRATION ERROR DISINI
                            className="relative w-full bg-[#050505] border border-white/10 rounded-2xl py-5 px-6 text-center text-white text-lg font-bold tracking-[0.3em] outline-none focus:border-white/30 focus:bg-black transition-all uppercase placeholder:text-gray-800 shadow-inner"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                        />
                    </div>
                  </div>
                  
                  {/* Error Message */}
                  {result && !result.success && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex items-center justify-center gap-2 text-red-400 text-[10px] font-bold uppercase tracking-widest bg-red-950/20 py-3 rounded-xl border border-red-500/10">
                        <AlertCircle size={12} /> {result.message}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={loading || !code}
                    className="w-full h-14 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-3 text-xs tracking-[0.2em] disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    {loading ? <Loader2 className="animate-spin" size={16}/> : <span className="font-sans">CLAIM DANA KAGET</span>}
                  </button>
                </form>
              ) : (
                
                /* SUCCESS STATE */
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center relative z-10">
                    <div className="bg-white/[0.03] border border-white/10 p-6 rounded-[24px] backdrop-blur-md">
                        <CheckCircle className="w-12 h-12 text-white mx-auto mb-3" strokeWidth={1} />
                        <h3 className="text-lg font-bold text-white tracking-wide">ACCESS GRANTED</h3>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Reward Link Generated</p>
                    </div>

                    <div className="bg-[#050505] p-5 rounded-2xl border border-white/5 flex flex-col gap-3">
                        <p className="text-[9px] text-gray-500 uppercase tracking-widest flex items-center justify-center gap-2">
                            Secure Link
                        </p>
                        <div className="flex items-center gap-3 bg-[#111] p-3 rounded-xl border border-white/5">
                            <span className="text-white/80 text-xs font-mono truncate flex-1 text-left select-all">
                                {result.link}
                            </span>
                            <button onClick={() => navigator.clipboard.writeText(result.link || "")}>
                                <Copy size={14} className="text-gray-500 hover:text-white transition-colors"/>
                            </button>
                        </div>
                    </div>

                    <a 
                        href={result.link} 
                        target="_blank"
                        rel="noreferrer"
                        className="block w-full bg-white text-black font-black py-4 rounded-2xl hover:scale-[1.02] transition-transform text-xs tracking-[0.2em] flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                    >
                        OPEN DANA APP <ArrowRight size={14}/>
                    </a>
                </motion.div>
              )}
              
              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-gray-600 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}