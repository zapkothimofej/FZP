# FPZ-Media Website – Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the FPZ-Media agency website in 5 visually distinct versions, each with a unique color palette and animation stack, so the team can pick their favorite before launch.

**Architecture:** One Next.js 14 App Router project with 5 parallel routes (`/v1`–`/v5`). All versions share the same content layer (services, pricing, team data) and structural components (Navbar, Footer, ContactForm). Each version gets its own theme file and animation approach. A root page `/` shows a "Design Picker" to navigate between versions.

**Tech Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · @react-three/fiber + @react-three/drei · framer-motion · gsap · Vercel Analytics · n8n Cloud (contact form webhook)

---

## Brand Decisions (locked before building)

| Key | Value |
|-----|-------|
| **Name** | FPZ-Media |
| **Domain** | fpc-media.com *(register before launch)* |
| **Slogan** | "Lokal. Digital. Komplett." |
| **Language** | English only (UI), German legal pages |
| **Team** | Stefan (Sales), Nino (Media), Thimofej (Tech) – NO team section on website |
| **Analytics** | Vercel Analytics (cookieless, no consent banner needed) |
| **Cookie banner** | Not required (Vercel Analytics = no cookies) |
| **CMS** | None – static, developer-managed |

---

## The 6 Versions

| # | Codename | Background | Accent | Animation Stack | Vibe |
|---|----------|-----------|--------|-----------------|------|
| V1 | **Nacht** | `#060612` | `#60a5fa` light blue | Three.js + Framer Motion + GSAP | Space/futuristic – particles connect to cursor |
| V2 | **Stahl** | `#0a0a0a` | `#c8c8c8` platinum | GSAP only | Luxury editorial – horizontal scroll sections |
| V3 | **Glut** | `#090405` | `#f43f5e` crimson | Three.js hero + Framer Motion | Bold & aggressive – morphing 3D wireframe |
| V4 | **Gold** | `#080600` | `#fbbf24` amber | Three.js dominant | Premium/luxury – 3D "FPZ" text + golden particles |
| V5 | **Eis** | `#04080f` | `#bfdbfe` ice blue | CSS keyframes + Framer Motion | Scandinavian minimal – frosted glass, ice crystal |
| V6 | **Chrom** | `#0a0a0a` | `#c8c8c8` platinum | Three.js only | Stahl-Ästhetik, aber alles in 3D – kein GSAP, kein FM |
| V7 | **Klar** | `#0f172a` | `#2dd4bf` teal | Framer Motion (subtle) | Clean, professional, timeless – design über effects |

---

## Font Pairs

| Version | Display Font | Body Font |
|---------|-------------|-----------|
| V1 Nacht | Bebas Neue | Outfit |
| V2 Stahl | DM Serif Display | DM Sans |
| V3 Glut | Clash Display | Plus Jakarta Sans |
| V4 Gold | Playfair Display | Karla |
| V5 Eis | Syne | Mulish |
| V6 Chrom | DM Serif Display | DM Sans |
| V7 Klar | Bricolage Grotesque | Epilogue |

---

## Page Structure (all 5 versions)

> Inspired by: Basement Studio, Obys Agency, Active Theory
> **No team section.** Services section is the emotional core of the site.

1. **Navbar** – Logo + nav links + CTA button
2. **Hero** – Full-screen. Tagline + sub-statement + CTA. Animation is version-specific.
3. **Manifesto** – Bold 1–2 line statement. Inspires trust before explaining anything. Example: *"We don't make websites. We make digital weapons for local businesses."*
4. **Services (numbered 01–03)** – Deep, story-driven. Each service gets: numbered label, bold headline, 3–4 line description of *outcomes* (not features), a visual/icon, and a list of 4–5 specific deliverables.
5. **Process** – 4 steps how a project works (Understand → Design → Build → Launch). Clean numbered flow.
6. **Stats bar** – 3–4 numbers that build credibility: projects completed, industries served, average turnaround, client satisfaction.
7. **Pricing** – 3 tiers (699€ / 1.500€ / 2.000€). Premium presentation with feature lists.
8. **Portfolio** – Grid of placeholder cards. Each card: project name, industry, tags (Web / Media / Auto).
9. **Contact** – Full-width. Form + address/email info. Connected to n8n webhook.
10. **Footer** – Logo, nav links, legal links (Impressum / Datenschutz), "Made in Ruhrgebiet" tagline.

