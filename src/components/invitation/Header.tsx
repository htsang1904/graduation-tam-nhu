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
    <header className="sticky top-0 z-50 h-[62px] md:h-[68px] w-full border-b border-[#E7DFD4]/70 bg-[#FAF6EF]/95 backdrop-blur-md transition-all">
      <div className="w-full px-5 md:px-8 h-full flex items-center justify-between">
        {/* H-02 + H-03: Logo */}
        <div
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-[#1E3A6D] stroke-[1.8]" />
          <span className="font-serif text-[16px] md:text-[17px] font-semibold tracking-wide text-[#1E3A6D]">
            Tâm Như&apos;s Graduation
          </span>
        </div>

        {/* H-04: Nav Links */}
        {/* Desktop Nav Pills matching mock */}
        <nav className="hidden md:flex items-center gap-3 text-[14px] font-medium">
          <button
            onClick={() => scrollTo("home")}
            className="px-4 py-1.5 rounded-full bg-[#E5EBF4] text-[#1E3A6D] font-medium transition-all hover:bg-[#d8e3f0]"
          >
            Trang chủ
          </button>
          <button
            onClick={() => scrollTo("info")}
            className="px-3 py-1.5 text-[#3A4A62] hover:text-[#1E3A6D] transition-colors"
          >
            Thông tin
          </button>
          <button
            onClick={() => scrollTo("rsvp")}
            className="px-3 py-1.5 text-[#3A4A62] hover:text-[#1E3A6D] transition-colors"
          >
            Xác nhận tham dự
          </button>
        </nav>

        {/* Mobile RSVP CTA */}
        <div className="md:hidden">
          <button
            onClick={() => scrollTo("rsvp")}
            className="px-3.5 py-1.5 rounded-full bg-[#1E3A6D] text-white text-[12px] font-semibold hover:bg-[#172F59] transition-all"
          >
            RSVP
          </button>
        </div>
      </div>
    </header>
  );
}
