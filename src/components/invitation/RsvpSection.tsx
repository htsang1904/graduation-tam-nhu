"use client";

import React from "react";
import { PenLine } from "lucide-react";
import RsvpForm from "./RsvpForm";

export default function RsvpSection() {
  return (
    <section id="rsvp" className="relative px-4 md:px-8 py-2">
      <div className="bg-[#EEF2F9] rounded-[24px] border border-[#DCE4F0] p-5 sm:p-7 md:p-8 shadow-[0_4px_20px_rgba(30,58,109,0.02)] relative">
        {/* R-01: Header with PenLine icon matching mock */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-[1px] w-10 sm:w-16 md:w-20 bg-[#1E3A6D]/80"></div>
          <div className="flex items-center gap-2">
            <PenLine className="w-5 h-5 text-[#1E3A6D] stroke-[1.8]" />
            <h2 className="font-serif text-[16px] sm:text-[18px] md:text-[20px] font-bold tracking-[0.14em] text-[#1E3A6D] uppercase whitespace-nowrap">
              XÁC NHẬN THAM DỰ
            </h2>
          </div>
          <div className="h-[1px] w-10 sm:w-16 md:w-20 bg-[#1E3A6D]/80"></div>
        </div>

        {/* R-02: Intro subtitle */}
        <p className="text-[13px] md:text-[14px] text-[#4A5568] text-center mb-6 max-w-lg mx-auto">
          Bạn có thể cho mình biết liệu bạn có tham dự buổi lễ được không nhé!
        </p>

        {/* Rsvp Form */}
        <RsvpForm />
      </div>
    </section>
  );
}
