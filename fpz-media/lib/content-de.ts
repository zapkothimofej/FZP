// FPZ-Media shared content in German

export const manifesto = {
  line1: "Wir bauen keine Webseiten.",
  line2: "Wir bauen deinen unfairen Vorteil.",
  sub: "Full-Service Digitalagentur für lokale Unternehmen im Ruhrgebiet. Web. Film. Automation.",
}

export const services = [
  {
    id: "web",
    number: "01",
    title: "Webentwicklung",
    headline: "Dein digitales Schaufenster — entwickelt, um zu konvertieren.",
    description:
      "Wir bauen schnelle, moderne Webseiten, die nicht nur gut aussehen — sie funktionieren. Von einer einfachen Landingpage bis zu komplexen Multi-Page-Seiten wird alles auf Geschwindigkeit, SEO und echte Ergebnisse optimiert.",
    deliverables: [
      "Maßgeschneiderte Next.js Webseiten",
      "Mobile-First Responsive Design",
      "Performance-Optimierung (Core Web Vitals)",
      "SEO-Grundlagen & Meta-Setup",
      "CMS-Integration auf Anfrage",
    ],
    icon: "Monitor",
  },
  {
    id: "media",
    number: "02",
    title: "Medienproduktion",
    headline: "Inhalte, die das Scrollen stoppen.",
    description:
      "Professionelle Fotografie und Videografie, passend zu deiner Marke. Ob ein 60-Sekunden-Markenfilm oder ein komplettes Produkt-Shooting, wir liefern Inhalte, die deine Zielgruppe wirklich sieht.",
    deliverables: [
      "Marken- & Produktfotografie",
      "Kurzvideos für Social Media (Reels/TikTok)",
      "Imagefilme / Markenfilme",
      "Drohnenaufnahmen (auf Anfrage)",
      "Postproduktion & Color Grading",
    ],
    icon: "Camera",
  },
  {
    id: "automation",
    number: "03",
    title: "Automation",
    headline: "Dein Unternehmen auf Autopilot.",
    description:
      "Mit n8n-Workflows automatisieren wir das, was deine Zeit verschwendet — Lead-Erfassung, Follow-up-E-Mails, CRM-Updates und mehr. Einmal einrichten, für immer laufen lassen.",
    deliverables: [
      "Kontaktformular → CRM Automation",
      "Lead-Generierungs-Workflows",
      "E-Mail Follow-up Sequenzen",
      "WhatsApp / Benachrichtigungs-Integrationen",
      "Individuelle n8n-Workflow-Erstellung",
    ],
    icon: "Zap",
  },
]

export const process = [
  {
    step: "01",
    title: "Verstehen",
    description:
      "Wir beginnen mit einer kostenlosen Beratung. Wir lernen dein Unternehmen, deine Ziele und deine Zielgruppe kennen, bevor wir überhaupt an Design denken.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Wir designen transparent. Du siehst jede Iteration. Feedback-Schleifen sind schnell und nichts geht online ohne deine Freigabe.",
  },
  {
    step: "03",
    title: "Bauen",
    description:
      "Sauberer Code, echte Performance. Wir bauen mit den besten Tools — Next.js, Tailwind, n8n — nicht mit überladenen Page Buildern.",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "Wir übernehmen Deployment, Domain-Setup und den Go-Live. Auch nach dem Launch sind wir für Fragen und schnelle Anpassungen da.",
  },
]

export const stats = [
  { value: "3", label: "Kernleistungen" },
  { value: "100%", label: "Lokal im Ruhrgebiet" },
  { value: "1 Partner", label: "Für Alles" },
  { value: "∞", label: "Ambition" },
]

export const pricing = [
  {
    name: "Starter",
    price: "699€",
    description: "Die unverzichtbare digitale Präsenz für Unternehmen, die gerade erst starten.",
    features: [
      "1-Seiten Custom Website",
      "Mobile Responsive",
      "Kontaktformular (n8n)",
      "Basic SEO Setup",
      "Vercel Deployment",
    ],
    cta: "Loslegen",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "1.500€",
    description: "Full-Stack Digital-Paket: Website + Medien + Automation.",
    features: [
      "Multi-Page Custom Website",
      "Professionelles Fotoshooting",
      "Markenvideo / Reel",
      "Erweitertes SEO",
      "n8n Lead Automation",
      "2 Revisionsrunden",
    ],
    cta: "Beliebteste Wahl",
    highlighted: true,
  },
  {
    name: "Complete",
    price: "2.000€",
    description: "Die komplette digitale Transformation. Alles, richtig gemacht.",
    features: [
      "Alles aus Professional",
      "Individuelle Automation-Workflows",
      "Drohnenaufnahmen (falls nötig)",
      "Priority Support (30 Tage)",
      "Monatlicher Check-in Call",
      "Unbegrenzte Revisionen während des Baus",
    ],
    cta: "Lass uns reden",
    highlighted: false,
  },
]

export const portfolioPlaceholders = [
  { id: 1, title: "Handwerk Digital", industry: "Handwerk", tags: ["Web", "Media"], size: "large" },
  { id: 2, title: "Restaurant Kampagne", industry: "Gastronomie", tags: ["Media", "Auto"], size: "small" },
  { id: 3, title: "Einzelhandel Launch", industry: "Einzelhandel", tags: ["Web", "Auto"], size: "small" },
  { id: 4, title: "Lokale Brand Identity", industry: "Dienstleistung", tags: ["Web", "Media"], size: "medium" },
  { id: 5, title: "Fitness Studio", industry: "Sport & Wellness", tags: ["Web", "Media", "Auto"], size: "medium" },
  { id: 6, title: "Immobilien Portal", industry: "Immobilien", tags: ["Web", "Auto"], size: "small" },
]
