'use client';

import { useState } from 'react';
import { Loader2, Wand2 } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getRecommendedSkills } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const skillLogos: Record<string, string> = {
  'Java': "https://img.shields.io/badge/Java-007396?style=flat-square&logo=java&logoColor=white",
  'Python': "https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white",
  'TensorFlow': "https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=tensorflow&logoColor=white",
  'Numpy': "https://img.shields.io/badge/Numpy-013243?style=flat-square&logo=numpy&logoColor=white",
  'MongoDB': "https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white",
  'SAP NetWeaver': "https://img.shields.io/badge/SAP-0FAAFF?style=flat-square&logo=sap&logoColor=white",
  'Flask': "https://img.shields.io/badge/Flask-000000?style=flat-square&logo=flask&logoColor=white",
  'HTML': "https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white",
  'Google Colab': "https://img.shields.io/badge/Google%20Colab-F9AB00?style=flat-square&logo=google-colab&logoColor=white",
  'Shell Script': "https://img.shields.io/badge/Shell-FFD500?style=flat-square&logo=gnu-bash&logoColor=black",
  'Oracle Database': "https://img.shields.io/badge/Oracle-CC2927?style=flat-square&logo=oracle&logoColor=white",
  'Socket Programming': "https://img.shields.io/badge/Socket%20Programming-4EAA25?style=flat-square&logo=socket.io&logoColor=white",
  'C': 'https://img.shields.io/badge/C-00599C?style=flat-square&logo=c&logoColor=white'
};

const mySkills = Object.keys(skillLogos);

export function SkillVisualizer() {
  const [resumeText, setResumeText] = useState('');
  const [recommendedSkills, setRecommendedSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

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
                            className={`transition-all duration-300 text-lg py-2 px-4 h-12 flex items-center gap-2 ${recommendedSkills.includes(skill) ? 'scale-110 shadow-lg' : ''}`}
                        >
                            <Image src={skillLogos[skill]} alt={`${skill} logo`} width={skill === 'Shell Script' ? 88: 80} height={20} className="h-5 w-auto" />
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
