// FPZ-Media shared content

export const manifesto = {
  line1: "We don't build websites.",
  line2: "We build your unfair advantage.",
  sub: "Full-service digital agency for local businesses in the Ruhrgebiet. Web. Film. Automation.",
}

export const services = [
  {
    id: "web",
    number: "01",
    title: "Web Development",
    headline: "Your digital storefront — engineered to convert.",
    description:
      "We build fast, modern websites that don't just look good — they work. From a single landing page to complex multi-page sites, everything is optimized for speed, SEO, and real results.",
    deliverables: [
      "Custom Next.js websites",
      "Mobile-first responsive design",
      "Performance optimization (Core Web Vitals)",
      "SEO foundation & meta setup",
      "CMS integration on request",
    ],
    icon: "Monitor",
  },
  {
    id: "media",
    number: "02",
    title: "Media Production",
    headline: "Content that stops the scroll.",
    description:
      "Professional photography and videography shot and edited to match your brand. Whether it's a 60-second brand film or a full product shoot, we deliver content your audience actually watches.",
    deliverables: [
      "Brand & product photography",
      "Short-form social videos (Reels/TikTok)",
      "Imagefilme / brand films",
      "Drone footage (on request)",
      "Post-production & color grading",
    ],
    icon: "Camera",
  },
  {
    id: "automation",
    number: "03",
    title: "Automation",
    headline: "Your business, running on autopilot.",
    description:
      "With n8n workflows we automate what wastes your time — lead capture, follow-up emails, CRM updates, and more. Set it up once, let it run forever.",
    deliverables: [
      "Contact form → CRM automation",
      "Lead generation workflows",
      "Email follow-up sequences",
      "WhatsApp / notification integrations",
      "Custom n8n workflow builds",
    ],
    icon: "Zap",
  },
]

export const process = [
  {
    step: "01",
    title: "Understand",
    description:
      "We start with a free consultation. We learn your business, your goals, and your audience before touching any design.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "We design in public. You see every iteration. Feedback loops are fast and nothing ships without your approval.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Clean code, real performance. We build with the tools that last — Next.js, Tailwind, n8n — not bloated page builders.",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "We handle deployment, domain setup, and go-live. After launch, we're available for questions and quick fixes.",
  },
]

export const stats = [
  { value: "3", label: "Core Services" },
  { value: "100%", label: "Ruhrgebiet Local" },
  { value: "1", label: "Partner for Everything" },
  { value: "∞", label: "Ambition" },
]

export const pricing = [
  {
    name: "Starter",
    price: "699€",
    description: "The essential digital presence for businesses just getting started.",
    features: [
      "1-page custom website",
      "Mobile responsive",
      "Contact form (n8n)",
      "Basic SEO setup",
      "Vercel deployment",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "1.500€",
    description: "Full-stack digital package: website + media + automation.",
    features: [
      "Multi-page custom website",
      "Professional photo shoot",
      "Brand video / Reel",
      "Advanced SEO",
      "n8n lead automation",
      "2 revision rounds",
    ],
    cta: "Most Popular",
    highlighted: true,
  },
  {
    name: "Complete",
    price: "2.000€",
    description: "The complete digital transformation. Everything, done right.",
    features: [
      "Everything in Professional",
      "Custom automation workflows",
      "Drone footage (if needed)",
      "Priority support 30 days",
      "Monthly check-in call",
      "Unlimited revisions during build",
    ],
    cta: "Let's Talk",
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
