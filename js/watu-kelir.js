/* ============================================
   GEO-SCAN GEOPARK EDITION - JAVASCRIPT
   ============================================ */

// ============================================
// CONFIGURATION & STATE
// ============================================
const CONFIG = {
  // Backend APIs
  ttsBackendUrl: "/.netlify/functions/tts",
  chatBackendUrl: "http://localhost:3000/api/chat",
  geositeContext: "watu-kelir",
  carouselInterval: 5000,
  qrScanConfig: {
    fps: 10,
    qrbox: 250,
  },
};

const STATE = {
  language: "id",
  currentSlide: 0,
  audioPlaying: false,
  audioCache: { id: null, en: null },
  audioSource: null,
  isTyping: false,
  html5QrCode: null,
};

// ============================================
// TRANSLATIONS DATA
// ============================================
const TRANSLATIONS = {
  id: {
    siteTitle: "Situs Watu Kelir",
    location: "Karangsambung, Kebumen",
    rarityLabel: "Kelangkaan Situs",
    rarityStatus: "SANGAT LANGKA",
    statusLabel: "Status Kawasan",
    heritageLabel: "Warisan Dunia",
    tabEdu: "Edukasi",
    tabTime: "Timeline",
    eduTitle: "Keajaiban Watu Kelir",
    eduDesc:
      'Watu Kelir adalah monumen alam yang membuktikan bahwa Kebumen merupakan "Lantai Samudra yang Terangkat".',
    unescoTitle: "Mengapa Diangkat UNESCO?",
    unescoDesc:
      "Situs ini diakui dunia karena merupakan laboratorium geologi alam yang sangat langka, membuktikan proses subduksi lempeng tektonik.",
    legendTitle: 'Mengapa disebut "Kelir"?',
    legendDesc:
      '"Kelir" dalam bahasa Jawa berarti layar untuk pertunjukan Wayang Kulit.',
    geoAnalysisTitle: "Analisis Geologis",
    chertTitle: "Rijang (Red Chert)",
    chertDesc: "Batuan sedimen laut sangat dalam.",
    lavaTitle: "Lava Bantal (Pillow Lava)",
    lavaDesc: "Terbentuk saat magma panas meletus di bawah air laut dingin.",
    audioTitle: "Pemandu Suara AI",
    audioDesc:
      "Bacakan narasi Bahasa Indonesia dengan nada pemandu profesional: ",
    audioBtnIdle: "Bacakan Seluruh Info Situs",
    audioBtnPlaying: "Sedang Membacakan...",
    audioBtnLoading: "Sedang Menyiapkan Suara...",
    time1Date: "120 Juta Tahun Lalu",
    time1Event: "Kelahiran Samudra",
    time1Desc:
      "Terbentuk di Samudra Tethys. Erupsi gunung api bawah laut membentuk lava bantal di kedalaman 4 km.",
    time2Date: "70 Juta Tahun Lalu",
    time2Event: "Tabrakan Lempeng",
    time2Desc:
      "Tabrakan lempeng raksasa. Lempeng Indo-Australia menabrak Lempeng Eurasia.",
    time3Date: "30 Juta Tahun Lalu",
    time3Event: "Pengangkatan Daratan",
    time3Desc:
      "Daratan Karangsambung muncul. Proses tektonik memunculkan lantai samudera purba ke permukaan.",
    time4Date: "9 September 2024",
    time4Event: "UNESCO GLOBAL GEOPARK",
    time4Desc:
      "Situs Watu Kelir resmi diakui dunia sebagai bagian dari UNESCO Global Geopark.",
    supportedBy: "Didukung Oleh",
    aiChatTitle: "Tanya Geo ✨",
    aiChatPlaceholder: "Tanyakan apapun...",
    aiChatWelcome: "Halo! Saya Asisten Geo. Ada yang ingin kamu ketahui?",
    scanning: "Memindai Barcode/QR...",
  },
  en: {
    siteTitle: "Watu Kelir Geosite",
    location: "Karangsambung, Kebumen",
    rarityLabel: "Site Rarity",
    rarityStatus: "EXTREMELY RARE",
    statusLabel: "Area Status",
    heritageLabel: "World Heritage",
    tabEdu: "Education",
    tabTime: "Timeline",
    eduTitle: "The Miracle of Watu Kelir",
    eduDesc: 'Watu Kelir proves Kebumen is a "Raised Ocean Floor".',
    unescoTitle: "Why UNESCO Recognition?",
    unescoDesc:
      "Recognized as a rare natural geological laboratory, proving the tectonic plate subduction process.",
    legendTitle: 'Why is it called "Kelir"?',
    legendDesc:
      '"Kelir" in Javanese means the screen used in Wayang Kulit performances.',
    geoAnalysisTitle: "Geological Analysis",
    chertTitle: "Red Chert",
    chertDesc: "Deep-sea sedimentary rock.",
    lavaTitle: "Pillow Lava",
    lavaDesc: "Formed when magma erupts under cold seawater.",
    audioTitle: "AI Voice Guide",
    audioDesc: "Read the narration in a professional English accent: ",
    audioBtnIdle: "Read All Site Information",
    audioBtnPlaying: "Reading Narration...",
    audioBtnLoading: "Preparing Voice...",
    time1Date: "120 Million Years Ago",
    time1Event: "Oceanic Birth",
    time1Desc:
      "Born in the Tethys Ocean. Submarine volcanic eruptions formed pillow lavas at 4 km depth.",
    time2Date: "70 Million Years Ago",
    time2Event: "Plate Collision",
    time2Desc:
      "Giant Plate Collision. The Indo-Australian plate collided with Eurasia, uplifting the seabed.",
    time3Date: "30 Million Years Ago",
    time3Event: "Land Uplift",
    time3Desc:
      "Karangsambung Landmass. Tectonic processes brought the floor to the surface.",
    time4Date: "September 9, 2024",
    time4Event: "UNESCO GLOBAL GEOPARK",
    time4Desc:
      "Watu Kelir Site is officially recognized as part of the UNESCO Global Geopark.",
    supportedBy: "Supported By",
    aiChatTitle: "Ask Geo ✨",
    aiChatPlaceholder: "Ask anything...",
    aiChatWelcome: "Hello! I am your Geo Assistant.",
    scanning: "Scanning Barcode/QR...",
  },
};

