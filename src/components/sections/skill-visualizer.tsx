'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { getRecommendedSkills } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  resume: z.string().min(100, {
    message: 'Content must be at least 100 characters.',
  }),
});

const skillsWithLogos: { name: string; logo: JSX.Element }[] = [
    { name: "C", logo: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.234 1.455c-.445-1.052-1.89-1.28-2.654-.438-.592.65-.534 1.63.13 2.185l5.81 4.793-5.81 4.793c-.664.555-.722 1.535-.13 2.185.764.842 2.21.614 2.654-.438l6.923-10.385c.427-.64.427-1.46 0-2.1zM9.766 22.545c.445 1.052 1.89 1.28 2.654.438.592-.65.534-1.63-.13-2.185l-5.81-4.793 5.81-4.793c.664-.555.722-1.535.13-2.185-.764-.842-2.21-.614-2.654.438L2.843 11.615c-.427.64-.427 1.46 0 2.1z"/></svg> },
    { name: "Java", logo: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.613 13.628c.783.223 1.69.608 2.378 1.013.344.202.937.56 1.341.543.435-.017.838-.439.99-.745.234-.47.168-1.079.03-1.587-.31-.97-1.07-3.003-1.12-3.116-.27-1.025.23-1.74.23-1.74s-.273.4-.176.993c.18.9.722 2.01 1.365 2.59.833.748 2.112.834 2.822.42.37-.215.77-.66.77-.66s-.79.317-1.312.18c-.523-.137-.735-.558-1.092-1.166-.347-.59-.8-1.65-1.146-2.45-.29-.66-.43-1.2-.43-1.2s.98.54 1.22 1.52c.24 1 .15 1.82.15 1.82s-.27-1.63-1.5-2.5c-1.23-.87-2.85-.3-3.6.72-.75 1.02-.39 2.4.21 3.24zm8.016-9.628c-1.303 0-2.408.84-2.408 2.317 0 1.205.67 2.016 1.317 2.385.648.368 1.487.35 2.155.03.668-.32 1.056-.93 1.056-1.577 0-1.87-1.36-3.155-2.12-3.155zm-.05 1.077c.602 0 .86.53.86 1.13 0 .6-.258 1.08-.86 1.08-.602 0-.86-.49-.86-1.08s.258-1.13.86-1.13zm-1.87 6.13c-.234.33-.016.55.22.64.235.09.48.01.62-.21.23-.34.01-.55-.22-.64-.23-.09-.48-.01-.62.21zm.9 3.82c-3.172 0-3.31-2.43-3.31-2.43s2.39-.08 3.31.02c.92.1 3.3.62 3.3.62s-.42 1.79-3.3 1.79zm1.75-2.91c-.55-2.02-2.1-3.41-2.1-3.41s.57.51.81 1.07c.24.56.24 1.3.24 1.3s1.23.18 1.38.3c.15.12-.33.74-.33.74z"/></svg> },
    { name: "Python", logo: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.123 10.062c-.328-1.63-1.65-2.97-3.26-3.328l-2.08-.47C15.698 5.755 14.193 5 12.5 5h-1c-1.693 0-3.198.755-4.283 1.264l-2.08.47c-1.61.358-2.932 1.698-3.26 3.328L1.408 12l.469 1.938c.328 1.63 1.65 2.97 3.26 3.328l2.08.47C8.302 18.245 9.807 19 11.5 19h1c1.693 0 3.198-.755 4.283-1.264l2.08-.47c1.61-.358 2.932-1.698 3.26-3.328L22.592 12l.531-1.938zM12 17.5c-3.033 0-5.5-2.468-5.5-5.5s2.467-5.5 5.5-5.5h1c1.238 0 2.39.404 3.29 1.09l.138.103.11.086c.026.02.05.04.075.064.21.17.398.36.56.56.024.026.044.05.064.075l.086.11.103.138C17.096 9.61 17.5 10.762 17.5 12h-5.75c-1.517 0-2.75 1.233-2.75 2.75s1.233 2.75 2.75 2.75H12c0 .01 0 .01 0 0zm0-11c0-.01 0-.01 0 0h5.75c1.517 0 2.75-1.233 2.75-2.75S19.267 1 17.75 1h-5.5c-3.033 0-5.5 2.468-5.5 5.5s2.467 5.5 5.5 5.5H12zm0 13c-1.238 0-2.39-.404-3.29-1.09l-.138-.103-.11-.086c-.026-.02-.05-.04-.075-.064-.21-.17-.398-.36-.56-.56-.024-.026-.044-.05-.064-.075l-.086-.11-.103-.138C7.904 14.39 7.5 13.238 7.5 12h5.75c1.517 0 2.75 1.233 2.75 2.75S14.767 17.5 13.25 17.5H12v.01c0-.01 0 0 0 0zm0-11h-5.75C4.733 8.5 3.5 9.733 3.5 11.25S4.733 14 6.25 14h5.5c3.033 0 5.5-2.468 5.5-5.5S15.033 3 11.75 3h-5.5C3.217 3 1 5.217 1 8.25V12h2.5V8.25C3.5 6.841 4.591 5.75 6 5.75h5.5c.138 0 .275.003.41.01H12v2.74h-.25zM23 15.75V12h-2.5v3.75c0 1.409-1.091 2.5-2.5 2.5H12.41c.135-.247.26-.504.378-.768l.012-.022H17.75c1.517 0 2.75-1.233 2.75-2.75S19.267 14 17.75 14H12v-2.75h.25C15.283 11.25 17.5 9.033 17.5 6h5.5c3.033 0 5.5 2.467 5.5 5.5 0 2.783-2.067 5.067-4.75 5.45V15.75z"/></svg> },
    { name: "TensorFlow", logo: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.711 3.825l-2.003.001c-2.492.002-3.213 1.583-3.28 2.688l-.001 8.989c.068 1.107.788 2.688 3.28 2.688l2.003.001v-2.126l-2.003-.001c-1.077 0-1.272-.34-1.277-1.062l.001-7.989c.005-.723.2-1.063 1.277-1.063l2.003-.001zm14.161.599l-3.329 5.766 3.329 5.766h-2.593l-2.063-3.573-2.063 3.573h-2.593l3.329-5.766-3.329-5.766h2.593l2.063 3.573 2.063-3.573z"/></svg> },
    { name: "Numpy", logo: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m22.28 10.95-6.9-6.93a1.53 1.53 0 0 0-1.1-.47h-1.89L21.31 12l-8.92 8.45h1.89a1.53 1.53 0 0 0 1.1-.47l6.9-6.93a1.59 1.59 0 0 0 0-2.1m-9.35 1.52-3.14-3L1.72 17.54h3.79l3.63-8.07m-5.32-6.57L1.72 9.46l4.75-4.52H4.22M15.39.01 4.25 10.93a1.59 1.59 0 0 0 0 2.1l4.74 4.75L1.72 24h16.21a1.55 1.55 0 0 0 1.54-1.54V1.55A1.55 1.55 0 0 0 17.93.01Z"/></svg> },
    { name: "MongoDB", logo: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.353 24c-.208 0-.417-.008-.626-.025-.572-.045-1.123-.15-1.638-.323-2.923-.96-5.11-3.665-5.11-6.852 0-3.35 2.408-6.17 5.5-6.81v-1.076c-4.142.668-7.25 4.25-7.25 8.385 0 3.73 2.514 6.94 5.923 8.01-.202-.656-.31-1.343-.31-2.038 0-1.13.29-2.203.82-3.14l-2.028-2.027c.05-2.043 1.68-3.68 3.72-3.73v-2.06c-5.46.54-9.75 5.12-9.75 10.59 0 3.03 1.22 5.78 3.2 7.78s4.75 3.22 7.78 3.22c3.03 0 5.78-1.22 7.78-3.22s3.22-4.75 3.22-7.78c0-5.47-4.29-9.95-9.75-10.59v2.06c2.04.05 3.67 1.687 3.72 3.73l-7.44 7.44c.05.15.09.3.13.45.19.72.29 1.47.29 2.23 0 4.14-3.36 7.5-7.5 7.5zm.147-15.6c-.205 0-.41-.01-.615-.02-2.924-.13-5.282-2.58-5.282-5.58s2.358-5.45 5.282-5.58c.205-.01.41-.02.615-.02s.41.01.615.02c2.924.13 5.282 2.58 5.282 5.58s-2.358 5.45-5.282 5.58c-.205.01-.41.02-.615.02z"/></svg> },
    { name: "SAP NetWeaver", logo: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0L.63 6.642v10.716L12 24l11.37-6.642V6.642zM4.037 8.358l7.962 4.582 7.963-4.582-7.963-4.582zM2.63 16.03V8.89l8.688 5.013v1.442zm18.74-7.14v7.14l-8.688-5.013v-1.442zM4.037 17.642l7.962 4.582 7.963-4.582-7.963-4.582z"/></svg> },
    { name: "Flask", logo: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0C5.375 0 0 5.375 0 12c0 .99.12 1.96.35 2.88.09.36.48.55.84.47.37-.09.55-.48.47-.84C1.45 13.52 1.25 12.77 1.25 12c0-5.93 4.82-10.75 10.75-10.75S22.75 6.07 22.75 12c0 5.42-4.02 9.9-9.25 10.64v-5.25c0-.41-.34-.75-.75-.75s-.75.34-.75.75v5.25c-5.23-.74-9.25-5.22-9.25-10.64C2.75 6.77 7.02 2.5 12 2.5s9.25 4.27 9.25 9.5c0 .99-.14 1.96-.41 2.88-.09.36.1.75.47.84.07.02.15.02.22.02.29 0 .56-.18.68-.45.28-.94.44-1.93.44-2.95C24 5.375 18.625 0 12 0zm-2.04 12c.03-.5.45-.88.95-.88.49 0 .9.36.95.84.1.72-2.03 1-1.9 1 .53 0 .42-.29.4-.55l-.4-.01zM11.53 9.4c-.03.5-.45.88-.95.88-.49 0-.9-.36-.95-.84-.1-.72 2.03-1 1.9-1-.53 0-.42.29-.4.55l.4.01zM14.04 12c-.03-.5-.45-.88-.95-.88-.49 0-.9.36-.95.84-.1.72 2.03 1 1.9 1-.53 0-.42-.29-.4-.55l.4-.01zm-.47-2.6c.03-.5.45-.88.95-.88.49 0 .9.36.95.84.1.72-2.03 1-1.9 1-.53 0-.42-.29-.4-.55l-.4-.01z"/></svg> },
    { name: "HTML", logo: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622-13.22.002.607 7.042h8.777l-.272 2.85-2.923.82-2.613-.828-.184-2.22h-2.582l.346 3.993 4.965 1.702 5.022-1.702.64-6.855h-9.13z"/></svg> },
    { name: "Google Colab", logo: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 12a2.98 2.98 0 0 1-1.42 2.53l-3.26 1.83c-1.22.68-1.22 2.45 0 3.13l3.26 1.83A2.98 2.98 0 0 1 24 24h-4.2c-1.02 0-1.99-.5-2.6-1.34l-3.04-4.04a2.98 2.98 0 0 0-4.32 0l-3.04 4.04c-.6.85-1.58 1.34-2.6 1.34H0a2.98 2.98 0 0 1 1.42-2.53l3.26-1.83c1.22-.68 1.22-2.45 0-3.13L1.42 9.47A2.98 2.98 0 0 1 0 7h4.2c1.02 0 1.99.5 2.6 1.34l3.04 4.04c1.22 1.62 3.1 1.62 4.32 0l3.04-4.04c.6-.85 1.58-1.34 2.6-1.34H24a2.98 2.98 0 0 1-1.58 2.53L19.16 12l3.26 1.83A2.98 2.98 0 0 1 24 12Z"/></svg> },
    { name: "Shell Script", logo: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2 11l7.43-7.43a.996.996 0 0 1 1.41 0l1.41 1.41c.39.39.39 1.02 0 1.41L7.13 11.5l5.13 5.13c.39.39.39 1.02 0 1.41l-1.41 1.41c-.39.39-1.02.39-1.41 0L2 13V11zm11 11h9V2h-9v22z"/></svg> },
    { name: "Oracle Database", logo: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-2.42 1.18-4.57 3-5.89V17.9C5.18 16.57 4 14.42 4 12zm5 7.93V4.07C9.65 3.52 10.79 3 12 3s2.35.52 3 1.07v15.86c-.65.55-1.79 1.07-3 1.07s-2.35-.52-3-1.07zM20 12c0 2.42-1.18 4.57-3 5.89V6.11C18.82 7.43 20 9.58 20 12z"/></svg> },
    { name: "Socket Programming", logo: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg> }
  ];

const staticSkills = skillsWithLogos.map(skill => skill.name);

const SkillBadge = ({ name, logo, isHighlighted }: { name: string; logo: JSX.Element; isHighlighted: boolean; }) => (
    <div 
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-base transition-all hover:scale-105 animate-in fade-in-0 zoom-in-95 ${isHighlighted ? 'border-transparent bg-primary text-primary-foreground' : 'border-transparent bg-secondary text-secondary-foreground'}`}
    >
      {logo}
      <span>{name}</span>
    </div>
);


export function SkillVisualizer() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedSkills, setRecommendedSkills] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      resume: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setRecommendedSkills([]);
    try {
      const result = await getRecommendedSkills(data.resume);
      if (result.error) {
        throw new Error(result.error);
      }
      setRecommendedSkills(result.skills || []);
      toast({
          title: 'Analysis Complete!',
          description: "The AI has highlighted the most relevant skills.",
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: error instanceof Error ? error.message : 'Could not fetch skill recommendations.',
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  const skillsToDisplay = recommendedSkills.length > 0 ? recommendedSkills : staticSkills;
  const isHighlighted = recommendedSkills.length > 0;

  return (
    <section id="skills" className="bg-muted/50 py-24 sm:py-32">
      <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Skills & Expertise</h2>
          <p className="text-lg text-foreground/80">
            A dynamic showcase of my technical abilities. Use the AI-powered visualizer to see which of my skills are most relevant to your needs by pasting a job description or your project requirements.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            {skillsWithLogos.map((skill, index) => (
              <SkillBadge 
                key={index}
                name={skill.name}
                logo={skill.logo}
                isHighlighted={skillsToDisplay.includes(skill.name) && isHighlighted}
              />
            ))}
          </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="text-accent" />
              AI Skill Visualizer
            </CardTitle>
            <CardDescription>
              Paste a resume, job description, or project details below. Let AI identify and highlight the most relevant skills from my profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume or Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste content here to see the magic..."
                          className="min-h-[200px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Visualize Skills'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
