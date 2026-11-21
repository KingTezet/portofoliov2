"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SplitText } from "@/components/motion";

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
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl bg-zinc-200 md:max-w-none">
            <Image
              src="/profile-sugih.jpg"
              alt="Moch Sugih Nugraha at a coffee shop"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </Reveal>

        <div className="md:col-span-7">
          <Reveal>
            <p className="font-sf-pro max-w-3xl text-2xl font-medium leading-snug tracking-tight text-zinc-900 md:text-3xl">
              I started with small-business websites in 2021. Now I build the systems those businesses run on.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-zinc-600">
              <p>
                A coffee shop&apos;s POS and payroll, a regency&apos;s land records on a map, a construction
                company&apos;s daily progress reports. I work on the screens people use every day, and on the
                database rules behind them.
              </p>
              <p>
                I&apos;m in Sumedang, West Java, finishing a degree in Informatics at Universitas Sebelas April
                (2027), and I take on remote frontend work.
              </p>
            </div>
          </Reveal>

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
