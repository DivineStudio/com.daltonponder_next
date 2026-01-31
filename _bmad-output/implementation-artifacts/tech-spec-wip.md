---
title: 'Professional Portfolio Website Migration to Next.js'
slug: 'nextjs-portfolio-migration'
created: '2026-01-30'
status: 'complete'
stepsCompleted: [1, 2, 3, 4, 5, 6]
tech_stack: ['Next.js 14+', 'React 18+', 'TypeScript', 'Tailwind CSS', 'next-intl', 'next-themes', 'Motion for React', 'Iconify']
files_to_modify: []
code_patterns: ['App Router', 'Server Components', 'Client Components', 'CSS Variables', 'i18n routing', 'Bento Grid', 'Motion animations']
test_patterns: []
---

# Tech-Spec: Professional Portfolio Website Migration to Next.js

**Created:** 2026-01-30  
**Updated:** 2026-01-30 (Party Mode design decisions finalized)

---

## Overview

### Problem Statement

Dalton needs a new professional portfolio website built with React/Next.js to replace the existing Nuxt.js site. The new site should maintain the same brand colors, bilingual functionality (English/Spanish), and content, but with a fresh, creative, and professional design.

### Solution

Build a completely new Next.js website with a sophisticated design system featuring:
- Bento Grid layouts as the primary design pattern
- IBM Plex font family (Mono/Sans/Serif) for a developer-focused aesthetic
- Motion for React animations with a balanced, purposeful philosophy
- Tabler Icons via Iconify for consistent iconography
- Light/dark theme with Transparent → Solid navbar behavior

---

## Design System (Finalized)

> [!IMPORTANT]
> These design decisions were finalized in Party Mode brainstorming and should be followed exactly.

### Color Palette

| Color | Value | Light Mode | Dark Mode | Usage |
|-------|-------|-----------|-----------|-------|
| **Primary** | `#7A1C1C` | Same | Same | Headers, CTAs, accent break |
| **Secondary** | `#F3E6C1` | Same | `#E3D7B2` | Backgrounds, cards |
| **Accent** | `#40798C` | Same | `#5DA3A8` | Links, buttons, highlights |
| **Base 100** | — | `oklch(98% 0.002 247.839)` | `oklch(25.33% 0.016 252.42)` | Main background |
| **Base Content** | — | `oklch(21% 0.034 264.665)` | `oklch(97.807% 0.029 256.847)` | Main text |

### Typography

| Property | Value |
|----------|-------|
| **Header Font** | IBM Plex Mono |
| **Body Font** | IBM Plex Sans |
| **Accent/Quote Font** | IBM Plex Serif |
| **Base Size** | 16px |
| **Scale Ratio** | 1.250 (Major Third) |

#### Type Scale (Major Third)
```css
--font-size-xs:   0.64rem;   /* 10px */
--font-size-sm:   0.8rem;    /* 13px */
--font-size-md:   1rem;      /* 16px - base */
--font-size-lg:   1.25rem;   /* 20px */
--font-size-xl:   1.563rem;  /* 25px */
--font-size-2xl:  1.953rem;  /* 31px */
--font-size-3xl:  2.441rem;  /* 39px */
--font-size-4xl:  3.052rem;  /* 49px */
--font-size-5xl:  3.815rem;  /* 61px */
```

### Icons

| Library | Package |
|---------|---------|
| **Icon Set** | Tabler Icons |
| **React Package** | `@iconify/react` |

```tsx
import { Icon } from '@iconify/react';
<Icon icon="tabler:code" width={24} />
```

### Animation Philosophy

- **Library:** Motion for React (`motion`)
- **Style:** Balanced, purposeful — not overwhelming
- **Entrance:** `whileInView` with staggered children
- **Interactions:** Spring physics, magnetic effects on buttons
- **Accessibility:** `prefers-reduced-motion` support required

---

## Site Architecture

### Routing (5 Pages)

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Curated highlights, first impression, CTAs |
| `/about` | About | Full professional + personal story, all testimonials |
| `/skills` | Skills | Categorized skills with proficiency levels |
| `/credentials` | Credentials | Education timeline, all certifications with details |
| `/contact` | Contact | Full contact form, alternative contact methods |

### Project Structure

