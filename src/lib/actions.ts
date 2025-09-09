'use server';

import { recommendSkills } from '@/ai/flows/skills-visualizer';
import { z } from 'zod';

export async function getRecommendedSkills(resumeText: string) {
  if (resumeText.length < 100) {
    return { error: 'Content must be at least 100 characters to analyze.' };
  }
  try {
    const result = await recommendSkills({ resumeText });
    return { skills: result.recommendedSkills };
  } catch (error) {
    console.error('Error in getRecommendedSkills:', error);
    return { error: 'Failed to get skill recommendations from AI.' };
  }
}

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function submitContactFormAction(data: z.infer<typeof contactFormSchema>) {
  const validatedFields = contactFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return { success: false, message: 'Invalid data provided.' };
  }

  // Send Discord notification using your webhook URL
  const discordWebhookUrl = 'https://discord.com/api/webhooks/1415051226135138435/jbQNSyu8cyMbTGks9E2GaEF8HLtpYZ1u-UzFMdZxXCKnxLbGy8Ns0l7PJeTjyuL7AMND';
  const discordPayload = {
    content: `**New contact form submission**\n**Name:** ${validatedFields.data.name}\n**Email:** ${validatedFields.data.email}\n**Message:** ${validatedFields.data.message}`,
  };

  try {
    await fetch(discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload),
    });
  } catch (error) {
    console.error('Discord notification failed:', error);
    return { success: false, message: 'Failed to send your message. Please try again later.' };
  }

  console.log('Contact form submitted successfully:', validatedFields.data);

  return { success: true, message: 'Thank you for your message! I will get back to you soon.' };
}
