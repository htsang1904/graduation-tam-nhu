import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative pt-4 pb-8 text-center bg-transparent">
      {/* Bottom right hydrangea cluster matching mockup */}
      <div className="absolute -bottom-2 -right-2 w-[120px] md:w-[170px] pointer-events-none select-none z-10 opacity-90">
        <Image
          src="/images/hydrangea-bottom-right.webp"
          alt=""
          width={254}
          height={186}
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center space-y-2 px-4">
        {/* F-01: Divider */}
        <div className="w-[80px] md:w-[120px] h-[1px] bg-[#1E3A6D]/25 mb-1"></div>

        {/* F-02: Thank-you message */}
        <p className="font-serif italic text-[16px] md:text-[19px] text-[#1E3A6D]">
          Cảm ơn vì đã là một phần thanh xuân của mình ♡
        </p>

        {/* F-03: Signature */}
        <p className="text-[12px] md:text-[13px] text-[#657083] font-light">
          Trần Đắc Tâm Như · 2026
        </p>

        {/* Discrete Admin Link */}
        <div className="pt-1">
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 text-[11px] text-[#657083]/40 hover:text-[#1E3A6D] transition-colors"
            title="Quản trị"
          >
            <Lock className="w-3 h-3" />
            <span>Quản trị</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
