"use client";

import React, { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function RSVPForm() {
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [companions, setCompanions] = useState(0);
  const [message, setMessage] = useState("");
  const [websiteHp, setWebsiteHp] = useState(""); // Honeypot anti-bot

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim()) {
      setErrorMessage("Vui lòng nhập họ và tên của bạn.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guestName: guestName.trim(),
          attendance,
          companions: attendance === "yes" ? Number(companions) : 0,
          message: message.trim(),
          website_hp: websiteHp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Có lỗi xảy ra, vui lòng thử lại sau.");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Không thể kết nối đến máy chủ. Vui lòng thử lại!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setGuestName("");
    setAttendance("yes");
    setCompanions(0);
    setMessage("");
    setErrorMessage(null);
  };

  return (
    <section id="rsvp" className="pt-2 pb-8 px-5 sm:px-8 relative">
      {/* Decorative Floral Bottom-Right framing the entire card bottom */}
      <div className="absolute -bottom-2 -right-2 w-32 sm:w-44 pointer-events-none select-none z-30 opacity-90">
        <Image
          src="/images/hydrangea-bottom.webp"
          alt=""
          width={244}
          height={176}
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="w-full relative z-20">
        {/* Header with Pen Nib Icon & Lines */}
        <div className="text-center mb-4">
          <div className="inline-flex justify-center items-center w-7 h-7 rounded-full bg-[#1E3A6D]/10 text-[#1E3A6D] mb-1">
            {/* Fountain pen nib tilted at 45 degrees */}
            <svg
              className="w-4 h-4 text-[#1E3A6D] -rotate-45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19l7-7 3 3-7 7-3-3z" />
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
              <path d="M2 2l7.586 7.586" />
              <circle cx="11" cy="11" r="2" />
            </svg>
          </div>
          <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
            <div className="h-[1.5px] bg-[#1E3A6D]/35 flex-1"></div>
            <h2 className="font-serif text-base sm:text-lg font-bold tracking-[0.16em] text-[#1E3A6D] uppercase whitespace-nowrap">
              Xác Nhận Tham Dự
            </h2>
            <div className="h-[1.5px] bg-[#1E3A6D]/35 flex-1"></div>
          </div>
          <p className="text-xs sm:text-sm text-[#4A5568] font-light mt-1">
            Bạn có thể cho mình biết liệu bạn có tham dự buổi lễ được không nhé!
          </p>
        </div>

        {/* Soft Pastel Light Blue Card */}
        <div className="bg-[#EBF2FC]/80 border border-[#D5E3F7] rounded-[22px] p-4 sm:p-6 shadow-[0_2px_14px_rgba(30,58,109,0.04)] backdrop-blur-sm">
          {isSuccess ? (
            <div className="text-center py-6 px-4 space-y-3 animate-fadeIn">
              <div className="w-12 h-12 bg-white text-[#1E3A6D] rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-[#6B8FCE]" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#1E3A6D]">
                Cảm ơn bạn rất nhiều!
              </h3>
              <p className="text-xs sm:text-sm text-[#26354B] max-w-md mx-auto leading-relaxed">
                Mình đã nhận được phản hồi của bạn rồi nè. Hẹn gặp lại bạn tại buổi lễ tốt nghiệp nhé! 💙
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-medium text-[#1E3A6D] underline hover:text-[#6B8FCE] transition-colors"
                >
                  Gửi một phản hồi khác
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Honeypot field for anti-bot */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={websiteHp}
                  onChange={(e) => setWebsiteHp(e.target.value)}
                />
              </div>

              {/* Grid 2 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                {/* Left Column: Name & Companions */}
                <div className="space-y-3">
                  {/* Field: Guest Name */}
                  <div>
                    <label
                      htmlFor="guestName"
                      className="block text-xs font-bold text-[#1E3A6D] mb-1.5"
                    >
                      Họ và tên <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="guestName"
                      type="text"
                      required
                      placeholder="Nhập tên của bạn"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#FFFDF9] border border-[#E7DFD4] text-[#26354B] placeholder:text-[#657083]/60 text-xs sm:text-sm transition-all focus:bg-white"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Field: Companions */}
                  <div>
                    <label
                      htmlFor="companions"
                      className="block text-xs font-bold text-[#1E3A6D] mb-1.5"
                    >
                      Số người đi cùng (nếu có)
                    </label>
                    <div className="relative">
                      <select
                        id="companions"
                        value={companions}
                        onChange={(e) => setCompanions(Number(e.target.value))}
                        disabled={attendance === "no" || isLoading}
                        className={`w-full px-3.5 py-2.5 rounded-[12px] bg-[#FFFDF9] border border-[#E7DFD4] text-[#26354B] text-xs sm:text-sm appearance-none transition-all ${
                          attendance === "no" ? "opacity-50 cursor-not-allowed bg-gray-100" : "focus:bg-white cursor-pointer"
                        }`}
                      >
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#1E3A6D]">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Attendance & Message */}
                <div className="space-y-3">
                  {/* Field: Attendance Radio */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E3A6D] mb-1.5">
                      Bạn có tham dự không? <span className="text-rose-500">*</span>
                    </label>
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2.5 cursor-pointer select-none">
                        <span
                          onClick={() => setAttendance("yes")}
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            attendance === "yes"
                              ? "border-[#1E3A6D] bg-[#1E3A6D]"
                              : "border-[#A0AEC0] bg-[#FFFDF9]"
                          }`}
                        >
                          {attendance === "yes" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                          )}
                        </span>
                        <span
                          onClick={() => setAttendance("yes")}
                          className="text-xs sm:text-sm font-semibold text-[#26354B]"
                        >
                          Có, mình sẽ tham dự!
                        </span>
                      </label>

                      <label className="flex items-center gap-2.5 cursor-pointer select-none">
                        <span
                          onClick={() => {
                            setAttendance("no");
                            setCompanions(0);
                          }}
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            attendance === "no"
                              ? "border-[#1E3A6D] bg-[#1E3A6D]"
                              : "border-[#A0AEC0] bg-[#FFFDF9]"
                          }`}
                        >
                          {attendance === "no" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                          )}
                        </span>
                        <span
                          onClick={() => {
                            setAttendance("no");
                            setCompanions(0);
                          }}
                          className="text-xs sm:text-sm text-[#4A5568]"
                        >
                          Rất tiếc, mình không tham dự được.
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Field: Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-bold text-[#1E3A6D] mb-1.5"
                    >
                      Lời nhắn đến mình ♡
                    </label>
                    <textarea
                      id="message"
                      rows={2}
                      placeholder="Gửi cho mình một lời chúc nhé!"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={500}
                      className="w-full px-3.5 py-2 rounded-[12px] bg-[#FFFDF9] border border-[#E7DFD4] text-[#26354B] placeholder:text-[#657083]/60 text-xs sm:text-sm resize-none transition-all focus:bg-white h-[68px]"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Error Message Alert */}
              {errorMessage && (
                <div className="p-2.5 rounded-[10px] bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 px-9 py-2.5 rounded-full bg-[#1E3A6D] hover:bg-[#14284B] text-white font-medium text-xs sm:text-sm shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed transform active:scale-95"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Đang gửi...</span>
                    </>
                  ) : (
                    <>
                      {/* Paper plane icon */}
                      <Send className="w-3.5 h-3.5" />
                      <span>Gửi xác nhận</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Subtle Watercolor Wash Edge at the very bottom */}
      <div className="w-full h-4 bg-gradient-to-t from-[#EAE2D5]/40 to-transparent mt-4 rounded-b-[20px] pointer-events-none select-none"></div>
    </section>
  );
}