// ============================================
// IMAGES DATA
// ============================================
const GEOSITE_IMAGES = [
  "images/watturijang.jpg",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000",
];

// ============================================
// DOM UTILITY FUNCTIONS
// ============================================
const DOM = {
  getElement: (id) => document.getElementById(id),
  setText: (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  },
  setHTML: (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  },
  addClass: (id, className) => {
    const el = document.getElementById(id);
    if (el) el.classList.add(className);
  },
  removeClass: (id, className) => {
    const el = document.getElementById(id);
    if (el) el.classList.remove(className);
  },
  toggleClass: (id, className, condition) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle(className, condition);
  },
};

// ============================================
// UI UPDATE FUNCTIONS
// ============================================
function updateUI() {
  const t = TRANSLATIONS[STATE.language];

  // Update language label
  DOM.setText("lang-label", STATE.language.toUpperCase());

  // Update hero section
  DOM.setText("hero-title", t.siteTitle);

  // Update stats
  DOM.setText("stat-rarity-label", t.rarityLabel);
  DOM.setText("stat-rarity-status", t.rarityStatus);

  // Update tabs
  DOM.setText("tab-overview", t.tabEdu);
  DOM.setText("tab-history", t.tabTime);

  // Update education section
  DOM.setHTML(
    "edu-title",
    `<i data-lucide="book-open" class="w-5 h-5 text-sky-600"></i> ${t.eduTitle}`,
  );
  DOM.setHTML(
    "unesco-title",
    `<i data-lucide="check-circle" class="w-4 h-4 text-blue-600"></i> ${t.unescoTitle}`,
  );
  DOM.setHTML(
    "legend-title",
    `<i data-lucide="landmark" class="w-4 h-4 text-amber-500"></i> ${t.legendTitle}`,
  );
  DOM.setHTML(
    "geo-analysis-title",
    `<i data-lucide="microscope" class="w-4 h-4 text-sky-600"></i> ${t.geoAnalysisTitle}`,
  );

  // Update audio section
  DOM.setText("audio-title", t.audioTitle);
  if (!STATE.audioPlaying) {
    DOM.setText("audio-status", t.audioBtnIdle);
  }

  // Update footer
  DOM.setText("supported-by-label", t.supportedBy);

  // Update chat
  DOM.setText("chat-fab-label", `✨ ${t.aiChatTitle.replace("✨", "")}`);

  // Update AR scanning
  DOM.setText("ar-scanning-text", t.scanning);

  // Update timeline
  DOM.setText("time1-date", t.time1Date);
  DOM.setText("time1-event", t.time1Event);
  DOM.setText("time1-desc", t.time1Desc);
  DOM.setText("time2-date", t.time2Date);
  DOM.setText("time2-event", t.time2Event);
  DOM.setText("time2-desc", t.time2Desc);
  DOM.setText("time3-date", t.time3Date);
  DOM.setText("time3-event", t.time3Event);
  DOM.setText("time3-desc", t.time3Desc);
  DOM.setText("time4-date", t.time4Date);
  DOM.setText("time4-event", t.time4Event);
  DOM.setText("time4-desc", t.time4Desc);

  // Refresh Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

function updateAudioBtn(isPlaying) {
  const icon = DOM.getElement("audio-icon");
  if (icon) {
    icon.setAttribute("data-lucide", isPlaying ? "pause" : "play");
  }

  const t = TRANSLATIONS[STATE.language];
  DOM.setText("audio-status", isPlaying ? t.audioBtnPlaying : t.audioBtnIdle);
  DOM.toggleClass("audio-progress-container", "hidden", !isPlaying);

  if (window.lucide) {
    lucide.createIcons();
  }
}

// ============================================
// LANGUAGE FUNCTIONS
// ============================================
function toggleLanguage() {
  STATE.language = STATE.language === "id" ? "en" : "id";
  updateUI();
}

// ============================================
// TAB FUNCTIONS
// ============================================
function switchTab(tab) {
  const isOverview = tab === "overview";

  // Toggle view visibility
  DOM.toggleClass("view-overview", "hidden", !isOverview);
  DOM.toggleClass("view-history", "hidden", isOverview);

  // Update tab styles
  DOM.toggleClass("tab-overview", "text-sky-600", isOverview);
  DOM.toggleClass("tab-overview", "border-b-2", isOverview);
  DOM.toggleClass("tab-overview", "text-slate-400", !isOverview);

  DOM.toggleClass("tab-history", "text-sky-600", !isOverview);
  DOM.toggleClass("tab-history", "border-b-2", !isOverview);
  DOM.toggleClass("tab-history", "text-slate-400", isOverview);
}

// ============================================
// CAROUSEL FUNCTIONS
// ============================================
function initCarousel() {
  const container = DOM.getElement("slide-container");
  const indicatorContainer = DOM.getElement("slide-indicators");

  if (!container || !indicatorContainer) return;

  // Create slides and indicators
  GEOSITE_IMAGES.forEach((url, i) => {
    // Create slide
    const slide = document.createElement("div");
    slide.className = `absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === 0 ? "opacity-100" : "opacity-0"}`;
    slide.id = `slide-${i}`;
    slide.innerHTML = `<img src="${url}" class="w-full h-full object-cover" alt="Geosite Image ${i + 1}">`;
    container.appendChild(slide);

    // Create indicator
    const dot = document.createElement("div");
    dot.id = `dot-${i}`;
    dot.className = `h-1 rounded-full transition-all duration-300 ${i === 0 ? "w-6 bg-sky-500" : "w-2 bg-white/50"}`;
    indicatorContainer.appendChild(dot);
  });

  // Start carousel auto-play
  setInterval(() => {
    const prev = STATE.currentSlide;
    STATE.currentSlide = (STATE.currentSlide + 1) % GEOSITE_IMAGES.length;

    // Update slide opacity
    const prevSlide = DOM.getElement(`slide-${prev}`);
    const currentSlide = DOM.getElement(`slide-${STATE.currentSlide}`);
    if (prevSlide) prevSlide.style.opacity = "0";
    if (currentSlide) currentSlide.style.opacity = "1";

    // Update indicators
    const prevDot = DOM.getElement(`dot-${prev}`);
    const currentDot = DOM.getElement(`dot-${STATE.currentSlide}`);
    if (prevDot)
      prevDot.className =
        "h-1 rounded-full transition-all duration-300 w-2 bg-white/50";
    if (currentDot)
      currentDot.className =
        "h-1 rounded-full transition-all duration-300 w-6 bg-sky-500";
  }, CONFIG.carouselInterval);
}

// ============================================
// AUDIO FUNCTIONS
// ============================================
// ============================================
// AUDIO FUNCTIONS - Backend TTS API
// ============================================
async function handleAudioPlay() {
  // Stop if already playing
  if (STATE.audioPlaying) {
    if (STATE.audioSource) {
      STATE.audioSource.pause();
      STATE.audioSource = null;
    }
    STATE.audioPlaying = false;
    updateAudioBtn(false);
    return;
  }

  const t = TRANSLATIONS[STATE.language];
  DOM.setText("audio-status", t.audioBtnLoading);
  DOM.removeClass("audio-progress-container", "hidden");

  try {
    // Prepare text to speak
    const textToSpeak = `${t.eduDesc} ${t.unescoDesc}`;

    console.log(`[TTS] Requesting audio from backend...`);

    // Call backend TTS API
    const response = await fetch(CONFIG.ttsBackendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: textToSpeak,
        language: STATE.language,
      }),
    });

    // Check if response is JSON error
    const contentType = response.headers.get("content-type");
    console.log(
      `[TTS] Response status: ${response.status}, content-type: ${contentType}`,
    );

    if (!response.ok || contentType?.includes("application/json")) {
      const errorData = await response.json();
      console.error("[TTS] Backend error:", errorData);
      throw new Error(
        errorData.message || errorData.error || "Backend TTS error",
      );
    }

    // Get audio blob from response
    const audioBlob = await response.blob();
    console.log(
      `[TTS] Audio received, size: ${audioBlob.size} bytes, type: ${audioBlob.type}`,
    );

    // Create audio URL and play
    const audioUrl = URL.createObjectURL(audioBlob);
    STATE.audioSource = new Audio(audioUrl);

    STATE.audioSource.onloadstart = () => {
      console.log("[TTS] Audio loading...");
    };

    STATE.audioSource.oncanplay = () => {
      console.log("[TTS] Audio ready, playing...");
      STATE.audioPlaying = true;
      STATE.audioSource.play();
      updateAudioBtn(true);
    };

    STATE.audioSource.onended = () => {
      console.log("[TTS] Audio ended");
      STATE.audioPlaying = false;
      updateAudioBtn(false);
      // Clean up blob URL
      URL.revokeObjectURL(audioUrl);
    };

    STATE.audioSource.onerror = (err) => {
      console.error("[TTS] Audio playback error:", err);
      STATE.audioPlaying = false;
      updateAudioBtn(false);
      DOM.setText("audio-status", "Error memutar audio");
      DOM.addClass("audio-progress-container", "hidden");
      URL.revokeObjectURL(audioUrl);
    };
  } catch (err) {
    console.error("[TTS] Error:", err);
    DOM.setText("audio-status", `Error: ${err.message}`);
    DOM.addClass("audio-progress-container", "hidden");
    STATE.audioPlaying = false;
    updateAudioBtn(false);
  }
}