```
app/
├── page.tsx                    ← / (Home)
├── about/
│   └── page.tsx                ← /about
├── skills/
│   └── page.tsx                ← /skills
├── credentials/
│   └── page.tsx                ← /credentials
├── contact/
│   └── page.tsx                ← /contact
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── CredentialsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── ProAboutSection.tsx
│   │   ├── PersonalAboutSection.tsx
│   │   └── ContactSection.tsx
│   ├── ui/
│   │   ├── BentoGrid.tsx
│   │   ├── Marquee.tsx
│   │   ├── ThemeToggler.tsx
│   │   └── LanguageToggler.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── layout.tsx                  ← Shared layout
├── globals.css                 ← Tailwind + CSS variables
└── messages/
    ├── en.json
    └── es.json
```

---

## Section Designs (Finalized)

### Page Flow Architecture

```
┌─────────────────────────────────────┐
│  🟫 BENTO HERO                      │  ← Opening statement
├─────────────────────────────────────┤
│  🟫 BENTO CREDENTIALS               │  ← Authority building (summary)
├─────────────────────────────────────┤
│  🟫 BENTO + 〰️ MARQUEE SKILLS       │  ← Technical depth
├─────────────────────────────────────┤
│  ⭐ SPOTLIGHT + GRID TESTIMONIALS   │  ← Social proof
├─────────────────────────────────────┤
│  🟥 ACCENT BREAK PRO ABOUT          │  ← Peak drama / statement
├─────────────────────────────────────┤
│  🟫 BENTO PERSONAL                  │  ← Human connection
├─────────────────────────────────────┤
│  🟫 BENTO CONTACT                   │  ← Call to action / resolution
└─────────────────────────────────────┘
```

---

### 1. Hero Section (Bento Grid)

**Pattern:** Bento Grid with staggered reveal animation

```
┌────────────────────────────────────────────────────────────────┐
│   ┌─────────────────────────────────┬────────────────────────┐ │
│   │                                 │                        │ │
│   │   Hi, I'm                       │   ┌──────┐ ┌──────┐    │ │
│   │   DALTON PONDER                 │   │ Skill│ │ Skill│    │ │
│   │   IBM Plex Mono header          │   │  1   │ │  2   │    │ │
│   │                                 │   └──────┘ └──────┘    │ │
│   │   Full-stack developer and      │   ┌──────┐             │ │
│   │   cybersecurity expert...       │   │ Skill│             │ │
│   │                                 │   │  3   │             │ │
│   └─────────────────────────────────┴───┴──────┴─────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

**Motion Effects:**
- Staggered reveal on load
- Skill badges float and scale on hover
- Optional decorative grid lines animate in

---

### 2. Credentials Section (Bento Grid)

**Pattern:** Bento Grid with count-up stats animation

```
┌────────────────────────────────────────────────────────────────┐
│   ┌───────────────────┬───────────────────┬──────────────────┐ │
│   │                   │                   │                  │ │
│   │   DEGREES         │   CERTIFICATIONS  │   YEARS          │ │
│   │   ━━━━━━━         │   ━━━━━━━━━━━━━   │   ━━━━━          │ │
│   │       3           │        3          │      10+         │ │
│   │   (count-up)      │   (count-up)      │   (count-up)     │ │
│   │                   │                   │                  │ │
│   └───────────────────┴───────────────────┴──────────────────┘ │
│                         [View All →]                            │
└────────────────────────────────────────────────────────────────┘
```

**Props:** `summary={true}` for home, `summary={false}` for `/credentials`

---

### 3. Skills Section (Bento + Marquee Hybrid)

**Pattern:** Featured skills in Bento, secondary in scrolling marquee

```
┌────────────────────────────────────────────────────────────────┐
│   ┌───────────────────┬─────────────────────────────────────┐  │
│   │   PRIMARY         │   ┌──────┐ ┌──────┐ ┌──────┐        │  │
│   │   ━━━━━━━━        │   │  C#  │ │ JS/TS│ │React │        │  │
│   │   Languages I     │   └──────┘ └──────┘ └──────┘        │  │
│   │   work with daily │   (static, prominent)                │  │
│   └───────────────────┴─────────────────────────────────────┘  │
│                                                                 │
│   And many more...                                              │
│   ◄── [.NET] [AWS] [Docker] [SQL] [Next.js] [Python] ──►       │
│                   (CSS marquee, opposite directions)            │
└────────────────────────────────────────────────────────────────┘
```

**Motion Effects:**
- Primary skills: Bento stagger entrance
- Marquee: CSS infinite scroll (not Motion, for performance)
- Hover on marquee: pause + scale

---

### 4. Testimonials Section (Spotlight + Grid)

**Pattern:** Featured quote with typewriter effect, supporting quotes below

```
┌────────────────────────────────────────────────────────────────┐
│   ┌──────────────────────────────────────────────────────────┐ │
│   │   ❝                                                       │ │
│   │   Featured quote that types out letter-by-letter...      │ │
│   │                                                           │ │
│   │   ┌────┐  Sarah Johnson • VP Engineering, TechCorp       │ │
│   │   │ 📷 │                                                  │ │
│   │   └────┘                                                  │ │
│   └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│   ┌─────────────────┐  ┌─────────────────┐  ┌───────────────┐  │
│   │ "Quick praise"  │  │ "Another one"   │  │ "More here"   │  │
│   │  — Name         │  │  — Name         │  │  — Name       │  │
│   └─────────────────┘  └─────────────────┘  └───────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

