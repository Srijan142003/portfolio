'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

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
    <section className="container flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center text-center animate-in fade-in slide-in-from-top-16 duration-1000">
      <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        Srijan Kundu: Machine Learning Engineer
      </h1>
      <p className="mx-auto mt-6 max-w-[700px] text-lg text-foreground/80 md:text-xl">
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
