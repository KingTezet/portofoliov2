"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Search, ImageOff, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Project = {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string | null;
  tech_stack: string[];
  demo_url?: string;
  repo_url?: string;
  category: string;
  slug: string; 
};

const categories = ["All", "Trading", "Editor Video", "Web Developer", "Graphic Design", "IoT"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: false });

      if (error) console.error("Error:", error);
      else {
        setProjects(data || []);
        setFilteredProjects(data || []);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    let result = projects;
    if (activeTab !== "All") {
      result = result.filter(
        (p) => p.category?.toLowerCase() === activeTab.toLowerCase()
      );
    }
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tech_stack?.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }
    setFilteredProjects(result);
  }, [activeTab, searchQuery, projects]);

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />

      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-900/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-900/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-20">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4 max-w-2xl"
          >
             <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition mb-4 text-sm font-medium">
                <ArrowLeft size={16} /> Back to Home
             </Link>
             <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                   All Projects.
                </span>
             </h1>
             <p className="text-gray-400 text-lg font-light">
                Koleksi lengkap hasil karya dari berbagai bidang keahlian.
             </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 10 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="w-full md:w-auto"
          >
             <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative flex items-center bg-[#0a0a0a] border border-white/10 rounded-full px-4 py-3 w-full md:w-80">
                   <Search className="text-gray-500 mr-3" size={18} />
                   <input 
                      type="text" 
                      placeholder="Search project, tech, or stack..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-600 w-full"
                   />
                </div>
             </div>
          </motion.div>
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat, idx) => (
            <motion.button
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => setActiveTab(cat)}
                className={`
                px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border backdrop-blur-md
                ${activeTab === cat 
                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                    : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:border-white/20 hover:text-white"}
                `}
            >
                {cat}
            </motion.button>
            ))}
        </div>

        {/* GRID CONTENT */}
        {loading ? (
             <div className="text-center py-40 text-gray-500 animate-pulse font-light tracking-widest">
                LOADING ARCHIVES...
             </div>
        ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                    <motion.div
                        layout
                        key={project.id}
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.6, delay: index * 0.05, ease: [0.25, 0.4, 0.25, 1] }}
                        className="group relative bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 flex flex-col h-full"
                    >
                        {/* --- LINK TRANSPARAN (OVERLAY) --- */}
                        {/* Ini akan menutupi seluruh kartu dan membuatnya bisa diklik */}
                        <Link 
                            href={`/projects/${project.slug}`} 
                            className="absolute inset-0 z-10"
                            aria-label={`View ${project.title}`}
                        />
                        {/* ---------------------------------- */}

                        {/* --- CONTENT --- */}
                        <div className="relative w-full h-48 sm:h-56 bg-gray-900 border-b border-white/5 overflow-hidden">
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 text-gray-500 z-0">
                                <ImageOff size={24} className="mb-2 opacity-50" />
                                <span className="text-[10px] uppercase tracking-widest opacity-50">No Preview</span>
                            </div>

                            {project.thumbnail_url && (
                                <img
                                    src={project.thumbnail_url}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 ease-out group-hover:scale-105"
                                    onLoad={(e) => (e.target as HTMLImageElement).classList.remove("opacity-0")}
                                    onError={(e) => (e.target as HTMLImageElement).style.display = "none"}
                                />
                            )}
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60 pointer-events-none z-0" />
                            <div className="absolute top-4 left-4 z-0">
                                <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-wider text-white">
                                    {project.category}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-4 relative z-20"> 
                                <h3 className="text-xl font-bold text-white leading-tight group-hover:text-blue-100 transition-colors pointer-events-none">
                                    {project.title}
                                </h3>
                                
                                {/* Tombol GitHub/Demo harus punya z-index lebih tinggi dari Link Overlay (z-20 vs z-10) */}
                                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {project.repo_url && (
                                        <a href={project.repo_url} target="_blank" className="text-gray-400 hover:text-white relative z-20">
                                            <Github size={18} />
                                        </a>
                                    )}
                                    {project.demo_url && (
                                        <a href={project.demo_url} target="_blank" className="text-gray-400 hover:text-white relative z-20">
                                            <ExternalLink size={18} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light line-clamp-3 pointer-events-none">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto pointer-events-none">
                                {project.tech_stack?.map((tech) => (
                                    <span key={tech} className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-gray-300">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
                </AnimatePresence>
            </motion.div>
        )}

        {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-32 border border-dashed border-white/5 rounded-3xl mt-8">
                <p className="text-gray-500">No projects found matching your criteria.</p>
                <button 
                    onClick={() => {setSearchQuery(""); setActiveTab("All");}}
                    className="mt-4 text-blue-400 hover:text-white text-sm"
                >
                    Clear Filter
                </button>
            </div>
        )}

      </div>
    </main>
  );
}