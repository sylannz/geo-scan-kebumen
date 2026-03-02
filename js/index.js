const CONFIG = {
  weatherApiUrl: 'https://api.open-meteo.com/v1/forecast?latitude=-7.67&longitude=109.65&current_weather=true',
  chatBackendUrl: 'http://localhost:3000/api/chat',
  geositeContext: 'geopark-home',
  carouselInterval: 5000,
  scannerFps: 10,
  scannerQrBox: 250
};

const STATE = {
  language: 'id',
  currentSlide: 0,
  totalSlides: 2,
  isTyping: false,
  html5QrCode: null
};

const TRANSLATIONS = {
  id: {
    greetingSub: 'Halo, Penjelajah!',
    greetingPagi: 'Selamat Pagi 🌅',
    greetingSiang: 'Selamat Siang ☀️',
    greetingSore: 'Selamat Sore 🌇',
    greetingMalam: 'Selamat Malam 🌙',
    slide0Tag: 'Situs Utama',
    slide0Title: 'Lantai Samudra Purba',
    slide0Desc: 'Bukti nyata pengangkatan dasar laut dari kedalaman 4 km di Watu Kelir.',
    slide0Btn: 'Mulai Jelajah',
    slide1Tag: 'Landscape',
    slide1Title: 'Keajaiban Menganti',
    slide1Desc: 'Perpaduan memesona tebing karst dan batuan vulkanik purba.',
    slide1Btn: 'Jelajahi',
    btnMap: 'Peta Geo',
    btnScan: 'Scan Geo',
    popularTitle: 'Destinasi Populer',
    activeSites: 'Situs Aktif',
    biositeLabel: 'Biosite Penyu',
    mapTitle: 'Peta Geopark',
    mapDesc: 'Sebaran Situs',
    mapHint: 'Gunakan dua jari untuk menggeser atau memperbesar peta.',
    chatTitle: 'Tanya Geo ✨',
    chatWelcome: 'Halo! Saya Geo, asisten digital UNESCO Global Geopark Kebumen. Ada yang bisa saya bantu?',
    scanning: 'Mencari Kode Geosite...',
    navHome: 'Beranda',
    navChat: 'Chat Geo'
  },
  en: {
    greetingSub: 'Hello, Explorer!',
    greetingPagi: 'Good Morning 🌅',
    greetingSiang: 'Good Day ☀️',
    greetingSore: 'Good Afternoon 🌇',
    greetingMalam: 'Good Evening 🌙',
    slide0Tag: 'Main Site',
    slide0Title: 'Ancient Ocean Floor',
    slide0Desc: 'Real evidence of seabed uplift from 4 km deep at Watu Kelir.',
    slide0Btn: 'Start Exploring',
    slide1Tag: 'Landscape',
    slide1Title: 'Menganti Wonders',
    slide1Desc: 'Enchanting blend of karst cliffs and ancient volcanic rocks.',
    slide1Btn: 'Explore',
    btnMap: 'Geo Map',
    btnScan: 'Geo Scan',
    popularTitle: 'Popular Destinations',
    activeSites: 'Active Sites',
    biositeLabel: 'Turtle Biosite',
    mapTitle: 'Geopark Map',
    mapDesc: 'Site Distribution',
    mapHint: 'Use two fingers to pan or zoom the map.',
    chatTitle: 'Ask Geo ✨',
    chatWelcome: 'Hello! I am Geo, the digital assistant for UNESCO Global Geopark Kebumen. How can I help you?',
    scanning: 'Searching Geosite Code...',
    navHome: 'Home',
    navChat: 'Chat Geo'
  }
};

async function fetchWeather() {
  try {
    const response = await fetch(CONFIG.weatherApiUrl);
    const data = await response.json();
    const temp = Math.round(data.current_weather.temperature);
    document.getElementById('weather-temp').innerText = `${temp}°C`;

    const code = data.current_weather.weathercode;
    const weatherIcon = document.getElementById('weather-icon');
    
    if (code >= 1 && code <= 3) {
      weatherIcon.setAttribute('data-lucide', 'sun-cloud');
    } else if (code >= 51) {
      weatherIcon.setAttribute('data-lucide', 'cloud-rain');
    } else {
      weatherIcon.setAttribute('data-lucide', 'sun');
    }
    lucide.createIcons();
  } catch (error) {
    console.error('[WEATHER] Error fetching weather:', error);
    document.getElementById('weather-temp').innerText = '28°C';
  }
}

