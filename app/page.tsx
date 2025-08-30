"use client";
import CTASection from "@/components/home/cta-section/page";
import Features from "@/components/home/features/page";
import Footer from "@/components/home/footer/page";
import Hero from "@/components/home/hero/page";
import Navbar from "@/components/home/navigation/page";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <Hero />
      <Features />
      <CTASection />
      <Footer />
    </div>
  );
}
