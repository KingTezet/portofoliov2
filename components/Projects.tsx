"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SplitText, Tilt } from "@/components/motion";
import ProjectCover, { useProjects } from "@/components/ProjectCover";
import { impactHighlights } from "@/lib/projects";

export default function Projects() {
  const { projects } = useProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const more = projects.filter((p) => p.supporting);

  return (
    <>
      <section id="work" className="mb-24 scroll-mt-24">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-zinc-500">(01) Selected Work</span>
            <h2 className="font-sf-pro text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl">
              <SplitText text="Selected Work." />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-3 max-w-xl text-zinc-600">
                A selection of web products, business tools, and interfaces I&apos;ve helped build.
              </p>
            </Reveal>
          </div>
          <Link
            href="/projects"
            className="hidden shrink-0 items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-50 md:flex"
          >
            View All Projects <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {featured.map((project, idx) => (
            <Reveal key={project.slug} delay={(idx % 2) * 0.1} className="h-full">
              <Tilt max={3} className="h-full">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_18px_60px_rgba(24,24,27,0.05)] transition-shadow duration-500 hover:shadow-[0_24px_70px_rgba(24,24,27,0.12)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
                    <ProjectCover project={project} imgClassName="transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/90 text-zinc-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                  <div className="flex flex-grow flex-col p-6 sm:p-7">
                    <span className="mb-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">{project.category}</span>
                    <h3 className="font-sf-pro mb-3 text-2xl font-medium tracking-tight text-zinc-900">{project.title}</h3>
                    <p className="mb-6 text-sm leading-6 text-zinc-600">{project.summary}</p>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {project.tags.map((t) => (
                        <span key={t} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-medium text-zinc-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>

        {more.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <span className="mb-1 block font-mono text-xs uppercase tracking-wider text-zinc-500">More Work</span>
                  <h3 className="font-sf-pro text-2xl font-medium tracking-tight text-zinc-900 md:text-3xl">Other projects &amp; products.</h3>
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((project, idx) => (
                <Reveal key={project.slug} delay={(idx % 3) * 0.08} className="h-full">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-shadow duration-500 hover:shadow-[0_18px_50px_rgba(24,24,27,0.1)]"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                      <ProjectCover project={project} imgClassName="transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-grow flex-col p-5">
                      <span className="mb-1 font-mono text-[10px] uppercase tracking-wider text-zinc-500">{project.category}</span>
                      <h4 className="font-sf-pro flex items-start justify-between gap-2 text-lg font-medium tracking-tight text-zinc-900">
                        {project.title.split(" — ")[0]}
                        <ArrowUpRight size={16} className="mt-1 shrink-0 text-zinc-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-900" />
                      </h4>
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-zinc-600">{project.summary}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-center md:hidden">
          <Link
            href="/projects"
            className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-medium transition-colors hover:bg-zinc-50"
          >
            View All Projects <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* ===== IMPACT HIGHLIGHTS ===== */}
      <section className="mb-32">
        <div className="mb-8">
          <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-zinc-500">(02) Impact Highlights</span>
          <h2 className="font-sf-pro text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl">
            <SplitText text="Measured results." />
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {impactHighlights.map((h, i) => (
            <Reveal key={h.label} delay={i * 0.08} className="h-full">
              <Link
                href={`/projects/${h.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(24,24,27,0.06)]"
              >
                <p className="font-sf-pro text-4xl font-semibold tracking-tight text-zinc-900">{h.value}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{h.label}</p>
                <span className="mt-auto flex items-center gap-1 pt-5 text-xs font-medium text-zinc-400 transition-colors group-hover:text-zinc-900">
                  {h.project}
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
