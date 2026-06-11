# plan.md — LUMÉ Studio (landing demo)

> **Pentru Claude Code.** Acesta este planul integral de build. Execută-l fază cu fază.
> Oprește-te la fiecare `CHECKPOINT` și așteaptă confirmare umană înainte să continui.
> Nu adăuga librării, pagini sau secțiuni care nu sunt în acest document fără să întrebi.

---

## 0. CONTEXT & CONSTRÂNGERI

**Ce construim:** o pagină de prezentare (landing single-page) pentru un studio de înfrumusețare fictiv, **LUMÉ Studio**, ca piesă de portofoliu pentru o agenție de marketing. Brand fictiv marcat ca proiect concept.

**Reguli dure (non-negociabile):**
- **RO-only.** Tot conținutul în limba română, cu diacritice corecte (ă â î ș ț).
- **noindex,nofollow** — e demo, nu trebuie indexat.
- **Perf budget:** LCP < 2s, CLS < 0.05, JS total livrat < 50kb (gzip). Lighthouse mobil ≥ 95 la toate categoriile.
- **Zero GSAP, zero Lenis, zero framework JS.** Motion = IntersectionObserver vanilla + CSS + Lottie lazy. Atât.
- **`prefers-reduced-motion: reduce`** taie TOATE animațiile. Obligatoriu.
- **Mobile-first.** Se testează pe viewport 380px întâi.
- **Componente Astro statice.** Zero insule React. Singurul JS client = un fișier `motion.js` (~1kb) + Lottie player lazy.

**Stack:** Astro 5 + Tailwind v4 (`@tailwindcss/vite`) + `@fontsource-variable` + astro-og-canvas. Node 22 LTS.

---

## 1. SETUP PROIECT  *(Faza 1)*

```bash
# în folder gol
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict
npm install
npx astro add tailwind --yes
npm install @fontsource-variable/fraunces @fontsource-variable/inter
npm install astro-og-canvas canvaskit-wasm
```

**`astro.config.mjs`:**
```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://lume-concept.pages.dev',
  trailingSlash: 'always',
  vite: { plugins: [tailwindcss()] },
});
```

**`.nvmrc`:** `22`
**`public/.nvmrc`** nu e necesar; setează `NODE_VERSION=22` în Cloudflare Pages la deploy (Faza 9).

**Structură țintă:**
```
src/
  layouts/Base.astro
  components/
    Nav.astro  Hero.astro  Services.astro  WhyUs.astro
    Gallery.astro  Testimonial.astro  Pricing.astro
    FAQ.astro  CTASection.astro  Footer.astro  ConceptBanner.astro
  styles/global.css
  scripts/motion.js
  pages/index.astro
  pages/og.ts            # generator OG (astro-og-canvas)
public/
  images/                # vezi MANIFEST ASSET (secțiunea 7)
  fonts/                 # gol — fonturile vin din @fontsource-variable
  favicon.svg
  _headers
  robots.txt
```

---

## 2. BRAND TOKENS & TYPE  *(Faza 1, continuare)*

