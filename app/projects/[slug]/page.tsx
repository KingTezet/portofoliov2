"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Calendar, Code2, Layers, Play, Video } from "lucide-react";
import Navbar from "@/components/Navbar";

// --- TIPE DATA ---
type Project = {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string | null;
  tech_stack: string[];
  demo_url?: string;
  repo_url?: string;
  category: string;
  created_at: string;
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (!slug) return;
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) console.error("Error fetching project:", error);
      else setProject(data);
      setLoading(false);
    }
    fetchProject();
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-mono text-xs animate-pulse">LOADING DATA...</div>;
  if (!project) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Project Not Found</div>;

  const isVideo = project.category === "Editor Video";

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 pb-20">
      <Navbar />
      
      {/* HEADER IMAGE / VIDEO THUMBNAIL */}
      <div className="relative w-full h-[50vh] md:h-[60vh] bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
        
        {/* Tombol Back */}
        <Link href="/projects" className="absolute top-28 left-6 md:left-20 z-50 flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 text-xs font-bold uppercase tracking-widest">
            <ArrowLeft size={14} /> Back to Projects
        </Link>

        {project.thumbnail_url && (
            <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover opacity-60" />
        )}
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-32 relative z-20">
        
        {/* TITLE SECTION */}
        <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                    {project.category}
                </span>
                <span className="text-gray-500 text-xs font-mono flex items-center gap-2">
                    <Calendar size={12}/> {new Date(project.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}
                </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">{project.title}</h1>
            
            {/* --- ACTION BUTTONS (Logic Titanium) --- */}
            <div className="flex flex-wrap gap-4">
                {/* 1. TOMBOL UTAMA: VIDEO LINK */}
                {isVideo && project.demo_url && (
                    <a 
                        href={project.demo_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none px-8 py-4 bg-white text-black rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-50 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3"
                    >
                        <Play size={18} fill="currentColor"/> Watch Video
                    </a>
                )}

                {/* 2. TOMBOL DEMO (Untuk Web/App) */}
                {!isVideo && project.demo_url && (
                    <a href={project.demo_url} target="_blank" className="flex-1 md:flex-none px-6 py-3 bg-white text-black rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition flex items-center justify-center gap-2">
                        <ExternalLink size={16}/> Live Demo
                    </a>
                )}
                
                {/* 3. TOMBOL REPO (Github) */}
                {project.repo_url && (
                    <a href={project.repo_url} target="_blank" className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition flex items-center gap-2">
                        <Github size={18}/> Source Code
                    </a>
                )}
            </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
            
            {/* Kolom Kiri: Deskripsi */}
            <div className="md:col-span-2 space-y-8">
                <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Layers size={14}/> About Project</h3>
                    <p className="text-gray-300 leading-relaxed font-light text-lg whitespace-pre-wrap">
                        {project.description}
                    </p>
                </div>
            </div>

            {/* Kolom Kanan: Tech Stack & Info */}
            <div className="space-y-8">
                <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Code2 size={14}/> Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.tech_stack?.map((tech) => (
                            <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 font-medium">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Banner Tambahan untuk Video Editor */}
                {isVideo && (
                    <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                        <Video className="text-blue-400 mb-2" size={24} />
                        <h4 className="text-white font-bold mb-1">Video Production</h4>
                        <p className="text-xs text-gray-400">Project ini melibatkan proses editing, color grading, dan sound design profesional.</p>
                    </div>
                )}
            </div>
        </div>

      </div>
    </main>
  );
}