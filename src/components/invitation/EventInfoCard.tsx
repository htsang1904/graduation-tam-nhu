import React from "react";

interface EventInfoCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function EventInfoCard({
  icon,
  title,
  subtitle,
  children,
}: EventInfoCardProps) {
  return (
    <div className="bg-[#FFFDF9] border border-[#E7DFD4] rounded-[18px] p-6 text-center shadow-[0_4px_20px_rgba(30,58,109,0.03)] min-h-[124px] md:min-h-[170px] flex flex-col items-center justify-center transition-all hover:border-[#6B8FCE]/60">
      <div className="w-11 h-11 rounded-full bg-[#B6C9F2]/25 flex items-center justify-center text-[#1E3A6D] mb-3">
        {icon}
      </div>
      <p className="font-serif text-[16px] md:text-[18px] font-semibold text-[#1E3A6D] leading-snug">
        {title}
      </p>
      {subtitle && (
        <p className="text-[13px] md:text-[14px] text-[#657083] font-light mt-1 leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
