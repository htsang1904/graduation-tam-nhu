import React from "react";
import { CheckCircle2 } from "lucide-react";

interface RsvpSuccessProps {
  onReset: () => void;
}

export default function RsvpSuccess({ onReset }: RsvpSuccessProps) {
  return (
    <div className="py-12 md:py-16 text-center space-y-4 animate-fadeIn">
      <div className="w-16 h-16 bg-white text-[#1E3A6D] rounded-full flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 className="w-10 h-10 text-[#6B8FCE]" />
      </div>
      <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#1E3A6D]">
        Cảm ơn bạn! ♡
      </h3>
      <p className="text-[15px] md:text-[17px] text-[#26354B] max-w-md mx-auto leading-relaxed">
        Mình đã nhận được xác nhận của bạn. Hẹn gặp lại bạn tại buổi lễ tốt nghiệp nhé! 💙
      </p>
      <div className="pt-4">
        <button
          type="button"
          onClick={onReset}
          className="text-[14px] font-medium text-[#1E3A6D] underline hover:text-[#6B8FCE] transition-colors"
        >
          Gửi một phản hồi khác
        </button>
      </div>
    </div>
  );
}