---

## Shared Content Data

```ts
// lib/content.ts

// MANIFESTO (shown large, bold, above services)
export const manifesto = {
  line1: "We don't build websites.",
  line2: "We build your unfair advantage.",
  sub: "Full-service digital agency for local businesses in the Ruhrgebiet. Web. Film. Automation.",
}

// SERVICES – outcome-focused, story-driven
export const services = [
  {
    id: "web",
    number: "01",
    title: "Web Development",
    headline: "Your digital storefront — engineered to convert.",
    description: "We build fast, modern websites that don't just look good — they work. From a single landing page to complex multi-page sites, everything is optimized for speed, SEO, and real results.",
    deliverables: ["Custom Next.js websites", "Mobile-first responsive design", "Performance optimization (Core Web Vitals)", "SEO foundation & meta setup", "CMS integration on request"],
    icon: "Monitor",
  },
  {
    id: "media",
    number: "02",
    title: "Media Production",
    headline: "Content that stops the scroll.",
    description: "Professional photography and videography shot and edited to match your brand. Whether it's a 60-second brand film or a full product shoot, we deliver content your audience actually watches.",
    deliverables: ["Brand & product photography", "Short-form social videos (Reels/TikTok)", "Imagefilme / brand films", "Drone footage (on request)", "Post-production & color grading"],
    icon: "Camera",
  },
  {
    id: "automation",
    number: "03",
    title: "Automation",
    headline: "Your business, running on autopilot.",
    description: "With n8n workflows we automate what wastes your time — lead capture, follow-up emails, CRM updates, and more. Set it up once, let it run forever.",
    deliverables: ["Contact form → CRM automation", "Lead generation workflows", "Email follow-up sequences", "WhatsApp / notification integrations", "Custom n8n workflow builds"],
    icon: "Zap",
  },
]

// PROCESS
export const process = [
  { step: "01", title: "Understand", description: "We start with a free consultation. We learn your business, your goals, and your audience before touching any design." },
  { step: "02", title: "Design", description: "We design in public. You see every iteration. Feedback loops are fast and nothing ships without your approval." },
  { step: "03", title: "Build", description: "Clean code, real performance. We build with the tools that last — Next.js, Tailwind, n8n — not bloated page builders." },
  { step: "04", title: "Launch", description: "We handle deployment, domain setup, and go-live. After launch, we're available for questions and quick fixes." },
]

// STATS
export const stats = [
  { value: "3", label: "Core Services" },
  { value: "100%", label: "Ruhrgebiet Local" },
  { value: "1 Partner", label: "For Everything" },
  { value: "∞", label: "Ambition" },
]

// PRICING
export const pricing = [
  {
    name: "Starter",
    price: "699€",
    description: "The essential digital presence for businesses just getting started.",
    features: ["1-page custom website", "Mobile responsive", "Contact form (n8n)", "Basic SEO setup", "Vercel deployment"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "1.500€",
    description: "Full-stack digital package: website + media + automation.",
    features: ["Multi-page custom website", "Professional photo shoot", "Brand video / Reel", "Advanced SEO", "n8n lead automation", "2 revision rounds"],
    cta: "Most Popular",
    highlighted: true,
  },
  {
    name: "Complete",
    price: "2.000€",
    description: "The complete digital transformation. Everything, done right.",
    features: ["Everything in Professional", "Custom automation workflows", "Drone footage (if needed)", "Priority support 30 days", "Monthly check-in call", "Unlimited revisions during build"],
    cta: "Let's Talk",
    highlighted: false,
  },
]
```

