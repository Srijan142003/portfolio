import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Certification } from '@/lib/definitions';
import { Button } from '../ui/button';
import { ExternalLink } from 'lucide-react';

const certificationData: Certification[] = [
    {
      issuer: 'University of Colorado',
      logoUrl: 'https://logo.clearbit.com/colorado.edu',
      title: 'Advanced System Security Topics',
      date: 'Issued Aug 2025',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/BAX50HW11KWH',
      skills: ['Geolocation', 'Security Management', 'Authorization', 'Access Control'],
    },
    {
      issuer: 'University of Colorado',
      logoUrl: 'https://logo.clearbit.com/colorado.edu',
      title: 'Cloud Computing Security',
      date: 'Issued Aug 2025',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/7KFCUFWFO9JY',
      skills: ['Amazon Web Services (AWS)', 'Cloud Computing', 'AWS Identity and Access Management (AWS IAM)', 'Apache'],
    },
    {
      issuer: 'University of Colorado',
      logoUrl: 'https://logo.clearbit.com/colorado.edu',
      title: 'DDoS Attacks and Defenses',
      date: 'Issued Aug 2025',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/KI1VDWXXFGWQ',
      skills: ['DDoS', 'DDoS Mitigation'],
    },
    {
      issuer: 'DeepLearning.AI',
      logoUrl: 'https://logo.clearbit.com/deeplearning.ai',
      title: 'Advanced Learning Algorithms',
      date: 'Issued Jul 2023',
      credentialUrl: 'https://coursera.org/share/8aaef37e6ec6df4093f3e7d6653079af',
      skills: ['Algorithms', 'Machine Learning'],
    },
    {
      issuer: 'Coursera',
      logoUrl: 'https://logo.clearbit.com/coursera.org',
      title: 'Machine Learning',
      date: 'Issued Jul 2023',
      credentialUrl: 'https://coursera.org/share/caa91092683be8344f7dd7e378c1a2de',
      skills: ['Machine Learning', 'Python (Programming Language)'],
    },
    {
      issuer: 'DeepLearning.AI',
      logoUrl: 'https://logo.clearbit.com/deeplearning.ai',
      title: 'Supervised Machine Learning',
      date: 'Issued Jul 2023',
      credentialUrl: 'https://coursera.org/share/e416110b85ddbcb4d3f06603ed6bf3f0',
      skills: ['Supervised Learning', 'Machine Learning'],
    },
    {
      issuer: 'DeepLearning.AI',
      logoUrl: 'https://logo.clearbit.com/deeplearning.ai',
      title: 'Unsupervised Learning, Recommenders, R...',
      date: 'Issued Jul 2023',
      credentialUrl: 'https://coursera.org/share/ac78841986d21cd8113538f68a5d5c6d',
      skills: ['Unsupervised Learning', 'Recommender Systems', 'Reinforcement Learning', 'Machine Learning'],
    },
  ];

export function Certifications() {
    return (
        <section id="certifications" className="py-24 sm:py-32 animate-in fade-in slide-in-from-bottom-16 duration-1000">
            <div className="container">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Certifications</h2>
                    <p className="mx-auto mt-4 max-w-[700px] text-lg text-foreground/80">
                        A collection of my professional certifications and qualifications.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
                    {certificationData.map((cert, index) => (
                        <Card 
                            key={cert.title} 
                            className="group flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 animate-in fade-in"
                            style={{animationDelay: `${index * 150}ms`}}
                        >
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    <Image
                                        src={cert.logoUrl}
                                        alt={`${cert.issuer} logo`}
                                        width={56}
                                        height={56}
                                        className="h-14 w-14 rounded-md object-contain"
                                    />
                                    <div>
                                        <CardTitle className="text-xl">{cert.title}</CardTitle>
                                        <CardDescription className="font-semibold text-primary">{cert.issuer}</CardDescription>
                                        <p className="text-sm text-muted-foreground">{cert.date}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-1 flex-col">
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {cert.skills.map(skill => (
                                        <Badge key={skill} variant="secondary">{skill}</Badge>
                                    ))}
                                </div>
                                <div className="flex-1" />
                                <Button asChild variant="outline" className="mt-6 w-fit">
                                    <Link href={cert.credentialUrl} target="_blank">
                                        <ExternalLink className="mr-2 h-4 w-4" /> Show Credential
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
