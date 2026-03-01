"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Trash2, Plus, Save, X, Briefcase, Code, TrendingUp, Video, Cpu, Palette, GraduationCap, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Journey = { 
  id: number; 
  title: string; 
  date_event: string; 
  description: string; 
  category: string; 
};

export default function JourneyManager() {
  const [dataList, setDataList] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Journey>>({
    category: "Education"
  });

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("journeys").select("*").order("date_event", { ascending: false });
    if (data) setDataList(data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      title: formData.title,
      date_event: formData.date_event,
      description: formData.description,
      category: formData.category
    };

    try {
      if (formData.id) {
        await supabase.from("journeys").update(payload).eq("id", formData.id);
      } else {
        await supabase.from("journeys").insert([payload]);
      }
      setIsEditing(false); 
      setFormData({ category: "Education" }); 
      fetchData();
    } catch (error) {
      alert("Gagal simpan data!");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus journey ini?")) return;
    await supabase.from("journeys").delete().eq("id", id);
    fetchData();
  };

  const getYear = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).getFullYear();
  };

  const getCategoryIcon = (cat: string) => {
    if (cat === 'Trading') return <TrendingUp size={14}/>;
    if (cat === 'Web Developer') return <Code size={14}/>;
    if (cat === 'Editor Video') return <Video size={14}/>;
    if (cat === 'IoT') return <Cpu size={14}/>;
    if (cat === 'Graphic Design') return <Palette size={14}/>;
    if (cat === 'Education') return <GraduationCap size={14}/>;
    return <Briefcase size={14}/>;
  };

  return (
    <div className="space-y-8 p-4">
      {/* HEADER TITANIUM */}
      <div className="flex justify-between items-end pb-6 border-b border-white/20">
        <div>
          <h2 className="text-4xl font-semibold text-white tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">Journey</h2>
          <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
            <Calendar size={14}/> Timeline Overview
          </p>
        </div>
        <button onClick={() => { setIsEditing(true); setFormData({ category: "Education" }); }} 
          className="bg-gradient-to-b from-gray-100 to-gray-300 text-black px-6 py-3 rounded-full font-medium text-xs shadow-lg hover:shadow-xl hover:scale-105 transition-all flex gap-2 active:scale-95">
          <Plus size={16} strokeWidth={2.5} /> Add Milestone
        </button>
      </div>

      {/* TIMELINE LIST - GLASS CARDS */}
      <div className="grid gap-4">
        {loading ? (
           <div className="h-32 flex items-center justify-center text-gray-500 font-mono text-xs animate-pulse">SYNCING TIMELINE...</div>
        ) : (
          dataList.map((item, index) => (
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: index*0.05}} key={item.id} 
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 rounded-[24px] flex flex-col md:flex-row justify-between items-start md:items-center group hover:border-white/20 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.02)]"
            >
              <div className="flex gap-6 items-start w-full">
                <div className="text-4xl font-bold text-white/10 group-hover:text-white/20 transition-colors tracking-tighter w-20 pt-1">
                  {getYear(item.date_event)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                        {getCategoryIcon(item.category || "Education")}
                        <span className="text-[10px] uppercase tracking-wider font-semibold">{item.category}</span>
                    </span>
                    <span className="text-[11px] text-gray-500 font-mono">{item.date_event}</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">{item.description}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0 md:ml-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => { setFormData(item); setIsEditing(true); }} className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all hover:scale-110 text-gray-400"><Save size={16}/></button>
                <button onClick={() => handleDelete(item.id)} className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all hover:scale-110 text-gray-400"><Trash2 size={16}/></button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* TITANIUM MODAL */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setIsEditing(false)} className="absolute inset-0 bg-black/60 backdrop-blur-lg" />
            <motion.div initial={{scale:0.9, opacity:0, y:20}} animate={{scale:1, opacity:1, y:0}} exit={{scale:0.9, opacity:0, y:20}} 
              className="w-full max-w-lg bg-[#1c1c1e] border border-white/10 p-8 rounded-[32px] relative z-10 shadow-2xl ring-1 ring-white/10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h3 className="text-2xl font-semibold text-white tracking-tight">
                  {formData.id ? "Edit Milestone" : "New Milestone"}
                </h3>
                <button onClick={() => setIsEditing(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-white/20 hover:text-white transition-all"><X size={18}/></button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 ml-1">Date Event</label>
                        <input type="date" className="w-full bg-black/20 border border-white/10 p-3 rounded-2xl text-white font-medium outline-none focus:border-white/30 focus:bg-black/40 transition-all" 
                        value={formData.date_event || ""} onChange={e => setFormData({...formData, date_event: e.target.value})} required />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 ml-1">Category</label>
                        <div className="relative">
                            <select className="w-full bg-black/20 border border-white/10 p-3 rounded-2xl text-white font-medium outline-none focus:border-white/30 focus:bg-black/40 transition-all appearance-none cursor-pointer"
                                value={formData.category || "Education"} onChange={e => setFormData({...formData, category: e.target.value})}>
                                <option value="Education">Education</option>
                                <option value="Trading">Trading</option>
                                <option value="Editor Video">Editor Video</option>
                                <option value="Web Developer">Web Developer</option>
                                <option value="Graphic Design">Graphic Design</option>
                                <option value="IoT">IoT</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 ml-1">Title / Position</label>
                  <input type="text" placeholder="Role or Achievement" className="w-full bg-black/20 border border-white/10 p-3 rounded-2xl text-white font-medium outline-none focus:border-white/30 focus:bg-black/40 transition-all" 
                    value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} required />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 ml-1">Description</label>
                  <textarea rows={4} placeholder="Details about this milestone..." className="w-full bg-black/20 border border-white/10 p-3 rounded-2xl text-white font-medium outline-none focus:border-white/30 focus:bg-black/40 transition-all resize-none"
                    value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>

                <button type="submit" className="w-full bg-white text-black py-4 rounded-2xl font-semibold text-sm hover:bg-gray-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2">
                  <Save size={18}/> Save Data
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}