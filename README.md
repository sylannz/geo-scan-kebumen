# Geo-Scan Geopark Edition

Aplikasi web interaktif untuk eksplorasi geosite di **Kebumen UNESCO Global Geopark** dengan fitur AR Scanner, AI Chat Assistant, dan Text-to-Speech multilingual.

## 🌋 Tentang Project

Geo-Scan adalah platform edukasi digital yang menghadirkan pengalaman eksplorasi geologi secara interaktif untuk 4 geosite di Kebumen UNESCO Global Geopark:
- **Watu Kelir** - Formasi Chert & Lava Bantal
- **Goa Barat** - Sistem Gua Karst dengan Sungai Bawah Tanah  
- **Pantai Menganti** - Bukti Vulkanisme Purba
- **Konservasi Kaliratu** - Biosite Penyu & Konservasi Pesisir

## ✨ Fitur Utama

### 🎯 Core Features
- **Landing Page**: Hero carousel, weather widget, map view, dan quick navigation
- **Dual Language**: Indonesia & English dengan toggle dinamis
- **Hero Carousel**: Auto-sliding image gallery untuk setiap geosite
- **Timeline Geologis**: Visualisasi kronologi formasi geologis
- **Tab Navigation**: Switch antara konten Edukasi dan Timeline
- **Weather Integration**: Real-time cuaca Kebumen dengan Open-Meteo API

### 🤖 AI-Powered Features
- **AI Voice Guide**: Text-to-Speech natural dengan VoiceRSS API via backend
- **AI Chat Assistant**: Tanya jawab dengan Google Gemini AI tentang geologi
- **Context-Aware Chat**: AI disesuaikan dengan 5 konteks (home + 4 geosite)

### 📱 Interactive Features
- **AR QR Scanner**: Scan barcode/QR untuk navigasi atau info tambahan
- **Touch-Optimized**: UI dirancang untuk pengalaman mobile-first
- **Smooth Animations**: Transisi dan animasi yang fluid

## 🏗️ Struktur Project

```
geo-scan/
├── css/
│   ├── index.css            # Styling untuk Landing Page
│   ├── watu-kelir.css       # Styling untuk Watu Kelir
│   ├── goa-barat.css        # Styling untuk Goa Barat
│   ├── menganti.css         # Styling untuk Pantai Menganti
│   └── kaliratu.css         # Styling untuk Kaliratu Biosite
├── js/
│   ├── index.js             # Logic untuk Landing Page (Clean Architecture)
│   ├── watu-kelir.js        # Logic untuk Watu Kelir (Clean Architecture)
│   ├── goa-barat.js         # Logic untuk Goa Barat (Clean Architecture)
│   ├── menganti.js          # Logic untuk Pantai Menganti (Clean Architecture)
│   └── kaliratu.js          # Logic untuk Kaliratu (Clean Architecture)
├── backend/
│   ├── server.js            # Express server untuk TTS & Chat API proxy
│   ├── package.json         # Backend dependencies (express, cors, node-fetch, @google/generative-ai)
│   ├── .env                 # Environment variables (gitignored)
│   ├── .env.example         # Template untuk .env
│   └── README.md            # Backend documentation
├── images/                  # Local images (watturijang.jpg, etc.)
├── index.html               # Landing Page / Home
├── situswatukelir.html      # Halaman Watu Kelir
├── situsgoabarat.html       # Halaman Goa Barat
├── situsmenganti.html       # Halaman Pantai Menganti
├── situspantaikaliratu.html # Halaman Kaliratu Biosite
└── README.md                # Dokumentasi ini
```

## 🚀 Quick Start

### Prerequisites

- Node.js v14+ dan npm
- Browser modern (Chrome, Firefox, Safari, Edge)
- Live Server atau web server lainnya untuk frontend
- VoiceRSS API Key (gratis)

### 1. Clone Repository

```bash
git clone https://github.com/sylannz/geo-scan-kebumen
cd geo-scan
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` dan tambahkan API key:
```env
PORT=3000
VOICERSS_API_KEY=your_api_key_here
```

Dapatkan API key gratis di: https://www.voicerss.org/registration.aspx

### 3. Start Backend Server

```bash
npm run dev
```

Backend akan berjalan di `http://localhost:3000`

Endpoints yang tersedia:
- `GET /api/health` - Health check
- `POST /api/tts` - Text-to-Speech (VoiceRSS)
- `POST /api/chat` - AI Chat (Google Gemini)

### 4. Start Frontend

Gunakan Live Server di VS Code atau web server lainnya:

**Dengan Live Server (VS Code)**:
- Install extension "Live Server"
- Right-click `situswatukelir.html` → "Open with Live Server"
- Browser akan otomatis terbuka di `http://localhost:5500`



