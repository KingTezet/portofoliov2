"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Experience", path: "/#experience" },
  { name: "Portfolio", path: "/#portfolio" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
];

const CONTACT_URL = "https://wa.me/6285926270826";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-3 z-[100] px-3 transition-all duration-500 ease-in-out">
      <nav className="mx-auto max-w-[740px] rounded-full border border-zinc-200/70 bg-white/90 px-5 py-2 shadow-[0_2px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-500 ease-in-out">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Go to homepage"
            className="font-sf-pro shrink-0 text-[0.9375rem] font-semibold tracking-tight text-zinc-900"
          >
            Sugih Nugraha
          </Link>

          <div className="hidden items-center gap-0 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="px-3.5 py-1.5 text-sm font-medium text-zinc-500 transition-colors duration-200 hover:text-zinc-900"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden shrink-0 md:flex">
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-zinc-700"
            >
              Let&apos;s Talk <ArrowUpRight size={14} />
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl p-2 text-zinc-700 transition-colors hover:bg-zinc-100 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="flex flex-col gap-1 pb-3 pt-3 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              >
                {link.name}
              </Link>
            ))}
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Let&apos;s Talk <ArrowUpRight size={14} />
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
