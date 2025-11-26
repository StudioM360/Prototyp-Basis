import { USP, TechItem, Language, ServiceOffer, IntegrationItem, ServiceCategory, AIModel, TechStackComponent, StudioAction } from './types';

export const SYSTEM_INSTRUCTION_DE = `
Du bist "Lumos AI", der Experte für das "Lokal AI Studio". Dein Wissen ist umfassend und basiert auf dem neuesten, detaillierten Leistungskatalog.

**MISSION:**
Verkaufe das "Lokal AI Studio" als die ultimative "All-in-One" Home-Office-Lösung. Es ist ein **kostenpflichtiges Premium-Produkt** (Einmalkauf + Support), das fragmentierte Cloud-Tools durch eine integrierte, lokale und sichere Suite ersetzt. Betone die **maximale Produktivität ohne Cloud-Abhängigkeit**.

**DEIN KERNWISSEN (AUS DEM PDF):**

**1. Leistungsumfang ("All-in-One" Paket):**
   - **A. Meeting & Sprache (Ersetzt Otter.ai):** Live-Diktat, Meeting-Protokolle (Zoom/Teams), Sprachausgabe (TTS), Offline-Transkription.
   - **B. Dokumenten-Intelligenz (Ersetzt ChatPDF):** Lokaler Chat mit PDFs/Word-Dateien (RAG), semantische Suche, Zusammenfassungen, lokale Wissens-Datenbank (ChromaDB).
   - **C. Text & Kommunikation (Ersetzt ChatGPT Plus):** Ghostwriter für E-Mails/Marketing, Übersetzungen (DE/EN/FR/ES), Lektorat.
   - **D. Kreativ-Studio (Ersetzt Midjourney):** Text-to-Image (lizenzfrei), schnelle Entwürfe (SDXL Turbo), Inpainting/Outpainting, Bild-Verständnis (Vision).
   - **E. Sicherheit & IT (Ersetzt VPN):** Isolierter Sicherheits-Browser (Sandbox), der Tracker blockiert und sich selbst löscht.

**2. KI-Modelle & Tech-Stack ("Der Motor"):**
   - **LLM (Text):** Llama 3 (8B/70B) für komplexe Aufgaben, Mistral 7B (v0.3) für Effizienz auf Laptops.
   - **Übersetzung:** NLLB ("No Language Left Behind").
   - **Code:** CodeLlama / DeepSeek.
   - **Bild (Art):** Stable Diffusion XL (High-End) & SDXL Turbo (Echtzeit).
   - **Vision:** LLaVA.
   - **Audio:** Whisper (Large-v3) via Whisper.cpp für Spracherkennung, Coqui TTS / Piper für Sprachausgabe.
   - **Suche:** all-MiniLM-L6-v2 für Vektorisierung.
   - **Backend/Server:** Python (FastAPI) und Ollama für das LLM-Management.
   - **Datenbank:** ChromaDB (Vektor-Store), SQLite (Metadaten).
   - **Isolation:** Firejail / Sandboxie für den Sicherheits-Browser.

**3. Architektur & Business-Features:**
   - **Intelligenter Installer:** Erkennt GPU (Nvidia), RAM, CPU und wählt das beste Modell (z.B. 70B nur bei >24GB VRAM). Repariert Firewall-Regeln selbst.
   - **Native Performance:** Kein Docker-Zwang, direkte Integration ins OS (Windows Services / Linux systemd).
   - **Design-System:** "Deep Space Neon" – Dunkles UI (#050a14) mit Glassmorphismus und Neon-Akzenten.
   - **Offline-First:** Funktioniert komplett ohne Internet nach dem Download.
   - **Team-Features:** Benutzerkonten, Rollenverteilung.
   - **Admin-Dashboard:** Echtzeit-Monitoring von GPU-Last und Token-Verbrauch.

**FAZIT FÜR DEN NUTZER (Dein Pitch):**
"Sie bekommen ein privates Rechenzentrum für Ihren Schreibtisch: Ein Ghostwriter (Llama 3), ein Grafiker (SDXL), ein Sekretär (Whisper/RAG), ein IT-Security-Spezialist (ISB) und ein Sysadmin (Auto-Installer) – alles in einem lokalen Software-Paket, ohne monatliche Cloud-Kosten."

**SPRACHSTIL:**
- **Tonalität:** Kompetent, begeistert, aber einfach. Übersetze technische Features in klaren Kundennutzen.
- **Ziel:** Überzeuge den Kunden von der Überlegenheit einer lokalen, integrierten Lösung.

ANTWORTE IMMER AUF DEUTSCH.
`;

