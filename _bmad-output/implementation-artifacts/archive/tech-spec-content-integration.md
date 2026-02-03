---
title: 'Content Integration & Migration'
slug: 'content-integration'
created: '2026-02-02'
status: 'completed'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['Next.js 15', 'React 19', 'next-intl', 'Motion for React']
files_to_modify: ['website/messages/en.json', 'website/app/components/layout/*', 'website/app/components/sections/*', 'website/app/components/pages/*', 'website/app/[locale]/**/*']
code_patterns: ['useTranslations hook', 'getTranslations for metadata', 't.raw() for arrays']
test_patterns: ['Console warning check', 'Build type-check', 'Visual text verification']
---

# Tech-Spec: Content Integration & Migration

**Created:** 2026-02-02

## Overview

### Problem Statement

Legacy content has been successfully migrated to `en.json`, but the application components currently use hardcoded placeholder text. The site needs to be fully wired up to use dynamic content to be production-ready.

### Solution

Refactor all page components and sections to use `next-intl`'s `useTranslations` hook. This will enable the application to consume the migrated JSON content structure while maintaining the Next.js 15 / React 19 architecture.

### Scope

**In Scope:**
- Configuring `next-intl` for local-only mode (Confirmed: `request.ts` is ready)
- Refactoring `Navbar` and `Footer` components
- Refactoring Home Page sections (Hero, ProAbout, PersonalAbout, Contact)
- Refactoring Detail Pages (About, Skills, Credentials, Contact)
- Verifying Contact Form integration with the new content structure
- Visual verification of all text rendering

**Out of Scope:**
- Creating new content (text should strictly come from `en.json`)
- Design changes (layout and styles remain fixed; only text source changes)
- Feature flag implementation for multi-language routing (we are staying on 'en' only for this phase)

## Context for Development

### Codebase Patterns

- **Internationalization**: `useTranslations('Namespace')` is the standard pattern.
- **Arrays from JSON**: Use `t.raw('Items')` to retrieve array data (e.g., Testimonials).
- **Client vs Server**:
    - `HeroSection`, `ContactSection`, `ProAbout/PersonalAbout` already utilize `useTranslations` (Client Components).
    - `Navbar`, `Footer`, `Skills`, `Credentials`, `Testimonials` are currently **Hardcoded**.
    - Page Content components (`AboutPageContent`, etc.) need checking/refactoring.
- **Metadata**: Use `generateMetadata` with `const t = await getTranslations({ locale, namespace: 'Metadata.PageName' })`.

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `website/messages/en.json` | Source of truth for all text content |
| `_bmad-output/implementation-artifacts/content-mapping-report.md` | **READ FIRST** - Guide for mapping keys to components |

### Technical Decisions

- **Metadata Strategy**: Use `generateMetadata` with `getTranslations({ locale, namespace: 'Metadata.Home' })` (or `Metadata.About`, etc.) for each page.
- **Component Prop Drilling**: Avoid passing static text as props; components should fetch their own translations using the hook.
- **Missing Translation Behavior**: `next-intl` will log a warning to console if a key is missing. The component should NOT crash—fallback behavior is built in.
- **Key Missing Strategy**: All keys have been pre-populated in `en.json`. If a new key is needed, add it to the JSON file BEFORE using it in a component.

## Implementation Plan

### Prerequisites (Complete These First)

> [!IMPORTANT]
> Read `content-mapping-report.md` before starting any task. This ensures you understand the key-to-component mapping.

- [x] **Prereq 1: Verify JSON completeness**
  - Confirmed: `Footer`, `Navigation`, `Metadata`, and `TestimonialsSection.Items` namespaces exist.

### Tasks

**(1) Layout & Shared Components**

- [ ] Task 1: Refactor Navbar
  - File: `website/app/components/layout/Navbar.tsx`
  - Action: Replace hardcoded nav links with `Navigation` translations.
  - Keys: `Navigation.Home`, `Navigation.About`, `Navigation.Skills`, `Navigation.Credentials`, `Navigation.Contact`

- [ ] Task 2: Refactor Footer
  - Files: `website/app/components/layout/Footer.tsx`, `website/messages/en.json`
  - Action: Use `useTranslations('Footer')`. 
  - Keys: `Footer.Copyright` (use `{year}` interpolation), `Footer.Tagline`, `Footer.Links.Privacy`, `Footer.Links.Terms`

**(2) Section Components**

