import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { SkillVisualizer } from '@/components/sections/skill-visualizer';
import { ProjectShowcase } from '@/components/sections/project-showcase';
import { ExperienceTimeline } from '@/components/sections/experience-timeline';
import { ContactForm } from '@/components/sections/contact-form';
import { Certifications } from '@/components/sections/certifications';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <SkillVisualizer />
        <ProjectShowcase />
        <ExperienceTimeline />
        <Certifications />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