### 5. Akses Web

- Landing Page: http://localhost:5500/index.html
- Watu Kelir: http://localhost:5500/situswatukelir.html
- Goa Barat: http://localhost:5500/situsgoabarat.html
- Pantai Menganti: http://localhost:5500/situsmenganti.html
- Kaliratu Biosite: http://localhost:5500/situspantaikaliratu.html

## 🎨 Clean Architecture

Setiap file JavaScript menggunakan clean architecture pattern:

```javascript
// Configuration
const CONFIG = {
  apiKey: 'xxx',
  carouselInterval: 5000,
  // ...
};

// State Management
const STATE = {
  language: 'id',
  currentSlide: 0,
  // ...
};

// Translations
const TRANSLATIONS = {
  id: { /* Indonesia */ },
  en: { /* English */ }
};

// DOM Utilities
const getElement = (id) => document.getElementById(id);
const setText = (id, text) => { /* ... */ };

// Modular Functions
function initCarousel() { /* ... */ }
function handleAudioPlay() { /* ... */ }
function handleAskGemini() { /* ... */ }
```


## 🔌 API Integration

### Backend TTS API

```javascript
// POST /api/tts (Netlify function)
const response = await fetch('/.netlify/functions/tts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'Your text here',
    language: 'id' // atau 'en'
  })
});

const audioBlob = await response.blob();
const audioUrl = URL.createObjectURL(audioBlob);
const audio = new Audio(audioUrl);
audio.play();
```

### Backend Chat API

```javascript
// POST /api/chat
const response = await fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'Apa itu formasi chert?',
    context: 'watu-kelir', // atau: 'goa-barat', 'menganti', 'kaliratu', 'geopark-home'
    language: 'id' // atau 'en'
  })
});

const data = await response.json();
console.log(data.reply); // Respons dari Gemini AI
```

**Context-Aware Instructions:**
- `watu-kelir`: Ahli formasi chert, lava bantal, geologi laut dalam
- `goa-barat`: Ahli sistem karst, sungai bawah tanah, speleologi
- `menganti`: Ahli vulkanisme purba, batuan beku, geomorfologi pesisir
- `kaliratu`: Ahli konservasi penyu, biosite, ekosistem pesisir
- `geopark-home`: Pemandu umum Kebumen UNESCO Global Geopark

## 🎯 Key Features Implementation

### 1. Dual Language System

Semua teks UI disimpan dalam object `TRANSLATIONS`:

```javascript
const TRANSLATIONS = {
  id: { siteTitle: 'Watu Kelir', ... },
  en: { siteTitle: 'Watu Kelir Geosite', ... }
};

function toggleLanguage() {
  STATE.language = STATE.language === 'id' ? 'en' : 'id';
  updateUI();
}
```

### 2. Audio Guide dengan TTS

Natural voice menggunakan VoiceRSS API melalui backend proxy:

```javascript
async function handleAudioPlay() {
  const response = await fetch('/.netlify/functions/tts', {
    method: 'POST',
    body: JSON.stringify({
      text: TRANSLATIONS[STATE.language].eduDesc,
      language: STATE.language
    })
  });
  
  const audioBlob = await response.blob();
  const audio = new Audio(URL.createObjectURL(audioBlob));
  audio.play();
}
```

### 3. AR QR Scanner

Menggunakan library `html5-qrcode`:

```javascript
async function startAR() {
  const html5QrCode = new Html5Qrcode('qr-reader');
  await html5QrCode.start(
    { facingMode: 'environment' },
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      window.location.href = decodedText;
    }
  );
}
```

### 4. Hero Carousel

Auto-sliding image carousel dengan indicators:

```javascript
function initCarousel() {
  GEOSITE_IMAGES.forEach((url, i) => {
    // Create slide element
    // Create indicator dot
  });
  
  setInterval(() => {
    // Switch to next slide
    // Update indicator
  }, CONFIG.carouselInterval);
}
```

## 🎨 Styling & UI

### Tech Stack
- **Tailwind CSS**: Utility-first CSS framework via CDN
- **Lucide Icons**: Beautiful icon set
- **Custom Animations**: Scan animation untuk AR, progress bar
- **Responsive**: Mobile-first design

