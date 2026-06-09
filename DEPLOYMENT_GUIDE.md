# 🚀 Agent Deployment Guide

I have written 100% of the code for you. The files in this folder are completely ready to be deployed to Vercel to run 24/7 for free.

Here is the simple 3-step process to activate your agent:

### 1. Get your FREE Google Gemini API Key
Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and log in with your normal Google Account.
Click the **"Create API Key"** button. Copy the key.

### 2. Generate a Gmail App Password
Go to your [Google Account Security Settings](https://myaccount.google.com/security).
Search for **"App Passwords"** and generate a new one (call it "Vercel Agent"). It will give you a 16-letter password.

### 3. Deploy to Vercel
1. Open GitHub and upload this entire `opportunity-hunter` folder as a new repository.
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**. Import your GitHub repository.
3. Before you click "Deploy", open the **Environment Variables** section and add these 4 keys exactly as written:

| Name | Value |
| :--- | :--- |
| **GOOGLE_GENERATIVE_AI_API_KEY** | *Paste the Google API key from Step 1* |
| **CRON_SECRET** | `hunter123` *(Or any random password you want)* |
| **EMAIL_USER** | *Your Gmail Address* |
| **EMAIL_APP_PASSWORD** | *The 16-letter password from Step 2* |

Click **Deploy**. 

### ⏱️ That's it!
Vercel will now automatically trigger your agent every single morning at 8:00 AM (configured in `vercel.json`). The agent will wake up, use Google's servers to think, and email you the Daily Vault newsletter for completely free.
