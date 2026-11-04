"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Sparkles } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
  type: "spark" | "confetti" | "star";
  rotation?: number;
  rotationSpeed?: number;
  tiltAngle?: number;
  tiltAngleSpeed?: number;
  gravity?: number;
  friction?: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  exploded: boolean;
  trail: { x: number; y: number; alpha: number }[];
}

const PALETTE = [
  "#1E3A6D", // Navy
  "#2E5B9A", // Royal Blue
  "#4F83CC", // Sky Blue
  "#93C5FD", // Soft Pastel Blue
  "#F59E0B", // Bright Gold
  "#FBBF24", // Warm Yellow Gold
  "#FDE68A", // Champagne Gold
  "#F472B6", // Rose Pink
  "#FB7185", // Blossom
  "#FFFFFF", // Pearl White
];

export default function CelebrationFireworks() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);
  const animFrameId = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Helper to spawn a firework explosion
  const explode = useCallback((x: number, y: number, color?: string, count = 70) => {
    const baseColor = color || PALETTE[Math.floor(Math.random() * PALETTE.length)];
    const isSpecialGold = Math.random() > 0.5;

    // 1. Firework Sparks
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 5.5 + 2.0;
      const sparkColor = isSpecialGold && Math.random() > 0.4
        ? (Math.random() > 0.5 ? "#F59E0B" : "#FBBF24")
        : (Math.random() > 0.6 ? baseColor : PALETTE[Math.floor(Math.random() * PALETTE.length)]);

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: sparkColor,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.012,
        size: Math.random() * 2.8 + 1.8,
        type: Math.random() > 0.85 ? "star" : "spark",
        gravity: 0.07,
        friction: 0.965,
      });
    }

    // 2. Confetti Ribbons fluttering down
    const confettiCount = 28;
    for (let i = 0; i < confettiCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4.2 + 1.2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        alpha: 1,
        decay: Math.random() * 0.008 + 0.006,
        size: Math.random() * 6 + 4,
        type: "confetti",
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        tiltAngle: Math.random() * Math.PI,
        tiltAngleSpeed: Math.random() * 0.08 + 0.04,
        gravity: 0.04,
        friction: 0.975,
      });
    }
  }, []);

  // Launch a rocket that flies up then explodes
  const launchRocket = useCallback((startX: number, targetX: number, targetY: number, color?: string) => {
    const chosenColor = color || PALETTE[Math.floor(Math.random() * PALETTE.length)];
    const distanceY = window.innerHeight - targetY;
    const vy = -Math.sqrt(2 * 0.18 * distanceY); // Physics kinematic formula
    const time = Math.abs(vy / 0.18);
    const vx = (targetX - startX) / time;

    rocketsRef.current.push({
      x: startX,
      y: window.innerHeight,
      targetY,
      vx,
      vy,
      color: chosenColor,
      exploded: false,
      trail: [],
    });

    startLoop();
  }, [explode]);

  // Main Animation Loop
  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      isRunningRef.current = false;
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      isRunningRef.current = false;
      return;
    }

    // Semi-transparent clear for smooth motion blur trailing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- Update & Draw Rockets ---
    for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
      const r = rocketsRef.current[i];
      r.x += r.vx;
      r.y += r.vy;
      r.vy += 0.18; // Rocket gravity

      // Rocket trail sparks
      r.trail.push({ x: r.x, y: r.y, alpha: 1 });
      if (r.trail.length > 8) r.trail.shift();

      // Draw trail
      ctx.beginPath();
      for (let j = 0; j < r.trail.length; j++) {
        const point = r.trail[j];
        ctx.fillStyle = `rgba(245, 158, 11, ${point.alpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2 * (j / r.trail.length), 0, Math.PI * 2);
        ctx.fill();
        point.alpha *= 0.85;
      }

      // Draw head
      ctx.fillStyle = r.color;
      ctx.beginPath();
      ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
      ctx.fill();

      // Check if rocket reached apex or target
      if (r.vy >= -0.5 || r.y <= r.targetY) {
        explode(r.x, r.y, r.color, 80);
        rocketsRef.current.splice(i, 1);
      }
    }

    // --- Update & Draw Particles ---
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      const p = particlesRef.current[i];
      p.vx *= p.friction ?? 0.97;
      p.vy *= p.friction ?? 0.97;
      p.vy += p.gravity ?? 0.06;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particlesRef.current.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);

      if (p.type === "spark") {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === "star") {
        // Draw 5-pointed twinkling star
        ctx.translate(p.x, p.y);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        for (let s = 0; s < 5; s++) {
          ctx.lineTo(Math.cos(((18 + s * 72) * Math.PI) / 180) * p.size * 1.5, -Math.sin(((18 + s * 72) * Math.PI) / 180) * p.size * 1.5);
          ctx.lineTo(Math.cos(((54 + s * 72) * Math.PI) / 180) * (p.size * 0.7), -Math.sin(((54 + s * 72) * Math.PI) / 180) * (p.size * 0.7));
        }
        ctx.closePath();
        ctx.fill();
      } else if (p.type === "confetti") {
        // 3D Fluttering ribbon
        p.rotation = (p.rotation || 0) + (p.rotationSpeed || 3);
        p.tiltAngle = (p.tiltAngle || 0) + (p.tiltAngleSpeed || 0.05);
        const tilt = Math.cos(p.tiltAngle);

        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(1, tilt);

        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size, p.size, p.size * 1.6);
      }

      ctx.restore();
    }

    if (particlesRef.current.length > 0 || rocketsRef.current.length > 0) {
      animFrameId.current = requestAnimationFrame(loop);
    } else {
      isRunningRef.current = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [explode]);

  const startLoop = useCallback(() => {
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      animFrameId.current = requestAnimationFrame(loop);
    }
  }, [loop]);

  // Trigger celebration sequence
  const triggerGrandCelebration = useCallback(() => {
    if (typeof window === "undefined") return;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Wave 1: Left rocket
    setTimeout(() => {
      launchRocket(w * 0.2, w * 0.3, h * 0.32, "#F59E0B");
    }, 150);

    // Wave 2: Right rocket
    setTimeout(() => {
      launchRocket(w * 0.8, w * 0.7, h * 0.28, "#1E3A6D");
    }, 600);

    // Wave 3: Center grand finale with dual bursts
    setTimeout(() => {
      launchRocket(w * 0.45, w * 0.42, h * 0.22, "#FBBF24");
      launchRocket(w * 0.55, w * 0.58, h * 0.24, "#4F83CC");
    }, 1200);

    // Wave 4: Festive confetti shower from top
    setTimeout(() => {
      for (let i = 0; i < 4; i++) {
        explode(w * (0.25 + i * 0.17), h * 0.18, undefined, 45);
      }
      startLoop();
    }, 1700);
  }, [launchRocket, explode, startLoop]);

  // Initial mount: setup resize listener & fire intro celebration
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Automatically trigger fireworks upon first page load
    const timer = setTimeout(() => {
      triggerGrandCelebration();
    }, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [triggerGrandCelebration]);

  const handleManualClick = () => {
    setHasInteracted(true);
    triggerGrandCelebration();
  };

  return (
    <>
      {/* Fullscreen Celebration Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[80] w-full h-full"
      />

      {/* Floating Interactive Fireworks Trigger Button */}
      <aside aria-label="Hiệu ứng chúc mừng" className="fixed bottom-5 right-5 z-[70] flex items-center">
        <button
          onClick={handleManualClick}
          title="Bắn pháo hoa chúc mừng Tâm Như! 🎆"
          className="group relative flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full bg-[#FFFDF9]/95 backdrop-blur-md border border-[#D4AF37]/60 shadow-[0_4px_20px_rgba(30,58,109,0.15)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.35)] hover:border-[#D4AF37] hover:scale-105 active:scale-95 transition-all duration-300 text-[#1E3A6D] text-[13px] font-medium cursor-pointer"
        >
          {/* Animated Gold Ring / Glow */}
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#F59E0B]/20 via-[#4F83CC]/20 to-[#F59E0B]/20 blur-sm opacity-75 group-hover:opacity-100 transition duration-300" />

          {/* Sparkle Icon */}
          <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-amber-100/80 text-amber-600 group-hover:rotate-12 transition-transform duration-300">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4AF37]" />
          </span>

          {/* Button Text */}
          <span className="relative font-serif font-semibold tracking-wide text-[#1E3A6D] hidden xs:inline sm:inline">
            Chúc mừng 🎓
          </span>
          <span className="relative font-sans text-xs text-[#26354B]/80 font-normal">
            🎆
          </span>
        </button>
      </aside>
    </>
  );
}
