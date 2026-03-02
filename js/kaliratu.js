const CONFIG = {
  ttsBackendUrl: "/.netlify/functions/tts",
  chatBackendUrl: "http://localhost:3000/api/chat",
  geositeContext: "kaliratu",
  carouselInterval: 5000,
  scannerFps: 10,
  scannerQrBox: 250,
};

const STATE = {
  language: "id",
  currentSlide: 0,
  audioPlaying: false,
  audioSource: null,
  isTyping: false,
  html5QrCode: null,
};

const TRANSLATIONS = {
  id: {
    siteTitle: "Penyu Kaliratu",
    location: "Jogosimo, Kebumen",
    rarityLabel: "Status Biosite",
    rarityStatus: "PERLINDUNGAN VITAL",
    statusLabel: "Status Kawasan",
    heritageLabel: "Warisan Dunia",
    tabEdu: "Edukasi",
    tabTime: "Timeline",
    eduTitle: "Keajaiban Kaliratu",
    eduDesc:
      "Konservasi Penyu Kaliratu adalah pusat pelestarian penyu lekang dan penyu hijau yang dikelola secara swadaya oleh masyarakat desa Jogosimo. Biosite ini menjadi garda terdepan dalam melindungi telur penyu dari predator dan perburuan liar.",
    unescoTitle: "Mengapa Diangkat UNESCO?",
    unescoDesc:
      "Sebagai biosite resmi, Kaliratu membuktikan bahwa pilar konservasi UNESCO mencakup hubungan harmonis antara manusia dan ekosistem hayati. Keberhasilan penetasan ribuan tukik setiap tahunnya menjadi indikator kesehatan lingkungan pesisir internasional.",
    legendTitle: 'Mengapa disebut "Kaliratu"?',
    legendDesc:
      'Kaliratu berasal dari pertemuan muara sungai dan laut kidul yang dianggap sakral. Area ini menjadi jalur alami bagi sang "Ratu Samudra" yaitu penyu untuk kembali pulang dan menitipkan generasi penerusnya di pasir Jogosimo.',
    geoAnalysisTitle: "Analisis Biosite",
    chertTitle: "Penyu Lekang (Olive Ridley)",
    chertDesc:
      "Spesies penyu yang paling setia mendarat di pesisir selatan. Perannya sangat vital dalam menjaga keseimbangan rantai makanan laut.",
    lavaTitle: "Habitat Pantai Pasir",
    lavaDesc:
      "Karakteristik pasir yang hangat dan bersih di Jogosimo mendukung inkubasi telur penyu secara alami dengan tingkat keberhasilan tinggi.",
    audioTitle: "Pemandu Suara AI",
    audioDesc:
      "Halo semuanya! Selamat datang di Biosite Konservasi Penyu Kaliratu, Kebumen Geopark. ",
    audioBtnIdle: "Bacakan Seluruh Info Situs",
    audioBtnPlaying: "Sedang Membacakan...",
    audioBtnLoading: "Sedang Menyiapkan Suara AI...",
    time1Date: "Tahun 2012",
    time1Event: "Kesadaran Komunitas",
    time1Desc:
      "Warga Jogosimo mulai melindungi telur penyu dari ancaman predator dan perburuan.",
    time4Date: "9 September 2024",
    time4Event: "UNESCO GLOBAL GEOPARK",
    time4Desc: "Kaliratu resmi menjadi biosite unggulan warisan dunia UNESCO.",
    aiChatTitle: "Tanya Geo ✨",
    chatWelcome:
      "Halo! Saya Asisten Geo. Ada yang ingin kamu ketahui tentang Penyu Kaliratu?",
    chatFabLabel: "✨ Chat Geo",
    scanning: "Memindai Barcode/QR...",
  },
  en: {
    siteTitle: "Kaliratu Turtle",
    location: "Jogosimo, Kebumen",
    rarityLabel: "Biosite Status",
    rarityStatus: "VITAL PROTECTION",
    statusLabel: "Area Status",
    heritageLabel: "World Heritage",
    tabEdu: "Education",
    tabTime: "Timeline",
    eduTitle: "The Miracle of Kaliratu",
    eduDesc:
      "Kaliratu Turtle Conservation is a preservation center for Olive Ridley and Green turtles managed independently by Jogosimo village community. This biosite serves as the frontline in protecting turtle eggs from predators and illegal hunting.",
    unescoTitle: "Why UNESCO Recognition?",
    unescoDesc:
      "As an official biosite, Kaliratu proves that UNESCO conservation pillars include harmonious relationships between humans and biological ecosystems. The successful hatching of thousands of hatchlings annually serves as an indicator of international coastal environmental health.",
    legendTitle: 'Why is it called "Kaliratu"?',
    legendDesc:
      'Kaliratu comes from the meeting of river mouth and south sea considered sacred. This area becomes a natural path for the "Ocean Queen" (turtles) to return home and entrust their next generation in Jogosimo\'s sand.',
    geoAnalysisTitle: "Biosite Analysis",
    chertTitle: "Olive Ridley Turtle",
    chertDesc:
      "The most loyal turtle species landing on the southern coast. Its role is vital in maintaining the marine food chain balance.",
    lavaTitle: "Sandy Beach Habitat",
    lavaDesc:
      "The warm and clean sand characteristics in Jogosimo support natural turtle egg incubation with high success rates.",
    audioTitle: "AI Voice Guide",
    audioDesc:
      "Hello everyone! Welcome to Kaliratu Turtle Conservation Biosite, Kebumen Geopark. ",
    audioBtnIdle: "Read All Site Information",
    audioBtnPlaying: "Reading Narration...",
    audioBtnLoading: "Preparing AI Voice...",
    time1Date: "Year 2012",
    time1Event: "Community Awareness",
    time1Desc:
      "Jogosimo residents began protecting turtle eggs from predator and poaching threats.",
    time4Date: "September 9, 2024",
    time4Event: "UNESCO GLOBAL GEOPARK",
    time4Desc:
      "Kaliratu is officially recognized as a world-class UNESCO biosite.",
    aiChatTitle: "Ask Geo ✨",
    chatWelcome:
      "Hello! I am Geo Assistant. What would you like to know about Kaliratu Turtle?",
    chatFabLabel: "✨ Chat Geo",
    scanning: "Scanning Barcode/QR...",
  },
};

