"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin, GraduationCap, Check } from "lucide-react";
import { EVENT_CONFIG } from "@/config/event";
import { downloadCalendarEvent } from "@/lib/calendar";

export default function EventDetails() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadCalendar = () => {
    downloadCalendarEvent();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section id="thong-tin" className="pt-3 pb-5 px-5 sm:px-8 relative">
      {/* Delicate floral accent on the right edge */}
      <div className="absolute -top-6 -right-2 w-20 sm:w-28 pointer-events-none select-none z-10 opacity-85">
        <Image
          src="/images/hydrangea-bottom.webp"
          alt=""
          width={180}
          height={130}
          className="w-full h-auto object-contain transform scale-x-[-1]"
        />
      </div>

      <div className="w-full relative z-20">
        {/* Section Title with Cap Icon & Lines */}
        <div className="text-center mb-4">
          <div className="inline-flex justify-center items-center w-7 h-7 rounded-full bg-[#1E3A6D]/10 text-[#1E3A6D] mb-1">
            <GraduationCap className="w-4 h-4 stroke-[1.8]" />
          </div>
          <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
            <div className="h-[1.5px] bg-[#1E3A6D]/35 flex-1"></div>
            <h2 className="font-serif text-base sm:text-lg font-bold tracking-[0.16em] text-[#1E3A6D] uppercase whitespace-nowrap">
              Thông Tin Buổi Lễ
            </h2>
            <div className="h-[1.5px] bg-[#1E3A6D]/35 flex-1"></div>
          </div>
        </div>

        {/* 3 Detail Cards in a 3-column row */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
          {/* Card 1: Ngày */}
          <div className="bg-[#FFFDF9] border border-[#E7DFD4] rounded-[16px] p-2.5 sm:p-4 text-center shadow-[0_2px_12px_rgba(30,58,109,0.04)] flex flex-col items-center justify-center min-h-[115px]">
            <div className="w-8 h-8 rounded-full bg-[#B6C9F2]/25 flex items-center justify-center text-[#1E3A6D] mb-1.5">
              <Calendar className="w-4 h-4 stroke-[1.8]" />
            </div>
            <p className="font-serif text-xs sm:text-sm font-bold text-[#1E3A6D] leading-tight">
              Thứ Ba,
            </p>
            <p className="font-serif text-xs sm:text-sm font-bold text-[#1E3A6D] leading-tight mt-0.5">
              ngày 10/11/2026
            </p>
          </div>

          {/* Card 2: Giờ */}
          <div className="bg-[#FFFDF9] border border-[#E7DFD4] rounded-[16px] p-2.5 sm:p-4 text-center shadow-[0_2px_12px_rgba(30,58,109,0.04)] flex flex-col items-center justify-center min-h-[115px]">
            <div className="w-8 h-8 rounded-full bg-[#B6C9F2]/25 flex items-center justify-center text-[#1E3A6D] mb-1.5">
              <Clock className="w-4 h-4 stroke-[1.8]" />
            </div>
            <p className="font-serif text-xs sm:text-sm font-bold text-[#1E3A6D] leading-tight">
              {EVENT_CONFIG.timeDisplay}
            </p>
          </div>

          {/* Card 3: Địa điểm */}
          <div className="bg-[#FFFDF9] border border-[#E7DFD4] rounded-[16px] p-2.5 sm:p-4 text-center shadow-[0_2px_12px_rgba(30,58,109,0.04)] flex flex-col items-center justify-center min-h-[115px]">
            <div className="w-8 h-8 rounded-full bg-[#B6C9F2]/25 flex items-center justify-center text-[#1E3A6D] mb-1.5">
              <MapPin className="w-4 h-4 stroke-[1.8]" />
            </div>
            <p className="font-serif text-[11px] sm:text-xs font-bold text-[#1E3A6D] leading-tight">
              Khu phố 33, phường Linh Xuân, TP.HCM
            </p>
            <p className="text-[10px] sm:text-[11px] text-[#657083] mt-1 font-light leading-tight">
              {EVENT_CONFIG.locationName}
            </p>
          </div>
        </div>

        {/* 2 Action Buttons */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={handleDownloadCalendar}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border-[1.5px] border-[#1E3A6D] bg-[#FFFDF9] text-[#1E3A6D] font-medium text-xs sm:text-sm shadow-sm transition-all hover:bg-[#1E3A6D] hover:text-white"
          >
            {downloaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Đã lưu vào lịch!</span>
              </>
            ) : (
              <>
                <Calendar className="w-3.5 h-3.5" />
                <span>Lưu vào lịch</span>
              </>
            )}
          </button>

          <a
            href={EVENT_CONFIG.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border-[1.5px] border-[#1E3A6D] bg-[#FFFDF9] text-[#1E3A6D] font-medium text-xs sm:text-sm shadow-sm transition-all hover:bg-[#1E3A6D] hover:text-white"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Xem bản đồ</span>
          </a>
        </div>
      </div>
    </section>
  );
}
