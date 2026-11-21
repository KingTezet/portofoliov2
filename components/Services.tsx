"use client";

import { Reveal, SplitText } from "@/components/motion";

const focus = [
  {
    n: "01",
    title: "Web Apps & Dashboards",
    desc: "Customer-facing applications and internal tools built with React and Next.js — from ordering experiences to operational dashboards.",
  },
  {
    n: "02",
    title: "Interface Engineering",
    desc: "Responsive, detail-oriented interfaces translated from product requirements and design into maintainable frontend code.",
  },
  {
    n: "03",
    title: "API & Data Integration",
    desc: "Frontend features connected to REST APIs, Supabase, and PostgreSQL, with clear loading, error, and empty states.",
  },
  {
    n: "04",
    title: "Map-based Data Tools",
    desc: "Browser-based spatial data experiences with map layers, SHP uploads, record search, and filtering.",
  },
];

export default function Services() {
  return (
    <section id="focus" className="mb-32 scroll-mt-24">
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-zinc-500">(04) Areas of Focus</span>
          <h2 className="font-sf-pro text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl">
            <SplitText text="What I build." />
          </h2>
        </div>
        <p className="max-w-xl text-base leading-7 text-zinc-600 md:col-span-7 md:self-end">
          Most of my work sits between the interface and the data: screens people use every day at work, wired to a
          real database, with the loading, error and empty states handled.
        </p>
      </div>

      <ol className="border-b border-zinc-200">
        {focus.map(({ n, title, desc }) => (
          <Reveal as="li" key={title} y={16} className="border-t border-zinc-200 first:border-zinc-900">
            <div className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6">
              <span className="font-mono text-xs text-zinc-500 sm:col-span-1">{n}</span>
              <h3 className="text-lg font-medium text-zinc-900 sm:col-span-4">{title}</h3>
              <p className="text-base leading-7 text-zinc-600 sm:col-span-7">{desc}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
