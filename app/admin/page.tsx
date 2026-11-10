"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Image as ImageIcon, Layers, Lock, LogOut, Map, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import ProjectManager from "../../components/admin/ProjectManager";
import JourneyManager from "../../components/admin/JourneyManager";
import GalleryManager from "../../components/admin/GalleryManager";

const menuItems = [
  { id: "projects", label: "Projects", icon: Layers },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "journey", label: "Journey", icon: Map },
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (secret === "sugih-admin") {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f4] p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm"
        >
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-[0_18px_60px_rgba(24,24,27,0.06)] sm:p-10">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                <Lock size={22} />
              </div>
              <h1 className="font-sf-pro text-2xl font-semibold tracking-tight text-zinc-900">Admin</h1>
              <p className="mt-1 text-sm text-zinc-500">Moch Sugih Nugraha · Portfolio</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                placeholder="Passkey"
                autoFocus
                className={`w-full rounded-full border bg-zinc-50 px-5 py-3.5 text-center text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:bg-white ${
                  error ? "border-red-300 focus:border-red-400" : "border-zinc-200 focus:border-zinc-900"
                }`}
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
              />
              {error && <p className="text-center text-xs text-red-500">Passkey salah.</p>}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 py-3.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98]"
              >
                <ShieldCheck size={16} /> Masuk
              </button>
            </form>
          </div>
          <Link href="/" className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900">
            <ArrowLeft size={14} /> Kembali ke situs
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f4] text-zinc-900">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-[#f5f5f4]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 font-sf-pro text-sm font-semibold text-white">S</div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold leading-none">Admin</p>
              <p className="mt-0.5 text-xs text-zinc-500">Portfolio content</p>
            </div>
          </div>

          <nav className="flex gap-1 rounded-full border border-zinc-200 bg-white p-1">
            {menuItems.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)} className="relative rounded-full px-3 py-1.5 text-sm font-medium sm:px-4">
                {activeTab === id && (
                  <motion.span layoutId="admin-tab" className="absolute inset-0 rounded-full bg-zinc-900" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className={`relative flex items-center gap-1.5 ${activeTab === id ? "text-white" : "text-zinc-500 hover:text-zinc-900"}`}>
                  <Icon size={15} />
                  <span className="hidden sm:inline">{label}</span>
                </span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="hidden rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 md:block">
              Lihat situs
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              aria-label="Logout"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-32 pt-10 sm:px-6 lg:px-8">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {activeTab === "projects" && <ProjectManager />}
          {activeTab === "journey" && <JourneyManager />}
          {activeTab === "gallery" && <GalleryManager />}
        </motion.div>
      </main>
    </div>
  );
}
