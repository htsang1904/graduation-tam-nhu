import Header from "@/components/invitation/Header";
import HeroSection from "@/components/invitation/HeroSection";
import EventInfoSection from "@/components/invitation/EventInfoSection";
import RsvpSection from "@/components/invitation/RsvpSection";
import Footer from "@/components/invitation/Footer";
import CelebrationFireworks from "@/components/invitation/CelebrationFireworks";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F3ECE0] sm:py-6 md:py-10 px-0 sm:px-4 flex flex-col items-center justify-start selection:bg-[#B6C9F2] selection:text-[#1E3A6D]">
      {/* Interactive Fireworks & Confetti celebration effect on entry */}
      <CelebrationFireworks />

      {/* Centered Invitation Canvas matching the exact proportion and aesthetic of the mockup */}
      <div className="w-full max-w-[840px] bg-[#FAF6EF] shadow-[0_16px_50px_rgba(30,58,109,0.08)] sm:rounded-[26px] overflow-hidden border border-[#E7DFD4]/80 relative flex flex-col">
        <Header />
        <main className="relative overflow-hidden">
          <HeroSection />
          <EventInfoSection />
          <RsvpSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