export const SYSTEM_INSTRUCTION_EN = `
You are "Lumos AI", the expert on "Lokal AI Studio". Your knowledge is comprehensive and based on the latest detailed service catalog.

**MISSION:**
Sell the "Lokal AI Studio" as the ultimate "All-in-One" home office solution. It is a **paid premium product** (one-time purchase + support) that replaces fragmented cloud tools with an integrated, local, and secure suite. Emphasize **maximum productivity without cloud dependency**.

**YOUR CORE KNOWLEDGE (FROM THE PDF):**

**1. Scope of Services ("All-in-One" Package):**
   - **A. Meeting & Speech (Replaces Otter.ai):** Live dictation, meeting summaries (Zoom/Teams), text-to-speech (TTS), offline transcription.
   - **B. Document Intelligence (Replaces ChatPDF):** Local chat with PDFs/Word files (RAG), semantic search, summaries, local knowledge base (ChromaDB).
   - **C. Text & Communication (Replaces ChatGPT Plus):** Ghostwriter for emails/marketing, translations (DE/EN/FR/ES), proofreading.
   - **D. Creative Studio (Replaces Midjourney):** Text-to-image (royalty-free), rapid prototypes (SDXL Turbo), inpainting/outpainting, image understanding (Vision).
   - **E. Security & IT (Replaces VPN):** Isolated Security Browser (Sandbox) that blocks trackers and self-deletes.

**2. AI Models & Tech Stack ("The Engine"):**
   - **LLM (Text):** Llama 3 (8B/70B) for complex tasks, Mistral 7B (v0.3) for efficiency on laptops.
   - **Translation:** NLLB ("No Language Left Behind").
   - **Code:** CodeLlama / DeepSeek.
   - **Image (Art):** Stable Diffusion XL (high-end) & SDXL Turbo (real-time).
   - **Vision:** LLaVA.
   - **Audio:** Whisper (Large-v3) via Whisper.cpp for speech recognition, Coqui TTS / Piper for speech synthesis.
   - **Search:** all-MiniLM-L6-v2 for vectorization.
   - **Backend/Server:** Python (FastAPI) and Ollama for LLM management.
   - **Database:** ChromaDB (vector store), SQLite (metadata).
   - **Isolation:** Firejail / Sandboxie for the security browser.

**3. Architecture & Business Features:**
   - **Intelligent Installer:** Detects GPU (Nvidia), RAM, CPU and selects the best model (e.g., 70B only with >24GB VRAM). Self-repairs firewall rules.
   - **Native Performance:** No Docker dependency, direct OS integration (Windows Services / Linux systemd).
   - **Design System:** "Deep Space Neon" – Dark UI (#050a14) with glassmorphism and neon accents.
   - **Offline-First:** Works completely without internet after download.
   - **Team Features:** User accounts, role management.
   - **Admin Dashboard:** Real-time monitoring of GPU load and token consumption.

**CONCLUSION FOR THE USER (Your Pitch):**
"You get a private data center for your desk: A ghostwriter (Llama 3), a graphic designer (SDXL), a secretary (Whisper/RAG), an IT security specialist (ISB), and a sysadmin (Auto-Installer) – all in one local software package, without monthly cloud costs."

**STYLE:**
- **Tone:** Competent, enthusiastic, but simple. Translate technical features into clear customer benefits.
- **Goal:** Convince the customer of the superiority of a local, integrated solution.

ALWAYS RESPOND IN ENGLISH.
`;


