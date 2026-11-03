"use client";

import React from "react";
import Image from "next/image";
import { INVITATION_DATA } from "@/lib/invitation-data";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-3 pb-6 md:pt-5 md:pb-8 px-4 md:px-8"
    >
      {/* Top-left Hydrangea cluster: cleanly cut out, placed in corner */}
      <div className="absolute top-0 left-0 w-[80px] sm:w-[100px] md:w-[130px] pointer-events-none select-none z-10">
        <Image
          src="/images/hydrangea-top-left.png"
          alt=""
          width={175}
          height={215}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* Hero Grid: Left text, Right portrait */}
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Eyebrow + You're Invited + Text + Ribbon */}
        <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left pt-6 sm:pt-4 md:pt-2 pl-4 sm:pl-8 md:pl-12 pr-4 md:pr-0">
          {/* E-02: Eyebrow */}
          <span className="font-serif uppercase tracking-[0.18em] text-[#1E3A6D] text-[12px] md:text-[13px] font-bold">
            THƯ MỜI TỐT NGHIỆP
          </span>

          {/* Navy Divider Line under eyebrow */}
          <div className="w-10 h-[1.5px] bg-[#1E3A6D] my-2 mx-auto md:mx-0"></div>

          {/* E-03: H1 You're Invited! with heart doodle */}
          <div className="flex items-center justify-center md:justify-start gap-1.5 my-1">
            <h1 className="font-script text-[#1E3A6D] text-[52px] sm:text-[66px] md:text-[76px] leading-[1] select-none tracking-normal">
              {INVITATION_DATA.tagline}
            </h1>
            <span className="text-[#1E3A6D]/80 text-[26px] md:text-[30px] font-serif font-light -mt-4 select-none">
              ♡
            </span>
          </div>

          {/* E-04: Invitation text */}
          <p className="text-[#26354B] text-[14px] md:text-[16px] leading-[1.65] max-w-[290px] md:max-w-[340px] font-serif font-normal mt-2">
            Rất mong được đón tiếp bạn tại<br className="hidden sm:inline" /> buổi lễ tốt nghiệp đại học của mình!
          </p>

          {/* Bow Ribbon Doodle */}
          <div className="mt-3.5 flex justify-center md:justify-start">
            <Image
              src="/images/bow-ribbon.webp"
              alt=""
              width={160}
              height={50}
              className="w-[125px] md:w-[150px] h-auto pointer-events-none select-none"
            />
          </div>
        </div>

        {/* Right Column: HeroPhoto with framed portrait & layered flower */}
        <div className="md:col-span-6 flex justify-center md:justify-end relative pr-0 md:pr-4 mt-2 md:mt-0">
          <div className="relative w-full max-w-[270px] sm:max-w-[300px] md:max-w-[335px] rounded-[24px] overflow-hidden shadow-[0_8px_24px_rgba(30,58,109,0.06)] border border-[#E7DFD4] bg-[#FFFDF9]">
            <Image
              src="/images/tam-nhu-portrait.webp"
              alt="Tâm Như trong lễ phục tốt nghiệp"
              width={395}
              height={500}
              className="w-full h-auto object-cover"
              priority
              sizes="(max-width: 768px) 300px, 340px"
            />
          </div>

          {/* Hydrangea cluster on bottom-right of the photo */}
          <div className="absolute -bottom-5 -right-3 md:-right-5 w-[110px] md:w-[145px] pointer-events-none select-none z-20">
            <Image
              src="/images/hydrangea-bottom-right.webp"
              alt=""
              width={160}
              height={140}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
