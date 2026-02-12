# Security Scan Report

## Executive Summary
A comprehensive security scan was performed on the codebase. One high-severity vulnerability in a dependency was identified and resolved. Security headers were reviewed and enhanced. The codebase follows security best practices for XSS prevention, form submission, and external link handling.

## Findings

### 1. Resolved Vulnerabilities
- **Dependency**: `path-to-regexp` (via `@vercel/toolbar`)
- **Severity**: High
- **Issue**: Backtracking regular expressions could lead to Regular Expression Denial of Service (ReDoS).
- **Resolution**: Added an override in `package.json` to force version `6.3.0`, which contains the security fix. Verified with `npm audit`.

### 2. Security Headers Review
- **Content-Security-Policy (CSP)**: Correctly implemented with restrictive directives for `default-src`, `object-src`, `base-uri`, and `form-action`.
  - *Note*: Uses `'unsafe-inline'` and `'unsafe-eval'` in `script-src` and `style-src`. While these are often required for Next.js hydration and some third-party integrations (hCaptcha, Vercel Toolbar), it is recommended to move towards a nonce-based CSP if possible in the future.
- **X-Frame-Options**: Set to `DENY` to prevent clickjacking.
- **X-Content-Type-Options**: Set to `nosniff` to prevent MIME-sniffing.
- **Referrer-Policy**: Set to `strict-origin-when-cross-origin`.
- **Permissions-Policy**: Restrictive policy implemented (`camera=(), microphone=(), geolocation=(), interest-cohort=()`).
- **X-Powered-By**: Disabled by setting `poweredByHeader: false` in `next.config.ts` to reduce information disclosure.

### 3. Code Security Analysis
- **XSS Protection**:
  - Usage of `dangerouslySetInnerHTML` is limited to `StructuredData.tsx` and is safely handled using `safeJsonStringify` which escapes `<`, `>`, and `&`.
- **Tabnabbing**:
  - All external links using `target="_blank"` include `rel="noopener noreferrer"`.
- **Secrets Management**:
  - No hardcoded secrets (API keys, passwords, etc.) were found in the source code.
  - Public keys (hCaptcha site key) are correctly managed via environment variables.
- **Form Security**:
  - The contact form is protected by hCaptcha to prevent bot submissions.
  - Submissions are handled securely through Formspree.

### 4. Recommendations
- **Monitor Dependencies**: Regularly run `npm audit` to catch new vulnerabilities in deep dependencies.
- **CSP Nonce**: Explore implementing nonces for inline scripts to remove the need for `'unsafe-inline'` in the CSP.
- **HSTS**: Ensure `Strict-Transport-Security` is active in production (typically handled automatically by Vercel, but can be explicitly added to `next.config.ts`).

## Conclusion
The application is in a good security posture. The identified dependency risk has been mitigated, and security headers have been further hardened.