const geositeImages = [
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000",
];

function updateUI() {
  const t = TRANSLATIONS[STATE.language];

  document.getElementById("lang-label").innerText =
    STATE.language.toUpperCase();
  document.getElementById("hero-title").innerText = t.siteTitle;
  document.getElementById("hero-location").innerText = t.location;
  document.getElementById("stat-rarity-label").innerText = t.rarityLabel;
  document.getElementById("stat-rarity-status").innerText = t.rarityStatus;
  document.getElementById("tab-overview").innerText = t.tabEdu;
  document.getElementById("tab-history").innerText = t.tabTime;

  document.getElementById("edu-title").innerHTML =
    `<i data-lucide="book-open" class="w-5 h-5 text-sky-600"></i> ${t.eduTitle}`;
  document.getElementById("edu-desc").innerText = t.eduDesc;
  document.getElementById("unesco-title").innerHTML =
    `<i data-lucide="check-circle" class="w-4 h-4 text-blue-600"></i> ${t.unescoTitle}`;
  document.getElementById("unesco-desc").innerText = t.unescoDesc;
  document.getElementById("legend-title").innerHTML =
    `<i data-lucide="landmark" class="w-4 h-4 text-amber-500"></i> ${t.legendTitle}`;
  document.getElementById("legend-desc").innerText = t.legendDesc;
  document.getElementById("geo-analysis-title").innerHTML =
    `<i data-lucide="microscope" class="w-4 h-4 text-sky-600"></i> ${t.geoAnalysisTitle}`;
  document.getElementById("chert-title").innerText = t.chertTitle;
  document.getElementById("chert-desc").innerText = t.chertDesc;
  document.getElementById("lava-title").innerText = t.lavaTitle;
  document.getElementById("lava-desc").innerText = t.lavaDesc;

  document.getElementById("audio-title").innerText = t.audioTitle;
  if (!STATE.audioPlaying) {
    document.getElementById("audio-status").innerText = t.audioBtnIdle;
  }

  document.getElementById("time1-date").innerText = t.time1Date;
  document.getElementById("time1-event").innerText = t.time1Event;
  document.getElementById("time1-desc").innerText = t.time1Desc;
  document.getElementById("time4-date").innerText = t.time4Date;
  document.getElementById("time4-event").innerText = t.time4Event;
  document.getElementById("time4-desc").innerText = t.time4Desc;

  document.getElementById("chat-title").innerText = t.aiChatTitle;
  document.getElementById("chat-welcome").innerText = t.chatWelcome;
  document.getElementById("chat-fab-label").innerText = t.chatFabLabel;

  lucide.createIcons();
}

