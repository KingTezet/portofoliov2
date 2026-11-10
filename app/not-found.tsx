import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#fcfbfa] px-4 text-center text-zinc-900">
      <Navbar />
      <span className="mb-4 font-mono text-xs uppercase tracking-wider text-zinc-500">(404) Not Found</span>
      <h1 className="font-sf-pro bg-gradient-to-b from-zinc-900 to-zinc-400 bg-clip-text text-8xl font-semibold tracking-tighter text-transparent md:text-9xl">
        404
      </h1>
      <p className="mt-4 max-w-md text-zinc-600">This page doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Back Home
        </Link>
        <Link href="/projects" className="rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-medium transition-colors hover:bg-zinc-50">
          All Projects
        </Link>
      </div>
    </main>
  );
}
