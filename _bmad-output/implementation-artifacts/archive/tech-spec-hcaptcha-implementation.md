---
title: 'hCaptcha Implementation'
slug: 'hcaptcha-implementation'
created: '2026-02-03'
status: 'completed'
stepsCompleted: [1, 2, 3, 4, 5]
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
- Configure `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` in `.env.local` AND update `.env` template.
- Update `ContactPageContent.tsx` to:
    - Import and render `HCaptcha` component inside the `<form>` element.
    - **Handle Localization**: Pass current valid locale to the widget.
    - **Handle Theming**: Pass current theme (dark/light) to the widget.
    - **Manage State**: 
        - Track token presence to toggle submit button.
        - Handle `onGenericError` (network/config issues) to allow fallback or show error.
        - Handle `onLoad` to ensure widget is ready.
    - Ensure `h-captcha-response` is included in the form submission.
    - Handle form reset cleaning up the captcha.
- Update `next.config.ts` (or similar) if Content Security Policy (CSP) needs adjustment.
- Verify accessibility (keyboard nav) and responsiveness (layout shift prevention).

**Out of Scope:**
- Advanced custom captcha challenges.
- Adding CAPTCHA to other forms.
- *Note:* While server-side validation logic is handled by Formspree, **configuring the Formspree dashboard to REQUIRE captcha is a mandatory manual step** documented here.

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
- **Placement**: Inside the `<form>` tag, just before the submit button.
- **Loading State**: The submit button is disabled by default. If the Captcha script FAILS to load (timeout/blocked), we must decide:
    - *Decision*: Keep disabled and show a "Security check failed to load" message to the user.
- **Layout Shift**: Wrap the widget in a `min-h-[78px]` container to prevent CLS during load.
- **Localization**: Use `next-intl`'s `useLocale()` to pass the correct language code to `HCaptcha` (e.g., `en`, `es`, `fr`).
- **Theming**: Detect system/site theme (likely via `null` for auto or explicit class checking if using a theme provider) and pass `theme="dark" | "light"`.
- **Validation**:
    - **Client-side**: Disable "Send" until `onVerify`.
    - **Formspree**: Will receive `h-captcha-response`. **User must enable "Require Captcha" in Formspree dashboard.**
- **Reset**: Call `resetCaptcha()` on form reset.

## Implementation Plan

### Tasks

- [x] Task 1: Install Dependencies
  - File: `website/package.json`
  - Action: Run `npm install @hcaptcha/react-hcaptcha`
  - Notes: Ensure compatibility with React 19 (using `--legacy-peer-deps` if necessary, though latest version should be fine).

- [x] Task 2: Configure Environment
  - File: `website/.env.local`
  - Action: Add `NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_site_key_here`
  - Notes: Verify usage of the public test key `10000000-ffff-ffff-ffff-000000000001` or the user provided key for dev.

- [x] Task 3: Implement hCaptcha in Form
  - File: `website/app/components/pages/ContactPageContent.tsx`
  - Action:
    1. Import `HCaptcha` from `@hcaptcha/react-hcaptcha`.
    2. Add `const [captchaToken, setCaptchaToken] = useState<string | null>(null);`.
    3. Add `const captchaRef = useRef<HCaptcha>(null);`.
    4. **Get current locale**: `const locale = useLocale();` (import from 'next-intl').
    5. **Implement Handlers**:
        - `onVerify={(token) => setCaptchaToken(token)}`
        - `onExpire={() => setCaptchaToken(null)}`
        - `onError={(err) => ...}` (Log error, potentially allow bypass or show specific error msg).
    6. **Render Widget**:
        ```tsx
        <div className="min-h-[78px] flex justify-center my-4">
            <HCaptcha 
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ""} 
                onVerify={setCaptchaToken} 
                onExpire={() => setCaptchaToken(null)}
                ref={captchaRef}
                languageOverride={locale} // Pass locale
                theme="dark" // Or dynamic based on context, default to dark for this design
            />
        </div>
        ```
    7. Update submit button `disabled={state.submitting || !captchaToken}`.
  
- [x] Task 4: Handle Reset & Cleanup
  - File: `website/app/components/pages/ContactPageContent.tsx`
  - Action:
    1. Update `handleReset` function to call `captchaRef.current?.resetCaptcha()` and `setCaptchaToken(null)`.
  - Notes: Also ensure `resetCaptcha` is called if the user successfully submits and then clicks "Send Another".

- [x] Task 5: Security & Config Updates
  - File: `website/.env` (Template), `website/app/components/pages/ContactPageContent.tsx`
  - Action:
    1. Update `.env` template to include `NEXT_PUBLIC_HCAPTCHA_SITE_KEY=`.
    2. Check if a `Content-Security-Policy` meta tag or config exists in `layout.tsx` or `next.config.ts`. If so, add `https://hcaptcha.com`, `https://*.hcaptcha.com` to `script-src` and `frame-src`.
  - Manual Action: Log into Formspree Dashboard, go to Settings, and ENABLE "reCAPTCHA / hCaptcha" protection.

### Acceptance Criteria

- [x] AC 1: Given a visitor on the contact page, when they have not solved the CAPTCHA, then the "Send" button is disabled.
- [x] AC 2: Given a visitor solves the CAPTCHA, when the verification is successful, then the "Send" button becomes enabled.
- [x] AC 3: Given a successful form submission, when the success message is shown and the user clicks "Send Another Message", then the form resets, the CAPTCHA is cleared, and the button is disabled.
- [x] AC 4: Given a network error or token expiration, when the CAPTCHA expires, then the "Send" button becomes disabled again.
- [x] AC 5: Given a user viewing the site in French/Spanish (if supported), the Captcha widget appears in that language.
- [x] AC 6: Given the dark themed contact page, the Captcha widget renders in "dark" mode to match the aesthetic.

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
