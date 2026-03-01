"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Upload, Trash2, Plus, Save, X, Loader2, Image as ImageIcon, MapPin, Tag, Type } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type GalleryItem = { 
  id: number; 
  image_url: string; 
  caption: string; 
  category: string; 
  location: string;
};

export default function GalleryManager() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<GalleryItem>>({
    caption: "", category: "Life", location: ""
  });
  const [file, setFile] = useState<File | null>(null);

  const fetchGallery = async () => {
    setLoading(true);
    const { data } = await supabase.from("gallery").select("*").order("id", { ascending: false });
    if (data) setGallery(data);
    setLoading(false);
  };

  useEffect(() => { fetchGallery(); }, []);

  const handleUpload = async () => {
    if (!file) return null; 
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `gallery/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(fileName, file);
    
    if (uploadError) { 
        alert("Upload Gagal! Cek koneksi atau policy bucket."); 
        setUploading(false); 
        return null; 
    }
    
    const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(fileName);
    setUploading(false);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrl = formData.image_url;
    if (file) {
      const uploadedUrl = await handleUpload();
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    if (!imageUrl) return alert("Wajib upload foto!");

    const payload = {
      caption: formData.caption,
      category: formData.category,
      location: formData.location,
      image_url: imageUrl
    };

    try {
      await supabase.from("gallery").insert([payload]);
      
      setIsEditing(false);
      setFormData({ caption: "", category: "Life", location: "" });
      setFile(null);
      fetchGallery();
    } catch (error) {
      alert("Gagal menyimpan data!");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus foto ini permanen?")) return;
    await supabase.from("gallery").delete().eq("id", id);
    fetchGallery();
  };

  return (
    <div className="space-y-8 p-4">
      {/* HEADER TITANIUM */}
      <div className="flex justify-between items-end pb-6 border-b border-white/20">
        <div>
          <h2 className="text-4xl font-semibold text-white tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">Gallery</h2>
          <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
            <ImageIcon size={14}/> Visual Archives • {gallery.length} Images
          </p>
        </div>
        
        <button 
          onClick={() => { setIsEditing(true); setFormData({ category: "Life" }); setFile(null); }}
          className="bg-gradient-to-b from-gray-100 to-gray-300 text-black px-6 py-3 rounded-full font-medium text-xs shadow-lg hover:shadow-xl hover:scale-105 transition-all flex gap-2 items-center active:scale-95"
        >
          <Plus size={16} strokeWidth={2.5}/> Add Photo
        </button>
      </div>

      {/* GALLERY GRID - GLASS CARDS */}
      {loading ? (
         <div className="h-64 flex items-center justify-center text-gray-500 font-mono text-xs animate-pulse">LOADING VISUALS...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Quick Add Button */}
            <div onClick={() => { setIsEditing(true); setFormData({ category: "Life" }); setFile(null); }} className="aspect-square bg-white/5 border border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer group">
                <Plus size={32} className="mb-2 group-hover:text-white transition-colors"/>
                <span className="text-[10px] font-medium uppercase tracking-widest group-hover:text-white">Upload New</span>
            </div>

            <AnimatePresence>
            {gallery.map((item, index) => (
                <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.5}} transition={{delay: index*0.05}} key={item.id} 
                className="relative group aspect-square bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all shadow-lg hover:shadow-2xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image_url} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 group-hover:grayscale-0 grayscale transition-all duration-700 ease-out" />
                  
                  {/* Overlay Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 backdrop-blur-[2px]">
                      <p className="text-[10px] text-gray-300 font-semibold uppercase tracking-wider mb-1">{item.category}</p>
                      <p className="text-xs font-bold text-white leading-tight line-clamp-2 mb-1">{item.caption}</p>
                      <div className="flex items-center gap-1 text-[9px] text-gray-400">
                        <MapPin size={10}/> {item.location || "Location N/A"}
                      </div>
                  </div>

                  <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} className="absolute top-2 right-2 p-2 bg-black/50 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:scale-110 z-20">
                    <Trash2 size={14}/>
                  </button>
                </motion.div>
            ))}
            </AnimatePresence>
        </div>
      )}

      {/* TITANIUM MODAL UPLOAD */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setIsEditing(false)} className="absolute inset-0 bg-black/60 backdrop-blur-lg" />
            <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}} 
              className="w-full max-w-md bg-[#1c1c1e] border border-white/10 p-8 rounded-[32px] relative z-10 shadow-2xl ring-1 ring-white/10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

              <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
                  Upload Photo
                </h3>
                <button onClick={() => setIsEditing(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-white/20 hover:text-white transition-all"><X size={18}/></button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                
                <div className="p-6 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all relative group text-center cursor-pointer">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-20" onChange={e => setFile(e.target.files?.[0] || null)} />
                  <div className="flex flex-col items-center gap-3">
                    {file ? (
                      <div className="text-green-400 flex items-center gap-2 text-sm font-medium">
                        <ImageIcon size={20}/> {file.name}
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                            <Upload size={20} className="text-gray-400 group-hover:text-white transition-colors"/>
                        </div>
                        <span className="text-sm font-medium text-gray-400 group-hover:text-white">Click to Select Photo</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 ml-1 flex gap-1 items-center"><Type size={12}/> Caption</label>
                  <input type="text" placeholder="Image caption..." className="w-full bg-black/20 border border-white/10 p-3 rounded-2xl text-white text-sm font-medium focus:border-white/30 focus:bg-black/40 focus:outline-none transition-all" 
                    value={formData.caption || ""} onChange={e => setFormData({...formData, caption: e.target.value})} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 ml-1 flex gap-1 items-center"><Tag size={12}/> Category</label>
                        <div className="relative">
                            <select className="w-full bg-black/20 border border-white/10 p-3 rounded-2xl text-white text-xs font-bold focus:border-white/30 focus:bg-black/40 focus:outline-none transition-all appearance-none cursor-pointer"
                                value={formData.category || "Life"} onChange={e => setFormData({...formData, category: e.target.value})}>
                                <option value="Network">Network</option>
                                <option value="Travel">Travel</option>
                                <option value="Life">Life</option>
                                <option value="Work">Work</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 ml-1 flex gap-1 items-center"><MapPin size={12}/> Location</label>
                        <input type="text" placeholder="Sumedang" className="w-full bg-black/20 border border-white/10 p-3 rounded-2xl text-white text-xs font-medium focus:border-white/30 focus:bg-black/40 focus:outline-none transition-all" 
                        value={formData.location || ""} onChange={e => setFormData({...formData, location: e.target.value})} />
                    </div>
                </div>

                <button type="submit" disabled={uploading} className="w-full bg-white text-black py-4 rounded-2xl font-semibold text-sm hover:bg-gray-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2">
                  {uploading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} 
                  {uploading ? "Uploading..." : "Save to Gallery"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}