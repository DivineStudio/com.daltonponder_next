title: 'Professional Portfolio Upgrade to Next.js 15 & React 19'
slug: 'nextjs-15-upgrade'
created: '2026-02-01'
status: 'completed'
stepsCompleted: [1, 2, 3, 4, 5]
tech_stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'next-intl', 'next-themes', 'Motion for React', 'Iconify']
files_to_modify: ['package.json', 'next.config.mjs', 'app/**/*']
code_patterns: ['React 19 Actions', 'Async Request APIs', 'React Compiler', 'Server Components']
test_patterns: []
---

# Tech-Spec: Professional Portfolio Upgrade to Next.js 15 & React 19

**Created:** 2026-02-01
**Updated:** 2026-02-01

---

## Overview

### Problem Statement

The current portfolio is built on Next.js 14 and React 18. To stay on the bleeding edge and leverage new performance features (React Compiler, Server Actions improvements), the user wants to update to Next.js 15 and React 19.

### Solution

Upgrade project dependencies to latest stable versions of Next.js 15 and React 19, including related libraries (next-themes, next-intl). Address all breaking changes:
- Migration to Async Request APIs (headers, cookies, params, searchParams)
- React 19 hydration error fixes and component compatibility
- Caching behavior updates (GET requests no longer cached by default)
- TypeScript error resolution for new typings

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
    "next": "15.x",
    "react": "19.x",
    "react-dom": "19.x",
    "next-intl": "latest",
    "next-themes": "latest",
    "motion": "latest",
    "@iconify/react": "latest",
    "tailwindcss": "^3.4.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/react": "19.x",
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

### Phase 1: Dependency Updates
- [x] Stop running servers
- [x] Update `package.json` to React 19 / Next 15 / related deps
- [x] Run `npm install` (using `--force` or `--legacy-peer-deps` only if strictly necessary, prefer resolving)
- [x] Verify `next.config.mjs` compatibility

### Phase 2: React 19 Migration
- [x] Check for removed APIs (propTypes, defaultProps in function components)
- [x] Verify Client/Server component directives
- [x] Fix any hydration mismatches caused by new React 19 rendering logic

### Phase 3: Next.js 15 Breaking Changes
- [x] **Async Request APIs**: Update all `params`, `searchParams`, `headers()`, `cookies()` usages to be `await`ed.
    - Check Layouts (`params`)
    - Check Pages (`params`, `searchParams`)
    - Check API routes
- [x] **Caching**: Verify `fetch` behavior (default is now `no-store`). Add `cache: 'force-cache'` where static generation is required.
- [x] **Route Handlers**: Verify `GET` handlers caching behavior.

### Phase 4: Third-Party Libs & Polish
- [x] Update `next-intl` (breaking changes in navigation/middleware often occur with Next updates)
- [x] Update `next-themes` (ensure ThemeProvider is Client Component)
- [x] Run full build `npm run build`
- [x] Verify start `npm run start`

### Phase 5: Content Population & i18n Feature Flag
- [x] **Feature Flag i18n**: Disable `next-intl` routing/middleware (restrict to 'en' only, disable locale switching) while preserving implementation for future use.
- [x] **Data Retrieval**: Retrieve legacy content from `DivineStudio/com.daltonponder_nuxt`, specifically `i18n/locales/en.json` (using available tools/GitHub).
- [x] **Content Mapping**: Auto-map legacy content keys to new site components where structure permits.
- [x] **Documentation**: Create `content-mapping-report.md` documenting the source-to-destination mapping of migrated content.

---

## Content Requirements

### From Existing Nuxt Site

All content should be migrated from the existing `DivineStudio/com.daltonponder_nuxt` repository:
- Translation files: `i18n/locales/en.json` and `es.json`
- Logo: `DP_FullLogo_250x84.webp`
- Skill icons (but always try to first use icons from Iconify where possible)

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

## UX Wireframes (Completed)

> [!NOTE]
> All 4 detail page wireframes have been designed and approved. See [ux-design-variants-plan.md](file:///c:/Repos/com.daltonponder_next/_bmad-output/planning-artifacts/ux-design-variants-plan.md) for full design decisions.

### Skills Page (Implemented)
**Wireframe:** [skills-page-wireframe.excalidraw](file:///c:/Repos/com.daltonponder_next/_bmad-output/excalidraw-diagrams/skills-page-wireframe.excalidraw)

| Section | Description |
|---------|-------------|
| Hero | "Developer Console" aesthetic, dark bg, code decoration |
| Search/Filter | Search bar + category filter buttons |
| Skills Grid | 3-column card grid with **flip card interaction** (stats on back) |
| CTA | Link to Credentials page |

---

### About Page (Implemented)
**Wireframe:** [about-page-wireframe.excalidraw](file:///c:/Repos/com.daltonponder_next/_bmad-output/excalidraw-diagrams/about-page-wireframe.excalidraw)

| Section | Description |
|---------|-------------|
| Hero | Dark hero with avatar, narrative subtitle |
| Bio Cards | Dual-column: Professional + Personal |
| Timeline | "My Eras" flow with emojis and center line (Startup, Enterprise, Craft, Now) |
| Testimonials | Large single-quote spotlight with carousel |
| Philosophy | Philosophy Quote component integrated |
| CTA | Contact page link |

---

### Credentials Page
**Wireframe:** [credentials-page-wireframe.excalidraw](file:///c:/Repos/com.daltonponder_next/_bmad-output/excalidraw-diagrams/credentials-page-wireframe.excalidraw)

| Section | Description |
|---------|-------------|
| Hero | "Proof of Excellence" + summary stats (Years Exp, Certs, Degree) |
| Work Experience | Vertical timeline, resume-style cards (Title, Company, Dates, Bullets) |
| Education | Degree card with notable coursework tags |
| Certifications | 3-column grid of stylized CSS cards |
| CTA | Download CV + Contact buttons |

---

### Contact Page (Implemented)
**Wireframe:** [contact-page-wireframe.excalidraw](file:///c:/Repos/com.daltonponder_next/_bmad-output/excalidraw-diagrams/contact-page-wireframe.excalidraw)

| Section | Description |
|---------|-------------|
| Hero | "Let's Build Something" with availability card |
| Availability | Open to: Freelance / Full-Time / Consulting tags |
| Response Time | Green indicator "Usually responds within 24 hours" |
| Contact Form | Name, Email, Message + CTA button |
| Direct Email | Alternative contact path card |
| Social Links | GitHub, LinkedIn, Twitter icons |
| Sign-Off | Signature: "Build it secure, ship it fast, make it last." |

---

## Next Steps

1. ~~**UX Designer Agent** → Create wireframes based on this spec~~ ✅
2. ~~**User Review** → Approve wireframes~~ ✅
3. ~~**Quick Flow Solo Dev** → Implement the site~~ ✅
4. ~~**Content Migration** → Populate from legacy site & disable i18n~~ ✅
5. **Deploy** → Launch!
