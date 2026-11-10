"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit3, ExternalLink, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { curatedProjects } from "@/lib/projects";
import ProjectCover from "@/components/ProjectCover";
import { Field, inputCls, Modal, PageHeader, PrimaryButton, UploadBox } from "./ui";

type Project = {
  id?: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  thumbnail_url: string | null;
  tech_stack: string[] | null;
  demo_url?: string | null;
  repo_url?: string | null;
};

const CATEGORIES = [
  "Product Engineering",
  "Frontend Engineering",
  "GovTech · Web Mapping",
  "E-commerce · Local Business",
  "Internal Tools",
  "AI & Automation",
];

const empty: Project = { title: "", slug: "", category: CATEGORIES[1], description: "", thumbnail_url: null, tech_stack: [], demo_url: "", repo_url: "" };
const curatedSlugs = new Set(curatedProjects.map((p) => p.slug));

const generateSlug = (text: string) => text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/-+/g, "-");

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Project>(empty);
  const [techText, setTechText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("id", { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    const t = setTimeout(fetchProjects, 0);
    return () => clearTimeout(t);
  }, []);

  const open = (p: Project) => {
    setForm(p);
    setTechText((p.tech_stack ?? []).join(", "));
    setFile(null);
    setIsEditing(true);
  };

  const upload = async () => {
    if (!file) return form.thumbnail_url;
    const fileName = `projects/${Date.now()}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("portfolio-assets").upload(fileName, file);
    if (error) {
      alert(`Upload gagal: ${error.message}`);
      return undefined;
    }
    return supabase.storage.from("portfolio-assets").getPublicUrl(fileName).data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const imageUrl = await upload();
    if (imageUrl === undefined) return setSaving(false);

    const payload = {
      title: form.title,
      slug: form.slug || generateSlug(form.title),
      category: form.category,
      description: form.description,
      thumbnail_url: imageUrl,
      tech_stack: techText.split(",").map((t) => t.trim()).filter(Boolean),
      demo_url: form.demo_url || null,
      repo_url: form.repo_url || null,
    };

    const { error } = form.id
      ? await supabase.from("projects").update(payload).eq("id", form.id)
      : await supabase.from("projects").insert([payload]);

    setSaving(false);
    if (error) return alert("Gagal menyimpan: " + error.message);
    setIsEditing(false);
    fetchProjects();
  };

  const handleDelete = async (id?: number) => {
    if (!id || !confirm("Hapus project ini permanen?")) return;
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  };

  // Curated projects (from the CV) that have no DB row yet — add one to upload a screenshot.
  const dbSlugs = new Set(projects.map((p) => p.slug));
  const missing = curatedProjects.filter((p) => !dbSlugs.has(p.slug));

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle={`${projects.length} di database · urutan & copy proyek utama diatur di lib/projects.ts`}
        action={
          <PrimaryButton onClick={() => open(empty)}>
            <Plus size={16} /> New Project
          </PrimaryButton>
        }
      />

      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-[1.75rem] bg-zinc-200/70" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="group overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white transition-shadow duration-500 hover:shadow-[0_24px_60px_rgba(24,24,27,0.1)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                <ProjectCover project={item} imgClassName="transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-900">
                  {item.category}
                </span>
                {curatedSlugs.has(item.slug) && (
                  <span
                    title="Judul & deskripsi di situs memakai copy dari lib/projects.ts. Gambar & link diambil dari sini."
                    className="absolute right-3 top-3 rounded-full bg-zinc-900/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
                  >
                    Curated
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="truncate text-lg font-semibold text-zinc-900">{item.title}</h3>
                <p className="mt-0.5 font-mono text-[11px] text-zinc-400">/projects/{item.slug}</p>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">{item.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <button onClick={() => open(item)} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3.5 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-900 hover:bg-zinc-900 hover:text-white">
                    <Edit3 size={13} /> Edit
                  </button>
                  <a href={`/projects/${item.slug}`} target="_blank" className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3.5 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50">
                    <ExternalLink size={13} /> Lihat
                  </a>
                  <button onClick={() => handleDelete(item.id)} aria-label="Delete" className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && missing.length > 0 && (
        <div className="mt-12">
          <h3 className="mb-1 text-sm font-semibold text-zinc-900">Proyek dari CV yang belum punya screenshot</h3>
          <p className="mb-4 text-sm text-zinc-500">
            Tampil di situs dengan cover teks. Tambahkan ke database untuk upload screenshot yang aman dipublikasikan.
          </p>
          <div className="flex flex-wrap gap-2">
            {missing.map((p) => (
              <button
                key={p.slug}
                onClick={() =>
                  open({ ...empty, title: p.title, slug: p.slug, category: p.category, description: p.summary, tech_stack: p.tags, demo_url: p.demo_url ?? "" })
                }
                className="inline-flex items-center gap-2 rounded-full border border-dashed border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900"
              >
                <Plus size={14} /> {p.title.split(" — ")[0]}
              </button>
            ))}
          </div>
        </div>
      )}

      <Modal open={isEditing} onClose={() => setIsEditing(false)} title={form.id ? "Edit Project" : "New Project"} wide>
        <form onSubmit={handleSubmit} className="space-y-5">
          {curatedSlugs.has(form.slug) && (
            <p className="rounded-2xl bg-zinc-100 px-4 py-3 text-xs leading-relaxed text-zinc-600">
              Proyek curated: judul, deskripsi, dan case study di situs diambil dari <code className="font-mono">lib/projects.ts</code>.
              Screenshot, live URL, dan repo URL dari form ini tetap dipakai.
            </p>
          )}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Judul">
              <input className={inputCls} placeholder="Nama Proyek — Jenis Produk" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </Field>
            <Field label="Kategori">
              <select className={`${inputCls} cursor-pointer`} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {[...new Set([...CATEGORIES, form.category])].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Slug" hint="Kosongkan untuk dibuat otomatis dari judul.">
            <input className={`${inputCls} font-mono`} placeholder="nama-proyek" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          </Field>
          <Field label="Deskripsi singkat" hint="1–2 kalimat lengkap: konteks + kontribusi + hasil. Jangan dipotong.">
            <textarea rows={3} className={`${inputCls} resize-none`} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          </Field>
          <Field label="Tech stack" hint="Pisahkan dengan koma.">
            <input className={inputCls} placeholder="Next.js, TypeScript, Supabase" value={techText} onChange={(e) => setTechText(e.target.value)} />
          </Field>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Live URL (opsional)">
              <input type="url" className={inputCls} placeholder="https://" value={form.demo_url ?? ""} onChange={(e) => setForm({ ...form, demo_url: e.target.value })} />
            </Field>
            <Field label="Repo URL (opsional)">
              <input type="url" className={inputCls} placeholder="https://github.com/…" value={form.repo_url ?? ""} onChange={(e) => setForm({ ...form, repo_url: e.target.value })} />
            </Field>
          </div>
          <UploadBox label="Klik untuk upload screenshot" onFile={setFile} fileName={file?.name} hasCurrent={!!form.thumbnail_url} />
          <PrimaryButton type="submit" disabled={saving} className="w-full py-3.5">
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            {saving ? "Menyimpan…" : "Simpan"}
          </PrimaryButton>
        </form>
      </Modal>
    </div>
  );
}