**`src/styles/global.css`:**
```css
@import "tailwindcss";
@import "@fontsource-variable/fraunces";
@import "@fontsource-variable/inter";

:root {
  --blush: #E8D5CE;
  --plum:  #4A2C3A;
  --cream: #FAF6F2;
  --gold:  #C9A77C;
  --ink:   #2B2422;
}

@theme {
  --color-blush: var(--blush);
  --color-plum:  var(--plum);
  --color-cream: var(--cream);
  --color-gold:  var(--gold);
  --color-ink:   var(--ink);
  --font-display: "Fraunces Variable", serif;
  --font-body:    "Inter Variable", sans-serif;
}

html { scroll-behavior: smooth; background: var(--cream); color: var(--ink); }
body { font-family: var(--font-body); }
h1,h2,h3 { font-family: var(--font-display); font-weight: 500; }

/* Type scale */
.h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); line-height: 1.05; letter-spacing: -0.02em; }
.h2 { font-size: clamp(2rem, 4vw, 3rem);   line-height: 1.1;  letter-spacing: -0.01em; }
.lead { font-size: 1.0625rem; line-height: 1.7; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

**Logo:** wordmark „LUMÉ" în Fraunces, cu accentul de pe É stilizat ca mic glow/arc auriu. Livrează ca SVG inline într-un component `Logo.astro` (nu PNG). Favicon = monogram „L" în cerc, `public/favicon.svg`, fundal plum, literă gold/cream.

---

## 3. LAYOUT DE BAZĂ  *(Faza 1)*

**`src/layouts/Base.astro`** trebuie să conțină:
- `<meta name="robots" content="noindex, nofollow" />`
- `<meta name="viewport" content="width=device-width, initial-scale=1" />`
- preload font display (Fraunces) pentru LCP
- OG tags (title, description, og:image → `/og.png`)
- import `global.css`
- slot pentru conținut
- `<script>` care încarcă `scripts/motion.js` cu `defer`
- limba: `<html lang="ro">`

---

## ⛔ CHECKPOINT 1 — STOP după Faza 1
Construiește: setup + tokens + logo SVG + Base.astro + Hero (vezi Faza 2 mai jos pentru Hero, apoi oprește).
Rulează `npm run dev`, fă screenshot mental al Hero-ului. **Oprește-te și raportează:**
- ce arată Hero-ul, ce tokens sunt aplicate, ce mai lipsește.
Așteaptă „continuă" înainte de Faza 3.

---

## 4. CONȚINUT — COPY RO COMPLET

> Folosește EXACT textul de mai jos. Nu inventa alt copy, nu traduce, nu parafraza.

### HERO  *(Faza 2)*
- Eyebrow: `STUDIO DE ÎNFRUMUSEȚARE · BRAȘOV`
- H1: **Privirea ta, în cea mai bună formă.**
- Subtitlu: *Extensii de gene, stilizare sprâncene și îngrijirea tenului — într-un spațiu intim, cu tehnicieni certificați.*
- CTA primar: `Rezervă o programare` (ancoră → #contact)
- CTA secundar: `Vezi serviciile` (ancoră → #servicii)
- Imagine: `hero.avif` (vezi manifest)

### SERVICII  *(Faza 3)* — 3 carduri
1. **Extensii de gene** — Classic · Hybrid · Volume.
   *Gene dese, naturale sau dramatice, adaptate formei ochiului tău.*
2. **Sprâncene** — Laminare · henna · stilizare.
   *Sprâncene definite care-ți pun fața în valoare, fără machiaj zilnic.*
3. **Îngrijire ten** — Tratamente faciale · curățare profundă.
   *Piele curată, hidratată, luminoasă — protocol personalizat.*

### DE CE LUMÉ  *(Faza 3)* — 4 puncte cu iconiță
- **Tehnicieni certificați** — formare continuă, tehnică verificată.
- **Produse premium hipoalergenice** — sigure pentru ochi sensibili.
- **Igienă spital-grade** — sterilizare la fiecare ședință.
- **Spațiu intim, fără grabă** — o singură clientă pe rând.

### GALERIE  *(Faza 4)* — 6 imagini, grid masonry/asimetric
Fără text. `gallery-1.avif` … `gallery-6.avif`.

### TESTIMONIAL  *(Faza 4)* — 1 citat mare
*„Cel mai bun lash artist din oraș. Gene impecabile, ședință relaxantă de fiecare dată."*
— **Andreea M.**, clientă din 2023

### PACHETE  *(Faza 4)* — 3 coloane
- **Esențial** — de la **180 lei** — extensii classic / stilizare sprâncene. „Ideal pentru prima vizită."
- **Signature** — de la **320 lei** — extensii hybrid + laminare sprâncene. *(badge: Cel mai ales)*
- **Lux** — de la **480 lei** — volume + tratament ten complet. „Experiența completă LUMÉ."

### FAQ  *(Faza 5)* — `<details>/<summary>` nativ
- **Cât durează o ședință?** — Între 90 și 120 de minute, în funcție de serviciu.
- **Cât rezistă extensiile?** — 3–4 săptămâni, cu retuș recomandat la 3 săptămâni.
- **Sunt sigure pentru genele naturale?** — Da, aplicate corect, fir cu fir, fără să afecteze genele tale.
- **Vin machiată la programare?** — Te rugăm fără machiaj în zona ochilor, pentru aderență optimă.

### CTA FINAL / CONTACT  *(Faza 5)* — `id="contact"`
- Titlu: **Programează-te în câteva secunde.**
- Subtitlu: *Răspundem rapid pe WhatsApp.*
- Buton WhatsApp (link `https://wa.me/40700000000` placeholder), telefon afișat `0700 000 000`.
- Program: `Luni–Sâmbătă · 09:00–19:00`
- Adresă (fictivă): `Str. Republicii 12, Brașov`

