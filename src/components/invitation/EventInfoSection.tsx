"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Check,
  ExternalLink,
  Sparkles,
  Heart,
} from "lucide-react";
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

  // Google Calendar one-click link
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    INVITATION_DATA.calendar.summary
  )}&dates=${INVITATION_DATA.calendar.startUtc}/${INVITATION_DATA.calendar.endUtc}&details=${encodeURIComponent(
    INVITATION_DATA.calendar.description
  )}&location=${encodeURIComponent(INVITATION_DATA.calendar.location)}`;

  // November 2026 Calendar Grid Setup
  // Nov 1, 2026 is Sunday. In Monday-start week: 6 empty cells (Mon-Sat), then 1-30.
  const weekDays = [
    { label: "T2", isWeekend: false },
    { label: "T3", isWeekend: false },
    { label: "T4", isWeekend: false },
    { label: "T5", isWeekend: false },
    { label: "T6", isWeekend: false },
    { label: "T7", isWeekend: false },
    { label: "CN", isWeekend: true },
  ];

  // 6 blank slots for the first week before Sunday (Nov 1st)
  const emptyDays = [null, null, null, null, null, null];
  const daysInNov = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <section id="info" className="relative px-4 md:px-8 py-6 md:py-8">
      {/* Decorative floral accent */}
      <div className="absolute -top-5 -right-2 w-[85px] md:w-[115px] pointer-events-none select-none z-10 opacity-90">
        <Image
          src="/images/hydrangea-card-right.webp"
          alt=""
          width={144}
          height={150}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Section Header: —— 🎓 THÔNG TIN BUỔI LỄ —— */}
      <div className="flex items-center justify-center gap-3 mb-6 md:mb-7">
        <div className="h-[1px] w-10 sm:w-16 md:w-24 bg-[#1E3A6D]/80"></div>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-[#1E3A6D] stroke-[1.8]" />
          <h2 className="font-serif text-[16px] sm:text-[18px] md:text-[20px] font-bold tracking-[0.14em] text-[#1E3A6D] uppercase whitespace-nowrap">
            THÔNG TIN BUỔI LỄ
          </h2>
        </div>
        <div className="h-[1px] w-10 sm:w-16 md:w-24 bg-[#1E3A6D]/80"></div>
      </div>

      {/* Main Grid: Left = Cute Desk Calendar, Right = Venue & Time Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-stretch">
        {/* ========================================================= */}
        {/* LEFT: CUTE VINTAGE MINI DESK CALENDAR (Col: 7)            */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 bg-[#FFFDF9] rounded-[22px] border border-[#E7DFD4] shadow-[0_4px_24px_rgba(30,58,109,0.04)] p-4 sm:p-5 md:p-6 relative flex flex-col justify-between overflow-hidden">
          {/* Top Vintage Binder Rings / Punch Holes */}
          <div className="absolute top-2.5 left-0 right-0 flex justify-between px-10 pointer-events-none">
            <span className="w-3.5 h-3.5 rounded-full bg-[#E7DFD4] border border-[#D9D1C5] shadow-inner flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FAF6EF]" />
            </span>
            <span className="w-3.5 h-3.5 rounded-full bg-[#E7DFD4] border border-[#D9D1C5] shadow-inner flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FAF6EF]" />
            </span>
          </div>

          <div>
            {/* Calendar Header */}
            <div className="text-center pt-3 pb-3 border-b border-[#E7DFD4]/80">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EF] border border-[#E7DFD4] text-[#1E3A6D] text-[11px] font-semibold uppercase tracking-[0.15em] mb-1">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Tháng Mười Một • 2026</span>
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif text-[20px] sm:text-[22px] font-bold text-[#1E3A6D] tracking-wide">
                November 2026
              </h3>
              <p className="font-script text-[17px] text-[#657083] -mt-1 select-none">
                Tháng đánh dấu cột mốc tốt nghiệp ♡
              </p>
            </div>

            {/* Weekdays Header: T2, T3, T4, T5, T6, T7, CN */}
            <div className="grid grid-cols-7 gap-1 text-center py-2.5 text-[11px] sm:text-[12px] font-semibold tracking-wider text-[#657083]">
              {weekDays.map((wd) => (
                <div
                  key={wd.label}
                  className={wd.isWeekend ? "text-rose-500 font-bold" : "text-[#1E3A6D]"}
                >
                  {wd.label}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-y-2.5 gap-x-1 text-center items-center">
              {/* Empty leading cells */}
              {emptyDays.map((_, i) => (
                <div key={`empty-${i}`} className="h-9 sm:h-10" />
              ))}

              {/* Days 1 to 30 */}
              {daysInNov.map((day) => {
                const isGraduationDay = day === 10;
                const isSunday = (day + 5) % 7 === 6; // Day 1 is Sunday

                if (isGraduationDay) {
                  return (
                    <div key={day} className="relative flex items-center justify-center">
                      {/* Adorable Focused Day 10 Button */}
                      <button
                        type="button"
                        onClick={handleDownload}
                        title="10/11/2026: Ngày tốt nghiệp của Tâm Như — Bấm để lưu vào lịch!"
                        className="group relative w-[38px] h-[40px] sm:w-[44px] sm:h-[44px] rounded-[14px] sm:rounded-[16px] bg-gradient-to-b from-[#1E3A6D] to-[#152A52] text-white flex flex-col items-center justify-center shadow-[0_6px_18px_rgba(30,58,109,0.28)] ring-[2.5px] ring-[#D4AF37] ring-offset-2 ring-offset-[#FFFDF9] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer z-10"
                      >
                        {/* Mini Graduation Cap tilted cutely on the corner */}
                        <span className="absolute -top-2.5 -right-2 text-[13px] sm:text-[15px] -rotate-12 group-hover:rotate-6 transition-transform duration-300 select-none drop-shadow-sm">
                          🎓
                        </span>

                        {/* Bold Day Number */}
                        <span className="font-serif text-[16px] sm:text-[18px] font-bold leading-none text-white tracking-tight mt-0.5">
                          10
                        </span>

                        {/* Cute pastel pink heart under the number */}
                        <span className="text-[8px] sm:text-[9px] text-[#FDA4AF] leading-none mt-0.5 select-none">
                          ♥
                        </span>

                        {/* Gentle ambient gold glow */}
                        <span className="absolute -inset-0.5 rounded-[16px] bg-[#D4AF37]/25 blur-xs -z-10 group-hover:bg-[#D4AF37]/50 transition-colors" />
                      </button>
                    </div>
                  );
                }

                return (
                  <div
                    key={day}
                    className="flex items-center justify-center"
                  >
                    <span
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-serif text-[13.5px] sm:text-[14.5px] transition-colors ${
                        isSunday
                          ? "text-rose-500/85 font-medium hover:bg-rose-50"
                          : "text-[#26354B]/80 hover:bg-[#1E3A6D]/8 hover:text-[#1E3A6D]"
                      }`}
                    >
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Card Summary & Action Buttons */}
          <div className="mt-4 pt-3.5 border-t border-[#E7DFD4]/80">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
                <p className="text-[12.5px] sm:text-[13px] text-[#1E3A6D] font-medium">
                  <strong className="font-semibold text-[#1E3A6D]">Thứ Ba, 10/11/2026</strong> • 9h45 – 12h00
                </p>
              </div>
              <span className="text-[11px] font-script text-[#657083] sm:text-[13px]">
                Hẹn gặp bạn nhé! ♡
              </span>
            </div>

            {/* Action Buttons inside Calendar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Button: Save .ics file */}
              <button
                onClick={handleDownload}
                className="w-full h-[38px] px-3.5 rounded-full border border-[#1E3A6D] bg-[#1E3A6D] hover:bg-[#172F59] text-white text-[12.5px] font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer active:scale-98"
              >
                {downloaded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Đã lưu vào máy!</span>
                  </>
                ) : (
                  <>
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>Lưu vào lịch</span>
                  </>
                )}
              </button>

              {/* Button: Google Calendar Direct Link */}
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-[38px] px-3.5 rounded-full border border-[#1E3A6D]/40 bg-[#FFFDF9] hover:bg-[#FAF6EF] hover:border-[#1E3A6D] text-[#1E3A6D] text-[12.5px] font-semibold transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-98"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#1E3A6D]" />
                <span>Google Calendar</span>
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT: TIME & VENUE DETAILS CARDS (Col: 5)               */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3.5">
          {/* Card 1: Time Details */}
          <div className="bg-[#FFFDF9] rounded-[20px] border border-[#E7DFD4] p-4 sm:p-5 shadow-[0_2px_12px_rgba(30,58,109,0.02)] hover:border-[#1E3A6D]/30 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1E3A6D]/10 text-[#1E3A6D] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-semibold tracking-wider text-[#657083] uppercase">
                  Thời gian buổi lễ
                </span>
                <h4 className="font-serif text-[17px] font-bold text-[#1E3A6D] mt-0.5">
                  09:45 – 12:00
                </h4>
                <p className="text-[12.5px] text-[#26354B]/80 mt-1 leading-relaxed">
                  Đón tiếp bạn bè, chụp ảnh lưu niệm cùng cử nhân và cử hành nghi thức trao bằng tốt nghiệp.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Venue & Map */}
          <div className="bg-[#FFFDF9] rounded-[20px] border border-[#E7DFD4] p-4 sm:p-5 shadow-[0_2px_12px_rgba(30,58,109,0.02)] hover:border-[#1E3A6D]/30 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1E3A6D]/10 text-[#1E3A6D] flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-semibold tracking-wider text-[#657083] uppercase">
                  Địa điểm tổ chức
                </span>
                <h4 className="font-serif text-[15.5px] font-bold text-[#1E3A6D] mt-0.5 leading-snug">
                  ĐH Khoa học Xã hội & Nhân văn (ĐHQG-HCM)
                </h4>
                <p className="text-[12px] text-[#657083] mt-0.5 leading-snug">
                  Cơ sở Linh Xuân — Khu phố 33, P. Linh Xuân, TP. Thủ Đức, TP.HCM
                </p>

                {/* View Map Action Button */}
                <div className="mt-3">
                  <a
                    href={INVITATION_DATA.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#1E3A6D] bg-[#FFFDF9] hover:bg-[#1E3A6D] hover:text-white text-[#1E3A6D] text-[12px] font-semibold transition-all shadow-2xs cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Mở bản đồ chỉ đường</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Sweet message from host */}
          <div className="bg-gradient-to-br from-[#FAF6EF] to-[#FFFDF9] rounded-[20px] border border-[#E7DFD4] p-4 sm:p-4.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 fill-rose-500/20" />
            </div>
            <p className="font-serif text-[13px] text-[#1E3A6D] italic leading-snug">
              &ldquo;Sự hiện diện của bạn là niềm vinh dự và kỷ niệm đẹp đẽ nhất trong ngày tốt nghiệp của mình!&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
