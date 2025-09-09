import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Srijan Kundu. All Rights Reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
            <Link href="https://github.com/Srijan142003" target="_blank" rel="noreferrer">
                <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
            <Link href="https://linkedin.com/in/srijan-kundu-1355231a6" target="_blank" rel="noreferrer">
                <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
        </div>
      </div>
    </footer>
  );
}