### FOOTER
Logo + „© 2026 LUMÉ Studio" + linkuri inerte (Servicii, Galerie, Contact) + rând mic:
`Proiect concept realizat de Green Phoenix Concept.`

### CONCEPT BANNER  *(Faza 1)*
Bară discretă sus sau jos, dismissable nu e necesar:
`PROIECT CONCEPT · Demonstrație Green Phoenix Concept` — text mic, contrast redus, non-intruziv.

---

## 5. MOTION SPEC  *(Faza 7 — pass dedicat la final)*

**Mecanism unic:** `src/scripts/motion.js` cu un `IntersectionObserver` care adaugă clasa `.in-view` elementelor cu `[data-reveal]` când intră în viewport (threshold 0.15, `rootMargin: '0px 0px -10% 0px'`). CSS face restul.

```js
// scripts/motion.js — target < 1kb
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
}
```

**CSS reveal (în global.css):**
```css
[data-reveal] { opacity: 0; transform: translateY(20px); transition: opacity .7s ease, transform .7s ease; }
[data-reveal].in-view { opacity: 1; transform: none; }
[data-reveal-delay="1"] { transition-delay: .08s; }
[data-reveal-delay="2"] { transition-delay: .16s; }
[data-reveal-delay="3"] { transition-delay: .24s; }
```

**Per secțiune:**
- **Hero:** gradient cald subtil animat pe fundal — CSS `@property --a` + keyframes pe un radial/conic blush→cream→gold, foarte lent (20s+), foarte subtil. NU WebGL. H1 apare cu reveal pe cuvinte (split manual în `<span data-reveal data-reveal-delay="N">` per cuvânt, sau reveal pe tot blocul dacă split-ul complică). Imaginea hero fade-in.
- **Servicii / De ce / Pachete:** carduri cu `[data-reveal]` + delay stagger 1/2/3.
- **Iconițe servicii + „De ce":** Lottie line-draw, lazy. Vezi mai jos.
- **Galerie:** imagini cu hover `scale(1.03)` + `transition`; reveal la scroll.
- **Carduri (toate):** hover `translateY(-4px)` + umbră subtilă.

**Lottie (lazy, fără cost de perf inițial):**
- Încarcă playerul `@lottiefiles/dotlottie-wc` DOAR când prima iconiță Lottie intră în viewport (dynamic `import()` în `motion.js`, sau `client:visible` dacă faci un mic component wrapper).
- 3–4 iconițe line-draw: gene, sprânceană, picătură skincare, scut/igienă.
- Dacă fișierele `.lottie` lipsesc la build, lasă fallback: iconiță SVG statică în același loc. NU bloca build-ul pe lipsa lor.

---

## 6. ⛔ CHECKPOINT 2 — STOP după Faza 6
După ce toate secțiunile există cu copy real + placeholdere imagine (FĂRĂ motion pass încă):
Rulează dev, verifică structura completă pe mobil (380px) și desktop. **Raportează** lista secțiunilor și orice problemă de layout. Așteaptă „continuă" înainte de motion pass (Faza 7).

---

## 7. MANIFEST ASSET  *(imaginile le furnizează omul — folosește placeholdere până atunci)*

**Strategie placeholder:** până vin imaginile reale, generează blocuri placeholder = `<div>` cu gradient din paleta brandului + label discret cu numele fișierului așteptat, la dimensiunea/aspect-ratio corect. Astfel swap-ul = înlocuiești un fișier în `public/images/`, nimic în cod.

Folosește componenta Astro `<Image>` (sau `<Picture>`) cu `format={['avif','webp']}`, `loading="lazy"` (mai puțin hero = `eager` + `fetchpriority="high"`), `width`/`height` explicite ca să previi CLS.

