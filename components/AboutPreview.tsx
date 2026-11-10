"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Parallax, Reveal, SplitText } from "@/components/motion";

const skills = [
  "React",
  "Next.js (App Router)",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "REST APIs",
  "UI/UX Engineering",
  "Vercel",
];

export default function AboutPreview() {
  return (
    <section id="about" className="mb-32 scroll-mt-24">
      <div className="mb-10">
        <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-zinc-500">(03) About Me</span>
        <h2 className="font-sf-pro text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl">
          <SplitText text="About me." />
        </h2>
      </div>

      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-5">
          <div className="group relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl bg-zinc-200 md:max-w-none">
            {/* Parallax: image is taller than frame and drifts on scroll */}
            <Parallax offset={40} className="absolute -inset-y-[8%] inset-x-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile-sugih.jpg"
                alt="Moch Sugih Nugraha"
                loading="lazy"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </Parallax>
          </div>
        </Reveal>

        <div className="md:col-span-7">
          <Reveal>
            <p className="font-sf-pro max-w-3xl text-2xl font-medium leading-snug tracking-tight text-zinc-500 md:text-3xl">
              <span className="text-zinc-900">Frontend engineer</span> who builds web interfaces with React, Next.js,
              and TypeScript — shipped a Next.js portal scoring 95+ on Lighthouse and a self-service ordering flow
              that handled 500+ transactions in its first month. Used to remote, async work.
            </p>
          </Reveal>

          <div className="mt-8 flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <Reveal key={s} delay={i * 0.04} y={12}>
                <span className="inline-block cursor-default rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-sm font-medium text-zinc-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white">
                  {s}
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-6">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
              >
                Full profile
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
