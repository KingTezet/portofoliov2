"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Calendar, Code2, ExternalLink, Github, Layers, Play, Video } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import { Reveal, SplitText } from "@/components/motion";

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

function Cover({ src, alt }: { src: string | null; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-12 aspect-video w-full overflow-hidden rounded-[2rem] bg-zinc-200 md:aspect-[21/9]"
    >
      {src && (
        <motion.img
          style={{ y, scale }}
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />
      )}
    </motion.div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (!slug) return;
      const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).single();
      if (error) console.error("Error fetching project:", error);
      else setProject(data);
      setLoading(false);
    }
    fetchProject();
  }, [slug]);

  if (loading)
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fcfbfa]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900" />
      </main>
    );

  if (!project)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#fcfbfa] text-zinc-900">
        <p className="font-sf-pro text-3xl font-medium">Project not found.</p>
        <Link href="/projects" className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white">
          Back to Projects
        </Link>
      </main>
    );

  const isVideo = project.category === "Editor Video";

  return (
    <main className="min-h-screen bg-[#fcfbfa] pb-24 text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
        <Reveal y={10}>
          <Link href="/projects" className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900">
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" /> Back to Projects
          </Link>
        </Reveal>

        <Cover src={project.thumbnail_url} alt={project.title} />

        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-zinc-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                {project.category}
              </span>
              <span className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                <Calendar size={12} />
                {new Date(project.created_at).toLocaleDateString("id-ID", { year: "numeric", month: "long" })}
              </span>
            </div>
          </Reveal>

          <h1 className="font-sf-pro mb-8 text-4xl font-medium leading-tight tracking-tight md:text-6xl">
            <SplitText text={project.title} />
          </h1>

          <Reveal delay={0.1}>
            <div className="mb-12 flex flex-wrap gap-3">
              {isVideo && project.demo_url && (
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.03] hover:bg-zinc-800">
                  <Play size={16} fill="currentColor" /> Watch Video
                </a>
              )}
              {!isVideo && project.demo_url && (
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.03] hover:bg-zinc-800">
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
              {project.repo_url && (
                <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-50">
                  <Github size={16} /> Source Code
                </a>
              )}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-12 border-t border-zinc-200 pt-12 md:grid-cols-3">
            <Reveal className="md:col-span-2">
              <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
                <Layers size={14} /> About Project
              </h3>
              <p className="whitespace-pre-wrap text-lg leading-relaxed text-zinc-700">{project.description}</p>
            </Reveal>

            <Reveal delay={0.1} className="space-y-8">
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
                  <Code2 size={14} /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack?.map((tech) => (
                    <span key={tech} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {isVideo && (
                <div className="rounded-3xl border border-zinc-200 bg-white p-6">
                  <Video className="mb-2 text-zinc-900" size={24} />
                  <h4 className="mb-1 font-semibold">Video Production</h4>
                  <p className="text-xs text-zinc-500">Project ini melibatkan proses editing, color grading, dan sound design profesional.</p>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}
