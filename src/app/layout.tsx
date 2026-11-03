import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Be_Vietnam_Pro, Alex_Brush } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thư Mời Tốt Nghiệp — Trần Đắc Tâm Như",
  description: "Trân trọng kính mời bạn đến tham dự lễ tốt nghiệp đại học của Trần Đắc Tâm Như (Hàn Quốc học — K21, ĐH KHXH&NV, ĐHQG-HCM).",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${cormorantGaramond.variable} ${beVietnamPro.variable} ${alexBrush.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#F9F3E8] text-[#26354B] font-sans antialiased selection:bg-[#B6C9F2] selection:text-[#1E3A6D]"
      >
        {children}
      </body>
    </html>
  );
}
