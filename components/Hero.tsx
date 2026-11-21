import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { curatedProjects } from "@/lib/projects";

const CV = "/CV_Moch_Sugih_Nugraha_Frontend_Engineer.pdf";

const links = [
  { label: "GitHub", href: "https://github.com/KingTezet" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/moch-sugih-nugraha/" },
  { label: "Instagram", href: "https://instagram.com/sugihnugrahaa" },
];

const stats = [
  { value: "5+", label: "Years building for the web" },
  { value: "3.90/4.00", label: "GPA, Informatics (expected 2027)" },
  { value: String(curatedProjects.length), label: "Projects shipped, from GovTech to F&B" },
  { value: String(curatedProjects.filter((p) => p.demo_url).length), label: "Live products you can open and try" },
];

const LINK = "font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900";

// Static on purpose: the hero is the LCP, so it renders without entrance animations.
export default function Hero() {
  return (
    <div id="home" className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7 md:pt-6">
          <h1 className="text-sm font-medium text-zinc-900">
            Moch Sugih Nugraha <span className="text-zinc-500">— Frontend Engineer, Sumedang</span>
          </h1>
          <p className="font-sf-pro mt-6 text-5xl font-medium leading-[1.02] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
            I build web interfaces for real-world work.
          </p>
          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
            Ordering apps, operations dashboards and map-based data tools for small businesses and local government,
            built with React, Next.js, TypeScript and Supabase.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-700"
            >
              See selected work
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href={CV} target="_blank" download className={LINK}>
              Download CV
            </a>
          </div>

          <p className="mt-10 text-sm text-zinc-500">
            {links.map((l, i) => (
              <span key={l.label}>
                {i > 0 && <span className="mx-2 text-zinc-300">/</span>}
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-zinc-900">
                  {l.label}
                </a>
              </span>
            ))}
          </p>
        </div>

        <div className="md:col-span-5">
          <Image
            src="/sugih-portrait.webp"
            alt="Portrait of Moch Sugih Nugraha"
            width={967}
            height={1209}
            priority
            sizes="(min-width: 1280px) 480px, (min-width: 768px) 40vw, 100vw"
            className="aspect-[4/5] w-full rounded-2xl bg-zinc-200 object-cover"
          />
        </div>
      </div>

      <dl className="mb-10 mt-16 grid grid-cols-2 border-t border-zinc-900 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col border-zinc-200 py-6 pr-4 ${i % 2 ? "border-l pl-4 sm:pl-6" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}
          >
            <dt className="order-2 mt-2 max-w-[22ch] text-xs leading-5 text-zinc-500 sm:text-sm">{s.label}</dt>
            <dd className="font-sf-pro text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">{s.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mb-24 max-w-2xl text-sm leading-6 text-zinc-600">
        Based in Sumedang, Indonesia, working remotely. Open to frontend roles and a few freelance projects. Reach me on{" "}
        <a href="https://wa.me/6285926270826" className={LINK}>
          WhatsApp
        </a>{" "}
        or{" "}
        <a href="mailto:mochsugihnugraha@gmail.com" className={LINK}>
          email
        </a>
        .
      </p>
    </div>
  );
}
