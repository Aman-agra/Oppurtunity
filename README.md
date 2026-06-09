# 🚀 24/7 Opportunity Hunter Daemon

This project has been refactored into a **Continuous Background Daemon**. It does not use Vercel. Instead, it runs an infinite loop, constantly polling for breaking news and sending you an email the absolute second it detects a major opportunity.

### How to Run Locally 24/7
Since it is a standard Node.js script, you can run it on your PC, or on a free Google Cloud VM.

1. Create a `.env` file in this directory with your credentials:
```env
GOOGLE_GENERATIVE_AI_API_KEY=your_free_key_here
EMAIL_USER=your_gmail@gmail.com
EMAIL_APP_PASSWORD=your_16_digit_app_password
```

2. Open the terminal in this folder and install dependencies:
```bash
npm install
```

3. Start the daemon:
```bash
npm start
```

It will now stay open in your terminal and poll the internet every 15 minutes infinitely. 
