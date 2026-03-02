// Pantai Menganti Geosite - Application Logic

// Configuration
const CONFIG = {
  ttsBackendUrl: "/.netlify/functions/tts",
  chatBackendUrl: "http://localhost:3000/api/chat",
  geositeContext: "menganti",
  carouselInterval: 5000,
  qrScanConfig: {
    fps: 10,
    qrbox: 250,
  },
};

// State Management
const STATE = {
  language: "id",
  currentSlide: 0,
  audioPlaying: false,
  audioSource: null,
  isTyping: false,
  html5QrCode: null,
};

// Translations
const TRANSLATIONS = {
  id: {
    siteTitle: "Pantai Menganti",
    location: "Ayah, Kebumen",
    rarityLabel: "Kelangkaan Situs",
    rarityStatus: "SANGAT LANGKA",
    statusLabel: "Status Kawasan",
    heritageLabel: "Warisan Dunia",
    tabEdu: "Edukasi",
    tabTime: "Timeline",
    eduTitle: "Keajaiban Menganti",
    eduDesc:
      "Pantai Menganti adalah bukti nyata aktivitas vulkanik purba di Jawa selatan.",
    unescoTitle: "Mengapa Diakui UNESCO?",
    unescoDesc:
      "Kawasan ini menampilkan singkapan batuan vulkanik purba yang tumpang tindih dengan endapan laut.",
    legendTitle: 'Mengapa disebut "Menganti"?',
    legendDesc:
      'Nama "Menganti" berasal dari "Menanti", kisah seorang panglima yang setia menanti.',
    geoAnalysisTitle: "Analisis Geologis",
    chertTitle: "Batuan Beku Basaltik",
    chertDesc: "Batuan yang terbentuk dari lava vulkanik purba yang mendingin.",
    lavaTitle: "Tebing Breksi Vulkanik",
    lavaDesc: "Fragmen keras dari letusan vulkanik purba.",
    audioTitle: "Pemandu Suara AI",
    audioDesc: "Bacakan info Pantai Menganti: ",
    audioBtnIdle: "Bacakan Seluruh Info Situs",
    audioBtnPlaying: "Sedang Membacakan...",
    audioBtnLoading: "Menyiapkan Suara...",
    time1Date: "25 Juta Tahun Lalu",
    time1Event: "Vulkanisme Purba",
    time1Desc:
      "Letusan gunung api bawah laut membentuk fondasi Pantai Menganti.",
    time2Date: "15 Juta Tahun Lalu",
    time2Event: "Pengangkatan Tektonik",
    time2Desc:
      "Dasar laut dan gunung api purba terangkat ke permukaan pesisir.",
    time3Date: "Ribuan Tahun Lalu",
    time3Event: "Abrasi Laut",
    time3Desc: "Ombak Samudra Hindia membentuk tebing curam yang ikonik.",
    time4Date: "9 September 2024",
    time4Event: "UNESCO GLOBAL GEOPARK",
    time4Desc: "Resmi menjadi bagian dari UNESCO Global Geopark.",
    supportedBy: "Didukung Oleh",
    aiChatTitle: "Tanya Geo ✨",
    aiChatPlaceholder: "Tanyakan apapun...",
    aiChatWelcome: "Halo! Saya Asisten Geo untuk Pantai Menganti.",
    scanning: "Memindai Barcode/QR...",
  },
  en: {
    siteTitle: "Menganti Beach Geosite",
    location: "Ayah, Kebumen",
    rarityLabel: "Site Rarity",
    rarityStatus: "EXTREMELY RARE",
    statusLabel: "Area Status",
    heritageLabel: "World Heritage",
    tabEdu: "Education",
    tabTime: "Timeline",
    eduTitle: "The Miracle of Menganti",
    eduDesc:
      "Menganti Beach is a living proof of ancient volcanic activity in southern Java.",
    unescoTitle: "Why UNESCO Recognition?",
    unescoDesc:
      "This area displays ancient volcanic rock outcrops overlapping with marine sediments.",
    legendTitle: 'Why is it called "Menganti"?',
    legendDesc:
      'The name "Menganti" comes from "Menanti" (Waiting), a tale of a loyal commander.',
    geoAnalysisTitle: "Geological Analysis",
    chertTitle: "Basaltic Igneous Rock",
    chertDesc: "Rock formed from cooled ancient volcanic lava.",
    lavaTitle: "Volcanic Breccia Cliffs",
    lavaDesc: "Hardened fragments from ancient volcanic eruptions.",
    audioTitle: "AI Voice Guide",
    audioDesc: "Read the English narration for Menganti Beach: ",
    audioBtnIdle: "Read All Site Information",
    audioBtnPlaying: "Reading Narration...",
    audioBtnLoading: "Preparing Voice...",
    time1Date: "25 Million Years Ago",
    time1Event: "Ancient Volcanism",
    time1Desc:
      "Submarine volcanic eruptions formed the foundation of Menganti.",
    time2Date: "15 Million Years Ago",
    time2Event: "Tectonic Uplift",
    time2Desc:
      "Seabed and ancient volcanoes were uplifted to the coastal surface.",
    time3Date: "Thousands of Years Ago",
    time3Event: "Marine Abrasion",
    time3Desc: "Indian Ocean waves shaped the iconic steep cliffs.",
    time4Date: "September 9, 2024",
    time4Event: "UNESCO GLOBAL GEOPARK",
    time4Desc: "Officially recognized as part of UNESCO Global Geopark.",
    supportedBy: "Supported By",
    aiChatTitle: "Ask Geo ✨",
    aiChatPlaceholder: "Ask anything...",
    aiChatWelcome: "Hello! I am your Geo Assistant for Menganti.",
    scanning: "Scanning Barcode/QR...",
  },
};

