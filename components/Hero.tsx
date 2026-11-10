"use client";

import { ArrowUpRight, Github, Instagram, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/KingTezet", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/moch-sugih-nugraha/", icon: Linkedin },
  { label: "Instagram", href: "https://instagram.com/sugihnugrahaa", icon: Instagram },
  { label: "Email", href: "mailto:mochsugihnugraha@gmail.com", icon: Mail },
];

const stack = ["Next.js", "React", "TypeScript", "Supabase", "Node.js", "AI Automation"];

export default function Hero() {
  return (
    <>
      {/* ===== FULLSCREEN HERO ===== */}
      <div id="home" className="relative h-[100svh] w-full overflow-hidden bg-[#fcfbfa]">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-[70vh] w-full -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(255,235,185,0.5)_0%,transparent_70%)]" />

        <div className="animate-hero-fade-in pointer-events-none absolute inset-0 z-10 flex justify-center [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/profile-sugih.jpg"
            alt="Moch. Sugih Nugraha"
            className="h-full w-full object-cover object-top md:w-auto md:max-w-[760px] md:[mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_82%,transparent_100%)]"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-20 flex w-full flex-col items-center justify-end pb-10 mix-blend-difference md:pb-20">
          <div className="animate-hero-copy-in flex flex-col items-start">
            <h3 className="mb-0 ml-1 font-[family-name:var(--font-shantell)] text-3xl font-light text-white md:mb-2 md:text-5xl">
              hi, i&apos;m
            </h3>
            <h1 className="font-sf-pro hidden whitespace-nowrap text-[clamp(5rem,11vw,13rem)] font-semibold leading-[0.85] tracking-tighter text-white md:block">
              Sugih Nugraha
            </h1>
            <h1 className="flex w-full flex-col items-center font-[family-name:var(--font-bebas)] text-[28vw] uppercase leading-[0.8] tracking-normal text-white sm:text-[22vw] md:hidden">
              <span>Sugih</span>
              <span className="text-white/80">Nugraha</span>
            </h1>
          </div>
        </div>
      </div>

      {/* ===== INTRO ===== */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-0 mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-14">
          {stack.map((s) => (
            <span
              key={s}
              className="font-sf-pro shrink-0 text-sm font-semibold uppercase tracking-wider text-zinc-400 sm:text-base"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mb-0 mt-10 flex items-center justify-center gap-6 sm:justify-start">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-zinc-400 transition-colors hover:text-zinc-900"
            >
              <Icon size={22} />
            </a>
          ))}
        </div>

        <div className="mb-12 mt-10">
          <div className="max-w-5xl">
            <h2 className="font-sf-pro mb-6 text-5xl font-medium leading-none tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-zinc-900">I turn complex </span>
              <span className="bg-gradient-to-b from-zinc-900 to-zinc-400 bg-clip-text text-transparent">ideas</span>
              <br />
              <span className="text-zinc-900">into </span>
              <span className="bg-gradient-to-b from-zinc-900 to-zinc-400 bg-clip-text text-transparent">products</span>
              <span className="text-zinc-900"> that ship.</span>
            </h2>
            <p className="max-w-3xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
              Moch. Sugih Nugraha is a Product Engineer based in Indonesia — Full-Stack (Next.js) and AI
              Automation Specialist building highly autonomous and reliable digital products, from idea and
              interface to backend, data, and automation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#portfolio"
                className="flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-800"
              >
                View Work <ArrowUpRight size={18} />
              </a>
              <a
                href="/CV_Moch_Sugih_Nugraha_Frontend_Engineer.pdf"
                target="_blank"
                download
                className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>

        <div className="mb-20 flex flex-wrap items-center justify-between gap-4 rounded-full border border-zinc-200 bg-white px-6 py-4 text-sm font-medium text-zinc-700 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span>Available for opportunities</span>
          </div>
          <div className="hidden items-center gap-2 text-zinc-400 md:flex">
            <MapPin size={16} />
            <span>Sugih • Product Engineer</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://wa.me/6285926270826" className="flex items-center gap-2 transition-colors hover:text-zinc-900">
              <MessageCircle size={16} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a href="mailto:mochsugihnugraha@gmail.com" className="flex items-center gap-2 transition-colors hover:text-zinc-900">
              <Mail size={16} />
              <span className="hidden sm:inline">Email</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
