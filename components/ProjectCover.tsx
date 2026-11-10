"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { curatedProjects, mergeProjects, type DbProject, type ProjectEntry } from "@/lib/projects";

/** Curated projects render instantly; Supabase rows merge in once loaded. */
export function useProjects() {
  const [projects, setProjects] = useState<ProjectEntry[]>(curatedProjects);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data, error }) => {
        if (!alive) return;
        if (error) console.error(error);
        else setProjects(mergeProjects(data as DbProject[]));
        setReady(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { projects, ready };
}

/** Thumbnail, or a clean typographic cover when no public screenshot exists. */
export default function ProjectCover({
  project,
  className = "",
  imgClassName = "",
}: {
  project: Pick<ProjectEntry, "title" | "category" | "thumbnail_url">;
  className?: string;
  imgClassName?: string;
}) {
  const [broken, setBroken] = useState(false);
  const [name, sub] = project.title.split(" — ");

  if (project.thumbnail_url && !broken) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.thumbnail_url}
        alt={project.title}
        loading="lazy"
        onError={() => setBroken(true)}
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-end overflow-hidden bg-zinc-900 p-6 text-white sm:p-8 ${className}`}
      aria-label={project.title}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,235,185,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className={`relative ${imgClassName}`}>
        <p className="font-sf-pro text-4xl font-semibold tracking-tight sm:text-5xl">{name}</p>
        {sub && <p className="mt-1 text-sm text-zinc-400">{sub}</p>}
      </div>
    </div>
  );
}