export const TEXTS = {
  de: {
    heroTitle: "Lokal AI Studio",
    heroSubtitle: "Ihr privates Rechenzentrum für den Schreibtisch. Maximale Produktivität und Sicherheit, komplett offline.",
    heroBadge: "All-in-One Business Suite",
    chatPlaceholder: "Fragen Sie nach dem Kreativ-Studio...",
    chatButton: "Senden",
    featuresTitle: "Architektur & Design",
    servicesTitle: "Detaillierter Leistungskatalog",
    techTitle: "Open-Source Deep Dive",
    integrationTitle: "Sichere Integration & Auth",
    integrationSubtitle: "Ihre Daten, Ihre Kontrolle. Verbinden Sie Ihre Konten sicher per OAuth.",
    footer: "© 2024 Lokal AI Studio. Native OS Integration.",
    installButton: "Studio starten",
    studioTitle: "Studio Dashboard",
    adminTitle: "Admin Bereich",
    backToInstaller: "Zurück zur Landing Page",
    backToStudio: "Zurück zum Studio",
  },
  en: {
    heroTitle: "Lokal AI Studio",
    heroSubtitle: "Your private data center for your desk. Maximum productivity and security, completely offline.",
    heroBadge: "All-in-One Business Suite",
    chatPlaceholder: "Ask about the Creative Studio...",
    chatButton: "Send",
    featuresTitle: "Architecture & Design",
    servicesTitle: "Detailed Service Catalog",
    techTitle: "Open-Source Deep Dive",
    integrationTitle: "Secure Integration & Auth",
    integrationSubtitle: "Your Data, Your Control. Connect accounts securely via OAuth.",
    footer: "© 2024 Lokal AI Studio. Native OS Integration.",
    installButton: "Launch Studio",
    studioTitle: "Studio Dashboard",
    adminTitle: "Admin Dashboard",
    backToInstaller: "Back to Landing Page",
    backToStudio: "Back to Studio",
  }
};

export const USPs: Record<Language, USP[]> = {
  de: [
    {
      title: "Native Performance",
      description: "Kein Docker-Zwang. Direkte Integration ins Betriebssystem für maximale Hardware-Leistung.",
      iconKey: "Cpu"
    },
    {
      title: "Deep Space Neon Design",
      description: "Augenschonendes, dunkles UI mit Glassmorphismus und Neon-Akzenten für konzentriertes Arbeiten.",
      iconKey: "Sparkles"
    },
    {
      title: "Offline-First",
      description: "Das System ist so gebaut, dass es nach dem Download komplett ohne Internet funktioniert.",
      iconKey: "ShieldCheck"
    }
  ],
  en: [
     {
      title: "Native Performance",
      description: "No Docker dependency. Direct OS integration for maximum hardware performance.",
      iconKey: "Cpu"
    },
    {
      title: "Deep Space Neon Design",
      description: "Eye-friendly dark UI with glassmorphism and neon accents for focused work.",
      iconKey: "Sparkles"
    },
    {
      title: "Offline-First",
      description: "The system is built to work completely without internet after the initial download.",
      iconKey: "ShieldCheck"
    }
  ]
};

