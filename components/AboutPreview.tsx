"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Parallax, Reveal, SplitText } from "@/components/motion";

const facts = [
  { label: "Based in", value: "Sumedang, Indonesia" },
  { label: "Studying", value: "Informatics, UNSAP · Expected 2027" },
  { label: "Open to", value: "Remote frontend roles" },
];

export default function AboutPreview() {
  return (
    <section id="about" className="mb-32 scroll-mt-24">
      <div className="mb-10">
        <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-zinc-500">(05) About Me</span>
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
              I&apos;m a <span className="text-zinc-900">frontend-focused product engineer</span> based in Sumedang,
              Indonesia. I enjoy turning real business needs into web experiences that are clear, responsive, and
              dependable.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-zinc-600">
              <p>
                My work ranges from customer-facing ordering flows to internal dashboards and map-based applications.
                I focus on the interface, but I also understand the APIs and data layer behind it — which helps me
                build features that work beyond the screen.
              </p>
              <p>
                I&apos;m currently studying Informatics at Universitas Sebelas April (UNSAP), with graduation expected
                in 2027. I&apos;m open to remote frontend opportunities and product-focused collaborations.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.06} y={12} className="h-full">
                <div className="h-full rounded-2xl border border-zinc-200 bg-white px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">{f.label}</p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">{f.value}</p>
                </div>
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
