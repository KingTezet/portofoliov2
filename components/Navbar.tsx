"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/", id: "home" },
  { name: "Journey", path: "/#journey", id: "journey" },
  { name: "Projects", path: "/projects", id: "projects" },
  { name: "About", path: "/about", id: "about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // --- LOGIC SCROLL SPY (TETAP SAMA) ---
  useEffect(() => {
    if (pathname !== "/") {
      if (pathname.includes("projects")) setActiveSection("projects");
      else if (pathname.includes("about")) setActiveSection("about");
      else setActiveSection("");
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;
      const journeySection = document.getElementById("journey");
      const projectsSection = document.getElementById("projects");

      if (projectsSection && scrollPosition >= projectsSection.offsetTop) {
        setActiveSection("projects");
      } else if (journeySection && scrollPosition >= journeySection.offsetTop) {
        setActiveSection("journey");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Lock Body Scroll when Menu is Open (Biar gak bisa discroll backgroundnya)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // --- FUNGSI KHUSUS: SCROLL KE ATAS ---
  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
      >
        <div className="glass rounded-full px-6 py-3 flex items-center justify-between gap-8 shadow-lg shadow-black/20 backdrop-blur-md bg-white/5 border border-white/10 w-full max-w-2xl md:w-auto relative z-50">
          
          {/* Logo */}
          <Link 
            href="/" 
            onClick={handleScrollTop}
            className="font-bold text-lg tracking-tight text-white hover:text-gray-300 transition"
          >
            SGH.
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={(e) => {
                    if (link.path === "/") handleScrollTop(e);
                }}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  activeSection === link.id ? "text-white" : "text-gray-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Tombol Contact Desktop */}
          <div className="hidden md:block">
            <Link 
              href="https://wa.me/6285926270826" 
              target="_blank"
              className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition transform active:scale-95"
            >
              Let's Talk
            </Link>
          </div>

          {/* Tombol Hamburger (Z-Index tinggi biar bisa diklik pas menu buka) */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-white p-1 relative z-50 active:scale-90 transition-transform"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </motion.nav>

      {/* --- MOBILE FULL SCREEN OVERLAY (TITANIUM STYLE) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black/80 md:hidden flex flex-col justify-center items-center"
          >
            {/* Background Texture (Optional: Noise) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col items-center gap-8 w-full px-8 relative z-10">
              
              {/* Menu Links with Stagger Animation */}
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 100, damping: 20 }}
                  className="w-full text-center"
                >
                  <Link
                    href={link.path}
                    onClick={(e) => {
                      setIsOpen(false);
                      if (link.path === "/") handleScrollTop(e);
                    }}
                    className={`block text-4xl font-black tracking-tighter transition-all duration-300 ${
                        activeSection === link.id 
                        ? "text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 scale-110" 
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
                className="w-full mt-8 flex flex-col items-center"
              >
                <div className="h-[1px] w-12 bg-white/10 mb-8" />
                
                <Link 
                  href="https://wa.me/6285926270826"
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                  className="group relative flex items-center justify-center w-full max-w-xs py-4 bg-white text-black rounded-[2rem] font-bold text-sm tracking-[0.2em] uppercase overflow-hidden hover:scale-105 transition-transform"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    WhatsApp Me <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                  </span>
                </Link>
                
                <p className="text-gray-600 text-[10px] uppercase tracking-widest text-center mt-6 font-mono">
                  SGH. Portfolio © 2026
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}