"use client"; // <--- TAMBAHKAN INI DI BARIS PALING ATAS

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import dynamic from "next/dynamic";
import ClaimReward from "@/components/ClaimReward";

// Sekarang ini sudah diizinkan karena filenya sudah jadi Client Component
const LegacyGame = dynamic(() => import("@/components/LegacyGame"), { 
  ssr: false 
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />
      
      <Hero />
      <Journey />
      <Projects />
      
      {/* Echo Chamber Premium Bubble */}
      <LegacyGame /> 
      <ClaimReward />
    </main>
  );
}