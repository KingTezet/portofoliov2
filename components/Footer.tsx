"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Reveal, SplitText } from "@/components/motion";
import { ArrowUpRight } from "lucide-react";

const EMAIL = "mochsugihnugraha@gmail.com";
const WA = "https://wa.me/6285926270826";

const CV = "/CV_Moch_Sugih_Nugraha_Frontend_Engineer.pdf";

const siteLinks = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "All projects", href: "/projects" },
  { label: "About", href: "/about" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/KingTezet" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/moch-sugih-nugraha/",
  },
  { label: "Instagram", href: "https://instagram.com/sugihnugrahaa" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-[#fcfbfa]">
      <section
        id="contact"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-24 pt-8 sm:px-6 lg:px-8"
      >
        <div className="border-t border-zinc-900 pt-10">
          <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-zinc-500">
            (06) Contact
          </span>
          <h2 className="font-sf-pro max-w-3xl text-4xl font-medium tracking-tight text-zinc-900 md:text-6xl">
            <SplitText text="Tell me what you're building." />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-600">
              Open to remote frontend roles and contract work. Email is the best
              way to reach me; WhatsApp works too.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a
              href={`mailto:${EMAIL}`}
              className="group mt-8 inline-flex items-center gap-2 break-all text-2xl font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-8 transition-colors hover:decoration-zinc-900 sm:text-4xl"
            >
              {EMAIL}
              <ArrowUpRight className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            <p className="mt-6 text-sm text-zinc-600">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900"
              >
                WhatsApp
              </a>
              <span className="mx-2 text-zinc-300">/</span>
              <a
                href={CV}
                target="_blank"
                download
                className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900"
              >
                Download CV
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-t border-zinc-200 py-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>© {year} Moch Sugih Nugraha · Sumedang, Indonesia</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {siteLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="transition-colors hover:text-zinc-900"
              >
                {l.label}
              </Link>
            ))}
            {socials.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-zinc-900"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
