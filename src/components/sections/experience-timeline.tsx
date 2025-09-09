import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Experience } from '@/lib/definitions';

const experienceData: Experience[] = [
  {
    date: '2021 - Present',
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    description: 'Led the development of a new design system and component library in React and TypeScript, improving developer productivity by 30%. Mentored junior developers and conducted code reviews.',
    image: 'https://picsum.photos/200/200',
    imageHint: 'office building'
  },
  {
    date: '2019 - 2021',
    title: 'Full-Stack Developer',
    company: 'Innovate Co.',
    description: 'Developed and maintained client-facing web applications using the MERN stack. Collaborated with product managers and designers to deliver high-quality features.',
    image: 'https://picsum.photos/200/200',
    imageHint: 'startup office'
  },
  {
    date: '2015 - 2019',
    title: 'Bachelor of Science in Computer Science',
    company: 'University of Technology',
    description: 'Graduated with honors, focusing on software engineering and artificial intelligence. President of the university coding club.',
    image: 'https://picsum.photos/200/200',
    imageHint: 'university campus'
  },
];


export function ExperienceTimeline() {
  return (
    <section id="experience" className="bg-muted/50 py-24 sm:py-32">
        <div className="container">
            <div className="text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">My Journey</h2>
                <p className="mx-auto mt-4 max-w-[700px] text-lg text-foreground/80">
                    A timeline of my professional experience and educational background.
                </p>
            </div>
            <div className="relative mt-12 timeline-container">
                {experienceData.map((item, index) => (
                    <div key={index} className={`timeline-item relative w-1/2 p-4 ${index % 2 === 0 ? 'timeline-left left-0 pr-8' : 'timeline-right left-1/2 pl-8'}`}>
                        <Card className="shadow-md hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={item.image}
                                        alt={item.company}
                                        width={56}
                                        height={56}
                                        data-ai-hint={item.imageHint}
                                        className="h-14 w-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-sm text-muted-foreground">{item.date}</p>
                                        <CardTitle className="text-xl">{item.title}</CardTitle>
                                        <p className="font-semibold text-primary">{item.company}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{item.description}</CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
