import React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-4 px-6 border-t border-[#E7DFD4]/50 text-center text-xs text-[#657083] bg-transparent mt-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-light">
          Made with love for <span className="font-medium text-[#1E3A6D]">Tâm Như&apos;s Graduation</span> · 2026
        </p>

        {/* Discrete Admin Link */}
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-1 text-[11px] text-[#657083]/60 hover:text-[#1E3A6D] transition-colors"
          title="Trang quản trị (Dành riêng cho chủ tiệc)"
        >
          <Lock className="w-3 h-3" />
          <span>Quản trị</span>
        </Link>
      </div>
    </footer>
  );
}
