"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Code2, ExternalLink, Github, Layers, Target, TrendingUp, User, Wrench } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Reveal, SplitText } from "@/components/motion";
import ProjectCover, { useProjects } from "@/components/ProjectCover";
import type { ProjectEntry } from "@/lib/projects";

function Cover({ project }: { project: ProjectEntry }) {
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
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        <ProjectCover project={project} />
      </motion.div>
    </motion.div>
  );
}

function Block({ icon: Icon, title, children, delay = 0 }: { icon: typeof Layers; title: string; children: React.ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
        <Icon size={14} /> {title}
      </h3>
      {children}
    </Reveal>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-base leading-relaxed text-zinc-700">
          <CheckCircle2 size={18} className="mt-1 shrink-0 text-zinc-400" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const { projects, ready } = useProjects();
  const project = projects.find((p) => p.slug === slug);
  const others = projects.filter((p) => p.slug !== slug && p.featured).slice(0, 2);

  if (!project && !ready)
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
          Back to All Projects
        </Link>
      </main>
    );

  const cs = project.caseStudy;

  return (
    <main className="min-h-screen bg-[#fcfbfa] pb-24 text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
        <Reveal y={10}>
          <Link href="/projects" className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900">
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" /> Back to All Projects
          </Link>
        </Reveal>

        <Cover project={project} />

        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-zinc-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                {project.category}
              </span>
              {project.context && <span className="text-sm text-zinc-500">{project.context}</span>}
            </div>
          </Reveal>

          <h1 className="font-sf-pro mb-8 text-4xl font-medium leading-tight tracking-tight md:text-6xl">
            <SplitText text={project.title} />
          </h1>

          <Reveal delay={0.1}>
            <div className="mb-12 flex flex-wrap gap-3">
              {project.demo_url && (
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.03] hover:bg-zinc-800">
                  <ExternalLink size={16} /> Visit Live Site
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
            <div className="space-y-12 md:col-span-2">
              <Block icon={Layers} title="Overview">
                <p className="text-lg leading-relaxed text-zinc-700">{cs?.overview ?? project.summary}</p>
              </Block>
              {cs?.challenge && (
                <Block icon={Target} title="The Challenge">
                  <p className="text-lg leading-relaxed text-zinc-700">{cs.challenge}</p>
                </Block>
              )}
              {cs?.built && (
                <Block icon={Wrench} title="What I Built">
                  <List items={cs.built} />
                </Block>
              )}
              {cs?.outcome && (
                <Block icon={TrendingUp} title="The Outcome">
                  <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8">
                    <List items={cs.outcome} />
                  </div>
                </Block>
              )}
            </div>

            <div className="space-y-10">
              {cs?.role && (
                <Block icon={User} title="My Role" delay={0.1}>
                  <p className="text-base leading-relaxed text-zinc-700">{cs.role}</p>
                </Block>
              )}
              <Block icon={Code2} title="Tech Stack" delay={0.15}>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tech) => (
                    <span key={tech} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white">
                      {tech}
                    </span>
                  ))}
                </div>
              </Block>
            </div>
          </div>

          {others.length > 0 && (
            <div className="mt-24 border-t border-zinc-200 pt-12">
              <h3 className="mb-6 font-mono text-xs uppercase tracking-wider text-zinc-500">More Selected Work</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {others.map((o) => (
                  <Link key={o.slug} href={`/projects/${o.slug}`} className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-shadow duration-500 hover:shadow-[0_24px_70px_rgba(24,24,27,0.12)]">
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                      <ProjectCover project={o} imgClassName="transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex items-center justify-between gap-3 p-5">
                      <p className="font-medium text-zinc-900">{o.title}</p>
                      <ArrowUpRight size={18} className="shrink-0 text-zinc-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-900" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
