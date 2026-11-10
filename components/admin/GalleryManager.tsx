"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MapPin, Plus, Save, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Field, inputCls, Modal, PageHeader, PrimaryButton, UploadBox } from "./ui";

type GalleryItem = {
  id: number;
  image_url: string;
  caption: string;
  category: string;
  location: string;
};

const CATEGORIES = ["Work", "Mentoring", "Event", "Award", "Network", "Life"];
const MIN_TO_SHOW = 3;

export default function GalleryManager() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Partial<GalleryItem>>({ category: "Work" });
  const [file, setFile] = useState<File | null>(null);

  const fetchGallery = async () => {
    const { data } = await supabase.from("gallery").select("*").order("id", { ascending: false });
    if (data) setGallery(data);
    setLoading(false);
  };

  useEffect(() => {
    const t = setTimeout(fetchGallery, 0);
    return () => clearTimeout(t);
  }, []);

  const openNew = () => {
    setForm({ caption: "", category: "Work", location: "" });
    setFile(null);
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Pilih foto dulu.");
    setSaving(true);

    const fileName = `gallery/${Date.now()}.${file.name.split(".").pop()}`;
    const { error: upErr } = await supabase.storage.from("portfolio-assets").upload(fileName, file);
    if (upErr) {
      setSaving(false);
      return alert("Upload gagal: " + upErr.message);
    }
    const image_url = supabase.storage.from("portfolio-assets").getPublicUrl(fileName).data.publicUrl;

    const { error } = await supabase.from("gallery").insert([{ caption: form.caption, category: form.category, location: form.location, image_url }]);
    setSaving(false);
    if (error) return alert("Gagal menyimpan: " + error.message);
    setIsEditing(false);
    fetchGallery();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus foto ini permanen?")) return;
    await supabase.from("gallery").delete().eq("id", id);
    fetchGallery();
  };

  return (
    <div>
      <PageHeader
        title="Gallery"
        subtitle={`${gallery.length} foto · tampil di halaman About ("Beyond the Work") jika minimal ${MIN_TO_SHOW} foto`}
        action={
          <PrimaryButton onClick={openNew}>
            <Plus size={16} /> Add Photo
          </PrimaryButton>
        }
      />

      {!loading && gallery.length < MIN_TO_SHOW && (
        <p className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Section gallery sedang disembunyikan di situs (baru {gallery.length} foto). Pilih foto yang menunjukkan kerja tim,
          mentoring, presentasi, atau pencapaian — beri caption yang jelas.
        </p>
      )}

      {loading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-zinc-200/70" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          <button
            onClick={openNew}
            className="flex aspect-[4/5] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white text-zinc-400 transition-colors hover:border-zinc-900 hover:text-zinc-900"
          >
            <Plus size={28} className="mb-2" />
            <span className="text-xs font-medium">Upload</span>
          </button>

          <AnimatePresence>
            {gallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.04 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image_url} alt={item.caption} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/10 to-transparent p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">{item.category}</p>
                  <p className="line-clamp-2 text-xs font-semibold leading-tight text-white">{item.caption}</p>
                  {item.location && (
                    <p className="mt-1 flex items-center gap-1 text-[10px] text-white/60">
                      <MapPin size={10} /> {item.location}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  aria-label="Delete"
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-600 opacity-0 transition-all hover:bg-red-500 hover:text-white group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Modal open={isEditing} onClose={() => setIsEditing(false)} title="Upload Photo">
        <form onSubmit={handleSubmit} className="space-y-5">
          <UploadBox label="Klik untuk pilih foto" onFile={setFile} fileName={file?.name} />
          <Field label="Caption" hint='Contoh: "Mentoring a UI/UX engineering session at Tahungoding."'>
            <input className={inputCls} value={form.caption || ""} onChange={(e) => setForm({ ...form, caption: e.target.value })} required />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Kategori">
              <select className={`${inputCls} cursor-pointer`} value={form.category || "Work"} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Lokasi">
              <input className={inputCls} placeholder="Sumedang" value={form.location || ""} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </Field>
          </div>
          <PrimaryButton type="submit" disabled={saving} className="w-full py-3.5">
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            {saving ? "Mengunggah…" : "Simpan ke Gallery"}
          </PrimaryButton>
        </form>
      </Modal>
    </div>
  );
}
