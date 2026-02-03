---
title: 'UAT Remediation Fixes'
slug: 'uat-remediation-fixes'
created: '2026-02-03'
stepsCompleted: [1, 2, 3, 4]
status: 'done'
tech_stack: ['Next.js', 'React', 'Embla Carousel', 'Tailwind CSS', 'Formspree', 'Framer Motion']
files_to_modify: [
  'website/package.json',
  'website/app/components/ui/Carousel.tsx',
  'website/app/components/sections/SkillsSection.tsx',
  'website/app/components/sections/TestimonialsSection.tsx',
  'website/app/components/pages/ContactPageContent.tsx',
  'website/app/components/pages/CredentialsPageContent.tsx',
  'website/app/components/layout/Navbar.tsx',
  'website/app/components/layout/Footer.tsx'
]
code_patterns: []
test_patterns: []
---

# Tech-Spec: UAT Remediation Fixes

**Created:** 2026-02-03

## Overview

### Problem Statement

The previous UAT remediation attempt was incomplete. It failed to deliver the critical "Drag Support" feature for carousels, introduced security risks by hardcoding Formspree credentials, and left several UX and accessibility issues unresolved (e.g., dead-end form success state, mobile menu focus). The codebase currently contains orphaned components and inconsistent implementations.

### Solution

We will systematically remediate the remediation. This involves:
1.  **Functional:** Fully implementing `Embla Carousel` in Hero and Testimonials to support drag/swipe.
2.  **Security:** Moving secrets to environment variables.
3.  **UX/Accessibility:** Fixing form states, navbar focus management, and link consistency.
4.  **Cleanup:** Removing dead code (`Marquee.tsx` legacy) and unifying patterns.

### Scope

**In Scope:**
*   **Security:** Move Formspree ID to `NEXT_PUBLIC_FORMSPREE_ID`.
*   **Carousel:** Implement `Carousel.tsx` (Embla) in `HeroSection` and `TestimonialsSection`.
*   **Contact Form:** Add "Send Another" button to reset success state.
*   **Credentials:** Fix fragile key generation for stats.
*   **Accessibility:** Fix Mobile Menu (Focus trap/management).
*   **Best Practices:** Remove boolean logic from `en.json`.
*   **Footer:** Fix "Home" link consistency.
*   **Cleanup:** Remove `Marquee.tsx` (CSS version) and unused components.
*   **Motion:** Verify reduced motion compliance.

**Out of Scope:**
*   Major design overhaul.
*   New feature development beyond UAT fixes.

## Context for Development

### Codebase Patterns

*   **Carousel:** Use `embla-carousel-react` wrapped in `Carousel.tsx`. For ticker-like behavior (Skills), use `embla-carousel-auto-scroll`. For standard slides (Testimonials), use `Autoplay`.
*   **Forms:** uses `@formspree/react` with `useForm`.
*   **Theme:** Tailwind + CSS variables (`--color-primary`, etc) defined in `globals.css`.
*   **Icons:** `@iconify/react`.

### Files to Reference

| File | Purpose | Changes Needed |
| ---- | ------- | -------------- |
| `website/package.json` | Dependencies | Add `embla-carousel-auto-scroll`. |
| `website/app/components/ui/Carousel.tsx` | Reusable Carousel | Add support for optional plugins (specifically AutoScroll). |
| `website/app/components/sections/SkillsSection.tsx` | Skills List | Replace `Marquee` with `Carousel` using AutoScroll plugin. |
| `website/app/components/sections/TestimonialsSection.tsx` | Testimonials | Replace `setInterval` with `Carousel` using Autoplay plugin. |
| `website/app/components/pages/ContactPageContent.tsx` | Contact Form | Move ID to env var, add reset button, fix boolean translation logic. |
| `website/app/components/pages/CredentialsPageContent.tsx` | Credentials | Fix stats key generation (sanitize labels). |
| `website/app/components/layout/Navbar.tsx` | Navigation | Fix mobile menu accessibility (focus trap, ARIA). |
| `website/app/components/layout/Footer.tsx` | Site Footer | Standardize "Home" link in map loop. |
| `website/app/components/ui/Marquee.tsx` | Legacy Marquee | **DELETE** (superseded by Carousel). |

### Technical Decisions

1.  **Embla Carousel:** Chosen for native drag support, replacing CSS animations and custom `setInterval` implementations.
2.  **AutoScroll Plugin:** Required for the "Marquee" effect in Skills section to support drag interaction which CSS keyframes cannot provide.
3.  **Env Variables:** Standard Next.js pattern (`NEXT_PUBLIC_FORMSPREE_ID`) for client-side keys.
4.  **Accessibility:** `FocusTrap` (or manual implementation) for mobile menu to ensure keyboard navigation stays within the modal.
