"use client";

import React, { useState } from "react";
import { GraduationCap, Calendar, Clock, MapPin, Check } from "lucide-react";
import Image from "next/image";
import { INVITATION_DATA } from "@/lib/invitation-data";
import { downloadCalendarEvent } from "@/lib/calendar";

export default function EventInfoSection() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    downloadCalendarEvent();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section id="info" className="relative px-4 md:px-8 py-5 md:py-6">
      {/* Right hydrangea flower accent */}
      <div className="absolute -top-4 -right-1 w-[80px] md:w-[110px] pointer-events-none select-none z-10 opacity-90">
        <Image
          src="/images/hydrangea-card-right.webp"
          alt=""
          width={144}
          height={150}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Header: —— 🎓 THÔNG TIN BUỔI LỄ —— */}
      <div className="flex items-center justify-center gap-3 mb-5 md:mb-6">
        <div className="h-[1px] w-10 sm:w-16 md:w-24 bg-[#1E3A6D]/80"></div>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-[#1E3A6D] stroke-[1.8]" />
          <h2 className="font-serif text-[16px] sm:text-[18px] md:text-[20px] font-bold tracking-[0.14em] text-[#1E3A6D] uppercase whitespace-nowrap">
            THÔNG TIN BUỔI LỄ
          </h2>
        </div>
        <div className="h-[1px] w-10 sm:w-16 md:w-24 bg-[#1E3A6D]/80"></div>
      </div>

      {/* 3 Info Cards Grid matching mock */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {/* Card 1: Date */}
        <div className="bg-[#FFFDF9] rounded-[16px] border border-[#E7DFD4] p-5 text-center shadow-[0_2px_12px_rgba(30,58,109,0.02)] flex flex-col items-center justify-center min-h-[135px]">
          <Calendar className="w-6 h-6 text-[#1E3A6D] stroke-[1.8] mb-2.5" />
          <p className="font-serif text-[15px] font-semibold text-[#1E3A6D]">Thứ Ba,</p>
          <p className="font-serif text-[15px] font-semibold text-[#1E3A6D]">ngày 10/11/2026</p>
        </div>

        {/* Card 2: Time */}
        <div className="bg-[#FFFDF9] rounded-[16px] border border-[#E7DFD4] p-5 text-center shadow-[0_2px_12px_rgba(30,58,109,0.02)] flex flex-col items-center justify-center min-h-[135px]">
          <Clock className="w-6 h-6 text-[#1E3A6D] stroke-[1.8] mb-2.5" />
          <p className="font-serif text-[16px] font-semibold text-[#1E3A6D]">9h45 – 12h00</p>
        </div>

        {/* Card 3: Location */}
        <div className="bg-[#FFFDF9] rounded-[16px] border border-[#E7DFD4] p-5 text-center shadow-[0_2px_12px_rgba(30,58,109,0.02)] flex flex-col items-center justify-center min-h-[135px]">
          <MapPin className="w-6 h-6 text-[#1E3A6D] stroke-[1.8] mb-2" />
          <p className="font-serif text-[14px] font-semibold text-[#1E3A6D] leading-snug">
            Khu phố 33, phường Linh Xuân, TP.HCM
          </p>
          <p className="text-[12px] text-[#26354B] font-light mt-1 leading-snug">
            Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG HCM.
          </p>
        </div>
      </div>

      {/* Action Buttons: Pill outline buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-5">
        <button
          onClick={handleDownload}
          className="w-full sm:w-auto h-[40px] px-6 rounded-full border border-[#1E3A6D] bg-[#FFFDF9] hover:bg-[#1E3A6D] hover:text-white text-[#1E3A6D] text-[13.5px] font-semibold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          {downloaded ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Đã lưu vào lịch!</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              <span>Lưu vào lịch</span>
            </>
          )}
        </button>

        <a
          href={INVITATION_DATA.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto h-[40px] px-6 rounded-full border border-[#1E3A6D] bg-[#FFFDF9] hover:bg-[#1E3A6D] hover:text-white text-[#1E3A6D] text-[13.5px] font-semibold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          <MapPin className="w-4 h-4" />
          <span>Xem bản đồ</span>
        </a>
      </div>
    </section>
  );
}