export const pricing = [
  { name: "Starter", price: "699€", features: ["1-page website", "Mobile responsive", "Contact form", "Basic SEO"] },
  { name: "Professional", price: "1.500€", features: ["Multi-page website", "Photo shoot", "Video intro", "Advanced SEO", "n8n automation"] },
  { name: "Complete", price: "2.000€", features: ["Everything in Professional", "Custom automation workflows", "Monthly support", "Priority response"] },
]

// No team section on website
```

---

## Logo (SVG – adapts to each version's color)

```svg
<!-- components/shared/Logo.tsx -->
<!-- FPZ bold + MEDIA light, plus 3-line geometric icon -->
<!-- Icon: three stacked diagonal lines (web / media / automation) -->
```

---

## Phase 0 – Project Setup

### Task 0.1: Initialize Next.js project

**Files:**
- Create: `fpz-media/` (new project directory inside `D:/fpz/`)

**Step 1: Bootstrap project**
```bash
cd D:/fpz
npx create-next-app@latest fpz-media --typescript --tailwind --app --no-src-dir --import-alias "@/*"
cd fpz-media
```

**Step 2: Install all animation libraries + shadcn**
```bash
npm install three @react-three/fiber @react-three/drei framer-motion gsap @gsap/react
npm install @vercel/analytics
npx shadcn@latest init
npx shadcn@latest add button card badge separator
```

**Step 3: Install Google Fonts (next/font)**
```bash
# No install needed – fonts loaded via next/font/google in app/layout.tsx
```

**Step 4: Set up folder structure**
```bash
mkdir -p app/v1 app/v2 app/v3 app/v4 app/v5 app/impressum app/datenschutz
mkdir -p components/shared components/v1 components/v2 components/v3 components/v4 components/v5
mkdir -p lib public/images
```

**Step 5: Create `lib/content.ts`** with the shared data from above.

**Step 6: Create `.env.local`**
```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.app.n8n.cloud/webhook/fpz-contact
```

**Step 7: Commit**
```bash
git init && git add . && git commit -m "chore: initialize FPZ-Media Next.js project"
```

---

## Phase 1 – Shared Components

### Task 1.1: Logo SVG component

**Files:**
- Create: `components/shared/Logo.tsx`

The logo renders:
- Icon: 3 diagonal stacked lines (representing Web / Media / Automation)
- "FPZ" in a bold geometric style
- "MEDIA" in a lighter weight next to/below FPZ
- Accepts `color` prop for accent color
- Accepts `size` prop (sm / md / lg)

```tsx
// components/shared/Logo.tsx
interface LogoProps {
  color?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Logo({ color = "#60a5fa", size = "md", className }: LogoProps) {
  const sizes = { sm: 32, md: 48, lg: 64 }
  const h = sizes[size]
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={h * 0.6} height={h * 0.6} viewBox="0 0 24 24" fill="none">
        {/* 3 diagonal lines icon */}
        <line x1="4" y1="20" x2="20" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="4" y1="13" x2="13" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
        <line x1="11" y1="20" x2="20" y2="11" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
      </svg>
      <div className="flex items-baseline gap-1">
        <span style={{ fontWeight: 900, fontSize: h * 0.5, letterSpacing: "0.05em", color: "white" }}>FPZ</span>
        <span style={{ fontWeight: 300, fontSize: h * 0.28, letterSpacing: "0.2em", color: color }}>MEDIA</span>
      </div>
    </div>
  )
}
```

**Commit:** `feat: add shared Logo component`

---

### Task 1.2: Shared ContactForm + n8n

**Files:**
- Create: `components/shared/ContactForm.tsx`
- Create: `app/api/contact/route.ts`

Fields: Name, Email, Phone (optional), Company (optional), Message, Service (select: Web / Media / Automation / All)

The API route forwards to n8n webhook via `process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL`.

**Step 1: Create `app/api/contact/route.ts`**
```ts
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, phone, company, message, service } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
  if (!webhookUrl) return NextResponse.json({ error: "Webhook not configured" }, { status: 500 })

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, company, message, service, timestamp: new Date().toISOString() }),
  })

  return NextResponse.json({ success: true })
}
```

**Step 2: Create `components/shared/ContactForm.tsx`**

```tsx
"use client"
import { useState } from "react"