export const SERVICE_CATALOG: Record<Language, ServiceCategory[]> = {
  de: [
    { id: "A", title: "Meeting- & Sprach-Assistenz", replaces: "Ersetzt Otter.ai / Teams Premium", iconKey: "Mic", features: ["Live-Diktat für E-Mails & Dokumente", "Automatische Meeting-Protokolle (Zoom/Teams)", "Sprachausgabe (TTS) für Dokumente", "Offline-Transkription von Audio-Dateien"] },
    { id: "B", title: "Dokumenten-Intelligenz", replaces: "Ersetzt ChatPDF / Cloud-Storage KI", iconKey: "FileText", features: ["Lokaler Dokumenten-Chat (RAG)", "Semantische Suche nach Bedeutung", "Zusammenfassung von Berichten & Verträgen", "Permanente lokale Wissens-Datenbank"] },
    { id: "C", title: "Text & Kommunikation", replaces: "Ersetzt ChatGPT Plus / Jasper", iconKey: "MessageSquare", features: ["Ghostwriter für Marketing-Texte", "Hochwertige Übersetzungen (DE/EN/FR/ES)", "Korrekturlesen und Umformulieren"] },
    { id: "D", title: "Kreativ-Studio & Vision", replaces: "Ersetzt Midjourney / Photoshop AI", iconKey: "ImageIcon", features: ["Lizenzfreie Text-to-Image Generierung", "Echtzeit-Entwürfe (SDXL Turbo)", "Inpainting/Outpainting von Bildern", "Bild-Verständnis & Beschreibung (Vision)"] },
    { id: "E", title: "Sicherheit & IT", replaces: "Ersetzt VPN / Anti-Tracker", iconKey: "Shield", features: ["Isolierter Sicherheits-Browser (Sandbox)", "Blockiert Tracker und löscht sich selbst", "Spurenfreies Surfen auf dem Rechner"] },
  ],
  en: [
    { id: "A", title: "Meeting & Speech Assistance", replaces: "Replaces Otter.ai / Teams Premium", iconKey: "Mic", features: ["Live dictation for emails & documents", "Automatic meeting summaries (Zoom/Teams)", "Text-to-Speech (TTS) for documents", "Offline transcription of audio files"] },
    { id: "B", title: "Document Intelligence", replaces: "Replaces ChatPDF / Cloud-Storage AI", iconKey: "FileText", features: ["Local document chat (RAG)", "Semantic search by meaning", "Summarization of reports & contracts", "Permanent local knowledge base"] },
    { id: "C", title: "Text & Communication", replaces: "Replaces ChatGPT Plus / Jasper", iconKey: "MessageSquare", features: ["Ghostwriter for marketing texts", "High-quality translations (DE/EN/FR/ES)", "Proofreading and rephrasing"] },
    { id: "D", title: "Creative Studio & Vision", replaces: "Replaces Midjourney / Photoshop AI", iconKey: "ImageIcon", features: ["Royalty-free Text-to-Image generation", "Real-time prototypes (SDXL Turbo)", "Inpainting/Outpainting of images", "Image understanding & description (Vision)"] },
    { id: "E", title: "Security & IT", replaces: "Replaces VPN / Anti-Tracker", iconKey: "Shield", features: ["Isolated Security Browser (Sandbox)", "Blocks trackers and self-deletes", "Traceless surfing on your machine"] },
  ]
};

export const AI_MODELS: AIModel[] = [
  { category: "LLM (Text)", model: "Llama 3 (8B / 70B)", use: "Der Allrounder für komplexe Aufgaben und Logik." },
  { category: "LLM (Text)", model: "Mistral 7B (v0.3)", use: "Extrem effizient, perfekt für Laptops." },
  { category: "Übersetzung", model: "NLLB", use: "'No Language Left Behind' – Spezialist für Übersetzungen." },
  { category: "Code", model: "CodeLlama / DeepSeek", use: "Hilft beim Schreiben von Skripten (Python, JS, SQL)." },
  { category: "Bild (Art)", model: "Stable Diffusion XL (SDXL)", use: "High-End Bildgenerierung (fotorealistisch)." },
  { category: "Bild (Art)", model: "SDXL Turbo", use: "Echtzeit-Generierung für schnelle Ergebnisse." },
  { category: "Vision", model: "LLaVA", use: "'Large Language-and-Vision Assistant' – Bilderkennung." },
  { category: "Audio", model: "Whisper (Large-v3)", use: "Weltbeste Open-Source Spracherkennung (via Whisper.cpp)." },
  { category: "Audio", model: "Coqui TTS / Piper", use: "Lokale, natürlich klingende Sprachausgabe." },
  { category: "Suche", model: "all-MiniLM-L6-v2", use: "Wandelt Text in Vektoren für die Dokumentensuche um." },
];

export const TECH_MOTOR: TechStackComponent[] = [
    { component: "Backend", technology: "Python (FastAPI)", details: "Asynchroner Hochleistungs-Server, steuert alle KI-Prozesse." },
    { component: "Frontend", technology: "Vanilla HTML/CSS/JS", details: "Web Components, PWA, keine schweren Frameworks." },
    { component: "KI-Server", technology: "Ollama", details: "Managt das Laden und Entladen der LLMs im RAM/VRAM." },
    { component: "Datenbank", technology: "ChromaDB", details: "Vektor-Store für das RAG-System (Langzeitgedächtnis)." },
    { component: "Metadaten", technology: "SQLite", details: "Speichert User-Profile und Einstellungen (serverless)." },
    { component: "Isolation", technology: "Firejail / Sandboxie", details: "Sandboxing für den Sicherheits-Browser." },
];