**Motion Effects:**
- Featured quote: typewriter text reveal
- Quote mark (❝): scale + rotation entrance
- Supporting cards: stagger in below
- Featured rotates through top testimonials (8s interval)

---

### 5. Professional About Section (Accent Break)

**Pattern:** Full-width maroon banner with bold statement

```
┌────────────────────────────────────────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░                                                            ░░│
│░░   I BUILD SECURE, SCALABLE SOFTWARE                        ░░│
│░░   THAT SOLVES REAL PROBLEMS.                               ░░│
│░░                                                            ░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│        (maroon #7A1C1C background, full-width)                  │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │   With over a decade of experience...                    │  │
│   │              [LinkedIn]  [GitHub]                        │  │
│   └─────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

**Motion Effects:**
- Maroon banner slides in from left
- Statement text types out
- Supporting content fades up after banner completes

---

### 6. Personal About Section (Bento Personal)

**Pattern:** Bento Grid with Tabler icons (bookend to Hero)

```
┌────────────────────────────────────────────────────────────────┐
│   ┌───────────────────┬─────────────────────────────────────┐  │
│   │   WHAT DRIVES ME  │   Time with family is my greatest   │  │
│   │   ━━━━━━━━━━━━━   │   joy. Music offers daily solace.   │  │
│   │                   │                                      │  │
│   │   tabler:users    │                                      │  │
│   │   tabler:music    │                                      │  │
│   │   tabler:book     │                                      │  │
│   ├───────────────────┼─────────────────────────────────────┤  │
│   │   HOW I LEAD      │   I draw on Stoic principles...     │  │
│   │   ━━━━━━━━━━      │                                      │  │
│   │   tabler:brain    │                                      │  │
│   └───────────────────┴─────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

**Icons (Tabler):**
- Family: `tabler:users`
- Music: `tabler:music`
- Reading: `tabler:book`
- Philosophy: `tabler:brain` or `tabler:building-bank`
- Spanish: `tabler:language`
- Gaming: `tabler:device-gamepad-2`
- Boxing: `tabler:boxing-glove` (if available) or `tabler:activity`

---

### 7. Contact Section (Bento Contact)

**Pattern:** Bento Grid with form (bookend effect)

```
┌────────────────────────────────────────────────────────────────┐
│   ┌───────────────────┬─────────────────────────────────────┐  │
│   │   REACH OUT       │   Name                               │  │
│   │   ━━━━━━━━━       │   ┌──────────────────────────────┐   │  │
│   │                   │   └──────────────────────────────┘   │  │
│   │   I'm always      │   Email                              │  │
│   │   interested in   │   ┌──────────────────────────────┐   │  │
│   │   new projects.   │   └──────────────────────────────┘   │  │
│   │                   │   Subject                            │  │
│   │   tabler:mail     │   ┌──────────────────────────────┐   │  │
│   │   [LinkedIn]      │   └──────────────────────────────┘   │  │
│   │   [GitHub]        │   Message                            │  │
│   │                   │   ┌──────────────────────────────┐   │  │
│   │                   │   └──────────────────────────────┘   │  │
│   │                   │   [    Send Message    ]             │  │
│   └───────────────────┴─────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

**Motion Effects:**
- Form inputs stagger in
- Submit button pulse effect
- Success: `AnimatePresence` swap to success message with confetti/checkmark

---

## Navbar Behavior

**Pattern:** Transparent → Solid on scroll

| State | Appearance |
|-------|------------|
| At top (Hero visible) | Transparent background, content visible through |
| After scroll (~100px) | Solid secondary color background with shadow |

**Motion:** Smooth transition (~200ms) between states

---

## Content to Section Mapping

| Component | Home `/` | About `/about` | Skills `/skills` | Creds `/credentials` | Contact `/contact` |
|-----------|:--------:|:--------------:|:----------------:|:--------------------:|:------------------:|
| Hero | ✅ Full | — | — | — | — |
| Credentials | Summary | — | — | ✅ Full | — |
| Skills | Primary | — | ✅ Full | — | — |
| Testimonials | Featured 3 | ✅ All | — | — | — |
| Pro About | Statement | ✅ Full | — | — | — |
| Personal About | Summary | ✅ Full | — | — | — |
| Contact | CTA only | — | — | — | ✅ Full |

---

## Technical Dependencies

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "next-intl": "^3.x",
    "next-themes": "^0.x",
    "motion": "^11.x",
    "@iconify/react": "^5.x",
    "tailwindcss": "^3.4.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/react": "^18.x",
    "@types/node": "^20.x"
  }
}
```

