"use client";

import Link from "next/link";
import { Reveal, SplitText } from "@/components/motion";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";

const EMAIL = "mochsugihnugraha@gmail.com";
const WA = "https://wa.me/6285926270826";

const socials = [
  { label: "GitHub", href: "https://github.com/KingTezet", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/moch-sugih-nugraha/", icon: Linkedin },
  { label: "Instagram", href: "https://instagram.com/sugihnugrahaa", icon: Instagram },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <section className="flex min-h-[80vh] flex-col items-center justify-center bg-[#fcfbfa] px-4 text-center">
        <h2 className="font-sf-pro mb-10 pb-2 text-5xl font-semibold leading-none tracking-tighter text-zinc-900 sm:text-6xl md:text-7xl lg:text-8xl">
          <SplitText text="Let's" />{" "}
          <SplitText text="build something" delay={0.08} wordClassName="bg-gradient-to-b from-zinc-900 to-zinc-400 bg-clip-text pr-2 text-transparent" />
          <br />
          <SplitText text="that lasts" delay={0.2} />
        </h2>
        <Reveal delay={0.2}>
        <p className="mb-8 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
          Open for frontend engineering roles, remote collaborations, and freelance web projects — or just a
          coffee chat. Reach out directly.
        </p>
        </Reveal>
        <Reveal delay={0.3} className="flex flex-col items-center">
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center gap-3 rounded-full bg-zinc-900 px-7 py-4 text-base font-medium text-white transition-all duration-300 hover:scale-[1.03] hover:bg-zinc-800 hover:shadow-[0_14px_40px_rgba(24,24,27,0.25)]"
        >
          {EMAIL}
          <ArrowUpRight size={18} />
        </a>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900"
        >
          <MessageCircle size={16} />
          Chat on WhatsApp
        </a>
        </Reveal>
      </section>

      <footer className="bg-zinc-900 text-white">
        <div className="mx-auto max-w-7xl px-8 pb-10 pt-16 sm:px-12 lg:px-16">
          <div className="mb-16 grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="flex flex-col items-start lg:col-span-5">
              <h3 className="mb-4 text-4xl font-medium">Moch Sugih Nugraha</h3>
              <p className="mb-8 max-w-sm text-sm text-zinc-400">
                Frontend Engineer building fast, accessible web interfaces with React, Next.js and TypeScript.
              </p>
              <div className="mb-8 w-full space-y-4 text-sm text-zinc-300">
                <div className="flex items-center gap-4">
                  <MapPin size={18} />
                  <span>Sumedang, Indonesia • Open to remote</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={18} />
                  <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-white">
                    {EMAIL}
                  </a>
                </div>
              </div>
              <div className="mb-8">
                <p className="mb-4 text-sm font-medium text-zinc-400">Follow me</p>
                <div className="flex gap-5">
                  {socials.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-zinc-400 transition-colors hover:text-white"
                    >
                      <Icon size={22} />
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-100"
                >
                  Let&apos;s Work Together <ArrowUpRight size={16} />
                </a>
                <a
                  href="/CV_Moch_Sugih_Nugraha_Frontend_Engineer.pdf"
                  target="_blank"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-white/40 hover:bg-white/5"
                >
                  Download CV
                </a>
              </div>
            </div>

            <div className="hidden lg:col-span-1 lg:block" />

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:col-span-6">
              <div>
                <h4 className="mb-8 text-lg font-medium">Services</h4>
                <ul className="space-y-4 text-sm text-zinc-400">
                  <li>Frontend Development</li>
                  <li>Web Apps &amp; Dashboards</li>
                  <li>UI/UX Engineering</li>
                  <li>Performance Optimization</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-8 text-lg font-medium">Quick Links</h4>
                <ul className="space-y-4 text-sm text-zinc-400">
                  <li><Link href="/#portfolio" className="transition-colors hover:text-white">Portfolio</Link></li>
                  <li><Link href="/#experience" className="transition-colors hover:text-white">Experience</Link></li>
                  <li><Link href="/projects" className="transition-colors hover:text-white">Projects</Link></li>
                  <li><Link href="/about" className="transition-colors hover:text-white">About</Link></li>
                  <li><a href={WA} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 text-xs text-zinc-500 md:flex-row">
            <p>© {year} Moch Sugih Nugraha. All rights reserved.</p>
            <p>Built with Next.js</p>
          </div>
        </div>
      </footer>
    </>
  );
}
