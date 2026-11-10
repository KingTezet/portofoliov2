"use client";

import Link from "next/link";
import { Reveal, SplitText, Tilt } from "@/components/motion";
import { ArrowUpRight, Code2, Layers, LayoutDashboard, Sparkles, Workflow, Zap } from "lucide-react";

const services = [
  { tag: "Frontend", title: "Web Apps & Dashboards", desc: "React + Next.js App Router interfaces for ordering, operations and admin dashboards.", icon: LayoutDashboard },
  { tag: "Performance", title: "Fast by Default", desc: "Core Web Vitals, Lighthouse 95+, lean bundles and optimized images.", icon: Zap },
  { tag: "UI/UX", title: "Interface Engineering", desc: "Pixel-accurate, accessible and responsive UI from design to code.", icon: Layers },
  { tag: "Motion", title: "Interactions & Animation", desc: "Framer Motion micro-interactions that feel smooth without slowing pages down.", icon: Sparkles },
  { tag: "Data", title: "API & Data Integration", desc: "REST APIs, Supabase and PostgreSQL wired cleanly into the frontend.", icon: Workflow },
  { tag: "Maps", title: "Map-based Data Tools", desc: "Web mapping views for spatial data, uploads, search and filtering.", icon: Code2 },
];

const code = [
  [{ c: "text-zinc-500", t: "// Sugih — frontend stack" }],
  [
    { c: "text-purple-400", t: "import" },
    { c: "text-zinc-300", t: " { build } " },
    { c: "text-purple-400", t: "from" },
    { c: "text-amber-300", t: " '@sugih/frontend'" },
  ],
  [],
  [
    { c: "text-purple-400", t: "const" },
    { c: "text-sky-300", t: " app" },
    { c: "text-zinc-400", t: " =" },
    { c: "text-sky-200", t: " build" },
  ],
  [{ c: "text-zinc-300", t: "  ." }, { c: "text-yellow-300", t: "stack" }, { c: "text-zinc-300", t: "(" }, { c: "text-amber-300", t: "'nextjs'" }, { c: "text-zinc-300", t: ", " }, { c: "text-amber-300", t: "'tailwind'" }, { c: "text-zinc-300", t: ")" }],
  [{ c: "text-zinc-300", t: "  ." }, { c: "text-yellow-300", t: "animate" }, { c: "text-zinc-300", t: "(" }, { c: "text-amber-300", t: "'framer-motion'" }, { c: "text-zinc-300", t: ")" }],
  [{ c: "text-zinc-300", t: "  ." }, { c: "text-yellow-300", t: "ship" }, { c: "text-zinc-300", t: "(" }, { c: "text-amber-300", t: "'production'" }, { c: "text-zinc-300", t: ")" }],
  [],
  [{ c: "text-purple-400", t: "export default" }, { c: "text-sky-300", t: " app" }],
];

export default function Services() {
  return (
    <section id="services" className="mx-auto mt-12 max-w-7xl scroll-mt-24 rounded-[2rem] bg-zinc-900 px-8 py-24 text-white sm:px-12 lg:px-16">
      <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="flex flex-col text-right md:w-full md:items-end">
          <span className="mb-4 flex w-full items-center justify-end gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
            <Sparkles size={14} /> What I Build
          </span>
          <h2 className="font-sf-pro text-5xl font-medium tracking-tight md:text-7xl"><SplitText text="My Services." /></h2>
        </div>
      </div>

      <div className="mt-12 flex w-full flex-col gap-6">
        <Reveal>
        <div className="group relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#0d0d0d] lg:min-h-[560px]">
          <div className="grid h-full grid-cols-1 lg:grid-cols-2">
            <div className="flex h-full flex-col justify-between p-6 sm:p-10 lg:p-16">
              <div>
                <span className="mb-3 block font-mono text-xs uppercase tracking-widest text-zinc-500 sm:mb-6">Featured</span>
                <h3 className="font-sf-pro mb-3 text-3xl font-medium leading-[1.05] tracking-tight text-white sm:mb-5 sm:text-5xl lg:text-6xl">
                  Fast,
                  <br />
                  Accessible
                  <br />
                  Interfaces
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-zinc-400 sm:text-base">
                  Interfaces that load fast, feel smooth, and stay maintainable — built with React, Next.js,
                  TypeScript and Tailwind CSS, from design to deployment.
                </p>
              </div>
              <div className="mt-6 sm:mt-10">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
                >
                  See Projects <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center p-6 sm:p-8 lg:min-h-[560px]">
              <Tilt max={8} className="w-full max-w-sm">
              <div className="w-full cursor-default select-none overflow-hidden rounded-2xl bg-[#161618] shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
                <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-[#1c1c1e] px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                  <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                  <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                  <div className="ml-4 flex gap-5">
                    <span className="border-b border-zinc-400 pb-px text-[11px] text-zinc-200">app.ts</span>
                    <span className="text-[11px] text-zinc-500">agent.ts</span>
                    <span className="text-[11px] text-zinc-500">deploy.ts</span>
                  </div>
                </div>
                <div className="px-4 py-4 font-mono text-[11.5px] leading-[1.85]">
                  {code.map((line, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="w-4 shrink-0 select-none text-right text-zinc-700">{i + 1}</span>
                      <span className="whitespace-pre">
                        {line.length === 0 ? " " : line.map((tok, j) => <span key={j} className={tok.c}>{tok.t}</span>)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mx-4 mb-4 rounded-xl border border-white/[0.05] bg-white/[0.04] px-4 py-3">
                  <p className="mb-0.5 text-sm font-semibold text-white">Design to production, pixel-perfect.</p>
                  <p className="text-xs leading-relaxed text-zinc-500">Responsive, accessible, and 95+ on Lighthouse.</p>
                </div>
              </div>
              </Tilt>
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-zinc-900/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Open for projects
              </div>
            </div>
          </div>
        </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {services.map(({ tag, title, desc, icon: Icon }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.08} className="h-full">
            <div
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-2xl sm:rounded-[28px]"
            >
              <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-zinc-800">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-white drop-shadow-2xl transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 sm:h-20 sm:w-20">
                  <Icon size={32} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 px-3 py-3 sm:gap-3 sm:px-6 sm:py-5">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 sm:text-xs">{tag}</span>
                  <h3 className="mt-0.5 text-sm font-semibold leading-snug text-white sm:text-lg">{title}</h3>
                </div>
                <p className="hidden text-sm leading-relaxed text-zinc-400 sm:block">{desc}</p>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
