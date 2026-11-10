"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type JourneyItem = {
  id: number;
  date_event: string;
  title: string;
  description: string;
  category: string;
};

const INITIAL_COUNT = 6;

export default function Journey() {
  const [journeys, setJourneys] = useState<JourneyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    async function fetchJourneys() {
      const { data, error } = await supabase
        .from("journeys")
        .select("*")
        .order("date_event", { ascending: false });

      if (error) console.error("Error fetching data:", error);
      else setJourneys(data || []);
      setLoading(false);
    }
    fetchJourneys();
  }, []);

  const displayed = journeys.slice(0, visibleCount);
  const hasMore = visibleCount < journeys.length;
  const canCollapse = !hasMore && visibleCount > INITIAL_COUNT;

  return (
    <section id="experience" className="mb-32 scroll-mt-24">
      <div className="mb-12">
        <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-zinc-500">(02) Work History</span>
        <h2 className="font-sf-pro text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl">Experience.</h2>
      </div>

      {loading ? (
        <p className="animate-pulse text-sm text-zinc-400">Loading history...</p>
      ) : (
        <div className="relative">
          <div className="absolute bottom-0 left-[7px] top-2 w-px bg-zinc-200" />
          <div className="space-y-0">
            {displayed.map((item, i) => (
              <div key={item.id} className="relative pb-12 pl-8 last:pb-0">
                <div
                  className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 ${
                    i === 0 ? "border-zinc-900 bg-zinc-900" : "border-zinc-300 bg-[#fcfbfa]"
                  }`}
                />
                <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900">{item.title}</h3>
                    {item.category && <p className="text-sm text-zinc-500">{item.category}</p>}
                  </div>
                  <span className="shrink-0 text-sm text-zinc-400 sm:pt-0.5">{item.date_event}</span>
                </div>
                {item.description && (
                  <ul className="mt-4 space-y-2">
                    {item.description
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean)
                      .map((line, idx) => (
                        <li key={idx} className="flex gap-3 text-sm leading-relaxed text-zinc-600">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300" />
                          {line.replace(/^[-•]\s*/, "")}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {(hasMore || canCollapse) && (
        <div className="mt-12">
          <button
            onClick={() => setVisibleCount(hasMore ? visibleCount + INITIAL_COUNT : INITIAL_COUNT)}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
          >
            {hasMore ? "Show more" : "Show less"}
          </button>
        </div>
      )}
    </section>
  );
}
