"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import { CountUp, Reveal, SplitText } from "@/components/motion";

const CV = "/CV_Moch_Sugih_Nugraha_Frontend_Engineer.pdf";
const GRADIENT = "bg-gradient-to-b from-zinc-900 to-zinc-400 bg-clip-text text-transparent";

const socials = [
  { label: "GitHub", href: "https://github.com/KingTezet", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/moch-sugih-nugraha/", icon: Linkedin },
  { label: "Instagram", href: "https://instagram.com/sugihnugrahaa", icon: Instagram },
  { label: "Email", href: "mailto:mochsugihnugraha@gmail.com", icon: Mail },
];

const stack = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"];

type Stat = { label: string } & ({ to: number; suffix?: string; decimals?: number } | { text: string });

const stats: Stat[] = [
  { to: 5, suffix: "+", label: "Years building for the web" },
  { to: 3.9, suffix: "/4.00", decimals: 2, label: "GPA, Informatics (expected 2027)" },
  { text: "1st & 2nd", label: "University Innovation Challenge, 2024 & 2025" },
  { to: 8, label: "Google Cloud skill badges" },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ===== FULLSCREEN HERO (parallax) ===== */}
      <div ref={heroRef} id="home" className="relative h-[100svh] w-full overflow-hidden bg-[#fcfbfa]">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-[70vh] w-full -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(255,235,185,0.5)_0%,transparent_70%)]" />

        <motion.div
          style={{ y: imgY, scale: imgScale }}
          className="pointer-events-none absolute inset-0 z-10 will-change-transform"
        >
          <div className="animate-hero-fade-in flex h-full w-full justify-center [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile-sugih.jpg"
              alt="Moch Sugih Nugraha"
              fetchPriority="high"
              className="h-full w-full object-cover object-top md:w-auto md:max-w-[760px] md:[mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_82%,transparent_100%)]"
            />
          </div>
        </motion.div>

        <motion.div
          style={{ y: textY, opacity: fade }}
          className="pointer-events-none absolute inset-0 z-20 flex w-full flex-col items-center justify-end pb-10 mix-blend-difference md:pb-20"
        >
          <div className="animate-hero-copy-in flex flex-col items-start">
            <h3 className="mb-0 ml-1 font-[family-name:var(--font-shantell)] text-3xl font-light text-white md:mb-2 md:text-5xl">
              hi, i&apos;m
            </h3>
            <h1 className="font-sf-pro hidden whitespace-nowrap text-[clamp(4rem,8.6vw,10.5rem)] font-semibold leading-[0.85] tracking-tighter text-white md:block">
              Moch Sugih Nugraha
            </h1>
            <h1 className="flex w-full flex-col items-center font-[family-name:var(--font-bebas)] text-[22vw] uppercase leading-[0.82] tracking-normal text-white sm:text-[18vw] md:hidden">
              <span>Moch Sugih</span>
              <span className="text-white/80">Nugraha</span>
            </h1>
            <p className="ml-1 mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 sm:text-xs md:mt-5 md:text-sm">
              Frontend Engineer · React · Next.js · TypeScript
            </p>
          </div>
        </motion.div>

        {/* scroll cue */}
        <motion.div style={{ opacity: fade }} className="pointer-events-none absolute bottom-5 right-6 z-30 hidden md:block">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-9 w-5 justify-center rounded-full border border-zinc-400/70 pt-1.5"
          >
            <span className="h-2 w-0.5 rounded-full bg-zinc-500" />
          </motion.div>
        </motion.div>
      </div>

      {/* ===== INTRO ===== */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-0 mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-14">
          {stack.map((s, i) => (
            <Reveal key={s} delay={i * 0.06} y={12}>
              <span className="font-sf-pro shrink-0 cursor-default text-sm font-semibold uppercase tracking-wider text-zinc-400 transition-colors duration-300 hover:text-zinc-900 sm:text-base">
                {s}
              </span>
            </Reveal>
          ))}
        </div>

        <div className="mb-0 mt-10 flex items-center justify-center gap-6 sm:justify-start">
          {socials.map(({ label, href, icon: Icon }, i) => (
            <Reveal key={label} delay={i * 0.06} y={10}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="block text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:text-zinc-900"
              >
                <Icon size={22} />
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mb-12 mt-10">
          <div className="max-w-5xl">
            <h2 className="font-sf-pro mb-6 text-5xl font-medium leading-none tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
              <SplitText text="I build web interfaces" />
              <br />
              <SplitText text="for" delay={0.24} />{" "}
              <SplitText text="real-world work." wordClassName={GRADIENT} delay={0.3} />
            </h2>
            <Reveal delay={0.2}>
              <p className="max-w-3xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
                I&apos;m Moch Sugih Nugraha, a frontend engineer focused on React, Next.js, and TypeScript. I build
                practical web products — from online ordering experiences and operations dashboards to map-based
                data tools.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  className="group flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-zinc-800 hover:shadow-[0_10px_30px_rgba(24,24,27,0.25)]"
                >
                  Explore Selected Work
                  <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={CV}
                  target="_blank"
                  download
                  className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 font-medium text-zinc-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-50 hover:shadow-sm"
                >
                  Download CV
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="h-full">
              <div className="h-full rounded-3xl border border-zinc-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(24,24,27,0.06)] sm:p-6">
                <p className="font-sf-pro text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
                  {"text" in s ? s.text : <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals} />}
                </p>
                <p className="mt-2 text-xs leading-5 text-zinc-500 sm:text-sm">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mb-20 flex flex-wrap items-center justify-between gap-4 rounded-full border border-zinc-200 bg-white px-6 py-4 text-sm font-medium text-zinc-700 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-600">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span>Open to remote frontend roles &amp; selected projects</span>
            </div>
            <div className="hidden items-center gap-2 text-zinc-400 md:flex">
              <MapPin size={16} />
              <span>Based in Sumedang, Indonesia · Remote-ready</span>
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
        </Reveal>
      </div>
    </>
  );
}