// Geosite Images
const GEOSITE_IMAGES = [
  "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?auto=format&fit=crop&q=80&w=1000",
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
  setText("lang-label", STATE.language.toUpperCase());
  setText("hero-title", t.siteTitle);
  setText("stat-rarity-label", t.rarityLabel);
  setText("stat-rarity-status", t.rarityStatus);
  setText("tab-overview", t.tabEdu);
  setText("tab-history", t.tabTime);
  setHTML(
    "edu-title",
    `<i data-lucide="book-open" class="w-5 h-5 text-sky-600"></i> ${t.eduTitle}`,
  );
  setHTML(
    "unesco-title",
    `<i data-lucide="check-circle" class="w-4 h-4 text-blue-600"></i> ${t.unescoTitle}`,
  );
  setHTML(
    "legend-title",
    `<i data-lucide="landmark" class="w-4 h-4 text-amber-500"></i> ${t.legendTitle}`,
  );
  setHTML(
    "geo-analysis-title",
    `<i data-lucide="microscope" class="w-4 h-4 text-sky-600"></i> ${t.geoAnalysisTitle}`,
  );
  setText("audio-title", t.audioTitle);
  if (!STATE.audioPlaying) setText("audio-status", t.audioBtnIdle);
  setText("supported-by-label", t.supportedBy);
  setText("chat-fab-label", `✨ ${t.aiChatTitle.replace("✨", "")}`);
  setText("ar-scanning-text", t.scanning);
  setText("time1-date", t.time1Date);
  setText("time1-event", t.time1Event);
  setText("time1-desc", t.time1Desc);
  setText("time2-date", t.time2Date);
  setText("time2-event", t.time2Event);
  setText("time2-desc", t.time2Desc);
  setText("time3-date", t.time3Date);
  setText("time3-event", t.time3Event);
  setText("time3-desc", t.time3Desc);
  setText("time4-date", t.time4Date);
  setText("time4-event", t.time4Event);
  setText("time4-desc", t.time4Desc);
  lucide.createIcons();
}

function toggleLanguage() {
  STATE.language = STATE.language === "id" ? "en" : "id";
  updateUI();
}

function switchTab(tab) {
  const isOverview = tab === "overview";
  getElement("view-overview").classList.toggle("hidden", !isOverview);
  getElement("view-history").classList.toggle("hidden", isOverview);
  getElement("tab-overview").className =
    `pb-2 text-xs font-bold uppercase tracking-wider transition-all ${
      isOverview ? "text-sky-600 border-b-2 border-sky-600" : "text-slate-400"
    }`;
  getElement("tab-history").className =
    `pb-2 text-xs font-bold uppercase tracking-wider transition-all ${
      !isOverview ? "text-sky-600 border-b-2 border-sky-600" : "text-slate-400"
    }`;
}

