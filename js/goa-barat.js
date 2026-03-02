// Goa Barat Geosite - Application Logic

// Configuration
const CONFIG = {
  ttsBackendUrl: 'http://localhost:3000/api/tts',
  chatBackendUrl: 'http://localhost:3000/api/chat',
  geositeContext: 'goa-barat',
  carouselInterval: 5000,
  qrScanConfig: {
    fps: 10,
    qrbox: 250,
  },
};

// State Management
const STATE = {
  language: 'id',
  currentSlide: 0,
  audioPlaying: false,
  audioSource: null,
  isTyping: false,
  html5QrCode: null,
};

// Translations
const TRANSLATIONS = {
  id: {
    siteTitle: 'Goa Barat',
    location: 'Ayah, Kebumen',
    rarityLabel: 'Kelangkaan Situs',
    rarityStatus: 'SANGAT LANGKA',
    statusLabel: 'Status Kawasan',
    heritageLabel: 'Warisan Dunia',
    tabEdu: 'Edukasi',
    tabTime: 'Timeline',
    eduTitle: 'Napas Bumi Goa Barat',
    eduDesc:
      'Goa Barat adalah sistem gua karst unik dengan aliran udara kuat dan lebih dari 100 air terjun bawah tanah.',
    unescoTitle: 'Mengapa Diangkat UNESCO?',
    unescoDesc:
      'Contoh evolusi karst tropis yang sempurna dengan sistem hidrogeologi aktif yang sangat langka.',
    legendTitle: 'Mengapa disebut "Barat"?',
    legendDesc:
      '"Barat" berarti angin kencang; merujuk pada hembusan angin kuat dari dalam gua.',
    geoAnalysisTitle: 'Analisis Geologis',
    chertTitle: 'Sungai Bawah Tanah',
    chertDesc:
      'Aliran air aktif yang membentuk lorong dan air terjun vertikal.',
    lavaTitle: 'Stalaktit & Stalagmit',
    lavaDesc: 'Ornamen kalsit yang tumbuh selama ribuan tahun.',
    audioTitle: 'Pemandu Suara AI',
    audioDesc: 'Bacakan info Goa Barat: ',
    audioBtnIdle: 'Bacakan Seluruh Info Situs',
    audioBtnPlaying: 'Sedang Membacakan...',
    audioBtnLoading: 'Menyiapkan Suara...',
    time1Date: '30 Juta Tahun Lalu',
    time1Event: 'Formasi Gamping',
    time1Desc:
      'Endapan laut purba membentuk batuan gamping di Kebumen selatan.',
    time2Date: '2 Juta Tahun Lalu',
    time2Event: 'Karstifikasi',
    time2Desc:
      'Pelarutan gamping membentuk lorong gua dan sungai bawah tanah.',
    time4Date: '9 September 2024',
    time4Event: 'GLOBAL GEOPARK',
    time4Desc: 'Goa Barat resmi menjadi bagian dari UNESCO Global Geopark.',
    supportedBy: 'Didukung Oleh',
    aiChatTitle: 'Tanya Geo ✨',
    aiChatPlaceholder: 'Tanyakan apapun...',
    scanning: 'Memindai Barcode/QR...',
  },
  en: {
    siteTitle: 'Barat Cave',
    location: 'Ayah, Kebumen',
    rarityLabel: 'Site Rarity',
    rarityStatus: 'EXTREMELY RARE',
    statusLabel: 'Area Status',
    heritageLabel: 'World Heritage',
    tabEdu: 'Education',
    tabTime: 'Timeline',
    eduTitle: 'The Breath of Earth',
    eduDesc:
      'Barat Cave is a unique karst system with strong airflow and over 100 underground waterfalls.',
    unescoTitle: 'Why UNESCO?',
    unescoDesc:
      'A perfect example of tropical karst evolution with an active hydrogeological system.',
    legendTitle: 'Why "Barat"?',
    legendDesc:
      '"Barat" means strong wind, referring to the powerful airflow from the cave entrance.',
    geoAnalysisTitle: 'Geological Analysis',
    chertTitle: 'Underground River',
    chertDesc: 'Active water flow shaping vertical waterfalls and passages.',
    lavaTitle: 'Stalactites & Stalagmites',
    lavaDesc: 'Calcite ornaments growing over thousands of years.',
    audioTitle: 'AI Voice Guide',
    audioDesc: 'Read narration for Barat Cave: ',
    audioBtnIdle: 'Read All Site Information',
    audioBtnPlaying: 'Reading...',
    audioBtnLoading: 'Preparing Voice...',
    time1Date: '30 Million Years Ago',
    time1Event: 'Limestone Formation',
    time1Desc:
      'Ancient sea deposits formed the limestone of southern Kebumen.',
    time2Date: '2 Million Years Ago',
    time2Event: 'Karstification',
    time2Desc: 'Limestone dissolution created the cave passages and rivers.',
    time4Date: 'September 9, 2024',
    time4Event: 'GLOBAL GEOPARK',
    time4Desc: 'Officially recognized as part of UNESCO Global Geopark.',
    supportedBy: 'Supported By',
    aiChatTitle: 'Ask Geo ✨',
    aiChatPlaceholder: 'Ask anything...',
    scanning: 'Scanning Barcode/QR...',
  },
};

