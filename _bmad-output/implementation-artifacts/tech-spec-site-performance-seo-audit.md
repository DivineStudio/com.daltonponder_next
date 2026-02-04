---
title: 'Site Performance & SEO Audit'
slug: 'site-performance-seo-audit'
created: '2026-02-04'
status: 'ready-for-dev'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['Next.js 16', 'Tailwind CSS', 'TypeScript', 'next-intl', 'Framer Motion', 'Embla Carousel']
files_to_modify: ['website/app/[locale]/layout.tsx', 'website/app/[locale]/page.tsx', 'website/app/components/**/*.tsx', 'website/app/globals.css', 'website/app/robots.ts', 'website/app/sitemap.ts']
code_patterns: ['next-intl for localization', 'Next.js Metadata API', 'Tailwind CSS for styling', 'Framer Motion for animations']
test_patterns: ['Manual Lighthouse Audit']
---

# Tech-Spec: Site Performance & SEO Audit

**Created:** 2026-02-04

## Overview

### Problem Statement

The website currently lacks verified performance metrics, comprehensive accessibility compliance (specifically WCAG 2.2 AA), and fully optimized SEO structure. Without these validations, the site may suffer from poor search engine rankings, limited accessibility for users with disabilities, and suboptimal user experience on varying devices.

### Solution

Conduct a unified, deep-dive manual audit using Lighthouse on both Mobile and Desktop environments. Systematically address all identified warnings and errors to achieve green (>90%) scores across Performance, Accessibility, Best Practices, and SEO. Implement strict code-level fixes to meet WCAG 2.2 AA standards and ensure Next.js 16 best practices are utilized for metadata and asset loading.

### Scope

**In Scope:**
- Comprehensive Lighthouse Audit (Mobile & Desktop) for all key pages.
- Code remediation to achieve >90% (striving for 100%) Lighthouse scores.
- Accessibility fixes to meet WCAG 2.2 AA compliance (color contrast, ARIA labels, keyboard navigation, focus management).
- SEO optimizations: Metadata structure, semantic HTML, and image optimization (Next/Image).
- Performance optimizations: Addressing Core Web Vitals (LCP, CLS, INP).

**Out of Scope:**
- Implementation of automated auditing tools (e.g., Lighthouse CI/Unlighthouse) - currently a one-time audit.
- Complex multi-locale `hreflang` verification (deferred until multi-language rollout).
- Major feature additions unrelated to performance/accessibility.

## Context for Development

### Codebase Patterns

- **Internationalization:** Uses `next-intl` with `[locale]` dynamic routes. Metadata is generated dynamically based on locale.
- **Fonts:** `next/font/google` is used for `IBM_Plex_Mono`, `IBM_Plex_Sans`, and `IBM_Plex_Serif`.
- **Styling:** Tailwind CSS with a `globals.css` file.
- **Components:** Modular component structure in `website/app/components/`. UI components are in `website/app/components/ui`.
- **Animations:** Framer Motion is widely used, which can impact performance if not optimized (e.g., layout thrashing).

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `website/app/[locale]/layout.tsx` | Main layout, font loading, critical metadata, `<html>` tag structure. |
| `website/app/[locale]/page.tsx` | Landing page composition, page-specific metadata. |
| `website/app/components/layout/Navbar.tsx` | Navigation accessibility (aria-labels, focus states). |
| `website/app/components/layout/Footer.tsx` | Footer accessibility. |
| `website/app/components/sections/*.tsx` | Individual sections to check for semantic HTML and image optimization. |
| `website/app/components/ui/*.tsx` | Reusable UI components (Carousel, Marquee, etc.) to check for ARIA support. |

### Technical Decisions

- **Compliance Standard:** WCAG 2.2 AA.
- **Performance Target:** Lighthouse Score >90% (Goal: 100%).
- **Environments:** Mobile and Desktop must both pass.
- **Image Strategy:** Enforce `next/image` for all assets with proper `sizes` and `priority` attributes where applicable.
- **Font Strategy:** Verify `display: swap` (already present) and preload strategies.

## Implementation Plan

### Tasks

