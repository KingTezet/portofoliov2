"use client";

import { useEffect, useRef } from "react";
import { Github, Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // --- MAINAN: HIGH FIDELITY 3D GLASS ORBS ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const footer = footerRef.current;
    if (!canvas || !footer) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = footer.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    let bubbles: Bubble[] = [];
    let particles: Particle[] = [];

    // --- CLASS BUBBLE (BOLA KACA REALISTIS) ---
    class Bubble {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      wobble: number;
      wobbleSpeed: number;

      constructor() {
        this.radius = Math.random() * 35 + 25; // Ukuran besar (25-60px) biar detail kaca kelihatan
        this.x = Math.random() * width;
        this.y = height + this.radius + Math.random() * 100;
        this.speedY = Math.random() * 0.8 + 0.2; // Gerak pelan & berat (seperti kaca)
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.02;
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.wobble) * 0.3; // Goyang dikit banget
        this.wobble += this.wobbleSpeed;

        if (this.y + this.radius * 2 < 0) {
            this.y = height + this.radius + Math.random() * 200;
            this.x = Math.random() * width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();

        // 1. BADAN BOLA (Shadow Dasar)
        // Kita tidak isi full warna. Kita biarkan transparan biar background web masuk.
        // Tapi kita kasih bayangan hitam halus di pinggir dalam biar kelihatan 'berisi'.
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        const bodyGrad = ctx.createRadialGradient(
            this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.1,
            this.x, this.y, this.radius
        );
        bodyGrad.addColorStop(0, "rgba(0,0,0,0.1)"); // Tengah bening
        bodyGrad.addColorStop(1, "rgba(0,0,0,0.8)"); // Pinggir gelap (biar kontras sama rim light)
        
        ctx.fillStyle = bodyGrad;
        ctx.fill();

        // 2. RIM LIGHT (Cahaya Pinggir Bawah) - Ini bikin efek 3D
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.95, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"; // Outline tipis
        ctx.lineWidth = 1;
        ctx.stroke();

        // Highlight Bawah (Pantulan Lantai)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.85, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)"; // Putih redup
        ctx.lineWidth = 2;
        ctx.stroke();

        // 3. SPECULAR HIGHLIGHT (KILATAN UTAMA) - "THE GLINT"
        // Ini yang bikin kelihatan basah/kaca. Bentuk oval miring di kiri atas.
        
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx.shadowBlur = 15; // Glow effect pada kilatan

        ctx.beginPath();
        ctx.ellipse(
            this.x - this.radius * 0.35, 
            this.y - this.radius * 0.35, 
            this.radius * 0.25, 
            this.radius * 0.15, 
            Math.PI / 4, 
            0, Math.PI * 2
        );
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)"; // Putih Solid Terang
        ctx.fill();

        // Highlight kecil kedua (Double reflection biar makin real)
        ctx.beginPath();
        ctx.arc(
            this.x - this.radius * 0.1, 
            this.y - this.radius * 0.5, 
            this.radius * 0.05, 
            0, Math.PI * 2
        );
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fill();

        ctx.restore();
      }
    }

    // --- CLASS PARTICLE (PECAHAN KACA) ---
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2; // Pecah lebih cepat
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.size = Math.random() * 2 + 1;
        this.life = 1.0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.15; // Berat, jatuh ke bawah
        this.life -= 0.04;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.life})`;
        ctx.shadowBlur = 5;
        ctx.shadowColor = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // INIT
    function init() {
        bubbles = [];
        const bubbleCount = 10; // CUMA 10 BIAR EKSKLUSIF
        for (let i = 0; i < bubbleCount; i++) {
            bubbles.push(new Bubble());
        }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      bubbles.forEach(b => { b.update(); b.draw(); });
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
            i--;
        }
      }
      requestAnimationFrame(animate);
    }

    init();
    animate();

    // HANDLERS
    const handleResize = () => {
        if (!footer) return;
        width = window.innerWidth;
        height = footer.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        init();
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        for (let i = 0; i < bubbles.length; i++) {
            const b = bubbles[i];
            const dist = Math.hypot(mouseX - b.x, mouseY - b.y);

            // Hitbox
            if (dist < b.radius + 15) { 
                // DUAR!
                for (let j = 0; j < 10; j++) {
                    particles.push(new Particle(b.x, b.y));
                }
                // Respawn
                b.y = height + b.radius + Math.random() * 300;
                b.x = Math.random() * width;
                b.radius = Math.random() * 35 + 25;
            }
        }
    };

    window.addEventListener("resize", handleResize);
    footer.addEventListener("mousemove", handleMouseMove as any);

    return () => {
      window.removeEventListener("resize", handleResize);
      footer.removeEventListener("mousemove", handleMouseMove as any);
    };

  }, []);

  return (
    <footer ref={footerRef} className="relative bg-[#050505] text-white overflow-hidden border-t border-white/10 group">
      
      {/* === CANVAS 3D BLACK GLASS ORBS === */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0 cursor-crosshair"
      />

      {/* Accent Background (Sangat Redup & Gelap) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[150px] pointer-events-none z-0" />
      
      {/* CONTENT (Pointer events auto biar tombol bisa diklik) */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 pointer-events-none"> 
        
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20 pointer-events-auto"> 
            <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-400">
                        Let's create something extraordinary.
                    </span>
                </h2>
                <p className="text-gray-400 text-lg font-light">
                    Open for freelance projects, trading discussions, or just a coffee chat.
                </p>
            </div>
            <div>
                <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=nugrahasugih18@gmail.com"
                    target="_blank" 
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                    Get in Touch
                    <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 pointer-events-auto">
            <div className="font-mono">
                © {currentYear} Moch. Sugih Nugraha. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
                <a href="https://github.com/KingTezet" target="_blank" className="hover:text-white transition-colors"><Github size={20} /></a>
                <a href="https://instagram.com/sugihnugrahaa" target="_blank" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="https://www.linkedin.com/in/moch-sugih-nugraha/" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=nugrahasugih18@gmail.com" target="_blank" className="hover:text-white transition-colors"><Mail size={20} /></a>
            </div>
        </div>
      </div>
    </footer>
  );
}