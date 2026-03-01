"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Upload, Trash2, Plus, Save, X, Loader2, LayoutGrid, Edit3, Image as ImgIcon, Monitor, TrendingUp, Cpu, Video, Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  id: number; 
  title: string; 
  slug: string; 
  category: string; 
  description: string; 
  thumbnail_url: string;
  demo_url?: string;
};

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "", category: "Web Dev", description: "", thumbnail_url: "", demo_url: ""
  });
  const [file, setFile] = useState<File | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await supabase.from("projects").select("*").order("id", { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleUpload = async () => {
    if (!file) return formData.thumbnail_url; 
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `projects/${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(fileName, file);
    
    if (uploadError) { 
      alert(`Upload Gagal! Error: ${uploadError.message}`); 
      setUploading(false); return null; 
    }

    const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(fileName);
    setUploading(false);
    return data.publicUrl;
  };

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const imageUrl = await handleUpload();
    if (!imageUrl && !formData.thumbnail_url) return alert("Wajib ada gambar visual!");
    
    if (formData.category === "Video Editor" && !formData.demo_url) {
        return alert("Untuk kategori Video Editor, Link Video wajib diisi!");
    }

    const payload = { 
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title || ""), 
      category: formData.category,
      description: formData.description,
      thumbnail_url: imageUrl,
      demo_url: formData.demo_url,
    };
    
    try {
      if (formData.id) {
        await supabase.from("projects").update(payload).eq("id", formData.id);
      } else {
        await supabase.from("projects").insert([payload]);
      }
      
      setIsEditing(false); 
      setFormData({ title: "", category: "Web Dev", description: "", thumbnail_url: "", demo_url: "" }); 
      setFile(null); 
      fetchProjects();

    } catch (error: any) {
      alert("Gagal menyimpan data! Error: " + error.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus project ini permanen?")) return;
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  };

  const getCategoryIcon = (cat: string) => {
    if (cat === 'Trading') return <TrendingUp size={14}/>;
    if (cat === 'IoT') return <Cpu size={14}/>;
    if (cat === 'Video Editor') return <Video size={14}/>;
    return <Monitor size={14}/>;
  }

  return (
    <div className="space-y-8 p-4">
      {/* HEADER TITANIUM STYLE */}
      <div className="flex justify-between items-end pb-6 border-b border-white/20">
        <div>
          <h2 className="text-4xl font-semibold text-white tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">Projects</h2>
          <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
            <LayoutGrid size={14}/> Managed Portfolio • {projects.length} Items
          </p>
        </div>
        <button 
          onClick={() => { setIsEditing(true); setFormData({ category: "Web Dev" }); setFile(null); }}
          className="bg-gradient-to-b from-gray-100 to-gray-300 text-black px-6 py-3 rounded-full font-medium text-xs shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 active:scale-95"
        >
          <Plus size={16} strokeWidth={2.5} /> New Project
        </button>
      </div>

      {/* GRID LIST - GLASS CARDS */}
      {loading ? (
        <div className="h-64 flex items-center justify-center text-gray-500 font-mono text-xs animate-pulse">SYNCING DATA...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((item, index) => (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{delay: index*0.05}} key={item.id} 
              className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden hover:border-white/30 transition-all duration-500 shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            >
              <div className="h-52 overflow-hidden relative">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out" />
                
                {/* Hover Actions Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <button onClick={() => { setFormData(item); setIsEditing(true); }} className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all hover:scale-110"><Edit3 size={16} /></button>
                  <button onClick={() => handleDelete(item.id)} className="w-10 h-10 bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-200 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all hover:scale-110"><Trash2 size={16} /></button>
                </div>

                <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-2">
                   <span className="text-gray-300">{getCategoryIcon(item.category)}</span>
                   <span className="text-[10px] font-semibold text-white uppercase tracking-wider">{item.category}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 leading-tight truncate">{item.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* MODAL FORM - TITANIUM SHEET */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditing(false)} className="absolute inset-0 bg-black/60 backdrop-blur-lg" />
            
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} 
              className="w-full max-w-2xl bg-[#1c1c1e] border border-white/10 rounded-[32px] p-8 shadow-2xl relative z-10 overflow-hidden ring-1 ring-white/10"
            >
              {/* Glossy Header Effect */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

              <div className="flex justify-between items-center mb-8 relative z-10">
                <h3 className="text-2xl font-semibold text-white tracking-tight">
                  {formData.id ? "Edit Project" : "New Project"}
                </h3>
                <button onClick={() => setIsEditing(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-white/20 hover:text-white transition-all"><X size={18}/></button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 ml-1">Project Title</label>
                    <input type="text" className="w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:border-white/30 focus:bg-black/40 focus:outline-none transition-all" 
                      placeholder="Project Name" value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 ml-1">Category</label>
                    <div className="relative">
                      <select className="w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:border-white/30 focus:bg-black/40 focus:outline-none appearance-none transition-all cursor-pointer"
                        value={formData.category || "Web Dev"} onChange={e => setFormData({...formData, category: e.target.value})}>
                        <option value="Trading">Trading</option>
                        <option value="Web Developer">Web Developer</option>
                        <option value="Video Editor">Video Editor</option>
                        <option value="IoT">IoT</option>
                        <option value="Graphic Design">Graphic Design</option>
                      </select>
                      <LayoutGrid size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"/>
                    </div>
                  </div>
                </div>

                {formData.category === "Video Editor" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2 bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20">
                        <label className="text-xs font-bold text-blue-400 flex items-center gap-2">
                            <Video size={14}/> Video Link (Required)
                        </label>
                        <input 
                            type="url" 
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:border-blue-500/50 focus:outline-none transition-all" 
                            placeholder="https://instagram.com/reel/..." 
                            value={formData.demo_url || ""} 
                            onChange={e => setFormData({...formData, demo_url: e.target.value})} 
                            required
                        />
                    </motion.div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 ml-1">Description</label>
                  <textarea rows={4} className="w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:border-white/30 focus:bg-black/40 focus:outline-none transition-all resize-none"
                    placeholder="Describe the project..." value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})} required />
                </div>

                {/* Upload Area Titanium */}
                <div className="p-6 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all relative group text-center cursor-pointer">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-20" onChange={e => setFile(e.target.files?.[0] || null)} />
                  <div className="flex flex-col items-center gap-3">
                    {file || formData.thumbnail_url ? (
                      <div className="text-green-400 flex items-center gap-2 text-sm font-medium">
                        <ImgIcon size={20}/> 
                        {file ? "New Image Selected" : "Current Image Loaded"}
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                            <Upload size={20} className="text-gray-400 group-hover:text-white transition-colors"/>
                        </div>
                        <span className="text-sm font-medium text-gray-400 group-hover:text-white">Click to Upload Visual</span>
                      </>
                    )}
                  </div>
                </div>

                <button type="submit" disabled={uploading} className="mt-2 w-full bg-white text-black py-4 rounded-2xl font-semibold text-sm hover:bg-gray-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                  {uploading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} 
                  {uploading ? "Uploading..." : "Save Changes"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}