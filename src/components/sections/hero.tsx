import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center text-center">
      <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        John Doe: Creative Developer
      </h1>
      <p className="mx-auto mt-6 max-w-[700px] text-lg text-foreground/80 md:text-xl">
        I build beautiful, responsive, and user-friendly web applications.
        Specializing in modern frontend technologies and turning ideas into
        digital reality.
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
      <Link href="#skills" aria-label="Scroll to next section" className="absolute bottom-10 animate-bounce">
        <ArrowDown className="h-8 w-8 text-foreground/50" />
      </Link>
    </section>
  );
}