// Geosite Images
const GEOSITE_IMAGES = [
  'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1524311548101-5140019783cc?auto=format&fit=crop&q=80&w=1000',
];

// DOM Utility Functions
const getElement = (id) => document.getElementById(id);
const setText = (id, text) => {
  const el = getElement(id);
  if (el) el.innerText = text;
};
const setHTML = (id, html) => {
  const el = getElement(id);
  if (el) el.innerHTML = html;
};

// UI Update Functions
function updateUI() {
  const t = TRANSLATIONS[STATE.language];
  setText('lang-label', STATE.language.toUpperCase());
  setText('hero-title', t.siteTitle);
  setText('stat-rarity-label', t.rarityLabel);
  setText('stat-rarity-status', t.rarityStatus);
  setText('tab-overview', t.tabEdu);
  setText('tab-history', t.tabTime);
  setHTML(
    'edu-title',
    `<i data-lucide="wind" class="w-5 h-5 text-sky-600"></i> ${t.eduTitle}`
  );
  setHTML(
    'unesco-title',
    `<i data-lucide="check-circle" class="w-4 h-4 text-blue-600"></i> ${t.unescoTitle}`
  );
  setHTML(
    'legend-title',
    `<i data-lucide="landmark" class="w-4 h-4 text-amber-500"></i> ${t.legendTitle}`
  );
  setHTML(
    'geo-analysis-title',
    `<i data-lucide="microscope" class="w-4 h-4 text-sky-600"></i> ${t.geoAnalysisTitle}`
  );
  setText('audio-title', t.audioTitle);
  if (!STATE.audioPlaying) setText('audio-status', t.audioBtnIdle);
  setText('supported-by-label', t.supportedBy);
  setText('chat-fab-label', `✨ ${t.aiChatTitle.replace('✨', '')}`);
  setText('ar-scanning-text', t.scanning);
  setText('time1-date', t.time1Date);
  setText('time1-event', t.time1Event);
  setText('time1-desc', t.time1Desc);
  setText('time2-date', t.time2Date);
  setText('time2-event', t.time2Event);
  setText('time2-desc', t.time2Desc);
  setText('time4-date', t.time4Date);
  setText('time4-event', t.time4Event);
  setText('time4-desc', t.time4Desc);
  lucide.createIcons();
}

function toggleLanguage() {
  STATE.language = STATE.language === 'id' ? 'en' : 'id';
  updateUI();
}

function switchTab(tab) {
  const isOverview = tab === 'overview';
  getElement('view-overview').classList.toggle('hidden', !isOverview);
  getElement('view-history').classList.toggle('hidden', isOverview);
  getElement('tab-overview').className = `pb-2 text-xs font-bold uppercase tracking-wider transition-all ${
    isOverview ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-400'
  }`;
  getElement('tab-history').className = `pb-2 text-xs font-bold uppercase tracking-wider transition-all ${
    !isOverview ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-400'
  }`;
}

// Carousel Functions
function initCarousel() {
  const container = getElement('slide-container');
  const indicatorContainer = getElement('slide-indicators');

  GEOSITE_IMAGES.forEach((url, i) => {
    const slide = document.createElement('div');
    slide.className = `absolute inset-0 transition-opacity duration-1000 ease-in-out ${
      i === 0 ? 'opacity-100' : 'opacity-0'
    }`;
    slide.id = `slide-${i}`;
    slide.innerHTML = `<img src="${url}" class="w-full h-full object-cover">`;
    container.appendChild(slide);

    const dot = document.createElement('div');
    dot.id = `dot-${i}`;
    dot.className = `h-1 rounded-full transition-all duration-300 ${
      i === 0 ? 'w-6 bg-sky-500' : 'w-2 bg-white/50'
    }`;
    indicatorContainer.appendChild(dot);
  });

  setInterval(() => {
    const prev = STATE.currentSlide;
    STATE.currentSlide = (STATE.currentSlide + 1) % GEOSITE_IMAGES.length;
    getElement(`slide-${prev}`).style.opacity = '0';
    getElement(`slide-${STATE.currentSlide}`).style.opacity = '1';
    getElement(
      `dot-${prev}`
    ).className = `h-1 rounded-full transition-all duration-300 w-2 bg-white/50`;
    getElement(
      `dot-${STATE.currentSlide}`
    ).className = `h-1 rounded-full transition-all duration-300 w-6 bg-sky-500`;
  }, CONFIG.carouselInterval);
}