export function ContactForm({ accentColor }: { accentColor: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "", service: "All" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    setStatus(res.ok ? "success" : "error")
  }
  // ... form JSX (styled by version-specific wrapper)
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Fields */}
    </form>
  )
}
```

**Commit:** `feat: add ContactForm and n8n API route`

---

### Task 1.3: Legal pages (Impressum & Datenschutz)

**Files:**
- Create: `app/impressum/page.tsx`
- Create: `app/datenschutz/page.tsx`

Both pages: simple dark layout, "Inhalt folgt in Kürze" placeholder, back navigation. Uses V1 colors as base.

**Commit:** `feat: add legal placeholder pages`

---

### Task 1.4: Version Picker (root page)

**Files:**
- Modify: `app/page.tsx`

A full-screen dark page showing 5 version cards:
- Each card has: version number, codename, color swatch, animation description
- Clicking navigates to `/v1`–`/v5`
- Small animated preview using CSS

**Commit:** `feat: add design version picker homepage`

---

## Phase 2 – The 5 Website Versions

> These 5 tasks are INDEPENDENT and can be dispatched as parallel agents.

Each version implements the same 9 sections (see Page Structure above):
1. **Hero** – Full-screen, version-specific animation
2. **Manifesto** – Bold statement ("We don't build websites. We build your unfair advantage.")
3. **Services (01–03)** – Deep, numbered, outcome-focused (Web / Media / Automation)
4. **Process** – 4 steps (Understand → Design → Build → Launch)
5. **Stats bar** – 4 numbers
6. **Pricing** – 3 tiers with feature lists
7. **Portfolio** – Placeholder grid
8. **Contact** – Form + n8n
9. **Footer**

> **No team section.** The services + manifesto sections carry the brand personality.

---

### Task 2.1: V1 – "Nacht" (Three.js + Framer Motion + GSAP)

**Files:**
- Create: `app/v1/page.tsx`
- Create: `components/v1/HeroThreeJS.tsx` – particle constellation that reacts to cursor
- Create: `components/v1/ManifestoSection.tsx` – big bold statement, GSAP split-char reveal
- Create: `components/v1/ServicesSection.tsx` – numbered 01–03, GSAP ScrollTrigger reveal per service
- Create: `components/v1/ProcessSection.tsx` – 4 steps, FM stagger
- Create: `components/v1/StatsSection.tsx` – count-up numbers on scroll
- Create: `components/v1/PricingSection.tsx` – Framer Motion stagger cards
- Create: `components/v1/PortfolioSection.tsx` – FM hover effects
- Create: `components/v1/ContactSection.tsx`
- Create: `components/v1/Navbar.tsx` – GSAP entrance + scroll behavior

**Theme:**
```ts
// Inside component files, CSS variables injected via style prop on layout
const theme = {
  bg: "#060612",
  bgSecondary: "#0b0b1f",
  accent: "#60a5fa",      // blue-400
  accentDim: "#1d4ed8",   // blue-700
  text: "#f0f4ff",
  textMuted: "#6b7db3",
  border: "#1e2a4a",
}
```

**Fonts:**
```ts
// In app/v1/layout.tsx
import { Bebas_Neue, Outfit } from "next/font/google"
const display = Bebas_Neue({ weight: "400", subsets: ["latin"] })
const body = Outfit({ subsets: ["latin"] })
```

**Three.js Hero:**
- 2000 particles in a sphere formation
- Mouse movement rotates the particle field
- Particles connect with lines when close (particle network)
- Subtle blue glow on accent particles

**GSAP:**
- `ScrollTrigger` on every section – content slides up from 60px below with opacity
- Split text animation on section headings (character-by-character)
- Magnetic hover effect on CTA button

**Framer Motion:**
- Page-level `AnimatePresence` for route transitions
- Pricing cards stagger in with spring physics
- Team cards subtle 3D tilt on hover

**Commit:** `feat: add V1 Nacht with Three.js + FM + GSAP`

---

### Task 2.2: V2 – "Stahl" (GSAP only)

**Files:**
- Create: `app/v2/page.tsx`
- Create: `components/v2/HeroGSAP.tsx` – text split + noise background
- Create: `components/v2/ManifestoSection.tsx` – massive typography reveal
- Create: `components/v2/ServicesSection.tsx` – horizontal pin scroll, 3 panels (one per service)
- Create: `components/v2/ProcessSection.tsx` – timeline with GSAP draw-on lines
- Create: `components/v2/StatsSection.tsx` – count-up with marquee ticker
- Create: `components/v2/PricingSection.tsx`
- Create: `components/v2/PortfolioSection.tsx`
- Create: `components/v2/ContactSection.tsx`
- Create: `components/v2/Navbar.tsx`

**Theme:**
```ts
const theme = {
  bg: "#0a0a0a",
  bgSecondary: "#141414",
  accent: "#c8c8c8",
  accentBright: "#f0f0f0",
  text: "#ebebeb",
  textMuted: "#707070",
  border: "#222222",
}
```

**Fonts:** DM Serif Display + DM Sans

**GSAP animations:**
- Hero: Big split-text reveal (each word flies in from different direction)
- Services: Horizontal pinned scroll – sections slide left like slides
- Numbers (pricing): Count-up animation on scroll into view
- Marquee text ticker in hero (infinite scroll of service names)
- Noise/grain overlay (CSS + SVG filter, no library needed)
- Timeline-based stagger for every section enter

**Commit:** `feat: add V2 Stahl with GSAP-only animation`

---

### Task 2.3: V3 – "Glut" (Three.js hero + Framer Motion)

**Files:**
- Create: `app/v3/page.tsx`
- Create: `components/v3/HeroThreeJS.tsx` – morphing wireframe geometry
- Create: `components/v3/ManifestoSection.tsx` – full-width bold type, slide in from sides
- Create: `components/v3/ServicesSection.tsx` – card flip on enter, aggressive layout
- Create: `components/v3/ProcessSection.tsx` – numbered steps with crimson accent line
- Create: `components/v3/StatsSection.tsx`
- Create: `components/v3/PricingSection.tsx`
- Create: `components/v3/PortfolioSection.tsx`
- Create: `components/v3/ContactSection.tsx`
- Create: `components/v3/Navbar.tsx`

**Theme:**
```ts
const theme = {
  bg: "#090405",
  bgSecondary: "#130609",
  accent: "#f43f5e",     // rose-500
  accentDim: "#881337",  // rose-900
  text: "#fff0f2",
  textMuted: "#9c6472",
  border: "#2d0d14",
}
```

**Fonts:** Clash Display + Plus Jakarta Sans

**Three.js Hero:**
- Icosahedron wireframe that slowly rotates and morphs
- Crimson particle dust around geometry
- Geometry reacts to scroll (rotation speed up)

**Framer Motion (rest of page):**
- Bold slide-in reveals (from left/right, not just bottom)
- Services: Cards flip on enter (rotateY)
- Pricing: Spotlight effect on hover (custom CSS)
- Team: Photos appear with a "glitch" frame (CSS clip-path animation)

**Commit:** `feat: add V3 Glut with Three.js hero + Framer Motion`

---

### Task 2.4: V4 – "Gold" (Three.js dominant)

**Files:**
- Create: `app/v4/page.tsx`
- Create: `components/v4/HeroThreeJS.tsx` – 3D "FPZ" text + golden particle field
- Create: `components/v4/ManifestoSection.tsx` – serif luxury statement
- Create: `components/v4/Services3D.tsx` – 3D icon cards (drei), each service has rotating 3D object
- Create: `components/v4/ProcessSection.tsx` – elegant timeline, gold accent
- Create: `components/v4/StatsSection.tsx`
- Create: `components/v4/PricingSection.tsx`
- Create: `components/v4/PortfolioSection.tsx`
- Create: `components/v4/ContactSection.tsx`
- Create: `components/v4/Navbar.tsx`

**Theme:**
```ts
const theme = {
  bg: "#080600",
  bgSecondary: "#100e02",
  accent: "#fbbf24",     // amber-400
  accentBright: "#fde68a", // amber-200
  text: "#fefce8",
  textMuted: "#92824a",
  border: "#2a2203",
}
```

**Fonts:** Playfair Display + Karla

**Three.js usage:**
- Hero: `@react-three/drei` Text3D component renders "FPZ" as 3D gold text
- 500 golden point-light particles orbit the text
- Services section: Three small 3D icons (cube, camera shape, lightning bolt) rotate on card hover
- Subtle depth-of-field post-processing via `@react-three/postprocessing`

**Framer Motion (minimal, supporting role):**
- Smooth entrance for non-Three.js sections
- No competing with Three.js

**Commit:** `feat: add V4 Gold with dominant Three.js`

---

### Task 2.5: V5 – "Eis" (CSS keyframes + Framer Motion)

**Files:**
- Create: `app/v5/page.tsx`
- Create: `components/v5/HeroCSS.tsx` – frosted glass hero with CSS ice animations
- Create: `components/v5/ManifestoSection.tsx` – clean, minimal, wide tracking type
- Create: `components/v5/ServicesSection.tsx` – frosted glass cards, FM stagger
- Create: `components/v5/ProcessSection.tsx` – icy step flow
- Create: `components/v5/StatsSection.tsx`
- Create: `components/v5/PricingSection.tsx`
- Create: `components/v5/PortfolioSection.tsx`
- Create: `components/v5/ContactSection.tsx`
- Create: `components/v5/Navbar.tsx`

**Theme:**
```ts
const theme = {
  bg: "#04080f",
  bgSecondary: "#070d17",
  accent: "#bfdbfe",     // blue-200 (ice blue)
  accentMid: "#7dd3fc",  // sky-300
  glass: "rgba(255,255,255,0.04)",
  glassBorder: "rgba(191,219,254,0.12)",
  text: "#f0f8ff",
  textMuted: "#4a6080",
  border: "#0f1f35",
}
```

**Fonts:** Syne + Mulish

**CSS animations (no Three.js, no GSAP):**
- Hero background: animated CSS gradient mesh (4 radial gradients animating with keyframes)
- Floating ice crystal shapes (pure CSS polygon clip-paths that drift)
- `backdrop-filter: blur()` frosted glass cards throughout
- Custom animated border on hover (gradient border that rotates)
- `@keyframes shimmer` on accent elements

**Framer Motion:**
- Staggered entrance for all sections
- Cards: subtle spring scale on hover
- Nav: slide-down entrance + blur-in

**Commit:** `feat: add V5 Eis with CSS animations + Framer Motion`

---

### Task 2.6: V6 – "Chrom" (Three.js only – Stahl-Ästhetik in 3D)

**Gleiche Farben wie V2 (Stahl), aber ausschließlich Three.js/R3F für alle Animationen. Kein GSAP, kein Framer Motion.**

**Files:**
- Create: `app/v6/page.tsx`
- Create: `components/v6/Scene.tsx` – ein einziges R3F `<Canvas>` das die ganze Seite als 3D-Welt rendert
- Create: `components/v6/HeroMesh.tsx` – 3D floating chrome sphere mit environment map (echte Reflexionen)
- Create: `components/v6/ManifestoSection.tsx` – HTML overlay über Canvas
- Create: `components/v6/ServicesSection.tsx` – 3D floating cards die beim Scrollen rotieren
- Create: `components/v6/ProcessSection.tsx`
- Create: `components/v6/StatsSection.tsx`
- Create: `components/v6/PricingSection.tsx`
- Create: `components/v6/PortfolioSection.tsx`
- Create: `components/v6/ContactSection.tsx`
- Create: `components/v6/Navbar.tsx`

**Theme:** Identisch mit V2 Stahl
```ts
const theme = {
  bg: "#0a0a0a",
  bgSecondary: "#141414",
  accent: "#c8c8c8",
  accentBright: "#f0f0f0",
  text: "#ebebeb",
  textMuted: "#707070",
  border: "#222222",
}
```

**Fonts:** DM Serif Display + DM Sans (wie V2)

**Three.js / R3F Konzept:**

Der entscheidende Unterschied zu V2: Hier ersetzt Three.js die Animationsrolle von GSAP komplett. Scroll-Position wird via `useScroll` (drei/drei) in 3D-Animationen übersetzt.

**Hero – Chrome Sphere:**
- Große metallische Kugel mit `MeshStandardMaterial` + `envMap` (echte Reflexionen der Szene)
- Kugel dreht sich beim Scrollen: `sphere.rotation.y = scrollProgress * Math.PI * 4`
- Bei 20% Scroll: Kugel "zerplatzt" in 200 kleinere Kugeln (instanced mesh), die auseinanderfliegen
- Die 200 kleinen Kugeln formen sich neu als "FPZ"-Schrift-Silhouette

**Services – 3D Floating Panels:**
- Drei großformatige 3D-Panels hängen im Raum schräg (slight X-rotation)
- `useScroll` treibt: links Panel dreht sich nach rechts rein, mittleres von vorne, rechts von links
- Hover: Panel kippt 10° Richtung Kamera (R3F hover event)
- Oberfläche: leicht reflektierendes `MeshPhysicalMaterial` mit roughness 0.1

**Process – 3D Timeline:**
- 4 leuchtende Kugeln in einer vertikalen Linie im 3D-Raum
- Eine Linie "zeichnet" sich beim Scrollen zwischen den Kugeln (custom BufferGeometry, vertices wachsen)
- Beim Erreichen jeder Kugel: Kugel pulsiert (scale keyframe im R3F loop)

**Stats – Floating Numbers:**
- Zahlen als `Text3D` (drei) floaten leicht im Raum, subtle bob-animation via `Math.sin(clock.elapsedTime)`

**Scroll-Steuerung:**
```tsx
// Alle Animationen via R3F useScroll hook
import { useScroll } from "@react-three/drei"