// Carousel Functions
function initCarousel() {
  const container = getElement("slide-container");
  const indicatorContainer = getElement("slide-indicators");

  GEOSITE_IMAGES.forEach((url, i) => {
    const slide = document.createElement("div");
    slide.className = `absolute inset-0 transition-opacity duration-1000 ease-in-out ${
      i === 0 ? "opacity-100" : "opacity-0"
    }`;
    slide.id = `slide-${i}`;
    slide.innerHTML = `<img src="${url}" class="w-full h-full object-cover">`;
    container.appendChild(slide);

    const dot = document.createElement("div");
    dot.id = `dot-${i}`;
    dot.className = `h-1 rounded-full transition-all duration-300 ${
      i === 0 ? "w-6 bg-sky-500" : "w-2 bg-white/50"
    }`;
    indicatorContainer.appendChild(dot);
  });

  setInterval(() => {
    const prev = STATE.currentSlide;
    STATE.currentSlide = (STATE.currentSlide + 1) % GEOSITE_IMAGES.length;
    getElement(`slide-${prev}`).style.opacity = "0";
    getElement(`slide-${STATE.currentSlide}`).style.opacity = "1";
    getElement(`dot-${prev}`).className =
      `h-1 rounded-full transition-all duration-300 w-2 bg-white/50`;
    getElement(`dot-${STATE.currentSlide}`).className =
      `h-1 rounded-full transition-all duration-300 w-6 bg-sky-500`;
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
  setText("audio-status", t.audioBtnLoading);
  getElement("audio-progress-container").classList.remove("hidden");

  const fullText = `${t.audioDesc} Mari jelajahi ${t.siteTitle}. ${t.eduDesc}. ${t.unescoDesc}. ${t.legendDesc}`;

  try {
    const response = await fetch(CONFIG.ttsBackendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: fullText,
        language: STATE.language,
      }),
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok || contentType?.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(errorData.message || "TTS error");
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
    console.error("[TTS] Error:", err);
    setText("audio-status", t.audioBtnIdle);
    getElement("audio-progress-container").classList.add("hidden");
  }
}

function updateAudioBtn(isPlaying) {
  getElement("audio-icon").setAttribute(
    "data-lucide",
    isPlaying ? "pause" : "play",
  );
  setText(
    "audio-status",
    isPlaying
      ? TRANSLATIONS[STATE.language].audioBtnPlaying
      : TRANSLATIONS[STATE.language].audioBtnIdle,
  );
  getElement("audio-progress-container").classList.toggle("hidden", !isPlaying);
  lucide.createIcons();
}

// Chat Functions
function openChat() {
  getElement("chat-modal").classList.replace("hidden", "flex");
}

function closeChat() {
  getElement("chat-modal").classList.replace("flex", "hidden");
}

async function handleAskGemini(e) {
  e.preventDefault();
  const input = getElement("chat-input");
  const text = input.value.trim();
  if (!text || STATE.isTyping) return;

  const messages = getElement("chat-messages");
  messages.innerHTML += `<div class="flex justify-end"><div class="p-4 rounded-2xl max-w-[85%] text-xs bg-sky-600 text-white rounded-br-none shadow-md">${text}</div></div>`;
  input.value = "";
  STATE.isTyping = true;

  try {
    const res = await fetch(CONFIG.chatBackendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text,
        context: CONFIG.geositeContext,
        language: STATE.language,
      }),
    });

    if (!res.ok) throw new Error("Chat request failed");

    const data = await res.json();
    const aiResponse = data.response || "Error.";
    messages.innerHTML += `<div class="flex justify-start"><div class="p-4 rounded-2xl max-w-[85%] text-xs bg-slate-100 text-slate-700 rounded-bl-none border border-slate-200">${aiResponse}</div></div>`;
  } catch (err) {
    console.error("Chat error:", err);
    messages.innerHTML += `<div class="flex justify-start"><div class="p-4 rounded-2xl max-w-[85%] text-xs bg-red-50 text-red-700 rounded-bl-none">Maaf, terjadi kesalahan. Pastikan backend server berjalan.</div></div>`;
  } finally {
    STATE.isTyping = false;
    messages.scrollTop = messages.scrollHeight;
  }
}

// AR Scanner Functions
async function startAR() {
  getElement("ar-view").classList.remove("hidden");
  STATE.html5QrCode = new Html5Qrcode("qr-reader");

  try {
    await STATE.html5QrCode.start(
      { facingMode: "environment" },
      CONFIG.qrScanConfig,
      (decodedText) => {
        window.location.href = decodedText.startsWith("http")
          ? decodedText
          : "https://www.google.com/search?q=" +
            encodeURIComponent(decodedText);
        stopAR();
      },
      () => {},
    );
  } catch (err) {
    console.error("AR Scanner error:", err);
  }
}

function stopAR() {
  if (STATE.html5QrCode) {
    STATE.html5QrCode
      .stop()
      .finally(() => getElement("ar-view").classList.add("hidden"));
  } else {
    getElement("ar-view").classList.add("hidden");
  }
}

// Initialize on page load
window.onload = () => {
  initCarousel();
  updateUI();
};
