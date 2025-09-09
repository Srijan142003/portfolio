'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/definitions';

const projectsData: Project[] = [
  {
    category: 'Web',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce site with product listings, cart functionality, and a secure checkout process, built with Next.js and Stripe.',
    image: 'https://picsum.photos/600/400',
    imageHint: 'online store',
    tags: ['Next.js', 'React', 'Stripe', 'Tailwind CSS'],
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    category: 'AI',
    title: 'AI Content Generator',
    description: 'A SaaS application that uses generative AI to create marketing copy, blog posts, and social media updates for businesses.',
    image: 'https://picsum.photos/600/400',
    imageHint: 'AI interface',
    tags: ['Python', 'FastAPI', 'React', 'GenAI'],
    liveUrl: '#',
  },
  {
    category: 'Mobile',
    title: 'Fitness Tracker App',
    description: 'A cross-platform mobile app for tracking workouts, setting goals, and visualizing progress, built with React Native.',
    image: 'https://picsum.photos/400/600',
    imageHint: 'mobile app',
    tags: ['React Native', 'Firebase', 'iOS', 'Android'],
    sourceUrl: '#',
  },
  {
    category: 'Web',
    title: 'Portfolio Website Builder',
    description: 'A dynamic website builder that allows users to create and customize their own portfolio websites with an intuitive drag-and-drop interface.',
    image: 'https://picsum.photos/600/400',
    imageHint: 'web builder',
    tags: ['React', 'Node.js', 'MongoDB'],
    liveUrl: '#',
    sourceUrl: '#',
  },
];

const categories: ('All' | Project['category'])[] = ['All', 'Web', 'AI', 'Mobile'];

export function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState<'All' | Project['category']>('All');

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="container py-24 sm:py-32">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Project Showcase</h2>
        <p className="mx-auto mt-4 max-w-[700px] text-lg text-foreground/80">
          A selection of my best work. Explore my projects to see my skills in action.
        </p>
      </div>

      <div className="my-8 flex justify-center gap-2">
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'ghost'}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.title} className="flex flex-col overflow-hidden transition-all hover:shadow-xl">
            <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                    <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={400}
                        data-ai-hint={project.imageHint}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            </CardHeader>
            <div className="flex flex-1 flex-col p-6">
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="mt-2 flex-1">{project.description}</CardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
            </div>
            <CardFooter className="p-6 pt-0">
                <div className="flex w-full justify-between">
                    {project.liveUrl && (
                        <Button asChild variant="outline">
                            <Link href={project.liveUrl} target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                            </Link>
                        </Button>
                    )}
                    {project.sourceUrl && (
                        <Button asChild variant="ghost">
                            <Link href={project.sourceUrl} target="_blank">
                                <Github className="mr-2 h-4 w-4" /> Source
                            </Link>
                        </Button>
                    )}
                </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