function toggleLanguage() {
  STATE.language = STATE.language === "id" ? "en" : "id";
  updateUI();
}

async function handleAudioPlay() {
  if (STATE.audioPlaying) {
    if (STATE.audioSource) STATE.audioSource.pause();
    window.speechSynthesis.cancel();
    STATE.audioPlaying = false;
    updateAudioBtn(false);
    return;
  }

  const t = TRANSLATIONS[STATE.language];
  document.getElementById("audio-status").innerText = t.audioBtnLoading;
  document
    .getElementById("audio-progress-container")
    .classList.remove("hidden");

  const fullText = `${t.audioDesc} Mari jelajahi ${t.siteTitle}. ${t.eduDesc}. ${t.unescoTitle}: ${t.unescoDesc}. ${t.legendTitle}: ${t.legendDesc}. Terakhir, dalam ${t.geoAnalysisTitle}, kita lihat ${t.chertTitle} dan ${t.lavaTitle}.`;

  try {
    const response = await fetch(CONFIG.ttsBackendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: fullText,
        language: STATE.language,
      }),
    });

    if (!response.ok) {
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
  } catch (error) {
    console.error("[TTS] Error:", error);
    console.warn("AI Voice failed, switching to system voice...");

    const utterance = new SpeechSynthesisUtterance(
      fullText.replace(t.audioDesc, ""),
    );
    utterance.lang = STATE.language === "id" ? "id-ID" : "en-US";
    utterance.onstart = () => {
      STATE.audioPlaying = true;
      updateAudioBtn(true);
    };
    utterance.onend = () => {
      STATE.audioPlaying = false;
      updateAudioBtn(false);
    };
    window.speechSynthesis.speak(utterance);
  }
}

function updateAudioBtn(isPlaying) {
  document
    .getElementById("audio-icon")
    .setAttribute("data-lucide", isPlaying ? "pause" : "play");
  document.getElementById("audio-status").innerText = isPlaying
    ? TRANSLATIONS[STATE.language].audioBtnPlaying
    : TRANSLATIONS[STATE.language].audioBtnIdle;
  document
    .getElementById("audio-progress-container")
    .classList.toggle("hidden", !isPlaying);
  lucide.createIcons();
}

function switchTab(tab) {
  const isOverview = tab === "overview";
  document
    .getElementById("view-overview")
    .classList.toggle("hidden", !isOverview);
  document
    .getElementById("view-history")
    .classList.toggle("hidden", isOverview);

  document.getElementById("tab-overview").className =
    `pb-2 text-xs font-bold uppercase tracking-wider transition-all ${isOverview ? "text-sky-600 border-b-2 border-sky-600" : "text-slate-400"}`;
  document.getElementById("tab-history").className =
    `pb-2 text-xs font-bold uppercase tracking-wider transition-all ${!isOverview ? "text-sky-600 border-b-2 border-sky-600" : "text-slate-400"}`;
}

