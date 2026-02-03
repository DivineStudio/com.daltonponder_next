---
title: 'UAT Feedback Remediation'
slug: 'uat-remediation'
created: '2026-02-03'
status: 'done'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Iconify', 'Embla Carousel', 'Formspree']
files_to_modify: [
  'website/app/components/layout/Navbar.tsx',
  'website/app/components/layout/Footer.tsx',
  'website/app/components/pages/ContactPageContent.tsx',
  'website/app/components/pages/CredentialsPageContent.tsx',
  'website/app/components/ui/Marquee.tsx',
  'website/app/components/ui/Carousel.tsx',
  'website/package.json',
  'website/app/globals.css'
]
code_patterns: ['Component-based', 'Client-side interactivity', 'i18n translations']
test_patterns: ['Manual verification via Browser']
---

# Overview

## Problem Statement
Following a User Acceptance Testing (UAT) session, several UI/UX inconsistencies, broken links, and missing functionalities (specifically around form submission and touch gestures) were identified. These issues degrade the professional feel and usability of the application.

## Solution
We will systematically address the feedback items by:
1.  Correcting layout and state issues in the Navbar and Footer.
2.  Updating content and links (Socials, removal of "Resume" button).
3.  Enhancing interactivity (Carousel drag support, Cursor pointers).
4.  Standardizing visuals (Replacing emojis with Iconify icons).
5.  Implementing a functional backend for the Contact Form using Formspree.

## Scope
### In Scope
-   **Navbar:** Fix background transparency on reload by invoking scroll handler on mount.
-   **Footer:** logic to treat "Home" as a standard link, update column header.
-   **Social Links:** Update URLs in Footer and Contact page; remove "X" from Contact.
-   **Visuals:** Scan and replace text emojis with `<Icon />` components.
-   **Carousel:** Introduce `Embla Carousel` to replace/augment `Marquee.tsx` or create a new `Carousel.tsx` for draggable support.
-   **Credentials Page:** Remove the "Download Resume" CTA block.
-   **Contact Page:** 
    -   Install and integrate `@formspree/react` for real submissions.
    -   Enforce `cursor-pointer` on submit button.

### Out of Scope
-   Major design overhaul beyond the specified UAT items.

# Context for Development

## Codebase Patterns
-   **Client Components:** Most UI interactions are in `"use client"` components inside `app/components`.
-   **Styling:** Tailwind CSS with CSS variables for theming (`--color-primary`, etc.).
-   **Icons:** Exclusively usage of `@iconify/react` (Icon component).
-   **Translations:** `next-intl` is used for text. `t("Key")`.

## Files to Reference
| File | Purpose | Changes Needed |
| :--- | :--- | :--- |
| `website/app/components/layout/Navbar.tsx` | Main Navigation | Fix `useEffect` to call `handleScroll` on mount. |
| `website/app/components/layout/Footer.tsx` | Site Footer | Convert "Home" header to link, update social URLs. |
| `website/app/components/pages/ContactPageContent.tsx` | Contact Page UI | Remove "X", integrate Formspree, fix button cursor. |
| `website/app/components/pages/CredentialsPageContent.tsx` | Credentials Page UI | Remove "Download Resume" button. |
| `website/app/components/ui/Marquee.tsx` | Infinite Scroll | Potentially replace or wrap with Embla if this IS the carousel ref'd, or if there's another one. |
| `website/package.json` | Dependencies | Add `embla-carousel-react`, `@formspree/react`. |

## Technical Decisions
1.  **Carousel Library:** We will use `embla-carousel-react` because it is lightweight, supports both React and vanilla JS, and handles touch/drag gestures natively, which `Marquee.tsx` (CSS animation) cannot do easily.
2.  **Form Backend:** `@formspree/react` is the chosen solution for immediate integration without setting up custom API routes/SMTP.
3.  **Navbar Scroll:** The issue is a "race condition" of sorts where the scroll event isn't fired on reload. Explicitly calling the check function on mount is the standard fix.

# Implementation Plan

## 1. Setup & Dependencies
- [ ] Install required packages
  - File: `website/package.json`
  - Action: Run `npm install embla-carousel-react embla-carousel-autoplay @formspree/react`

