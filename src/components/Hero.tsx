"use client";

import React from "react";
import Image from "next/image";
import { EVENT_CONFIG } from "@/config/event";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[360px] sm:min-h-[420px] overflow-hidden">
      {/* Background Photo of Tâm Như occupying the right half, smoothly blending into the cream paper */}
      <div className="absolute right-0 top-0 bottom-0 w-[56%] sm:w-[52%] overflow-hidden pointer-events-none select-none z-0">
        <Image
          src="/images/graduate-raw.jpg"
          alt="Trần Đắc Tâm Như"
          fill
          priority
          className="object-cover object-[center_20%]"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 20%, black 45%, black 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 20%, black 45%, black 100%)",
          }}
        />

        {/* Sparkle Doodles over her graduation cap */}
        <div className="absolute top-7 right-8 text-white/90 drop-shadow-sm pointer-events-none select-none">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="8" y1="12" x2="3" y2="10" />
            <line x1="11" y1="7" x2="8" y2="2" />
            <line x1="16" y1="8" x2="18" y2="3" />
          </svg>
        </div>

        {/* Heart Doodle near head */}
        <div className="absolute top-14 left-4 text-white/80 drop-shadow-sm pointer-events-none select-none">
          <svg className="w-5 h-5 -rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>
      </div>

      {/* Decorative Floral Top-Left */}
      <div className="absolute top-0 left-0 w-28 sm:w-36 pointer-events-none select-none z-10 opacity-90">
        <Image
          src="/images/hydrangea-top.webp"
          alt=""
          width={130}
          height={175}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* Left Content Column */}
      <div className="relative z-10 w-[62%] sm:w-[58%] pl-6 sm:pl-10 pr-2 pt-8 sm:pt-12 pb-10 flex flex-col items-center sm:items-start text-center sm:text-left">
        {/* Eyebrow: THƯ MỜI TỐT NGHIỆP */}
        <div className="inline-flex flex-col items-center sm:items-start mb-2">
          <span className="font-serif uppercase tracking-[0.22em] text-[#1E3A6D] text-xs sm:text-sm font-semibold">
            {EVENT_CONFIG.title}
          </span>
          <div className="w-11 h-[1.5px] bg-[#1E3A6D]/50 mt-1"></div>
        </div>

        {/* Cursive Tagline: You're Invited! with Heart Doodle */}
        <div className="relative my-1 inline-block">
          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-[#1E3A6D] leading-none select-none tracking-wide">
            {EVENT_CONFIG.tagline}
          </h1>

          {/* Heart Doodle */}
          <svg
            className="absolute -top-1 -right-6 sm:-right-7 w-5 h-5 sm:w-6 sm:h-6 text-[#1E3A6D]/80 transform rotate-12 pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>

        {/* Warm Invitation Message */}
        <p className="font-serif italic text-xs sm:text-sm md:text-base text-[#26354B] leading-relaxed mt-2 max-w-xs">
          “{EVENT_CONFIG.invitationQuote}”
        </p>

        {/* Hand-drawn Ribbon Bow Doodle */}
        <div className="mt-3">
          <svg
            className="w-36 sm:w-48 h-auto text-[#6B8FCE]"
            viewBox="0 0 200 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Bow knot */}
            <ellipse cx="100" cy="20" rx="3.5" ry="3.5" fill="currentColor" />
            {/* Left loop */}
            <path d="M96 20 C65 6, 45 10, 52 24 C58 34, 82 28, 96 22" />
            {/* Right loop */}
            <path d="M104 20 C135 6, 155 10, 148 24 C142 34, 118 28, 104 22" />
            {/* Left tail */}
            <path d="M96 23 C80 38, 55 46, 36 50" />
            {/* Right tail */}
            <path d="M104 23 C120 38, 145 46, 164 50" />
          </svg>
        </div>
      </div>

      {/* Realistic Torn Paper Edge Divider cutting across the bottom of the photo */}
      <div className="w-full absolute bottom-0 left-0 right-0 z-20 pointer-events-none select-none leading-none">
        <svg
          viewBox="0 0 1200 48"
          preserveAspectRatio="none"
          className="w-full h-6 text-[#F9F3E8] fill-current drop-shadow-[0_-2px_4px_rgba(30,58,109,0.06)]"
        >
          <path d="M0,20 Q120,42 240,16 T480,26 T720,12 T960,30 T1200,16 L1200,48 L0,48 Z" />
        </svg>
      </div>
    </section>
  );
}
