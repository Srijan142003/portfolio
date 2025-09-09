import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Experience } from '@/lib/definitions';

const experienceData: Experience[] = [
  {
    date: 'Aug 2022 - Jun 2026',
    title: 'B. Tech in Computer Science & Engineering',
    company: 'KIIT Deemed to be University, Bhubaneswar, India',
    description: 'CGPA till 6th Semester: 7.14.',
    image: 'https://picsum.photos/200/200',
    imageHint: 'university campus'
  },
  {
    date: 'Completed 2022',
    title: 'High School Education (CBSE)',
    company: 'Sister Nivedita Public School, Malda',
    description: 'Class 12: 75%, Class 10: 85%',
    image: 'https://picsum.photos/200/200',
    imageHint: 'school building'
  }
];


export function ExperienceTimeline() {
  return (
    <section id="experience" className="bg-muted/50 py-24 sm:py-32">
        <div className="container">
            <div className="text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">My Journey</h2>
                <p className="mx-auto mt-4 max-w-[700px] text-lg text-foreground/80">
                    A timeline of my educational background.
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
