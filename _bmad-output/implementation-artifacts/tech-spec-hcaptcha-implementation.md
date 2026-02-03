---
title: 'hCaptcha Implementation'
slug: 'hcaptcha-implementation'
created: '2026-02-03'
status: 'ready-for-dev'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Formspree', 'hCaptcha']
files_to_modify: ['website/app/components/pages/ContactPageContent.tsx', 'website/.env.local', 'website/.env']
code_patterns: ['Client Components', 'i18n (next-intl)', 'Framer Motion', 'Formspree useForm']
test_patterns: ['Manual UI Testing']
---

# Tech-Spec: hCaptcha Implementation

**Created:** 2026-02-03

## Overview

### Problem Statement

The Contact form currently lacks spam protection, making it vulnerable to automated submissions and spam attacks. A CAPTCHA solution is needed to verify human interaction.

### Solution

Integrate `@hcaptcha/react-hcaptcha` into the existing `ContactPageContent` component. This involves rendering the CAPTCHA widget, verifying the token upon form submission, and ensuring the form cannot be submitted without a valid verification.

### Scope

**In Scope:**
- Install `@hcaptcha/react-hcaptcha` dependency.
- Configure `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` in `.env.local` (and `.env` example).
- Update `ContactPageContent.tsx` to:
    - Import and render `HCaptcha` component inside the `<form>` element.
    - Manage hCaptcha token state to disable/enable the submit button.
    - Ensure `h-captcha-response` is included in the form submission (handled automatically by widget input if inside form).
    - Handle form reset cleaning up the captcha.
- Verify basic accessibility and responsiveness.

**Out of Scope:**
- Server-side token validation logic (relying on Formspree's integration).
- Adding CAPTCHA to other forms.

## Context for Development

### Codebase Patterns

- **Framework**: Next.js 16.1.6 (App Router) + React 19.2.3.
- **Styling**: Tailwind CSS v4 using CSS variables for theming.
- **Forms**: `@formspree/react` (^3.0.0) `useForm` hook. It extracts data from the form element's `onSubmit` event.
- **I18n**: `next-intl` used for all text content.

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `website/app/components/pages/ContactPageContent.tsx` | Main contact form component. Uses `useForm` and renders the form fields. |
| `website/.env.local` | Environment configuration for `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`. |
| `website/package.json` | Dependency management. |

### Technical Decisions

- **Library**: `@hcaptcha/react-hcaptcha` to render the widget.
- **Placement**: Inside the `<form>` tag, just before the submit button. This ensures the hidden input it generates is included in the `FormData` captured by `useForm`.
- **Validation**:
    - **Client-side**: Disable the "Send" button until `onVerify` returns a token.
    - **Formspree**: Will receive `h-captcha-response` automatically if the input is present in the form.
- **Reset**: The `HCaptcha` component exposes a `resetCaptcha` method via ref. We will call this in `handleReset` and when parsing a successful submission if the form stays mounted (though the success state currently replaces the form).

## Implementation Plan

### Tasks

- [ ] Task 1: Install Dependencies
  - File: `website/package.json`
  - Action: Run `npm install @hcaptcha/react-hcaptcha`
  - Notes: Ensure compatibility with React 19 (using `--legacy-peer-deps` if necessary, though latest version should be fine).

- [ ] Task 2: Configure Environment
  - File: `website/.env.local`
  - Action: Add `NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_site_key_here`
  - Notes: Verify usage of the public test key `10000000-ffff-ffff-ffff-000000000001` or the user provided key for dev.

- [ ] Task 3: Implement hCaptcha in Form
  - File: `website/app/components/pages/ContactPageContent.tsx`
  - Action:
    1. Import `HCaptcha` from `@hcaptcha/react-hcaptcha`.
    2. Add `const [captchaToken, setCaptchaToken] = useState<string | null>(null);`.
    3. Add `const captchaRef = useRef<HCaptcha>(null);`.
    4. Implement `onVerify={(token) => setCaptchaToken(token)}`.
    5. Implement `onExpire={() => setCaptchaToken(null)}`.
    6. Render `<HCaptcha sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ""} onVerify={(token) => setCaptchaToken(token)} onExpire={() => setCaptchaToken(null)} ref={captchaRef} />` just before the submit button.
    7. Update submit button `disabled={state.submitting || !captchaToken}`.
  
- [ ] Task 4: Handle Reset & Cleanup
  - File: `website/app/components/pages/ContactPageContent.tsx`
  - Action:
    1. Update `handleReset` function to call `captchaRef.current?.resetCaptcha()` and `setCaptchaToken(null)`.
  - Notes: This ensures users can't reuse a token or leave the form in a dirty state.

### Acceptance Criteria

- [ ] AC 1: Given a visitor on the contact page, when they have not solved the CAPTCHA, then the "Send" button is disabled.
- [ ] AC 2: Given a visitor solves the CAPTCHA, when the verification is successful, then the "Send" button becomes enabled.
- [ ] AC 3: Given a successful form submission, when the success message is shown and the user clicks "Send Another Message", then the form resets and the CAPTCHA is cleared/reset.
- [ ] AC 4: Given a network error or token expiration, when the CAPTCHA expires, then the "Send" button becomes disabled again.

## Additional Context

### Dependencies

- `@hcaptcha/react-hcaptcha`

### Testing Strategy

- **Manual Testing**:
  1. Load Contact page.
  2. Attempt to click "Send" immediately (Expect: Disabled).
  3. Fill out form.
  4. Complete CAPTCHA (if using test key, it auto-solves often or asks for easy puzzle).
  5. Click "Send" (Expect: Enabled, form submits).
  6. Verify Formspree dashboard receives submission (if connected) or verify success message.
  7. Click "Send Another Message" (Expect: Form resets, CAPTCHA empty/reset).

### Notes

- The site key must be valid for the domain (localhost is typically allowed by hCaptcha by default or needs configuration).
- Tailwind styling might be needed to center the widget if it looks off. Wrap it in a `div` with `flex justify-center my-4` if needed.