function updateUI() {
  const t = TRANSLATIONS[STATE.language];
  
  document.getElementById('lang-label').innerText = STATE.language.toUpperCase();
  document.getElementById('txt-greeting-sub').innerText = t.greetingSub;

  const hour = new Date().getHours();
  let greetingText = '';
  if (hour < 11) greetingText = t.greetingPagi;
  else if (hour < 15) greetingText = t.greetingSiang;
  else if (hour < 19) greetingText = t.greetingSore;
  else greetingText = t.greetingMalam;
  document.getElementById('greeting-text').innerText = greetingText;

  document.getElementById('slide0-tag').innerText = t.slide0Tag;
  document.getElementById('slide0-title').innerText = t.slide0Title;
  document.getElementById('slide0-desc').innerText = t.slide0Desc;
  document.getElementById('slide0-btn').innerHTML = `${t.slide0Btn} <i data-lucide="arrow-right" class="w-4 h-4 text-red-700"></i>`;

  document.getElementById('slide1-tag').innerText = t.slide1Tag;
  document.getElementById('slide1-title').innerText = t.slide1Title;
  document.getElementById('slide1-desc').innerText = t.slide1Desc;
  document.getElementById('slide1-btn').innerHTML = `${t.slide1Btn} <i data-lucide="arrow-right" class="w-4 h-4 text-blue-700"></i>`;

  document.getElementById('txt-btn-map').innerText = t.btnMap;
  document.getElementById('txt-btn-scan').innerText = t.btnScan;
  document.getElementById('txt-popular-title').innerText = t.popularTitle;
  document.getElementById('txt-active-sites').innerText = t.activeSites;
  document.getElementById('txt-biosite-label').innerText = t.biositeLabel;
  document.getElementById('txt-map-title').innerText = t.mapTitle;
  document.getElementById('txt-map-desc').innerText = t.mapDesc;
  document.getElementById('txt-map-hint').innerText = t.mapHint;
  document.getElementById('txt-chat-title').innerText = t.chatTitle;
  document.getElementById('txt-chat-welcome').innerText = t.chatWelcome;
  document.getElementById('txt-scanning').innerText = t.scanning;
  document.getElementById('nav-home').innerText = t.navHome;
  document.getElementById('nav-chat').innerText = t.navChat;

  lucide.createIcons();
}

function switchView(view) {
  document.getElementById('view-home').classList.remove('view-active');
  document.getElementById('view-map').classList.remove('view-active');
  document.getElementById('main-footer').classList.toggle('hidden', view === 'map');

  if (view === 'home') {
    document.getElementById('view-home').classList.add('view-active');
  }
  if (view === 'map') {
    document.getElementById('view-map').classList.add('view-active');
  }
  window.scrollTo(0, 0);
}

function toggleLanguage() {
  STATE.language = STATE.language === 'id' ? 'en' : 'id';
  updateUI();
}

function updateCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const colors = ['#dc2626', '#0284c7'];
  
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === STATE.currentSlide);
  });
  
  dots.forEach((dot, i) => {
    dot.style.width = i === STATE.currentSlide ? '2rem' : '0.75rem';
    dot.style.backgroundColor = i === STATE.currentSlide ? colors[i] : '#e2e8f0';
  });
}

function startCarousel() {
  setInterval(() => {
    STATE.currentSlide = (STATE.currentSlide + 1) % STATE.totalSlides;
    updateCarousel();
  }, CONFIG.carouselInterval);
}

function openChat() {
  document.getElementById('chat-modal').classList.replace('hidden', 'flex');
}

function closeChat() {
  document.getElementById('chat-modal').classList.replace('flex', 'hidden');
}

async function handleAskGemini(e) {
  e.preventDefault();
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  
  if (!text || STATE.isTyping) return;

  const messages = document.getElementById('chat-messages');
  messages.innerHTML += `<div class="flex justify-end"><div class="p-4 rounded-2xl max-w-[85%] text-xs bg-sky-600 text-white rounded-br-none shadow-md text-left">${text}</div></div>`;
  input.value = '';
  STATE.isTyping = true;
  messages.scrollTop = messages.scrollHeight;

  try {
    const response = await fetch(CONFIG.chatBackendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: text,
        context: CONFIG.geositeContext,
        language: STATE.language
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Backend error');
    }

    messages.innerHTML += `<div class="flex justify-start"><div class="p-4 rounded-2xl max-w-[85%] text-xs bg-slate-50 text-slate-700 rounded-bl-none border border-slate-100 shadow-sm text-left">${data.response}</div></div>`;
  } catch (error) {
    console.error('[CHAT] Error:', error);
    messages.innerHTML += `<div class="flex justify-start"><div class="p-4 rounded-2xl max-w-[85%] text-xs bg-red-50 text-red-600 text-left">Kesalahan sambungan.</div></div>`;
  } finally {
    STATE.isTyping = false;
    messages.scrollTop = messages.scrollHeight;
  }
}

async function startScanner() {
  document.getElementById('scanner-overlay').classList.remove('hidden');
  STATE.html5QrCode = new Html5Qrcode('qr-reader');
  
  try {
    await STATE.html5QrCode.start(
      { facingMode: 'environment' },
      { fps: CONFIG.scannerFps, qrbox: CONFIG.scannerQrBox },
      (decodedText) => {
        window.location.href = decodedText.startsWith('http')
          ? decodedText
          : `https://www.google.com/search?q=${encodeURIComponent(decodedText)}`;
        stopScanner();
      }
    );
  } catch (error) {
    console.error('[SCANNER] Error starting scanner:', error);
    stopScanner();
  }
}

function stopScanner() {
  if (STATE.html5QrCode) {
    STATE.html5QrCode.stop().finally(() => {
      document.getElementById('scanner-overlay').classList.add('hidden');
    });
  } else {
    document.getElementById('scanner-overlay').classList.add('hidden');
  }
}

// Expose functions to global scope for onclick handlers
window.toggleLanguage = toggleLanguage;
window.switchView = switchView;
window.openChat = openChat;
window.closeChat = closeChat;
window.handleAskGemini = handleAskGemini;
window.startScanner = startScanner;
window.stopScanner = stopScanner;

window.onload = () => {
  updateUI();
  fetchWeather();
  startCarousel();
};
