import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import AboutPreview from "@/components/AboutPreview";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-[100svh] overflow-x-hidden bg-[#fcfbfa] selection:bg-zinc-900 selection:text-white">
        <Hero />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Projects />
          <Journey />
          <Services />
          <AboutPreview />
        </main>
      </div>
    </>
  );
}
