"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particles: Particle[] = [];

    // Mouse Position
    const mouse = { x: undefined as number | undefined, y: undefined as number | undefined };
    const connectionDistance = 100; // Jarak maksimal untuk bikin garis

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5; // Kecepatan lambat
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 1.5 + 1;
      }

      update() {
        // Gerak bebas
        this.x += this.vx;
        this.y += this.vy;

        // Bounce pinggir layar
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Mouse Attraction (Magnet)
        if (mouse.x !== undefined && mouse.y !== undefined) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Kalau dekat mouse, tarik pelan-pelan
            if (distance < 200) {
                this.x += dx * 0.02;
                this.y += dy * 0.02;
            }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      particles = [];
      // Jumlah partikel (jangan kebanyakan biar ga berat)
      const particleCount = (width * height) / 9000;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // LOGIC KONEKSI GARIS (NETWORK)
        // Cek jarak ke partikel lain
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                // Makin dekat makin tebal/jelas garisnya
                const opacity = 1 - (distance / connectionDistance);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`; 
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
        
        // LOGIC KONEKSI KE MOUSE
        if (mouse.x !== undefined && mouse.y !== undefined) {
             const dx = particles[i].x - mouse.x;
             const dy = particles[i].y - mouse.y;
             const distance = Math.sqrt(dx*dx + dy*dy);

             if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(100, 200, 255, 0.2)`; // Garis ke mouse warna Biru Muda
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
             }
        }
      }
      requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
        mouse.x = undefined;
        mouse.y = undefined;
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-[#000000]">
      
      {/* === BACKGROUND: NEURAL NETWORK === */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-60 pointer-events-none"
      />

      {/* --- BACKGROUND GLOW --- */}
      <motion.div 
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none z-0" 
      />

      {/* --- CONTENT UTAMA --- */}
      <div className="z-10 max-w-5xl space-y-8 relative">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block"
        >
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-[#050505]/80 text-xs font-medium tracking-[0.2em] text-gray-400 backdrop-blur-md uppercase">
            Portfolio
          </span>
        </motion.div>

        {/* HEADLINE */}
        <div className="relative overflow-hidden">
            <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight"
            >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-500 via-white to-gray-500 bg-[length:200%_auto] animate-shine">
                Moch. Sugih Nugraha
            </span>
            </motion.h1>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Crafting seamless digital experiences and precision visuals.
          <br className="hidden md:block" />
          <span className="text-gray-200 font-normal mt-2 block">
            Technical Product Manager | AI Automation Specialist | Creative Technologist
          </span>
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 justify-center pt-8"
        >
          <Link 
            href="#projects"
            className="px-8 py-3.5 bg-white text-black rounded-full font-medium text-lg hover:scale-105 transition-transform duration-300 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            View Work
          </Link>
          
          <a 
            href="/cv-sugih.pdf" 
            target="_blank" 
            download
            className="px-8 py-3.5 rounded-full font-medium text-lg text-white border border-white/20 hover:bg-white/10 transition-colors duration-300"
          >
            Download CV
          </a>
        </motion.div>
      </div>
    </section>
  );
}