function Scene() {
  const scroll = useScroll()
  useFrame(() => {
    const t = scroll.offset // 0 = top, 1 = bottom
    // Alles über t steuern
  })
}
```

**HTML-Overlay (Manifesto, Pricing, Contact):**
- R3F `<Html>` component für reinen Text-Content der keine 3D-Animation braucht
- Bleibt aber im Canvas-Kontext

**Warum kein GSAP/FM:**
- Scroll-Sync läuft komplett über `useScroll` + `useFrame` (R3F eigenes RAF-Loop)
- Transitions via `lerp()` in `useFrame` statt GSAP tweens
- Spring-Physik via `drei/useSpring` wenn nötig

**Commit:** `feat: add V6 Chrom with Three.js-only animations`

---

### Task 2.7: V7 – "Klar" (Framer Motion subtle – clean professional design)

**Kein showstopper. Einfach außergewöhnlich gutes Design. Spacing, Typography, Proportion – das ist die Kunst hier.**

**Files:**
- Create: `app/v7/page.tsx`
- Create: `app/v7/layout.tsx`
- Create: `components/v7/HeroClean.tsx` – typo-driven hero, large heading, subtle gradient bg
- Create: `components/v7/ManifestoSection.tsx` – clean horizontal layout, big quote
- Create: `components/v7/ServicesSection.tsx` – bordered list layout (not cards), each service full-width with number
- Create: `components/v7/ProcessSection.tsx` – horizontal numbered steps
- Create: `components/v7/StatsSection.tsx` – large numbers, clean labels
- Create: `components/v7/PricingSection.tsx` – clean 3-column, minimal lines
- Create: `components/v7/PortfolioSection.tsx` – asymmetric grid
- Create: `components/v7/ContactSection.tsx`
- Create: `components/v7/Navbar.tsx` – clean, scroll-aware

**Theme:**
```ts
const theme = {
  bg: "#0f172a",           // slate-900
  bgSecondary: "#1e293b",  // slate-800
  accent: "#2dd4bf",       // teal-400
  accentDim: "#0f766e",    // teal-700
  text: "#f8fafc",         // slate-50
  textMuted: "#94a3b8",    // slate-400
  border: "#334155",       // slate-700
}
```

**Fonts:** Bricolage Grotesque (display, bold + distinctive) + Epilogue (body, clean)

**Design principles for V7:**
- **Whitespace is the hero** – generous padding everywhere (py-40 for sections)
- **Typography scale is dramatic** – h1 at 96px, body at 18px, nothing in between
- **Services as editorial list** – not cards. Each service is a full-width row with large number + heading + text, separated by thin border
- **Manifesto in large editorial quote format** – centered, 60px, max-w-3xl
- **Pricing table minimal** – 3 columns, clean lines, no drop shadows
- **Hover effects: simple** – color transitions (200ms), underline slides in, cursor changes

**Framer Motion (used sparingly, purposefully):**
- `viewport` triggered `fadeInUp` on every section (y: 30 → 0, opacity: 0 → 1, duration 0.6s)
- Services rows stagger in with 100ms delay each
- Navbar fades in on load (once)
- Pricing card scale on hover (1 → 1.02, 200ms)
- Nothing else. Restraint is the point.

**What makes it "good not breathtaking":**
- Perfect grid alignment (12-column, consistent gutters)
- Teal accent used sparingly: only on hover, active states, one headline word
- Numbers in Bricolage Grotesque at 120px look architectural
- The manifesto quote uses a thin left border in teal – classic editorial
- Portfolio grid is intentionally asymmetric (1 large + 2 small)

**Commit:** `feat: add V7 Klar with clean professional design`

---

## Phase 3 – Polish & Launch Prep

### Task 3.1: Responsive design pass

Check all 5 versions on:
- 375px (iPhone SE)
- 768px (tablet)
- 1280px (desktop)
- 1920px (wide)

Fix any layout issues. Priority: hero, pricing cards, nav hamburger menu.

**Commit:** `fix: responsive layout across all 5 versions`

---

### Task 3.2: SEO & meta

**Files:**
- Modify: each `app/v[N]/layout.tsx` – add `metadata` export
- Create: `public/og-image.png` (placeholder 1200x630)

```ts
export const metadata = {
  title: "FPZ Media – Lokal. Digital. Komplett.",
  description: "Webentwicklung, Medienproduktion und Automatisierung für lokale Unternehmen im Ruhrgebiet.",
  openGraph: { ... }
}
```

**Commit:** `feat: add SEO metadata to all versions`

---

### Task 3.3: Vercel Analytics integration

**Files:**
- Modify: `app/layout.tsx`

```tsx
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**Commit:** `feat: add Vercel Analytics`

---

### Task 3.4: Deploy to Vercel

```bash
# From project root
npx vercel --prod
```

- Set `NEXT_PUBLIC_N8N_WEBHOOK_URL` in Vercel environment variables
- Confirm all 5 routes work in production
- Share preview link with team to pick favorite version

---

## Execution Notes

- **Parallel opportunity:** Tasks 2.1–2.5 (the 5 versions) are fully independent – dispatch as parallel agents for maximum speed.
- **No tests needed** for visual components – manual review via Vercel preview is sufficient.
- **Portfolio content:** Leave as placeholder until Thimofej provides real project descriptions.
- **Domain:** Register `fpc-media.com` (or `fpz-media.de`) before connecting to Vercel.
- **n8n webhook:** Configure the webhook URL in n8n Cloud before testing the contact form.
