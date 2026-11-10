"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export const inputCls =
  "w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="ml-1 text-xs font-medium text-zinc-600">{label}</span>
      {children}
      {hint && <span className="ml-1 block text-[11px] text-zinc-400">{hint}</span>}
    </label>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-end">
      <div>
        <h2 className="font-sf-pro text-4xl font-medium tracking-tight text-zinc-900">{title}</h2>
        <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

export function PrimaryButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50 ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}

export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-zinc-900/30 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-2xl sm:p-8 ${wide ? "max-w-2xl" : "max-w-lg"}`}
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-sf-pro text-2xl font-medium tracking-tight text-zinc-900">{title}</h3>
              <button onClick={onClose} aria-label="Close" className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900">
                <X size={16} />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function UploadBox({ label, onFile, fileName, hasCurrent }: { label: string; onFile: (f: File | null) => void; fileName?: string; hasCurrent?: boolean }) {
  return (
    <div className="group relative cursor-pointer rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center transition-colors hover:border-zinc-900 hover:bg-white">
      <input type="file" accept="image/*" className="absolute inset-0 z-10 cursor-pointer opacity-0" onChange={(e) => onFile(e.target.files?.[0] || null)} />
      <p className="text-sm font-medium text-zinc-700">{fileName ? fileName : hasCurrent ? "Gambar sekarang dipakai — klik untuk ganti" : label}</p>
      <p className="mt-1 text-xs text-zinc-400">PNG / JPG, landscape 16:10 disarankan</p>
    </div>
  );
}