function initCarousel() {
  const container = document.getElementById("slide-container");
  const indicatorContainer = document.getElementById("slide-indicators");

  geositeImages.forEach((url, i) => {
    const slide = document.createElement("div");
    slide.className = `absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === 0 ? "opacity-100" : "opacity-0"}`;
    slide.id = `slide-${i}`;
    slide.innerHTML = `<img src="${url}" class="w-full h-full object-cover" alt="Kaliratu ${i + 1}">`;
    container.appendChild(slide);

    const dot = document.createElement("div");
    dot.id = `dot-${i}`;
    dot.className = `h-1 rounded-full transition-all duration-300 ${i === 0 ? "w-6 bg-sky-500" : "w-2 bg-white/50"}`;
    indicatorContainer.appendChild(dot);
  });

  setInterval(() => {
    const prev = STATE.currentSlide;
    STATE.currentSlide = (STATE.currentSlide + 1) % geositeImages.length;

    document.getElementById(`slide-${prev}`).style.opacity = "0";
    document.getElementById(`slide-${STATE.currentSlide}`).style.opacity = "1";
    document.getElementById(`dot-${prev}`).className =
      "h-1 rounded-full transition-all duration-300 w-2 bg-white/50";
    document.getElementById(`dot-${STATE.currentSlide}`).className =
      "h-1 rounded-full transition-all duration-300 w-6 bg-sky-500";
  }, CONFIG.carouselInterval);
}

async function handleAskGemini(e) {
  e.preventDefault();
  const input = document.getElementById("chat-input");
  const text = input.value.trim();

  if (!text || STATE.isTyping) return;

  const messages = document.getElementById("chat-messages");
  messages.innerHTML += `<div class="flex justify-end"><div class="p-4 rounded-2xl max-w-[85%] text-xs bg-sky-600 text-white rounded-br-none shadow-md text-left">${text}</div></div>`;
  input.value = "";
  STATE.isTyping = true;
  messages.scrollTop = messages.scrollHeight;

  try {
    const response = await fetch(CONFIG.chatBackendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text,
        context: CONFIG.geositeContext,
        language: STATE.language,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[CHAT] Backend error:", data);
      throw new Error(data.message || "Chat error");
    }

    messages.innerHTML += `<div class="flex justify-start"><div class="p-4 rounded-2xl max-w-[85%] text-xs bg-slate-100 text-slate-700 rounded-bl-none border border-slate-200 text-left">${data.response}</div></div>`;
  } catch (error) {
    console.error("[CHAT] Error:", error);
    messages.innerHTML += `<div class="flex justify-start"><div class="p-4 rounded-2xl max-w-[85%] text-xs bg-red-50 text-red-600 text-left">Kesalahan sambungan.</div></div>`;
  } finally {
    STATE.isTyping = false;
    messages.scrollTop = messages.scrollHeight;
  }
}

function openChat() {
  document.getElementById("chat-modal").classList.remove("hidden");
  document.getElementById("chat-modal").classList.add("flex");
}

function closeChat() {
  document.getElementById("chat-modal").classList.add("hidden");
  document.getElementById("chat-modal").classList.remove("flex");
}

async function startAR() {
  document.getElementById("ar-view").classList.remove("hidden");
  STATE.html5QrCode = new Html5Qrcode("qr-reader");

  try {
    await STATE.html5QrCode.start(
      { facingMode: "environment" },
      { fps: CONFIG.scannerFps, qrbox: CONFIG.scannerQrBox },
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
    );
  } catch (error) {
    console.error("[SCANNER] Error:", error);
    stopAR();
  }
}

function stopAR() {
  if (STATE.html5QrCode) {
    STATE.html5QrCode.stop().finally(() => {
      document.getElementById("ar-view").classList.add("hidden");
    });
  } else {
    document.getElementById("ar-view").classList.add("hidden");
  }
}

// Expose functions to global scope
window.toggleLanguage = toggleLanguage;
window.handleAudioPlay = handleAudioPlay;
window.switchTab = switchTab;
window.handleAskGemini = handleAskGemini;
window.openChat = openChat;
window.closeChat = closeChat;
window.startAR = startAR;
window.stopAR = stopAR;

window.onload = () => {
  initCarousel();
  updateUI();
};