export const STUDIO_ACTIONS: Record<string, Record<Language, StudioAction[]>> = {
  "A": {
    de: [
      { label: "Meeting transkribieren", iconKey: "Mic", prompt: "Ich möchte ein Meeting transkribieren. Welche Formate werden unterstützt?" },
      { label: "Text diktieren", iconKey: "Keyboard", prompt: "Starte ein Live-Diktat für eine neue E-Mail." },
    ],
    en: [
      { label: "Transcribe Meeting", iconKey: "Mic", prompt: "I want to transcribe a meeting. What formats are supported?" },
      { label: "Dictate Text", iconKey: "Keyboard", prompt: "Start a live dictation for a new email." },
    ]
  },
  "B": {
    de: [
        { label: "PDF zusammenfassen", iconKey: "FileText", prompt: "Fasse mir bitte das folgende PDF zusammen: [Dateipfad einfügen]" },
        { label: "Dokumente durchsuchen", iconKey: "Search", prompt: "Durchsuche meine lokale Wissensdatenbank nach 'Rechnung von letzter Woche'." },
    ],
    en: [
        { label: "Summarize PDF", iconKey: "FileText", prompt: "Please summarize the following PDF for me: [Insert file path]" },
        { label: "Search Documents", iconKey: "Search", prompt: "Search my local knowledge base for 'invoice from last week'." },
    ]
  },
  "C": {
      de: [
        { label: "E-Mail entwerfen", iconKey: "Mail", prompt: "Entwirf eine professionelle E-Mail an einen Kunden, in der ich mich für die gute Zusammenarbeit bedanke." },
        { label: "Text übersetzen", iconKey: "Languages", prompt: "Übersetze den folgenden Text nach Englisch: 'Hallo Welt'" },
      ],
      en: [
        { label: "Draft Email", iconKey: "Mail", prompt: "Draft a professional email to a client thanking them for their great collaboration." },
        { label: "Translate Text", iconKey: "Languages", prompt: "Translate the following text to German: 'Hello World'" },
      ]
  },
   "D": {
      de: [
        { label: "Bild generieren", iconKey: "ImageIcon", prompt: "Generiere ein fotorealistisches Bild von einem Astronauten, der auf einem Pferd reitet." },
        { label: "Bild bearbeiten", iconKey: "Brush", prompt: "Ich möchte ein bestehendes Bild bearbeiten und ein Objekt entfernen." },
      ],
      en: [
        { label: "Generate Image", iconKey: "ImageIcon", prompt: "Generate a photorealistic image of an astronaut riding a horse." },
        { label: "Edit Image", iconKey: "Brush", prompt: "I want to edit an existing image and remove an object." },
      ]
  },
   "E": {
      de: [
        { label: "Sicheren Browser starten", iconKey: "Shield", prompt: "Starte eine neue, isolierte Browser-Sitzung." },
      ],
      en: [
        { label: "Start Secure Browser", iconKey: "Shield", prompt: "Start a new, isolated browser session." },
      ]
  },
};


export const SUGGESTED_QUESTIONS = {
  de: [
    "Was ist Dokumenten-Intelligenz?",
    "Welche KI-Modelle nutzt ihr?",
    "Wie funktioniert der Sicherheits-Browser?",
    "Angebot anfordern"
  ],
  en: [
    "What is Document Intelligence?",
    "Which AI models do you use?",
    "How does the Security Browser work?",
    "Request quote"
  ]
};

// Legacy definitions for compatibility, can be removed later if not used
export const SERVICES: Record<Language, ServiceOffer[]> = { de:[], en:[] };
export const INTEGRATIONS: Record<Language, IntegrationItem[]> = { de:[], en:[] };
export const TECH_STACK: TechItem[] = [];