### Color Palette
- Primary: Sky Blue (#0ea5e9)
- Secondary: Amber (#f59e0b)
- Background: Slate (#f8fafc)
- Text: Slate (#0f172a)

### Typography
- Font: System Sans-serif stack
- Headings: Bold, uppercase, tracking-tight
- Body: Medium weight, relaxed leading

## 🔐 Security & Best Practices

### Environment Variables
```bash
# .env (gitignored)
VOICERSS_API_KEY=xxxxx
GEMINI_API_KEY=xxxxx  # Exposed di frontend (OK untuk demo)
```

### CORS Protection
Backend hanya menerima request dari:
- `http://localhost:5500`
- `http://127.0.0.1:5500`
- `http://localhost:3000`

### Input Validation
- Text length limitation
- Language code validation
- Error handling untuk API failures

## 📊 Performance Optimization

### Frontend
- Lazy load images dengan Unsplash CDN
- Minimal dependencies (hanya CDN libraries)
- Efficient DOM manipulation dengan utility functions
- Debounced event handlers

### Backend
- Response caching potential (dapat diimplementasi)
- Efficient error detection (< 1000 bytes check)
- Minimal middleware stack

## 🧪 Testing

### Manual Testing Checklist

**Watu Kelir Page**:
- [ ] Language toggle berfungsi (ID ↔ EN)
- [ ] Carousel auto-slide setiap 5 detik
- [ ] Tab switching (Edukasi ↔ Timeline)
- [ ] Audio button play/pause
- [ ] Chat modal open/close
- [ ] AR scanner dapat akses kamera
- [ ] QR scan redirect ke URL yang benar

**Goa Barat & Menganti Pages**:
- [ ] Same tests as Watu Kelir
- [ ] Content spesifik untuk masing-masing geosite

### API Testing

```bash
# Health check
curl http://localhost:3000/api/health

# TTS test
curl -X POST https://<your-netlify-site>/.netlify/functions/tts \
  -H "Content-Type: application/json" \
  -d '{"text":"Test audio","language":"id"}' \
  --output test.mp3
```

## 🐛 Troubleshooting

### Frontend Issues

**Audio tidak play**:
- Check backend server running di port 3000
- Check browser console untuk CORS error
- Verify API key valid di backend `.env`

**AR Scanner tidak berfungsi**:
- Browser harus support getUserMedia API
- Pastikan HTTPS (atau localhost untuk testing)
- Allow camera permission

**Images tidak load**:
- Check internet connection (Unsplash CDN)
- Check browser console untuk 404 errors

### Backend Issues

**Port 3000 already in use**:
```bash
lsof -i :3000
kill -9 <PID>
```

**API Key error**:
```bash
# Check .env file
cat backend/.env

# Restart server setelah edit .env
cd backend && npm run dev
```

## 🚢 Deployment

### Frontend (Static Hosting)

Deploy ke Netlify, Vercel, atau GitHub Pages:

```bash
# Build tidak diperlukan (pure HTML/CSS/JS)
# Upload semua file kecuali backend/ folder
```

**Environment**:
- Update backend URL di `CONFIG.ttsBackendUrl`
- Update CORS `allowedOrigins` di backend

### Backend (Node.js Hosting)

Deploy ke Railway, Render, atau DigitalOcean:

```bash
# Ensure .env file ada di server
# Install dependencies
cd backend && npm install

# Start dengan PM2
pm2 start server.js --name geo-scan-backend
```

## 📈 Future Enhancements

- [x] Landing page dengan hero carousel ✅
- [x] Weather integration untuk Kebumen ✅
- [x] Backend API proxy untuk TTS & Chat ✅
- [x] Context-aware AI untuk setiap geosite ✅
- [ ] Database untuk menyimpan chat history
- [ ] User authentication & personalized experience
- [ ] Offline mode dengan Service Worker
- [ ] Download audio guide untuk offline playback
- [ ] GPS integration untuk location-based content
- [ ] Admin panel untuk manage content
- [ ] Analytics dashboard
- [ ] Search functionality
- [ ] Favorites/bookmarks feature
- [ ] Virtual tour 360° untuk setiap geosite

## 👥 Contributing

Contributions are welcome! Please:
1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📄 License

MIT License - Free to use for personal and commercial projects.

## 🙏 Credits

### APIs & Services
- **VoiceRSS**: Text-to-Speech API
- **Google Gemini AI**: AI Chat Assistant (@google/generative-ai SDK)
- **Open-Meteo**: Free weather API untuk Kebumen
- **Unsplash**: High-quality geosite images
- **Tailwind CSS**: UI framework
- **Lucide Icons**: Icon library
- **html5-qrcode**: QR Scanner library

### Data & Content
- **Kebumen Geopark**: Geological data & information
- **UNESCO Global Geopark**: Recognition & guidelines

## 📞 Support

Untuk pertanyaan atau issue:
- Create issue di repository
- Email: [your-email]
- Documentation: See `backend/README.md` for backend details

---

**Built with ❤️ for Kebumen UNESCO Global Geopark**

**Status**: ✅ Production Ready
**Version**: 2.0.0
**Last Updated**: March 2026
**Features**: 5 Pages (1 Landing + 4 Geosites), Backend API Proxy, Context-Aware AI Chat, Weather Integration
