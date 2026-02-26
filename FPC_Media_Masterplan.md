# FPC-Media – Projekt & Website Masterplan

**Stand:** Phase 0 (Gründung & Setup)
**Team:** Stevan (Inhaber & Sales), Danil (Kreativ/Media), Thimofej (Tech Lead / Web)
**Domain:** fpc-media.com

---

## 1. Das Geschäftsmodell
FPC-Media ist eine digitale Komplett-Agentur für lokale Unternehmen (KMUs) im Ruhrgebiet. Das Alleinstellungsmerkmal (USP) ist das Angebot "aus einer Hand":
- **Webentwicklung:** Moderne, schnelle Websites.
- **Medienproduktion:** Fotografie, Imagefilme, Audio.
- **Automatisierung:** n8n-Workflows (z. B. Lead-Generierung, Kontaktformulare).

### Rechtliches Setup (Startphase)
- **Gewerbe:** Stevan meldet das Kleingewerbe vorerst komplett alleine auf seinen Namen an.
- **Zusammenarbeit:** Thimofej (15) programmiert im Hintergrund, bringt Stevan die Web-Themen bei und wird vorerst **nicht** als Minijobber angemeldet. Sobald das Business läuft und Thimofejs rechtliche Situation (Gerichtsbeschluss zur Geschäftsfähigkeit) geklärt ist, wird das Modell angepasst.

---

## 2. Brand & Design
- **Name:** FPC-Media
- **Corporate Identity (CI):** Aktuell noch nicht vorhanden (kein Logo, keine festen Farben).
- **Vibe der Website:** Dunkel (Dark Mode), modern, technisch anspruchsvoll. Es wird aber iterativ gearbeitet und ausprobiert.

---

## 3. Die Website – Technische Architektur
Die Agentur-Website wird das erste große Projekt und dient als Aushängeschild (Portfolio).

- **Framework:** Next.js (App Router, neueste Version)
- **Styling:** Tailwind CSS
- **UI-Komponenten:** shadcn/ui
- **Versionskontrolle:** GitHub
- **Hosting:** Vercel
- **Automatisierung:** n8n (vorerst über die n8n Cloud), z.B. für das Kontaktformular.

### Geplante Struktur (Sitemap)
1. **Home:** Starker Hero-Bereich, kurzes Intro, USP, Call-to-Action.
2. **Leistungen:** Detaillierte Beschreibung von Web, Media & Automation.
3. **Preise / Pakete:** Transparente Preisgestaltung (z. B. "Digital Kickstart" Paket). Offen kommuniziert.
4. **Portfolio:** Echte bisherige Projekte von Thimofej, Rest wird mit klaren Platzhaltern (ohne billige Stockfotos) gefüllt.
5. **Über uns / Team:** Vorstellung von Stevan, Danil und Thimofej.
6. **Kontakt:** Formular (angebunden an n8n Cloud).
7. **Legal:** Impressum & Datenschutz (Texte folgen später).

---

## 4. Roadmap für die Entwicklung
Da aktuell noch keine Texte oder Bilder existieren, wird die Seite "Content-First" mit Platzhaltern gebaut. Die KI unterstützt beim Copywriting (Texte schreiben).

- [ ] **Schritt 1:** Next.js Projekt initialisieren (Tailwind + shadcn/ui Setup).
- [ ] **Schritt 2:** Grundlayout (Navbar, Footer, Dark Mode Toggle) bauen.
- [ ] **Schritt 3:** Startseite designen (Hero Section, Leistungs-Teaser).
- [ ] **Schritt 4:** Unterseiten (Preise, Portfolio, Kontakt) anlegen.
- [ ] **Schritt 5:** n8n Webhook für das Kontaktformular einrichten.
- [ ] **Schritt 6:** Dummy-Texte durch KI-generierte Marketing-Texte ersetzen.
- [ ] **Schritt 7:** Deployment auf Vercel (fpc-media.com anbinden).
