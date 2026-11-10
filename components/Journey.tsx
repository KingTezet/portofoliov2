"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Reveal, SplitText } from "@/components/motion";

type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  points?: string[];
};

// Source: public/CV_Moch_Sugih_Nugraha_Frontend_Engineer.pdf
const experience: ExperienceItem[] = [
  {
    role: "Product Engineer & Growth Lead",
    org: "Chogo Coffee · Contract, Remote",
    period: "May 2026 — Present",
    points: [
      "Built the Next.js App Router interface and Supabase data layer for an F&B operations platform covering POS, online ordering, attendance, payroll, and loyalty.",
      "Launched a self-service ordering flow that processed 500+ transactions in its first month.",
      "Automated daily financial reconciliation with Supabase database triggers, reducing end-of-day closing from about 4 hours to under 30 minutes.",
      "Replaced a multi-day manual payroll process with a one-click dashboard report.",
    ],
  },
  {
    role: "Full-Stack & Automation Engineer",
    org: "PT Ngulik Teknologi Digital",
    period: "Mar 2026 — Present",
    points: [
      "Connected Instagram publishing and a WhatsApp customer-service bot to n8n workflows. The bot handles about 70% of Tier-1 inquiries and reduced typical response time from about 2 hours to under 3 seconds.",
    ],
  },
  {
    role: "Head & Mentor, UI/UX Division",
    org: "Tahungoding",
    period: "2024 — 2025",
    points: [
      "Shipped the organization's portal using Next.js and Supabase, achieving a 95+ Lighthouse performance score.",
      "Consolidated three internal tools into one portal serving 100+ active SME members.",
      "Documented technical decisions through asynchronous ADRs and coordinated a 15-person team in Linear, reducing sprint cycle time from 14 to 10 days.",
      "Created and taught a UI/UX engineering curriculum for 40+ university students; received 1st Place (Best Mentor) among 11 instructors.",
    ],
  },
  {
    role: "Independent Web Developer",
    org: "Freelance · Remote",
    period: "2021 — 2024",
    points: [
      "Delivered landing pages and small-business websites for clients across West Java, handling requirements, implementation, and deployment from start to finish.",
    ],
  },
  {
    role: "Web Developer Intern",
    org: "BBPPMPV Cimahi",
    period: "Apr 2022 — Jun 2022",
    points: [
      "Developed a Laravel-based booking application to replace a paper-based guesthouse reservation process, handling 50+ reservations per week with 80% less processing time and no reported double-booking errors.",
    ],
  },
  {
    role: "Universitas Sebelas April (UNSAP)",
    org: "B.S. in Informatics · Expected 2027 · GPA 3.90/4.00",
    period: "2023 — 2027 (expected)",
  },
  {
    role: "SMKN 1 Sumedang",
    org: "Software Engineering (RPL)",
    period: "2020 — 2023",
  },
];

export default function Journey() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 100, damping: 25, mass: 0.3 });

  return (
    <section id="experience" className="mb-32 scroll-mt-24">
      <div className="mb-12">
        <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-zinc-500">(03) Work History</span>
        <h2 className="font-sf-pro text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl"><SplitText text="Experience." /></h2>
      </div>

      <div ref={listRef} className="relative">
        <div className="absolute bottom-0 left-[7px] top-2 w-px bg-zinc-200" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-zinc-900"
        />
        <div className="space-y-0">
          {experience.map((item, i) => (
            <Reveal key={item.role + item.period} x={24} y={0} className="group relative pb-12 pl-8 last:pb-0">
              <div
                className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                  i === 0 ? "border-zinc-900 bg-zinc-900" : "border-zinc-300 bg-[#fcfbfa]"
                }`}
              />
              <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">{item.role}</h3>
                  <p className="text-sm text-zinc-500">{item.org}</p>
                </div>
                <span className="shrink-0 text-sm text-zinc-400 sm:pt-0.5">{item.period}</span>
              </div>
              {item.points && (
                <ul className="mt-4 space-y-2">
                  {item.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-zinc-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
