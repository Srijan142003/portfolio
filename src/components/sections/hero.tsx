'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

// Replace with your actual photo path (e.g., /profile.jpg in public/)
const PROFILE_PHOTO_URL = "/profile.jpg";

export function Hero() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 100);
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] flex-col justify-center items-center text-center animate-in fade-in slide-in-from-top-16 duration-1000">
      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-10">
        {/* Photo Side */}
        <div className="flex-shrink-0">
          <img
            src={PROFILE_PHOTO_URL}
            alt="Srijan Kundu"
            className="rounded-full w-72 h-72 object-cover shadow-lg border-4 border-primary" // Increased size
          />
        </div>
        {/* Name & Description Side */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
            Srijan Kundu: Machine Learning Engineer
          </h1>
          <p className="mx-auto mt-6 max-w-[700px] text-base text-foreground/80 md:text-lg">
            Passionate about machine learning and leveraging Agentive AI for real-world impact. Focused on developing robust backend, ML-driven tools for diverse applications.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg">
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#contact">
                Contact Me
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Scroll-to-top button appears only when not at the top */}
      {showScrollTop && (
        <Link
          href="#top"
          aria-label="Scroll to top"
          className="fixed bottom-10 right-10 z-50 animate-bounce"
        >
          <ArrowUp className="h-8 w-8 text-foreground/50" />
        </Link>
      )}
    </section>
  );
}
