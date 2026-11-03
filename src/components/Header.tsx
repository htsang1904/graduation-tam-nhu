"use client";

import React from "react";
import { GraduationCap } from "lucide-react";

export default function Header() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="w-full px-5 py-4 flex items-center justify-between border-b border-[#E7DFD4]/50 z-20 relative">
      {/* Brand / Logo */}
      <div
        onClick={() => scrollTo("hero")}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div className="w-7 h-7 rounded-full bg-[#1E3A6D]/10 flex items-center justify-center text-[#1E3A6D]">
          <GraduationCap className="w-4 h-4 stroke-[1.8]" />
        </div>
        <span className="font-serif text-base sm:text-lg font-medium tracking-wide text-[#1E3A6D]">
          Tâm Như&apos;s Graduation
        </span>
      </div>

      {/* Nav Pills */}
      <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-[#26354B]">
        <button
          onClick={() => scrollTo("hero")}
          className="px-3 py-1 rounded-full bg-[#E7DFD4]/70 hover:bg-[#E7DFD4] text-[#1E3A6D] transition-colors"
        >
          Trang chủ
        </button>
        <button
          onClick={() => scrollTo("thong-tin")}
          className="px-3 py-1 rounded-full hover:bg-[#E7DFD4]/50 transition-colors"
        >
          Thông tin
        </button>
        <button
          onClick={() => scrollTo("rsvp")}
          className="px-3 py-1 rounded-full hover:bg-[#E7DFD4]/50 transition-colors whitespace-nowrap"
        >
          Xác nhận tham dự
        </button>
      </nav>
    </header>
  );
}
