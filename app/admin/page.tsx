"use client";

import { useState } from "react";
import { Lock, Layers, Map, Image as ImageIcon, LogOut, ShieldCheck, Activity } from "lucide-react";
import { motion } from "framer-motion";

// --- IMPORT KOMPONEN ---
import ProjectManager from "../../components/admin/ProjectManager";
import JourneyManager from "../../components/admin/JourneyManager"; 
import GalleryManager from "../../components/admin/GalleryManager"; 

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secret, setSecret] = useState("");
  const [activeTab, setActiveTab] = useState("projects");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (secret === "sugih-admin") { 
      setIsAuthenticated(true);
    } else {
      alert("ACCESS DENIED: INVALID PROTOCOL");
    }
  };

  // --- 1. LOGIN SCREEN (Titanium Vault) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Ambient Glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md relative z-10"
        >
          <div className="bg-[#1c1c1e]/80 backdrop-blur-3xl border border-white/10 p-10 rounded-[32px] shadow-2xl relative overflow-hidden ring-1 ring-white/5">
             {/* Glossy Header */}
             <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

             <div className="text-center mb-10 relative z-10">
               <div className="w-20 h-20 bg-gradient-to-br from-[#2c2c2e] to-black rounded-[24px] border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-xl">
                 <Lock className="w-8 h-8 text-white/80" strokeWidth={1.5} />
               </div>
               <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">Titanium Core</h1>
               <p className="text-xs text-gray-500 font-medium tracking-widest uppercase">Restricted Access</p>
             </div>

             <form onSubmit={handleLogin} className="space-y-5 relative z-10">
               <div className="relative group">
                 <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-2xl" />
                 <input 
                   type="password" 
                   placeholder="Enter Passkey" 
                   className="relative w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-center text-white font-medium tracking-[0.2em] outline-none focus:border-white/30 focus:bg-black/60 transition-all placeholder:text-gray-600 shadow-inner"
                   value={secret}
                   onChange={(e) => setSecret(e.target.value)}
                 />
               </div>
               <button type="submit" className="w-full bg-white text-black font-semibold py-4 rounded-2xl hover:bg-gray-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-lg shadow-white/5">
                 <ShieldCheck size={16} /> Authenticate
               </button>
             </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- 2. DASHBOARD AREA ---
  const menuItems = [
    { id: "projects", label: "Projects", icon: Layers },
    { id: "journey", label: "Journey", icon: Map },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex overflow-hidden">
      
      {/* SIDEBAR - Titanium Glass */}
      <aside className="w-20 lg:w-72 bg-[#121212]/80 backdrop-blur-xl border-r border-white/5 flex flex-col justify-between p-6 z-20 sticky top-0 h-screen transition-all">
        <div>
          <div className="h-20 flex items-center justify-center lg:justify-start gap-4 mb-10 pl-2">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/10">
              <Activity className="text-black" size={20} strokeWidth={2.5}/>
            </div>
            <div className="hidden lg:block">
                <h1 className="font-bold text-lg tracking-tight leading-none text-white">SGH.</h1>
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Admin Console</span>
            </div>
          </div>

          <nav className="space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full p-3 lg:px-5 lg:py-4 rounded-2xl flex items-center justify-center lg:justify-start gap-4 transition-all relative group ${active ? "bg-white/10 text-white shadow-inner" : "text-gray-500 hover:text-white hover:bg-white/5"}`}
                >
                  <Icon size={20} className={active ? "text-white" : "text-gray-500 group-hover:text-white transition-colors"} strokeWidth={active ? 2.5 : 2} />
                  <span className="hidden lg:block text-xs font-semibold uppercase tracking-wide">{item.label}</span>
                  
                  {/* Active Indicator Line */}
                  {active && <motion.div layoutId="activeTab" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />}
                </button>
              )
            })}
          </nav>
        </div>

        <button onClick={() => setIsAuthenticated(false)} className="p-3 lg:px-5 lg:py-4 rounded-2xl flex items-center justify-center lg:justify-start gap-4 text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-all group">
          <LogOut size={20} className="group-hover:translate-x-[-2px] transition-transform"/>
          <span className="hidden lg:block text-xs font-bold uppercase tracking-wide">Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-screen overflow-y-auto relative scrollbar-hide bg-[#050505]">
        {/* Background Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none fixed"></div>
        
        {/* Content Wrapper */}
        <div className="max-w-[90rem] mx-auto p-6 lg:p-12 pb-40">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === "projects" && <ProjectManager />}
            {activeTab === "journey" && <JourneyManager />}
            {activeTab === "gallery" && <GalleryManager />}
          </motion.div>
        </div>
      </main>
    </div>
  );
}