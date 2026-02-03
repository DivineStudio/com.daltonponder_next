---
title: 'QA and Error Resolution Pass'
slug: 'qa-clean-sweep'
created: '2026-02-02'
status: 'completed'
stepsCompleted: [1, 2, 3, 4, 5]
tech_stack: ['Next.js 16.1.6', 'React 19.2.3', 'next-intl', 'Motion for React', 'Tailwind CSS v4']
files_to_modify: ['website/messages/en.json', 'website/app/components/pages/SkillsPageContent.tsx', 'website/app/components/pages/CredentialsPageContent.tsx']
code_patterns: ['useTranslations for text', 't.raw for arrays', 'Missing key fallback checks']
test_patterns: ['Manual verification of all pages', 'Console warning check']
---

# Tech-Spec: QA and Error Resolution Pass

**Created:** 2026-02-02

## Overview

### Problem Statement

The site has undergone upgrades and partial content integration. Deep investigation reveals that while the core infrastructure is in place, several key pages (Skills, About, Credentials) still rely on hardcoded data or missing translation keys, effectively failing the "Content Integration" requirements. A QA pass is needed to close these gaps and verify the site is production-ready.

### Solution

Complete the content migration for Skills and About pages, fix missing keys in `en.json`, and verify all pages against the defined acceptance criteria.

### Scope

**In Scope:**
- **Skills Page**: Refactor `allSkills` array from `SkillsPageContent.tsx` into `en.json` and consume via `t.raw()`.
- **About Page**: Add missing `Eras` (Timeline) data to `en.json` (it currently exists in component or is missing entirely from JSON).
- **Credentials Page**: Correct the "About" header key usage to be specific to Credentials.
- **Verification**: Full manual crawl of all 5 pages.

**Out of Scope:**
- Design changes.
- New features.

## Context for Development

### Codebase Patterns

- **Internationalization:** `next-intl` is fully configured.
- **Data Loading:** Arrays should be loaded via `t.raw('Key')` and cast to types.
- **Icons:** `Iconify` used throughout.

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `website/messages/en.json` | Missing `Skills` array and `About.Eras` array. |
| `website/app/components/pages/SkillsPageContent.tsx` | Currently has hardcoded `allSkills` array. |
| `website/app/components/pages/CredentialsPageContent.tsx` | Uses generic/incorrect keys for headers. |

### Technical Decisions

- **Skills Data Structure**: The `allSkills` array in `SkillsPageContent.tsx` is complex (icon, category, years, proficiency). We will move this entire structure to JSON to allow for future localization.
- **Validation**: We will use `npm run build` as the primary gate to ensure type safety after moving data to JSON.

## Implementation Plan

### Tasks

**(1) Content Data Migration**

- [x] Task 1: Update `en.json` with Missing Data
  - File: `website/messages/en.json`
  - Action: 
    - Add `About.Eras` array (Timeline data).
    - Add `Skills.List` array (migrating data from `SkillsPageContent.tsx`).
    - Add `Credentials.WorkExperience.Header` (replacing the generic "About" key usage).

**(2) Component Refactoring**

- [x] Task 2: Refactor Skills Page Content
  - File: `website/app/components/pages/SkillsPageContent.tsx`
  - Action: 
    - Remove hardcoded `allSkills`.
    - Retrieve skills via `const allSkills = t.raw('List')`.
    - Ensure type safety for the retrieved array.

- [x] Task 3: Refactor Credentials Page Content
  - File: `website/app/components/pages/CredentialsPageContent.tsx`
  - Action: Update the Work Experience header to use `t('WorkExperience.Header')` instead of `tNav('About')` or fallback.

**(3) Verification**

- [x] Task 4: Full Site QA Walkthrough
  - Action: Navigate to Home, About, Skills, Credentials, Contact.
  - Verify: No console warnings, no hydration errors, content loads correctly from JSON.

### Acceptance Criteria

- [x] **AC 1**: Given the user visits `/skills`, when the page loads, then the skills grid renders exactly as before but data sourced from `en.json`.
- [x] **AC 2**: Given the user visits `/about`, when scrolling to "My Eras", then the timeline renders with data from `en.json`.
- [x] **AC 3**: Given the build command is run, then it completes with zero type errors.
- [x] **AC 4**: Given a browser console check, then no `next-intl` "Missing translation" warnings appear.

## Additional Context

### Dependencies

- `next-intl`

### Testing Strategy

- **Build Verification**: Run `npm run build` to catch type mismatches with JSON data.
- **Manual Walkthrough**: Click through all pages and inspect console.

## Review Notes
- Adversarial review completed (2026-02-03)
- Findings: 7 issues identified (Structure mismatch, Duplication, Placeholders)
- Resolution: Refactored JSON structure for WorkExperience/Certifications, removed duplicated Testimonials, fixed component access.
- Final Build: Passed successfully.
