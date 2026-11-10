"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ImageOff } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: false })
        .limit(6);

      if (error) console.error(error);
      else setProjects(data || []);
    }
    fetchProjects();
  }, []);

  return (
    <section id="portfolio" className="mb-32 scroll-mt-24">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-zinc-500">(01) Recent Work</span>
          <h2 className="font-sf-pro text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl">My Portfolio.</h2>
        </div>
        <Link
          href="/projects"
          className="hidden items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-50 md:flex"
        >
          View All Projects <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const external = project.category === "Editor Video";
          const href = external ? project.demo_url || "#" : `/projects/${project.slug}`;
          const tags = (project.tech_stack || []).slice(0, 3);

          return (
            <Link
              key={project.id}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group relative block aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl bg-zinc-200"
            >
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0 opacity-90" />
              <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-6">
                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-xs font-medium text-white/70">{project.category}</p>
                  <h3 className="mb-2 text-xl font-medium text-white">{project.title}</h3>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((t, i) => (
                        <span
                          key={t}
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold backdrop-blur-md ${
                            i % 2 === 0 ? "bg-emerald-500/40 text-emerald-100" : "bg-sky-500/40 text-sky-100"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="ml-3 flex h-10 w-10 shrink-0 translate-y-2 transform items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center md:hidden">
        <Link
          href="/projects"
          className="flex items-center gap-2 rounded-full border border-zinc-200 px-6 py-3 text-sm font-medium transition-colors hover:bg-zinc-50"
        >
          View All Projects <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
