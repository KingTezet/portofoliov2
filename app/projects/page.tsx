"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, ImageOff, Search } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import { Reveal, SplitText, Tilt } from "@/components/motion";

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

const categories = ["All", "Full-Stack", "AI & Automation", "Frontend", "UI/UX"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase.from("projects").select("*").order("id", { ascending: false });
      if (error) console.error("Error:", error);
      else setProjects(data || []);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return projects.filter((p) => {
      if (activeTab !== "All" && p.category?.toLowerCase() !== activeTab.toLowerCase()) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tech_stack?.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [projects, activeTab, searchQuery]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fcfbfa] text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal y={10}>
              <Link href="/" className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900">
                <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" /> Back to Home
              </Link>
            </Reveal>
            <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-zinc-500">(Archive) All Work</span>
            <h1 className="font-sf-pro text-5xl font-medium leading-none tracking-tight md:text-7xl">
              <SplitText text="All" />{" "}
              <SplitText text="Projects." delay={0.08} wordClassName="bg-gradient-to-b from-zinc-900 to-zinc-400 bg-clip-text text-transparent" />
            </h1>
            <Reveal delay={0.15}>
              <p className="mt-4 text-lg text-zinc-600">Koleksi lengkap hasil karya dari berbagai bidang keahlian.</p>
            </Reveal>
          </div>

          <Reveal delay={0.1} x={16} y={0} className="w-full md:w-auto">
            <div className="flex w-full items-center rounded-full border border-zinc-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus-within:border-zinc-900 focus-within:shadow-[0_10px_30px_rgba(24,24,27,0.08)] md:w-80">
              <Search className="mr-3 text-zinc-400" size={18} />
              <input
                type="text"
                placeholder="Search project, tech, or stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-none bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
              />
            </div>
          </Reveal>
        </div>

        {/* FILTER */}
        <Reveal delay={0.15}>
          <div className="mb-12 inline-flex flex-wrap gap-1 rounded-full border border-zinc-200 bg-white p-1.5">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveTab(cat)} className="relative rounded-full px-5 py-2 text-sm font-medium">
                {activeTab === cat && (
                  <motion.span
                    layoutId="project-tab"
                    className="absolute inset-0 rounded-full bg-zinc-900"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className={`relative transition-colors ${activeTab === cat ? "text-white" : "text-zinc-500 hover:text-zinc-900"}`}>{cat}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* GRID */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[380px] animate-pulse rounded-[2rem] bg-zinc-200/70" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6, delay: Math.min(index, 8) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <Tilt max={4} className="h-full">
                    <div className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_18px_60px_rgba(24,24,27,0.05)] transition-shadow duration-500 hover:shadow-[0_24px_70px_rgba(24,24,27,0.12)]">
                      <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10" aria-label={`View ${project.title}`} />

                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400">
                          <ImageOff size={24} className="mb-2" />
                          <span className="text-[10px] uppercase tracking-widest">No Preview</span>
                        </div>
                        {project.thumbnail_url && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={project.thumbnail_url}
                            alt={project.title}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                          />
                        )}
                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-900 backdrop-blur">
                          {project.category}
                        </span>
                        <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/90 text-zinc-900 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <ArrowUpRight size={18} />
                        </span>
                      </div>

                      <div className="flex flex-grow flex-col p-6">
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <h3 className="font-sf-pro text-2xl font-medium tracking-tight text-zinc-900">{project.title}</h3>
                          <div className="relative z-20 flex gap-3 pt-1">
                            {project.repo_url && (
                              <a href={project.repo_url} target="_blank" rel="noopener noreferrer" aria-label="Source code" className="text-zinc-400 transition-colors hover:text-zinc-900">
                                <Github size={18} />
                              </a>
                            )}
                            {project.demo_url && (
                              <a href={project.demo_url} target="_blank" rel="noopener noreferrer" aria-label="Live demo" className="text-zinc-400 transition-colors hover:text-zinc-900">
                                <ExternalLink size={18} />
                              </a>
                            )}
                          </div>
                        </div>
                        <p className="mb-6 line-clamp-3 text-sm leading-6 text-zinc-600">{project.description}</p>
                        <div className="mt-auto flex flex-wrap gap-2">
                          {project.tech_stack?.map((tech) => (
                            <span key={tech} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-medium text-zinc-600">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="mt-8 rounded-[2rem] border border-dashed border-zinc-300 py-32 text-center">
            <p className="text-zinc-500">No projects found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("All");
              }}
              className="mt-4 rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
