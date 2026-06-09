import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import nodemailer from 'nodemailer';
import { MASTER_PROMPT } from './prompt';

// Vercel serverless function max execution time (in seconds)
export const maxDuration = 60; 

export async function GET(request: Request) {
  // 1. Security Check: Only allow requests that have the correct CRON_SECRET
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized: Invalid Secret', { status: 401 });
  }

  try {
    // 2. Execute the AI Hunt using the Free Google Gemini API
    const { text } = await generateText({
      model: google('models/gemini-1.5-flash-latest'),
      system: MASTER_PROMPT,
      prompt: "Execute today's hunt. Focus on recent AI API launches, major sports events (like the FIFA World Cup), and complaints on Twitter/Reddit. Generate the Markdown newsletter.",
    });

    // 3. Send the generated newsletter to your Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sends the email to yourself
      subject: "💰 The Daily Vault: Today's Opportunities",
      text: text, // The plain text markdown body
    });

    return new Response('Hunt Completed & Emailed successfully!', { status: 200 });
  } catch (error) {
    console.error("Agent Error:", error);
    return new Response('Failed to execute hunt', { status: 500 });
  }
}
