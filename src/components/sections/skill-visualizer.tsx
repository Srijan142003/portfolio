'use client';

import { useState } from 'react';
import { Loader2, Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getRecommendedSkills } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function SkillVisualizer() {
  const [resumeText, setResumeText] = useState('');
  const [recommendedSkills, setRecommendedSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const mySkills = [
    'C', 'Java', 'Python', 'TensorFlow', 'Numpy', 'MongoDB', 
    'SAP NetWeaver', 'Flask', 'HTML', 'Google Colab', 'Shell Script', 
    'Oracle Database', 'Socket Programming'
  ];

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendedSkills([]);
    try {
      const result = await getRecommendedSkills(resumeText);
      if (result.error) {
        setError(result.error);
      } else if (result.skills) {
        setRecommendedSkills(result.skills);
        toast({
            title: "Analysis Complete!",
            description: "Highlighted skills are recommended based on the job description."
        })
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="skills" className="bg-muted/50 py-24 sm:py-32">
      <div className="container">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">AI Skill Visualizer</CardTitle>
            <CardDescription>
              Paste a job description below to see which of my skills are the best fit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <Textarea
                placeholder="Paste the job description here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="min-h-[200px] text-base"
              />
              <Button onClick={handleAnalyze} disabled={isLoading || !resumeText} size="lg" className="mx-auto w-full max-w-xs">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" /> Visualize Skills
                  </>
                )}
              </Button>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="mt-6">
                <h3 className="text-center font-headline text-2xl font-bold">My Skills</h3>
                 <div className="mt-4 flex flex-wrap justify-center gap-4">
                    {mySkills.map(skill => (
                        <Badge 
                            key={skill}
                            variant={recommendedSkills.includes(skill) ? 'default' : 'secondary'}
                            className={`transition-all duration-300 text-lg py-2 px-4 ${recommendedSkills.includes(skill) ? 'scale-110 shadow-lg' : ''}`}
                        >
                            {skill}
                        </Badge>
                    ))}
                 </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