| Fișier | Secțiune | Aspect | Prompt AI-gen (pentru om, în Higgsfield/Firefly) |
|---|---|---|---|
| `hero.avif` | Hero | 3:4 portret / sau 16:9 | *Editorial beauty close-up, woman's eye with long natural lash extensions, soft warm muted tones, blush and cream palette, natural window light, shallow depth of field, lots of negative space, premium minimal aesthetic, no text* |
| `serv-lash.avif` | Servicii 1 | 4:3 | *Close-up of eyelash extension application, delicate, warm soft lighting, cream tones, professional beauty studio, editorial* |
| `serv-brow.avif` | Servicii 2 | 4:3 | *Close-up of groomed defined eyebrows, soft natural makeup, warm muted palette, editorial beauty* |
| `serv-skin.avif` | Servicii 3 | 4:3 | *Glowing clean facial skin close-up, dewy, soft warm light, cream and nude tones, spa skincare editorial* |
| `gallery-1..6.avif` | Galerie | mix | *Editorial beauty studio shots: lashes, brows, hands, calm interior detail, warm muted tones, cohesive blush/plum/cream palette, natural light* (variază cadrul, păstrează gama) |
| `og.png` | generat | 1200×630 | generat automat via `astro-og-canvas` din `src/pages/og.ts` — logo + H1 pe fundal plum/cream |

**`src/pages/og.ts`:** generează OG image cu astro-og-canvas (titlu „LUMÉ Studio", subtitlu „Studio de înfrumusețare · Brașov", culori brand, font Fraunces dacă se poate încărca, altfel fallback). Output la `/og.png`.

---

## 8. SEO / HEADERS / NOINDEX  *(Faza 8)*

**`public/robots.txt`:**
```
User-agent: *
Disallow: /
```

**`public/_headers`:**
```
/*
  X-Robots-Tag: noindex, nofollow
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
/_astro/*
  Cache-Control: public, max-age=31536000, immutable
```

**Schema (demonstrativ, chiar dacă noindex):** include JSON-LD `BeautySalon` în `Base.astro` (name, address fictivă, openingHours, priceRange, telephone, image). E semnal de capabilitate pentru portofoliu.

---

## 9. FAZE & ORE (rezumat pentru tracking)

| Fază | Conținut | Ore | Checkpoint |
|---|---|---|---|
| 1 | Setup + tokens + logo + Base + favicon | 2 | — |
| 2 | Hero complet | 1.5 | **⛔ CP1 STOP** |
| 3 | Servicii + De ce LUMÉ | 2 | — |
| 4 | Galerie + Testimonial + Pachete | 2.5 | — |
| 5 | FAQ + CTA/Contact + Footer + ConceptBanner | 1.5 | — |
| 6 | Pass structură mobil/desktop | 1 | **⛔ CP2 STOP** |
| 7 | Motion pass (IO + CSS reveal + hero gradient + Lottie) | 2.5 | — |
| 8 | SEO/schema/headers + OG generator | 1 | — |
| 9 | QA (Lighthouse, reduced-motion, responsive) + deploy Pages | 1.5 | **⛔ CP3 STOP** |

**Total: 12–18h.**

---

## 10. DEFINITION OF DONE  *(verifică la CHECKPOINT 3 înainte de deploy)*

- [ ] Lighthouse mobil ≥ 95 Performance / 100 Accessibility / 100 Best Practices / SEO N/A (noindex)
- [ ] LCP < 2s, CLS < 0.05 (verifică în Lighthouse + DevTools)
- [ ] JS livrat < 50kb gzip (`npm run build` → verifică output)
- [ ] `prefers-reduced-motion` testat: animațiile dispar complet
- [ ] Responsive testat la 380px, 768px, 1280px — fără overflow orizontal
- [ ] Toate diacriticele afișate corect (font are subset latin-ext)
- [ ] noindex prezent în meta + `_headers` + robots.txt
- [ ] Imaginile au width/height (zero CLS), hero `eager`, restul `lazy`, AVIF+WebP
- [ ] Toate ancorele funcționează (Rezervă → #contact, Vezi serviciile → #servicii)
- [ ] Banner „PROIECT CONCEPT" vizibil dar discret
- [ ] Footer cu atribuire Green Phoenix Concept

---

## 11. DEPLOY  *(Faza 9 — pași pentru om + Claude Code)*

1. `npm run build` — verifică zero erori, verifică `dist/`.
2. Push pe GitHub `gpc-demo-lume`.
3. Cloudflare Pages → Create project → conectează repo.
   - Build command: `npm run build`
   - Output dir: `dist`
   - Env var: `NODE_VERSION=22`
4. Deploy → URL `lume-concept.pages.dev`.
5. (Opțional polish portofoliu) CNAME `lume.greenpheonixconcept.com` → Pages, DOAR după ce e gata.

---

## ⛔ CHECKPOINT 3 — STOP înainte de deploy
Rulează DOD complet, raportează rezultatele Lighthouse și orice abatere. Așteaptă confirmare umană înainte de `git push` / deploy.
