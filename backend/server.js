/* ============================================
   GEO-SCAN BACKEND SERVER
   Clean Architecture for TTS API Proxy
   ============================================ */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// List available models on startup
(async () => {
  try {
    console.log('[GEMINI] Fetching available models...');
    const models = await genAI.listModels();
    console.log('[GEMINI] Available models:');
    models.forEach(model => {
      console.log(`  - ${model.name} (${model.displayName})`);
      console.log(`    Supported methods: ${model.supportedGenerationMethods?.join(', ')}`);
    });
  } catch (error) {
    console.error('[GEMINI] Error listing models:', error.message);
  }
})();


async function generateWithRetry(model, prompt, maxRetries = 3) {
  let retries = 0;
  let baseDelay = 1000; // Start with a 1-second delay

  while (retries < maxRetries) {
    try {
      // Attempt the API call
      return await model.generateContent(prompt);
    } catch (error) {
      // Check if it's a 429 error
      if (error.status === 429 || (error.message && error.message.includes('429'))) {
        retries++;
        if (retries >= maxRetries) {
          console.error(`[GEMINI] Max retries (${maxRetries}) reached. Failing.`);
          throw error; // Give up after max retries
        }

        // Calculate the delay: 1s, then 2s, then 4s...
        const delay = baseDelay * Math.pow(2, retries - 1);
        console.warn(`[GEMINI] Rate limited (429). Retrying in ${delay}ms... (Attempt ${retries} of ${maxRetries})`);
        
        // Pause execution for the calculated delay
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        // If it's not a 429, throw the error immediately (e.g., a 400 Bad Request)
        throw error;
      }
    }
  }
}

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
  port: process.env.PORT || 3000,
  voiceRssApiKey: process.env.VOICERSS_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  allowedOrigins: [
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:3000',
    // Add your production domain here
  ]
};

// ============================================
// APP SETUP
// ============================================
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (CONFIG.allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============================================
// API ENDPOINTS
// ============================================

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Geo-Scan TTS Backend'
  });
});

/**
 * TTS Generation Endpoint
 * POST /api/tts
 * Body: { text: string, language: "id" | "en" }
 */
app.post('/api/tts', async (req, res) => {
  try {
    const { text, language } = req.body;

    // Validation
    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Text is required and must be a string'
      });
    }

    if (!language || !['id', 'en'].includes(language)) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Language must be "id" or "en"'
      });
    }

    // Limit text length to prevent abuse
    const maxLength = 1000;
    const sanitizedText = text.substring(0, maxLength);

    console.log(`[TTS] Generating audio for language: ${language}, text length: ${sanitizedText.length}`);

    // Build VoiceRSS request
    const params = new URLSearchParams({
      key: CONFIG.voiceRssApiKey,
      src: sanitizedText,
      hl: language === 'id' ? 'id-id' : 'en-us',
      v: language === 'id' ? 'Rizki' : 'Linda',
      r: '0', // Normal speed
      c: 'MP3',
      f: '44khz_16bit_stereo'
    });

    const voiceRssUrl = `https://api.voicerss.org/?${params.toString()}`;

    // Fetch audio from VoiceRSS
    const response = await fetch(voiceRssUrl);

    // Get response as buffer first
    const audioBuffer = await response.buffer();
    const responseText = audioBuffer.toString('utf-8');
    
    console.log(`[TTS] VoiceRSS response size: ${audioBuffer.length} bytes`);
    
    // Check if response is error message (VoiceRSS returns errors as plain text)
    // Valid MP3 files start with ID3 or 0xFF 0xFB (MP3 frame sync)
    const isError = audioBuffer.length < 1000 || 
                    responseText.toLowerCase().includes('error') ||
                    (!audioBuffer[0] === 0xFF && !responseText.startsWith('ID3'));
    
    if (!response.ok || isError) {
      console.error('[TTS] VoiceRSS error:', responseText);
      
      return res.status(400).json({
        error: 'TTS service error',
        message: responseText || 'Invalid audio response from VoiceRSS'
      });
    }
    
    console.log(`[TTS] Audio generated successfully, size: ${audioBuffer.length} bytes`);

    // Send audio as response
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.length,
      'Cache-Control': 'public, max-age=86400' // Cache for 1 day
    });

    res.send(audioBuffer);

  } catch (error) {
    console.error('[TTS] Error:', error);
    
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * AI Chat Endpoint with Gemini
 * POST /api/chat
 * Body: { text: string, context: string, language: "id" | "en" }
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { text, context, language } = req.body;

    // Validation
    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Text is required and must be a string'
      });
    }

    if (!context || typeof context !== 'string') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Context is required (e.g., "watu-kelir", "goa-barat", "menganti")'
      });
    }

    const validLanguages = ['id', 'en', 'Indonesia', 'English'];
    const lang = language || 'id';

    console.log(`[CHAT] Processing request - Context: ${context}, Language: ${lang}`);

    // Build system instruction based on context
    const contextInstructions = {
      'watu-kelir': 'Geo, Ahli Geologi Kebumen spesialis Watu Kelir. Fokus pada formasi chert dan lava bantal. Singkat (3-4 kalimat).',
      'goa-barat': 'Geo, Ahli Geologi Kebumen spesialis Goa Barat (Wind Cave). Fokus pada sistem karst dan sungai bawah tanah. Singkat (3-4 kalimat).',
      'menganti': 'Geo, Ahli Geologi Kebumen spesialis Pantai Menganti. Fokus pada vulkanisme purba dan formasi batuan. Singkat (3-4 kalimat).'
    };

    const systemInstruction = contextInstructions[context] || contextInstructions['watu-kelir'];
    const fullPrompt = `${systemInstruction} Bahasa: ${lang}.\n\nPertanyaan: ${text}`;

    // Call Gemini AI using official SDK
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await generateWithRetry(model, fullPrompt);
    const aiResponse = result.response.text();

    if (!aiResponse) {
      console.error('[CHAT] Empty response from Gemini');
      return res.status(500).json({
        error: 'AI service error',
        message: 'Empty response from AI service'
      });
    }

    console.log(`[CHAT] Response generated successfully, length: ${aiResponse.length} chars`);

    res.json({
      response: aiResponse,
      context: context,
      language: lang
    });

  } catch (error) {
    console.error('[CHAT] Error:', error);
    
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  
  res.status(err.status || 500).json({
    error: 'Server error',
    message: err.message
  });
});

// ============================================
// SERVER START
// ============================================
app.listen(CONFIG.port, () => {
  console.log('============================================');
  console.log('  GEO-SCAN TTS Backend Server');
  console.log('============================================');
  console.log(`  Server running on port ${CONFIG.port}`);
  console.log(`  Health check: http://localhost:${CONFIG.port}/api/health`);
  console.log(`  TTS endpoint: http://localhost:${CONFIG.port}/api/tts`);
  console.log('============================================');
});