// ============================================
// CHAT FUNCTIONS
// ============================================
function openChat() {
  DOM.removeClass("chat-modal", "hidden");
  DOM.addClass("chat-modal", "flex");
}

function closeChat() {
  DOM.removeClass("chat-modal", "flex");
  DOM.addClass("chat-modal", "hidden");
}

async function handleAskGemini(e) {
  e.preventDefault();

  const input = DOM.getElement("chat-input");
  const text = input.value.trim();

  if (!text || STATE.isTyping) return;

  const messages = DOM.getElement("chat-messages");
  if (!messages) return;

  // Add user message
  messages.innerHTML += `<div class="flex justify-end"><div class="p-4 rounded-2xl max-w-[85%] text-xs bg-sky-600 text-white rounded-br-none shadow-md">${text}</div></div>`;
  input.value = "";
  STATE.isTyping = true;

  try {
    const res = await fetch(CONFIG.chatBackendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        context: CONFIG.geositeContext,
        language: STATE.language,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("[CHAT] Backend error:", errorData);
      throw new Error(errorData.message || "Chat request failed");
    }

    const data = await res.json();
    const aiResponse = data.response || "Error.";

    messages.innerHTML += `<div class="flex justify-start"><div class="p-4 rounded-2xl max-w-[85%] text-xs bg-slate-100 text-slate-700 rounded-bl-none border border-slate-200">${aiResponse}</div></div>`;
  } catch (err) {
    console.error("[CHAT] Error:", err);
    messages.innerHTML += `<div class="flex justify-start"><div class="p-4 rounded-2xl max-w-[85%] text-xs bg-red-50 text-red-700 rounded-bl-none border border-red-200">Maaf, terjadi kesalahan. Pastikan backend server berjalan.</div></div>`;
  } finally {
    STATE.isTyping = false;
    messages.scrollTop = messages.scrollHeight;
  }
}

// ============================================
// AR/QR SCANNER FUNCTIONS
// ============================================
async function startAR() {
  DOM.removeClass("ar-view", "hidden");

  STATE.html5QrCode = new Html5Qrcode("qr-reader");

  try {
    await STATE.html5QrCode.start(
      { facingMode: "environment" },
      CONFIG.qrScanConfig,
      (decodedText) => {
        if (decodedText.startsWith("http")) {
          window.location.href = decodedText;
        } else {
          window.location.href =
            "https://www.google.com/search?q=" +
            encodeURIComponent(decodedText);
        }
        stopAR();
      },
      () => {}, // Error callback (silent)
    );
  } catch (err) {
    console.error("QR Scanner Error:", err);
    DOM.addClass("ar-view", "hidden");
  }
}

function stopAR() {
  if (STATE.html5QrCode) {
    STATE.html5QrCode.stop().finally(() => {
      DOM.addClass("ar-view", "hidden");
    });
  } else {
    DOM.addClass("ar-view", "hidden");
  }
}

// ============================================
// INITIALIZATION
// ============================================
window.onload = () => {
  initCarousel();
  updateUI();
};