- [ ] Task 3: Refactor Credentials Section
  - File: `website/app/components/sections/CredentialsSection.tsx`
  - Action: Replace stats labels with `Home.EdCertSection` keys.
  - Keys: `Home.EdCertSection.Header`, `Home.EdCertSection.EducationHeader`, `Home.EdCertSection.CertificationsHeader`, `Home.EdCertSection.Graduated`, `Home.EdCertSection.Expected`, `Home.EdCertSection.Expires`

- [ ] Task 4: Refactor Skills Section
  - File: `website/app/components/sections/SkillsSection.tsx`
  - Action: Replace hardcoded category headers with `Home.SkillsSection` keys.
  - Keys: `Home.SkillsSection.Header`

- [ ] Task 5: Refactor Testimonials Section
  - File: `website/app/components/sections/TestimonialsSection.tsx`
  - Action: Use `t.raw('Items')` to iterate over testimonials array.
  - Keys: `Home.TestimonialsSection.Header`, `Home.TestimonialsSection.At`, `Home.TestimonialsSection.Items` (array)
  - Pattern:
    ```typescript
    const items = t.raw('Items') as Array<{ Quote: string; Author: string; Role: string; Company: string }>;
    ```

**(3) Page Content Components**

- [ ] Task 6: Refactor About Page Content
  - File: `website/app/components/pages/AboutPageContent.tsx`
  - Action: Ensure full usage of `useTranslations` for bio content, "My Eras" timeline, etc.

- [ ] Task 7: Refactor Skills/Credentials/Contact Page Contents
  - Files:
    - `website/app/components/pages/ContactPageContent.tsx`
    - `website/app/components/pages/CredentialsPageContent.tsx`
    - `website/app/components/pages/SkillsPageContent.tsx`
  - Action: Ensure these detail pages pull from their respective JSON namespaces.

**(4) Metadata**

- [ ] Task 8: Dynamic Metadata
  - Files:
    - `website/app/[locale]/page.tsx` → `Metadata.Home`
    - `website/app/[locale]/about/page.tsx` → `Metadata.About`
    - `website/app/[locale]/skills/page.tsx` → `Metadata.Skills`
    - `website/app/[locale]/credentials/page.tsx` → `Metadata.Credentials`
    - `website/app/[locale]/contact/page.tsx` → `Metadata.Contact`
  - Action: Implement `generateMetadata` function in each page:
    ```typescript
    export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
      const { locale } = await params;
      const t = await getTranslations({ locale, namespace: 'Metadata.Home' });
      return {
        title: t('Title'),
        description: t('Description'),
      };
    }
    ```

### Acceptance Criteria

- [ ] **AC 1**: Given the user visits the home page, when inspecting `Hero`, `Skills`, `Credentials`, `Testimonials`, `About`, and `Contact` sections, then all text matches the values in `en.json` and no hardcoded strings are visible.
- [ ] **AC 2**: Given the user switches pages (About, Skills, etc.), when viewing the page title in the browser tab, then it displays the localized title from `Metadata.[PageName].Title`.
- [ ] **AC 3**: Given the footer is visible, when inspecting the text, then links and copyright text utilize `Footer.*` values.
- [ ] **AC 4**: Given the build command is run (`npm run build`), then it completes without:
  - TypeScript errors related to missing keys
  - `next-intl` type errors
- [ ] **AC 5**: Given the user navigates through all pages, when checking the browser console, then NO "Missing translation" warnings appear.

## Additional Context

### Dependencies

- `next-intl`: Core library for hooks and routing.
- `en.json`: The single source of truth. All content is pre-populated.

### Testing Strategy

| Type | Action |
| ---- | ------ |
| **Build Verification** | Run `npm run build` — must pass with zero type errors |
| **Console Check** | Navigate all 5 pages in dev mode; verify no `Missing translation` warnings |
| **Manual Verification** | Click through all pages; spot-check text against `en.json` keys |
| **Regression** | Verify existing animations and interactions still function |

### Error Handling

- **Missing key at runtime**: `next-intl` returns the key name as fallback and logs a warning. App will NOT crash.
- **TypeScript mismatch**: Build will fail—fix by ensuring key exists in JSON and regenerating types.

### Notes

- **Mock Data**: Testimonials, Footer, and Metadata content contain placeholder text. This will be replaced during post-implementation review.
- **Content Mapping Report**: Always reference `content-mapping-report.md` for the authoritative key-to-component mapping.
