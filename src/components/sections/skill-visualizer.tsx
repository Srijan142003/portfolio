'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const skillsData = [
  { name: 'Languages', value: 3, skills: ['C', 'Java', 'Python'] },
  { name: 'Machine Learning', value: 2, skills: ['TensorFlow', 'Numpy'] },
  { name: 'Databases', value: 2, skills: ['MongoDB', 'Oracle Database'] },
  { name: 'Web Dev', value: 2, skills: ['Flask', 'HTML'] },
  { name: 'Tools & Platforms', value: 4, skills: ['SAP NetWeaver', 'Google Colab', 'Shell Script', 'Socket Programming'] },
];

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.7rem] uppercase text-muted-foreground">
              Category
            </span>
            <span className="font-bold text-muted-foreground">
              {data.name}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.7rem] uppercase text-muted-foreground">
              Skills
            </span>
            <span className="font-bold">{data.value}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};


export function SkillVisualizer() {
  return (
    <section id="skills" className="bg-muted/50 py-24 sm:py-32">
      <div className="container">
        <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Skills & Expertise</CardTitle>
                <CardDescription>
                    A visual breakdown of my technical capabilities.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                        <Pie
                            data={skillsData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                        >
                            {skillsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{fontSize: "1rem"}}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
      </div>
    </section>
  );
}