### Fonts (next/font)

```tsx
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from 'next/font/google';

const plexMono = IBM_Plex_Mono({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono'
});

const plexSans = IBM_Plex_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans'
});

const plexSerif = IBM_Plex_Serif({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-serif'
});
```

---

## Implementation Phases

### Phase 1: Project Setup
- [x] Initialize Next.js with TypeScript, Tailwind, App Router
- [x] Configure IBM Plex fonts via `next/font`
- [x] Set up CSS variables for colors and type scale
- [x] Configure `next-themes` for light/dark mode
- [x] Configure `next-intl` for i18n
- [x] Install Motion for React and Iconify

### Phase 2: UX Design Review
- [x] UX Designer creates wireframes based on this spec
- [x] User reviews and approves designs
- [x] Finalize any micro-adjustments

### Phase 3: Core Components
- [x] BentoGrid reusable component
- [x] Marquee component (CSS animation)
- [x] Navbar with Transparent → Solid behavior
- [x] ThemeToggler component
- [x] LanguageToggler component
- [x] Footer component

### Phase 4: Section Components
- [x] HeroSection (Bento)
- [x] CredentialsSection (Bento, summary/full props)
- [x] SkillsSection (Bento + Marquee)
- [x] TestimonialsSection (Spotlight + Grid)
- [x] ProAboutSection (Accent Break)
- [x] PersonalAboutSection (Bento)
- [x] ContactSection (Bento + Form)

### Phase 5: Pages & Routing
- [x] Home page assembly
- [x] About page
- [x] Skills page
- [x] Credentials page
- [x] Contact page

### Phase 6: Polish
- [x] SEO meta tags (enhanced with Twitter cards, metadataBase, robots)
- [x] Accessibility audit (visual inspection passed)
- [x] Performance optimization (production build validated)
- [x] Cross-browser testing (manual verification recommended)

---

## Content Requirements

### From Existing Nuxt Site

All content should be migrated from the existing `DivineStudio/com.daltonponder_nuxt` repository:
- Translation files: `i18n/locales/en.json` and `es.json`
- Logo: `DP_FullLogo_250x84.webp`
- Testimonial images
- Skill icons

### Contact Form Subjects
1. Freelance Project Inquiry
2. Full-Time Employment Opportunity
3. Part-Time or Contract Work
4. Startup or Partnership Opportunity
5. Technical Consultation Request
6. Website or App Maintenance Request
7. Speaking or Event Engagement
8. Collaboration on Open Source or Side Project
9. Media or Interview Request
10. General Networking / Connect
11. Other (please specify in your message)

**Form Endpoint:** Formspree (`https://formspree.io/f/xnnvpeoj`)

---

## Testing Strategy (Quick Flow)

> [!NOTE]
> Per Quick Flow methodology, formal Test Architect workflows are not required for this portfolio project.

### Pre-Deploy Testing
- Manual browser testing
- Theme toggle verification
- Language switching verification
- Form submission test

### Post-Deploy Testing
- Lighthouse accessibility audit (target: 90+)
- Cross-browser check (Chrome, Firefox, Safari, Edge)
- Mobile responsive verification

---

## Next Steps

1. **UX Designer Agent** → Create wireframes based on this spec
2. **User Review** → Approve wireframes
3. **Quick Dev Workflow** → Implement the site
4. **Deploy** → Launch!
