"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowRight, ImageOff, Play } from "lucide-react";
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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*") 
        .order("id", { ascending: false })
        .limit(6); 

      if (error) console.error(error);
      else {
        setProjects(data || []);
        setFilteredProjects(data || []);
      }
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeTab === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.category?.toLowerCase() === activeTab.toLowerCase())
      );
    }
  }, [activeTab, projects]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    currentTarget.style.setProperty("--x", `${x}px`);
    currentTarget.style.setProperty("--y", `${y}px`);
  };

  return (
    <section id="projects" className="relative py-32 px-4 bg-[#050505] overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADLINE */}
        <div className="text-center mb-20 space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500 border border-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                    Selected Works
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mt-6 tracking-tight leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-[length:200%_auto] animate-shine">
                        Multidisciplinary Execution.
                    </span>
                </h2>
            </motion.div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`
                    px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 border
                    ${activeTab === cat 
                        ? "bg-white text-black border-white" 
                        : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:border-white/20 hover:text-white"}
                    `}
                >
                    {cat}
                </button>
                ))}
            </div>
        </div>

        {/* GRID PROJECTS */}
        <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
                <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onMouseMove={handleMouseMove}
                    className="group relative rounded-3xl overflow-hidden flex flex-col h-full border border-white/10 bg-[#050505]"
                >
                    {/* SIRI GLOW EFFECT */}
                    <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_60deg,#00c6ff_120deg,#0072ff_180deg,#ff00d4_240deg,transparent_300deg)] opacity-0 group-hover:opacity-60 transition-opacity duration-700 animate-spin blur-2xl" style={{ animationDuration: '4s' }} />
                    <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_60deg,#00c6ff_120deg,#0072ff_180deg,#ff00d4_240deg,transparent_300deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin blur-md" style={{ animationDuration: '4s' }} />
                    <div className="absolute inset-[1px] bg-[#0a0a0a] rounded-[23px] z-10" />

                    <div className="pointer-events-none absolute inset-[1px] rounded-[23px] opacity-0 transition duration-300 group-hover:opacity-100 z-20"
                        style={{ background: `radial-gradient(800px circle at var(--x) var(--y), rgba(255,255,255,0.06), transparent 40%)` }}
                    />

                    {/* === CONTENT KARTU === */}
                    <div className="relative z-30 flex flex-col h-full rounded-[23px] overflow-hidden">
                        
                        {/* Link Overlay - Logika Dinamis */}
                        <Link 
                            href={project.category === "Editor Video" ? (project.demo_url || "#") : `/projects/${project.slug}`} 
                            target={project.category === "Editor Video" ? "_blank" : "_self"}
                            rel={project.category === "Editor Video" ? "noopener noreferrer" : undefined}
                            className="absolute inset-0 z-40"
                        />

                        {/* IMAGE AREA */}
                        <div className="relative w-full h-48 sm:h-56 bg-gray-900 border-b border-white/5 overflow-hidden">
                             {/* Play Icon (Opsional: Muncul pas hover untuk video) */}
                             {project.category === "Editor Video" && (
                                <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20">
                                        <Play size={24} className="text-white fill-white ml-1" />
                                    </div>
                                </div>
                            )}

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

                        {/* CONTENT TEXT */}
                        <div className="p-8 flex flex-col flex-grow relative z-20">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-blue-100 transition-colors pointer-events-none">
                                    {project.title}
                                </h3>
                            </div>

                            {/* TOMBOL AKSI: Logic Dinamis */}
                            <div className="mb-6 relative z-50">
                                {project.category === "Editor Video" ? (
                                    // OPSI 1: Kalo Video Editor, muncul tombol WATCH VIDEO yang Gede
                                    <a 
                                        href={project.demo_url || "#"} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-blue-400 hover:text-white transition-all shadow-lg w-full justify-center group/btn"
                                    >
                                        <Play size={12} fill="currentColor" className="group-hover/btn:scale-110 transition-transform" /> Watch Video
                                    </a>
                                ) : (
                                    // OPSI 2: Kalo Project biasa, muncul icon kecil kayak biasa (Github/Link)
                                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        {project.repo_url && (
                                            <a href={project.repo_url} target="_blank" className="text-gray-400 hover:text-white transition">
                                                <Github size={18} />
                                            </a>
                                        )}
                                        {project.demo_url && (
                                            <a href={project.demo_url} target="_blank" className="text-gray-400 hover:text-white transition">
                                                <ExternalLink size={18} />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>

                            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light line-clamp-3 flex-grow pointer-events-none">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto pointer-events-none">
                                {project.tech_stack?.map((tech) => (
                                    <span 
                                        key={tech} 
                                        className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-gray-300 font-medium tracking-wide"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                </motion.div>
            ))}
            </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
             <div className="text-center py-32 border border-dashed border-white/5 rounded-3xl mt-10">
                <p className="text-gray-500">No projects found in this category.</p>
             </div>
        )}

        <div className="mt-20 text-center">
            <Link 
                href="/projects" 
                className="group inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
                See All Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </section>
  );
}