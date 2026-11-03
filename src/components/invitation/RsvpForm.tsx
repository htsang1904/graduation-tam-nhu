"use client";

import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import RsvpSuccess from "./RsvpSuccess";

export default function RsvpForm() {
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no" | "">("yes"); // Default to yes as shown in mock
  const [companions, setCompanions] = useState(0);
  const [message, setMessage] = useState("");
  const [websiteHp, setWebsiteHp] = useState(""); // Honeypot anti-bot

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ guestName?: string; attendance?: string; form?: string }>({});

  const validate = () => {
    const newErrors: { guestName?: string; attendance?: string } = {};
    if (!guestName.trim()) {
      newErrors.guestName = "Vui lòng nhập họ và tên của bạn.";
    } else if (guestName.trim().length < 2) {
      newErrors.guestName = "Tên cần có ít nhất 2 ký tự.";
    }

    if (!attendance) {
      newErrors.attendance = "Vui lòng chọn bạn có tham dự hay không.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // 1. Bot honeypot protection
      if (websiteHp && websiteHp.trim().length > 0) {
        setIsSuccess(true);
        return;
      }

      // 2. Direct write to Firestore via client SDK (resilient, instant, no serverless cold start)
      try {
        const { db } = await import("@/lib/firebase-client");
        const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");

        await addDoc(collection(db, "rsvps"), {
          guestName: guestName.trim(),
          attendance,
          companions: attendance === "yes" ? Number(companions) : 0,
          message: message.trim(),
          createdAt: serverTimestamp(),
        });

        setIsSuccess(true);
        return;
      } catch (clientErr) {
        console.warn("Direct Firestore write failed, attempting /api/rsvp fallback...", clientErr);
      }

      // 3. Fallback to API route if client-side direct write failed
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

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Có lỗi xảy ra, vui lòng thử lại sau.");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      setErrors({
        form: err instanceof Error ? err.message : "Không thể gửi phản hồi. Vui lòng thử lại!",
      });
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
    setErrors({});
  };

  if (isSuccess) {
    return <RsvpSuccess onReset={handleReset} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field */}
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

      {/* Form Error Banner */}
      {errors.form && (
        <div className="p-3 rounded-[10px] bg-rose-50 border border-rose-200 text-[#B44444] text-[13px] text-center">
          {errors.form}
        </div>
      )}

      {/* 2-Column Grid matching mockup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-start">
        {/* Left Column: Họ và tên + Số người đi cùng */}
        <div className="space-y-4">
          {/* R-03: Name Input */}
          <div>
            <label
              htmlFor="guestName"
              className="block text-[14px] font-semibold text-[#1E3A6D] mb-1.5"
            >
              Họ và tên <span className="text-[#B44444]">*</span>
            </label>
            <input
              id="guestName"
              type="text"
              placeholder="Nhập họ và tên của bạn"
              value={guestName}
              onChange={(e) => {
                setGuestName(e.target.value);
                if (errors.guestName) setErrors((prev) => ({ ...prev, guestName: undefined }));
              }}
              className="w-full h-[42px] px-3.5 rounded-[9px] bg-[#FFFDF9] border border-[#D9D3CB] text-[14px] text-[#26354B] placeholder:text-[#657083]/60 transition-colors focus:bg-white focus:outline-none"
              disabled={isLoading}
            />
            {errors.guestName && (
              <p className="text-[12px] text-[#B44444] mt-1">{errors.guestName}</p>
            )}
          </div>

          {/* R-05: Companion Select (only if attendance === 'yes') */}
          {attendance === "yes" && (
            <div className="animate-fadeIn">
              <label
                htmlFor="companions"
                className="block text-[14px] font-semibold text-[#1E3A6D] mb-1.5"
              >
                Số người đi cùng (nếu có)
              </label>
              <div className="relative w-full">
                <select
                  id="companions"
                  value={companions}
                  onChange={(e) => setCompanions(Number(e.target.value))}
                  className="w-full h-[42px] px-3.5 rounded-[9px] bg-[#FFFDF9] border border-[#D9D3CB] text-[14px] text-[#26354B] appearance-none cursor-pointer focus:bg-white focus:outline-none"
                  disabled={isLoading}
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#1E3A6D]">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Bạn có tham dự không? + Lời nhắn đến mình */}
        <div className="space-y-4">
          {/* R-04: Attendance Radio */}
          <div>
            <label className="block text-[14px] font-semibold text-[#1E3A6D] mb-1.5">
              Bạn có tham dự không? <span className="text-[#B44444]">*</span>
            </label>
            <div className="space-y-2 pt-0.5">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={attendance === "yes"}
                  onChange={() => {
                    setAttendance("yes");
                    if (errors.attendance) setErrors((prev) => ({ ...prev, attendance: undefined }));
                  }}
                  className="w-4 h-4 text-[#1E3A6D] accent-[#1E3A6D] border-[#D9D3CB]"
                  disabled={isLoading}
                />
                <span className="text-[14px] font-medium text-[#26354B]">
                  Có, mình sẽ tham dự!
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={attendance === "no"}
                  onChange={() => {
                    setAttendance("no");
                    setCompanions(0);
                    if (errors.attendance) setErrors((prev) => ({ ...prev, attendance: undefined }));
                  }}
                  className="w-4 h-4 text-[#1E3A6D] accent-[#1E3A6D] border-[#D9D3CB]"
                  disabled={isLoading}
                />
                <span className="text-[14px] text-[#657083]">
                  Rất tiếc, mình không tham dự được.
                </span>
              </label>
            </div>
            {errors.attendance && (
              <p className="text-[12px] text-[#B44444] mt-1">{errors.attendance}</p>
            )}
          </div>

          {/* R-06: Message Textarea */}
          <div>
            <label
              htmlFor="message"
              className="block text-[14px] font-semibold text-[#1E3A6D] mb-1.5"
            >
              Lời nhắn đến mình ♡
            </label>
            <textarea
              id="message"
              placeholder="Gửi cho mình một lời chúc nhé!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              rows={3}
              className="w-full p-3 rounded-[9px] bg-[#FFFDF9] border border-[#D9D3CB] text-[14px] text-[#26354B] placeholder:text-[#657083]/60 resize-none transition-colors focus:bg-white focus:outline-none"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* R-07: Submit Button Centered */}
      <div className="pt-3 flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-[220px] h-[44px] px-6 rounded-full bg-[#1E3A6D] hover:bg-[#172F59] text-white text-[14px] font-semibold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Đang gửi...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Gửi xác nhận</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
