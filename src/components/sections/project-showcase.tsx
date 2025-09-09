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
    category: 'AI',
    title: 'JUSTICE-FOR-ALL',
    description: 'A Flask-based web application that allows users to submit legal case descriptions or upload documents for unbiased AI-driven verdict analysis. The backend uses Gemini AI and Indian Kanoon APIs.',
    image: '/images/justice.jpg',
    imageHint: 'justice key',
    tags: ['Python', 'Flask', 'Gemini AI', 'Indian Kanoon API'],
    liveUrl: 'https://justice-for-all.onrender.com',
  },
  {
    category: 'AI',
    title: 'Research-AI',
    description: 'A Python-based project designed to help researchers and students bridge ideas and gaps from research papers across various topics. This project utilizes the Gemini API for advanced language understanding and leverages the CORE research database, providing access to millions of academic papers.',
    image: 'https://picsum.photos/seed/ai-research/600/400',
    imageHint: 'AI brain',
    tags: ['Python', 'Gemini API', 'AI'],
    liveUrl: 'https://re-ease-search.vercel.app',
  },
  {
    category: 'AI',
    title: 'OCR for Medical Applications',
    description: 'Developed an OCR system with Gemini Flash 2.0 to extract and summarize prescriptions and medical reports. This tool is integrated into a medical application, making healthcare data more accessible and actionable.',
    image: 'https://picsum.photos/seed/medical-ocr/600/400',
    imageHint: 'medical scan',
    tags: ['OCR', 'Python', 'Image Processing', 'Gemini AI'],
    sourceUrl: 'https://github.com/Srijan142003/OCR-v02',
  },
  {
    category: 'AI',
    title: 'Spam SMS Detection',
    description: 'A Machine Learning model to detect spam SMS messages.',
    image: 'https://picsum.photos/seed/spam-alert/600/400',
    imageHint: 'spam alert',
    tags: ['Machine Learning', 'Python'],
    sourceUrl: 'https://github.com/Srijan142003/CODSOFT',
  },
  {
    category: 'AI',
    title: 'Customer Churn Prediction',
    description: 'A Machine Learning model to predict customer churn.',
    image: 'https://picsum.photos/seed/customer-churn/600/400',
    imageHint: 'customer analytics',
    tags: ['Machine Learning', 'Python'],
    sourceUrl: 'https://github.com/Srijan142003/CODSOFT',
  },
  {
    category: 'AI',
    title: 'Movie Genre Classification',
    description: 'A Machine Learning model to classify movie genres.',
    image: 'https://picsum.photos/seed/movie-genre/600/400',
    imageHint: 'film reels',
    tags: ['Machine Learning', 'Python'],
    sourceUrl: 'https://github.com/Srijan142003/CODSOFT',
  },
  {
    category: 'Web',
    title: 'University Bot Portal',
    description: 'Designed a University Bot Portal to automate academic and administrative tasks. It provides exam schedules, certificate generation (NOC/Bonafide), and attendance-based leave auto-approval using custom API and MongoDB.',
    image: 'https://picsum.photos/seed/university-portal/600/400',
    imageHint: 'university portal',
    tags: ['Chatbot', 'MongoDB', 'API'],
    sourceUrl: 'https://github.com/Srijan142003/University-ChatBot',
  },
];

const categories: ('All' | Project['category'])[] = ['All', 'Web', 'AI'];

export function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState<'All' | Project['category']>('All');

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="container py-24 sm:py-32 animate-in fade-in slide-in-from-bottom-16 duration-1000">
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
        {filteredProjects.map((project, index) => (
          <Card 
            key={project.title} 
            className="group flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 animate-in fade-in"
            style={{animationDelay: `${index * 150}ms`}}
          >
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