- [x] Task 1: Baseline Audit & Font Optimization
  - File: `website/app/[locale]/layout.tsx`
  - Action: Run initial Lighthouse audit to establish baseline. Verify `next/font` configuration uses `display: swap`. Ensure `html` tag has correct `lang` attribute (already using `[locale]`). Check for render-blocking resources.
  - Notes: Document baseline scores for Mobile/Desktop.

- [x] Task 2: Implement SEO Essentials (Robots & Sitemap)
  - File: `website/app/robots.ts` (create/verify), `website/app/sitemap.ts` (create/verify)
  - Action: Ensure valid `robots.txt` and `sitemap.xml` are generated dynamically.
  - File: `website/app/[locale]/layout.tsx`
  - Action: Verify canonical URL setup in metadata base.

- [x] Task 3: Accessibility & Semantic HTML - Layout (Navbar/Footer)
  - File: `website/app/components/layout/Navbar.tsx`, `website/app/components/layout/Footer.tsx`
  - Action: Add `aria-label` to navigation links where text is ambiguous. Ensure valid toggle button states (`aria-expanded`). Verify "Skip to content" link executes correctly. Check color contrast on dark/light mode toggles.

- [x] Task 4: Content Section Accessibility & Heading Hierarchy
  - File: `website/app/[locale]/page.tsx`, `website/app/components/sections/*.tsx`
  - Action: Audit `h1`-`h6` hierarchy. Ensure exactly one `h1` per page. Fix skipped heading levels. Ensure all interactive elements in sections (buttons, links) have accessible names.
  - Notes: Specifically check `HeroSection` for `h1`.

- [x] Task 5: Image Optimization & Core Web Vitals (LCP)
  - File: `website/app/components/sections/HeroSection.tsx`, `website/app/components/ui/*.tsx`
  - Action: Identify LCP element (likely Hero image or text). If image, ensure `priority={true}` is set. Add `sizes` prop to all responsive images. Replace any raw `<img>` tags with `next/image` where appropriate. Correct explicit width/height to prevent layout shifts.

- [x] Task 6: Motion & Carousel Stability (CLS/INP)
  - File: `website/app/components/ui/Marquee.tsx`, `website/app/components/ui/Carousel.tsx`
  - Action: Verify Framer Motion animations do not cause layout shifts (use `layout` prop carefully). Ensure `Embla Carousel` implementation is accessible (keyboard navigable) and doesn't cause CLS on load.

- [ ] Task 7: Final Verification & Polish
  - File: `website/app/globals.css`
  - Action: Address any global contrast issues found during audit.
  - Action: Run final Lighthouse audit. Fix any remaining issues to hit >90% target.

### Acceptance Criteria

- [ ] AC 1: Lighthouse Performance Score is >90% (Green) for both Mobile and Desktop.
- [ ] AC 2: Lighthouse Accessibility Score is >90% (Green); zero automated WCAG 2.2 AA errors detected.
- [ ] AC 3: Lighthouse Best Practices and SEO Scores are >90% (Green).
- [ ] AC 4: Document Outline (Headings) is strictly hierarchical with no skipped levels (e.g., h1 -> h2 -> h3, not h1 -> h3).
- [ ] AC 5: LCP (Largest Contentful Paint) is < 2.5s on mobile simulation.
- [ ] AC 6: CLS (Cumulative Layout Shift) is < 0.1.
- [ ] AC 7: Keyboard navigation is functional for all interactive elements (Focus visible, logical tab order).
- [x] AC 8: `robots.txt` and `sitemap.xml` are valid and accessible.

## Additional Context

### Dependencies

- Lighthouse (Chrome DevTools)
- `next-intl` (Layout configuration)

### Testing Strategy

- **Manual Audit:** Use Chrome DevTools > Lighthouse. Mode: Navigation. Device: Mobile & Desktop. Categories: All.
- **Accessibility:** Use Tab key verification for focus states. Use "Axe DevTools" or Lighthouse Accessibility audit.

### Notes

- Prioritize Mobile performance as it is the standard for Google indexing.
- Animations (Framer Motion) should respect `prefers-reduced-motion` where possible, though not explicitly in scope, it's a "Best Practice".
