import React from "react";
import Image from "next/image";

interface FloralAccentProps {
  position: "top-left" | "bottom-right";
  className?: string;
}

export default function FloralAccent({ position, className = "" }: FloralAccentProps) {
  if (position === "top-left") {
    return (
      <div
        className={`absolute top-0 left-0 w-[80px] sm:w-[100px] md:w-[130px] pointer-events-none select-none z-10 ${className}`}
        aria-hidden="true"
      >
        <Image
          src="/images/hydrangea-top-left.png"
          alt=""
          width={175}
          height={215}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    );
  }

  return (
    <div
      className={`absolute bottom-0 right-0 w-[100px] md:w-[145px] pointer-events-none select-none z-10 ${className}`}
      aria-hidden="true"
    >
      <Image
        src="/images/hydrangea-bottom-right.webp"
        alt=""
        width={160}
        height={140}
        className="w-full h-auto object-contain"
      />
    </div>
  );
}
