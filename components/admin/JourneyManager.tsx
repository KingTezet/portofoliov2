"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit3, Plus, Save, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Field, inputCls, Modal, PageHeader, PrimaryButton } from "./ui";

type Journey = {
  id: number;
  title: string;
  date_event: string;
  description: string;
  category: string;
};

const CATEGORIES = ["Product Engineering", "AI & Automation", "Leadership", "Education"];

export default function JourneyManager() {
  const [dataList, setDataList] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Partial<Journey>>({ category: "Education" });

  const fetchData = async () => {
    const { data } = await supabase.from("journeys").select("*").order("date_event", { ascending: false });
    if (data) setDataList(data);
    setLoading(false);
  };

  useEffect(() => {
    const t = setTimeout(fetchData, 0);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title: form.title, date_event: form.date_event, description: form.description, category: form.category };
    const { error } = form.id
      ? await supabase.from("journeys").update(payload).eq("id", form.id)
      : await supabase.from("journeys").insert([payload]);
    if (error) return alert("Gagal menyimpan: " + error.message);
    setIsEditing(false);
    fetchData();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus milestone ini?")) return;
    await supabase.from("journeys").delete().eq("id", id);
    fetchData();
  };

  return (
    <div>
      <PageHeader
        title="Journey"
        subtitle="Data lama dari database"
        action={
          <PrimaryButton onClick={() => { setForm({ category: "Education" }); setIsEditing(true); }}>
            <Plus size={16} /> Add Milestone
          </PrimaryButton>
        }
      />

      <p className="mb-6 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600">
        Section Experience di homepage sekarang mengikuti CV dan diatur di <code className="font-mono text-zinc-900">components/Journey.tsx</code>.
        Data di bawah tidak ditampilkan di situs.
      </p>

      <div className="grid gap-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-24 animate-pulse rounded-3xl bg-zinc-200/70" />)
          : dataList.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="group flex flex-col items-start justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-5 md:flex-row md:items-center"
              >
                <div className="flex w-full items-start gap-5">
                  <div className="font-sf-pro w-16 pt-0.5 text-2xl font-semibold tracking-tight text-zinc-300">
                    {item.date_event ? new Date(item.date_event).getFullYear() : "—"}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-zinc-900">{item.title}</h3>
                    <div className="mb-2 mt-1 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">{item.category}</span>
                      <span className="font-mono text-[11px] text-zinc-400">{item.date_event}</span>
                    </div>
                    <p className="max-w-3xl text-sm leading-relaxed text-zinc-600">{item.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setForm(item); setIsEditing(true); }} aria-label="Edit" className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:bg-zinc-900 hover:text-white">
                    <Edit3 size={15} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} aria-label="Delete" className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500">
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            ))}
      </div>

      <Modal open={isEditing} onClose={() => setIsEditing(false)} title={form.id ? "Edit Milestone" : "New Milestone"}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tanggal">
              <input type="date" className={inputCls} value={form.date_event || ""} onChange={(e) => setForm({ ...form, date_event: e.target.value })} required />
            </Field>
            <Field label="Kategori">
              <select className={`${inputCls} cursor-pointer`} value={form.category || "Education"} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Judul / Posisi">
            <input className={inputCls} value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </Field>
          <Field label="Deskripsi">
            <textarea rows={4} className={`${inputCls} resize-none`} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <PrimaryButton type="submit" className="w-full py-3.5">
            <Save size={16} /> Simpan
          </PrimaryButton>
        </form>
      </Modal>
    </div>
  );
}
