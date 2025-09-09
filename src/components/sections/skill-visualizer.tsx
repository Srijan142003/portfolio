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
import { Badge } from '@/components/ui/badge';
import { getRecommendedSkills } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  resume: z.string().min(100, {
    message: 'Content must be at least 100 characters.',
  }),
});

const staticSkills = [
  "C", "Java", "Python", "TensorFlow", "Numpy", "MongoDB", "SAP NetWeaver", "Flask", "HTML", "Google Colab", "Shell Script", "Oracle Database", "Socket Programming"
];

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

  return (
    <section id="skills" className="bg-muted/50 py-24 sm:py-32">
      <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Skills & Expertise</h2>
          <p className="text-lg text-foreground/80">
            A dynamic showcase of my technical abilities. Use the AI-powered visualizer to see which of my skills are most relevant to your needs by pasting a job description or your project requirements.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            {skillsToDisplay.map((skill, index) => (
               <Badge 
                 key={index} 
                 variant={recommendedSkills.length > 0 ? "default" : "secondary"}
                 className="px-4 py-2 text-base transition-all hover:scale-105 animate-in fade-in-0 zoom-in-95"
                 style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
               >
                 {skill}
               </Badge>
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