## 2. Navbar & Footer Fixes
- [ ] Fix Navbar transparency on reload
  - File: `website/app/components/layout/Navbar.tsx`
  - Action: update `useEffect` dependency array and logic to ensure `checkScroll` runs immediately on mount, not just on scroll event.
- [ ] Update Footer "Home" Link
  - File: `website/app/components/layout/Footer.tsx`
  - Action: Change the "Home" text in the "Quick Links" column to be a `Link` component with `href="/"`, matching the styling of adjacent links.

## 3. Carousel Enhancement
- [ ] Create `Carousel` component
  - File: `website/app/components/ui/Carousel.tsx`
  - Action: Create a new reusable Carousel component using `embla-carousel-react`. Support props for loops, autoplay, and drag.
- [ ] Replace usage of `Marquee` (or update it)
  - File: `website/app/components/ui/Marquee.tsx` OR `website/app/components/sections/HeroSection.tsx` (whichever uses the auto-scroll)
  - Action: Replace the CSS-based Marquee with the new Embla-based Carousel to enable drag-to-scroll. *Note: If users want specific "Marquee" behavior (continuous smooth flow), Embla can do this with linear easing.*

## 4. Content & Visual Updates
- [ ] Global Emoji Replacement
  - File: `website/app/components/ui/EasterEgg.tsx`, `website/app/components/sections/TestimonialsSection.tsx`, `website/messages/en.json` (if emojis are in text)
  - Action: Search for all unicode emojis/emoji characters and replace them with closest `Icon` component from `@iconify/react` (e.g., `noto:party-popper`, `noto:rocket`, etc.).
- [ ] Update Social Links & Remove "X"
  - File: `website/app/components/pages/ContactPageContent.tsx`, `website/app/components/layout/Footer.tsx`
  - Action:
    - Update LinkedIn/GitHub URLs to provided values.
    - Remove "X" (Twitter) object from the social links array in `ContactPageContent`.

## 5. Page-Specific Functionality
- [ ] Remove "Download Resume" Button
  - File: `website/app/components/pages/CredentialsPageContent.tsx`
  - Action: Delete the Link/Button for "Download Resume" in the CTA section. Ensure layout remains balanced.
- [ ] Integrate Formspree
  - File: `website/app/components/pages/ContactPageContent.tsx`
  - Action:
    - Import `useForm` from `@formspree/react`.
    - Replace dummy `handleSubmit` with Formspree hook.
    - Add `cursor-pointer` class to the submit button.
    - *Note: User will need to provide Form ID via env var or config, but we can set up the structure.*

# Acceptance Criteria

- [ ] AC 1: Navbar Background
  - Given I am on the homepage
  - When I scroll down 100px and reload the page
  - Then the navbar should retain its solid background immediately, not transparent.
- [ ] AC 2: Footer Links
  - Given I am in the footer
  - When I look at "Quick Links"
  - Then "Home" should be a clickable link with identical styling to "About" and "Skills".
- [ ] AC 3: Social Links
  - Given I am on the Contact page or Footer
  - When I click LinkedIn or GitHub
  - Then it should open the correct URL (ending in `99a96a131` for LI, `DivineStudio` for GH).
  - Given I am on the Contact page
  - Then I should NOT see an "X" / Twitter icon.
- [ ] AC 4: Visuals
  - Given I browse the site
  - Then I should see NO native emoji characters.
  - All icons should be rendered via SVG/Iconify.
- [ ] AC 5: Carousel Drag
  - Given I see a carousel/marquee (e.g., in Hero or Testimonials)
  - When I drag with mouse or swipe with touch
  - Then the content should move with my gesture.
- [ ] AC 6: Resume Button
  - Given I am on the Credentials page
  - Then I should NOT see a "Download Resume" button.
- [ ] AC 7: Contact Form
  - Given I fill out the contact form
  - When I hover over "Send Message"
  - Then the cursor should be a pointer web hand.
  - When I submit
  - Then the form should attempt to post to Formspree (success message may depend on valid Form ID).

