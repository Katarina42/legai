# Legal Assistant App

A bilingual (Serbian/English) legal assistant application that provides legal information and connects users with lawyers when needed.

## Features

- Automatic language detection (Serbian/English)
- AI-powered legal advice
- Lawyer referral system
- Email notifications for lawyer contact requests

## Project Structure

```
├── functions/
│   ├── config/
│   │   ├── email.js       # Email configuration
│   │   └── openai.js      # OpenAI API configuration
│   ├── handlers/
│   │   ├── legalAiHandler.js    # AI response handler
│   │   └── emailHandler.js      # Email sending handler
│   ├── utils/
│   │   └── prompts.js     # AI system prompts
│   └── index.js           # Main Cloud Functions entry
├── services/
│   └── AiService.js       # Frontend AI service
└── ...frontend files
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   cd functions && npm install
   ```

2. Configure Firebase:
   ```bash
   firebase login
   firebase init
   ```

3. Set environment variables:
   ```bash
   firebase functions:config:set gmail.user="YOUR_EMAIL"
   firebase functions:config:set gmail.pass="YOUR_APP_PASSWORD"
   firebase functions:config:set openai.key="YOUR_OPENAI_API_KEY"
   ```

4. Deploy:
   ```bash
   firebase deploy
   ```

## Development

- The app uses Firebase Cloud Functions for backend
- OpenAI GPT-3.5 for legal advice
- Automatic language detection for Serbian/English
- Gmail for lawyer contact notifications

## Production URLs

- Web App: https://legalai-fa061.web.app
- API Endpoint: https://europe-west1-legalai-fa061.cloudfunctions.net/legalai 