import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import nodemailer from 'nodemailer';
import { MASTER_PROMPT } from './prompt';
import dotenv from 'dotenv';

// Load environment variables locally
dotenv.config();

// Configuration
const POLL_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes

async function executeHunt() {
    console.log(`[${new Date().toISOString()}] Starting hunt cycle...`);

    try {
        // 1. Initial sense-check: "Is there breaking news right now?"
        // In a full implementation, you would inject real-time API data here (like Tavily or RSS).
        const searchContext = "Assume a continuous sweep of recent tech APIs and sports events (e.g., FIFA).";

        // 2. Run the heavy LLM call using the Free Gemini API
        const { text } = await generateText({
            model: google('models/gemini-1.5-flash-latest'),
            system: MASTER_PROMPT,
            prompt: `Context: ${searchContext}. Evaluate the current environment. If there is a top-priority, breaking opportunity, generate the massive email report.`,
        });

        console.log(`[${new Date().toISOString()}] Synthesis complete. Sending email...`);

        // 3. Send the email instantly
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "🚨 BREAKING OPPORTUNITY DETECTED 🚨",
            text: text,
        });

        console.log(`[${new Date().toISOString()}] Email sent successfully!`);

    } catch (error) {
        console.error(`[${new Date().toISOString()}] Hunt failed:`, error);
        // Error is caught so the daemon doesn't crash. It will just try again next cycle.
    }
}

// 24/7 Infinite Loop Architecture
async function startDaemon() {
    console.log("🚀 Opportunity Hunter 24/7 Daemon Started!");
    console.log("Press Ctrl+C to stop.");
    
    // Run immediately on start
    await executeHunt();

    // Then run every X minutes forever
    setInterval(async () => {
        await executeHunt();
    }, POLL_INTERVAL_MS);
}

// Start the daemon
startDaemon();