// Audio Functions
async function handleAudioPlay() {
  if (STATE.audioPlaying) {
    if (STATE.audioSource) STATE.audioSource.pause();
    STATE.audioPlaying = false;
    updateAudioBtn(false);
    return;
  }

  const t = TRANSLATIONS[STATE.language];
  setText('audio-status', t.audioBtnLoading);
  getElement('audio-progress-container').classList.remove('hidden');

  const fullText = `${t.audioDesc} Mari jelajahi ${t.siteTitle}. ${t.eduDesc}. ${t.unescoDesc}. ${t.legendDesc}`;

  try {
    const response = await fetch(CONFIG.ttsBackendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: fullText,
        language: STATE.language
      })
    });

    const contentType = response.headers.get('content-type');
    
    if (!response.ok || contentType?.includes('application/json')) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'TTS error');
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    STATE.audioSource = new Audio(audioUrl);
    STATE.audioPlaying = true;
    STATE.audioSource.play();
    updateAudioBtn(true);
    STATE.audioSource.onended = () => {
      STATE.audioPlaying = false;
      updateAudioBtn(false);
    };
  } catch (err) {
    console.error('[TTS] Error:', err);
    setText('audio-status', t.audioBtnIdle);
  }
}

function updateAudioBtn(isPlaying) {
  getElement('audio-icon').setAttribute(
    'data-lucide',
    isPlaying ? 'pause' : 'play'
  );
  setText(
    'audio-status',
    isPlaying
      ? TRANSLATIONS[STATE.language].audioBtnPlaying
      : TRANSLATIONS[STATE.language].audioBtnIdle
  );
  getElement('audio-progress-container').classList.toggle('hidden', !isPlaying);
  lucide.createIcons();
}

// Chat Functions
function openChat() {
  getElement('chat-modal').classList.replace('hidden', 'flex');
}

function closeChat() {
  getElement('chat-modal').classList.replace('flex', 'hidden');
}

async function handleAskGemini(e) {
  e.preventDefault();
  const input = getElement('chat-input');
  const text = input.value.trim();
  if (!text || STATE.isTyping) return;

  const messages = getElement('chat-messages');
  messages.innerHTML += `<div class="flex justify-end"><div class="p-4 rounded-2xl max-w-[85%] text-xs bg-sky-600 text-white rounded-br-none shadow-md">${text}</div></div>`;
  input.value = '';
  STATE.isTyping = true;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${CONFIG.geminiApiKey}`,
      {
        method: 'POST',
        body: JSON.stringify({
          contents: [{ parts: [{ text: text }] }],
          systemInstruction: {
            parts: [
              {
                text: `Geo, Geologi Kebumen. Fokus Goa Barat (Wind Cave). Singkat (3 kalimat). Bahasa: ${STATE.language}.`,
              },
            ],
          },
        }),
      }
    );
    const data = await res.json();
    const aiResponse =
      data.candidates?.[0]?.content?.parts?.[0]?.text || 'Error.';
    messages.innerHTML += `<div class="flex justify-start"><div class="p-4 rounded-2xl max-w-[85%] text-xs bg-slate-100 text-slate-700 rounded-bl-none">${aiResponse}</div></div>`;
  } catch (err) {
    console.error('Chat error:', err);
  } finally {
    STATE.isTyping = false;
    messages.scrollTop = messages.scrollHeight;
  }
}

// AR Scanner Functions
async function startAR() {
  getElement('ar-view').classList.remove('hidden');
  STATE.html5QrCode = new Html5Qrcode('qr-reader');

  try {
    await STATE.html5QrCode.start(
      { facingMode: 'environment' },
      CONFIG.qrScanConfig,
      (decodedText) => {
        window.location.href = decodedText.startsWith('http')
          ? decodedText
          : 'https://www.google.com/search?q=' + encodeURIComponent(decodedText);
      },
      () => {}
    );
  } catch (err) {
    console.error('AR Scanner error:', err);
  }
}

function stopAR() {
  if (STATE.html5QrCode) {
    STATE.html5QrCode
      .stop()
      .finally(() => getElement('ar-view').classList.add('hidden'));
  }
}

// Initialize on page load
window.onload = () => {
  initCarousel();
  updateUI();
};
