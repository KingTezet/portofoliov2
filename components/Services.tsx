"use client";

import Link from "next/link";
import { Reveal, SplitText, Tilt } from "@/components/motion";
import { ArrowUpRight, Database, Layers, LayoutDashboard, Map } from "lucide-react";
import { curatedProjects } from "@/lib/projects";

const focus = [
  {
    n: "01",
    title: "Web Apps & Dashboards",
    desc: "Customer-facing applications and internal tools built with React and Next.js — from ordering experiences to operational dashboards.",
    icon: LayoutDashboard,
  },
  {
    n: "02",
    title: "Interface Engineering",
    desc: "Responsive, detail-oriented interfaces translated from product requirements and design into maintainable frontend code.",
    icon: Layers,
  },
  {
    n: "03",
    title: "API & Data Integration",
    desc: "Frontend features connected to REST APIs, Supabase, and PostgreSQL, with clear loading, error, and empty states.",
    icon: Database,
  },
  {
    n: "04",
    title: "Map-based Data Tools",
    desc: "Browser-based spatial data experiences with map layers, SHP uploads, record search, and filtering.",
    icon: Map,
  },
];

// Real product screenshots instead of a decorative code editor.
const shots = curatedProjects.filter((p) => p.thumbnail_url).slice(0, 2);

function BrowserShot({ src, url, alt, className }: { src: string; url: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-[#161618] shadow-[0_30px_80px_rgba(0,0,0,0.6)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-[#1c1c1e] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 truncate rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-400">{url}</span>
      </div>
      <div className="relative aspect-[16/10]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="focus" className="mx-auto mb-32 max-w-7xl scroll-mt-24 rounded-[2rem] bg-zinc-900 px-6 py-20 text-white sm:px-12 sm:py-24 lg:px-16">
      <div className="mb-14 flex flex-col md:items-end md:text-right">
        <span className="mb-4 block font-mono text-xs uppercase tracking-wider text-zinc-500">(04) Areas of Focus</span>
        <h2 className="font-sf-pro text-5xl font-medium tracking-tight md:text-7xl">
          <SplitText text="What I Build." />
        </h2>
      </div>

      <div className="flex w-full flex-col gap-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#0d0d0d]">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-16">
                <div>
                  <span className="mb-3 block font-mono text-xs uppercase tracking-widest text-zinc-500 sm:mb-6">Featured</span>
                  <h3 className="font-sf-pro mb-4 text-3xl font-medium leading-[1.05] tracking-tight text-white sm:mb-6 sm:text-5xl lg:text-6xl">
                    From interface
                    <br />
                    to working product.
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
                    I build the frontend experiences behind online ordering, operations dashboards, and data-heavy
                    tools. My focus is on clear interactions, responsive layouts, and maintainable React and Next.js
                    applications.
                  </p>
                </div>
                <div className="mt-8 sm:mt-10">
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
                  >
                    Explore Selected Work <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              <div className="relative flex min-h-[320px] items-center justify-center p-6 sm:min-h-[420px] sm:p-10">
                <Tilt max={6} className="relative w-full max-w-md">
                  {shots[1] && (
                    <Link href={`/projects/${shots[1].slug}`} aria-label={shots[1].title}>
                      <BrowserShot
                        src={shots[1].thumbnail_url!}
                        url={shots[1].demo_url?.replace(/^https?:\/\/(www\.)?/, "") ?? ""}
                        alt={shots[1].title}
                        className="absolute -right-2 -top-8 w-[78%] rotate-3 opacity-80 transition-transform duration-500 hover:-translate-y-1 sm:-right-6"
                      />
                    </Link>
                  )}
                  {shots[0] && (
                    <Link href={`/projects/${shots[0].slug}`} aria-label={shots[0].title} className="relative mt-16 block w-[88%]">
                      <BrowserShot
                        src={shots[0].thumbnail_url!}
                        url={shots[0].demo_url?.replace(/^https?:\/\/(www\.)?/, "") ?? ""}
                        alt={shots[0].title}
                        className="-rotate-2 transition-transform duration-500 hover:-translate-y-1"
                      />
                    </Link>
                  )}
                </Tilt>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {focus.map(({ n, title, desc, icon: Icon }, i) => (
            <Reveal key={title} delay={(i % 2) * 0.08} className="h-full">
              <div className="group flex h-full gap-5 rounded-[1.75rem] border border-zinc-800 bg-zinc-900 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-zinc-700 hover:bg-[#1f1f22] sm:p-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-800 text-white transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <Icon size={22} />
                </div>
                <div>
                  <span className="font-mono text-xs text-zinc-500">{n}</span>
                  <h3 className="mb-2 mt-0.5 text-lg font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
