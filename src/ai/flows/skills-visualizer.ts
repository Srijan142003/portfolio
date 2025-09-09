'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing a resume and recommending skills to highlight in a portfolio.
 *
 * The flow takes a resume as input and returns a list of recommended skills.
 * - recommendSkills - A function that handles the skill recommendation process.
 * - RecommendSkillsInput - The input type for the recommendSkills function.
 * - RecommendSkillsOutput - The return type for the recommendSkills function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendSkillsInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the user resume.'),
});
export type RecommendSkillsInput = z.infer<typeof RecommendSkillsInputSchema>;

const RecommendSkillsOutputSchema = z.object({
  recommendedSkills: z
    .array(z.string())
    .describe('The list of skills recommended to highlight in the portfolio.'),
});
export type RecommendSkillsOutput = z.infer<typeof RecommendSkillsOutputSchema>;

export async function recommendSkills(input: RecommendSkillsInput): Promise<RecommendSkillsOutput> {
  return recommendSkillsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendSkillsPrompt',
  input: {schema: RecommendSkillsInputSchema},
  output: {schema: RecommendSkillsOutputSchema},
  prompt: `You are an expert career coach specializing in portfolio creation. Based on the provided resume text, identify the most relevant skills to highlight in a portfolio to effectively showcase the user's expertise to potential employers. Return a list of skills that are most likely to impress employers.

Resume text: {{{resumeText}}}`,
});

const recommendSkillsFlow = ai.defineFlow(
  {
    name: 'recommendSkillsFlow',
    inputSchema: RecommendSkillsInputSchema,
    outputSchema: RecommendSkillsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
