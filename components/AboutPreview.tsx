import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const skills = [
  "Frontend Architecture",
  "Backend & Cloud",
  "AI & Automation",
  "UI/UX Engineering",
  "Full-Stack Development",
  "Data Analytics",
];

export default function AboutPreview() {
  return (
    <section id="about" className="mb-32 scroll-mt-24">
      <div className="mb-10">
        <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-zinc-500">(03) About Me</span>
        <h2 className="font-sf-pro text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl">About me.</h2>
      </div>

      <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-3xl bg-zinc-200 md:aspect-[21/9]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/profile-sugih.jpg"
          alt="Moch. Sugih Nugraha"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
      </div>

      <p className="font-sf-pro max-w-3xl text-2xl font-medium leading-snug tracking-tight text-zinc-500 md:text-3xl">
        Sugih is an Indonesia-based Product Engineer working across full-stack web, AI automation, and product
        thinking. He cares about the whole loop — from understanding the problem to shipping reliable software
        people actually use.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s}
            className="rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-sm font-medium text-zinc-700"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-6">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
        >
          Full profile <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
