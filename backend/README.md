# Geo-Scan Backend - README

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Get VoiceRSS API Key (FREE)
1. Visit: https://www.voicerss.org/registration.aspx
2. Fill form:
   - Name: Your name
   - Email: Your email
   - Website: http://localhost (for testing)
3. Click "Register"
4. Check email for API key
5. Copy API key to `.env` file

### 3. Configure Environment
Edit `.env` file and replace `YOUR_API_KEY_HERE` with your VoiceRSS API key:
```
VOICERSS_API_KEY=your_actual_api_key_here
```

### 4. Start Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:3000`

## API Endpoints

### Health Check
```
GET /api/health
```

### Text-to-Speech
```
POST /api/tts
Content-Type: application/json

{
  "text": "Your text here",
  "language": "id" // or "en"
}
```

Returns: Audio file (MP3)

## Free Tier Limits

VoiceRSS Free Account:
- 350 requests per day
- Natural voices (Rizki for Indonesian, Linda for English)
- No credit card required

## Troubleshooting

**Error: "The API key is not available!"**
- Check your `.env` file has valid API key
- Make sure you registered at https://www.voicerss.org/registration.aspx
- Verify API key is not expired

**Backend not starting:**
- Run `npm install` first
- Check port 3000 is not in use: `lsof -i :3000`

## Security Notes

- `.env` file is gitignored to protect API keys
- CORS is configured for specific origins
- Text length is limited to prevent abuse
- Proper error handling implemented

