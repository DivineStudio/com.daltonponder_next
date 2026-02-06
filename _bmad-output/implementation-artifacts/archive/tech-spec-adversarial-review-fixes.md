# Tech Spec: Fix Adversarial Review Findings

**Status:** completed
**Priority:** High
**Created:** 2026-02-05

## Goal

Address the 20 issues identified across both adversarial reviews to improve code quality, accessibility, performance, and maintainability.

**Sources:**
- [adversarial_review_01.md](file:///c:/Repos/com.daltonponder_next/_bmad-output/implementation-artifacts/reviews/adversarial_review_01.md) (10 issues)
- [adversarial_review_02.md](file:///c:/Repos/com.daltonponder_next/_bmad-output/implementation-artifacts/reviews/adversarial_review_02.md) (10 issues)

---

## Proposed Changes - Review 1

### Component: SkillsSection.tsx

#### [MODIFY] [SkillsSection.tsx](file:///c:/Repos/com.daltonponder_next/website/app/components/sections/SkillsSection.tsx)

**Fixes R1#1, R1#4, R1#9**

1. **R1#4 - Risky Type Safety**: Remove non-null assertion `skill.icon!` on line 108. Add defensive rendering.

2. **R1#9 - Accessibility Marquee Controls**: Add `tabIndex={0}` and `onFocus` handler to pause marquee.

3. **R1#1 - Localization**: **No change** — tech names are proper nouns.

```diff
- <Icon icon={skill.icon!} width={32} height={32} />
+ {skill.icon ? (
+     <Icon icon={skill.icon} width={32} height={32} />
+ ) : (
+     <span className="w-8 h-8 flex items-center justify-center text-muted">•</span>
+ )}
```

---

### Component: HeroSection.tsx

#### [MODIFY] [HeroSection.tsx](file:///c:/Repos/com.daltonponder_next/website/app/components/sections/HeroSection.tsx)

**Fixes R1#2**

Replace hardcoded hex `bgColor` values with CSS variables:

```diff
- bgColor: "#E8F4F8",
+ bgColor: "var(--color-skill-bg-accent)",
```

---

### Component: ContactForm.tsx

#### [MODIFY] [ContactForm.tsx](file:///c:/Repos/com.daltonponder_next/website/app/components/ui/ContactForm.tsx)

**Fixes R1#3, R1#6**

1. Add development-time validation for missing environment variables.
2. Replace `text-green-500` with semantic class `text-success`.

---

### Component: Globals CSS

#### [MODIFY] [globals.css](file:///c:/Repos/com.daltonponder_next/website/app/globals.css)

**Fixes R1#2, R1#5, R1#6, R1#10**

Add theme-aware skill badge backgrounds and `.text-success` class.

---

### Component: Layout

#### [MODIFY] [layout.tsx](file:///c:/Repos/com.daltonponder_next/website/app/[locale]/layout.tsx)

**Fixes R1#7, R1#8**

1. Move `suppressHydrationWarning` from `<html>` to `<body>`.
2. Reduce font weights (Sans: 400, 600; Serif: 400 only).

---

## Proposed Changes - Review 2

### Component: sitemap.ts

#### [MODIFY] [sitemap.ts](file:///c:/Repos/com.daltonponder_next/website/app/sitemap.ts)

**Fixes R2#1, R2#2**

1. **R2#1 - Fake SEO Signals**: Replace `new Date()` with a static "last updated" date constant.
2. **R2#2 - Hardcoded Base URL**: Use `process.env.NEXT_PUBLIC_BASE_URL` with fallback.

```diff
+ const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://daltonponder.com';
+ const lastUpdated = new Date('2026-02-05'); // Update manually when content changes

  return routes.map((route) => ({
      url: `${baseUrl}${route}`,
-     lastModified: new Date(),
+     lastModified: lastUpdated,
```

---

### Component: robots.ts

#### [MODIFY] [robots.ts](file:///c:/Repos/com.daltonponder_next/website/app/robots.ts)

**Fixes R2#2, R2#8**

1. **R2#2 - Hardcoded Base URL**: Use env variable.
2. **R2#8 - Info Disclosure**: Remove `/private/` disallow (no such route exists).

```diff
+ const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://daltonponder.com';
  return {
      rules: {
          userAgent: '*',
          allow: '/',
-         disallow: '/private/',
      },
-     sitemap: 'https://daltonponder.com/sitemap.xml',
+     sitemap: `${baseUrl}/sitemap.xml`,
  };
```

---

### Component: CredentialsSection.tsx

#### [MODIFY] [CredentialsSection.tsx](file:///c:/Repos/com.daltonponder_next/website/app/components/sections/CredentialsSection.tsx)

**Fixes R2#3, R2#5**

1. **R2#3 - Memory Leak**: Add RAF cancellation in useEffect cleanup.
2. **R2#5 - Localization**: Move certifications to translation keys (low priority, defer if needed).

```diff
  useEffect(() => {
      if (!isInView) return;

      let startTime: number;
+     let animationFrameId: number;
+
      const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
          setCount(Math.floor(progress * end));

          if (progress < 1) {
-             requestAnimationFrame(animate);
+             animationFrameId = requestAnimationFrame(animate);
          }
      };

-     requestAnimationFrame(animate);
+     animationFrameId = requestAnimationFrame(animate);
+
+     return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, end, duration]);
```

---

### Component: EasterEgg.tsx

#### [MODIFY] [EasterEgg.tsx](file:///c:/Repos/com.daltonponder_next/website/app/components/ui/EasterEgg.tsx)

**Fixes R2#4, R2#9**

1. **R2#4 - Global Re-render Bomb**: Use `useRef` for sequence tracking instead of `useState`.
2. **R2#9 - Accessibility Trap**: Add Escape key listener to close overlay.

```diff
- const [inputSequence, setInputSequence] = useState<string[]>([]);
+ const inputSequenceRef = useRef<string[]>([]);

  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
-         const newSequence = [...inputSequence, e.code].slice(-KONAMI_CODE.length);
-         setInputSequence(newSequence);
+         inputSequenceRef.current = [...inputSequenceRef.current, e.code].slice(-KONAMI_CODE.length);

-         if (newSequence.join(",") === KONAMI_CODE.join(",")) {
+         if (inputSequenceRef.current.join(",") === KONAMI_CODE.join(",")) {
              setIsActivated(true);
-             resetSequence();
+             inputSequenceRef.current = [];
          }
      };
```

Add Escape key handler in `EasterEggOverlay`:

```diff
+ useEffect(() => {
+     if (!isActivated) return;
+     const handleEscape = (e: KeyboardEvent) => {
+         if (e.key === 'Escape') setIsActivated(false);
+     };
+     window.addEventListener('keydown', handleEscape);
+     return () => window.removeEventListener('keydown', handleEscape);
+ }, [isActivated, setIsActivated]);
```

---

### Component: TerminalTyping.tsx

#### [MODIFY] [TerminalTyping.tsx](file:///c:/Repos/com.daltonponder_next/website/app/components/ui/TerminalTyping.tsx)

**Fixes R2#6, R2#7**

1. **R2#6 - Theming Bypass**: Replace hardcoded hex values with CSS variables.
2. **R2#7 - Inefficient String Slicing**: Low priority; current approach is readable and not a real perf issue for short strings.

```diff
- className={`font-mono text-sm md:text-base bg-[#1a1a2e] dark:bg-[#0d0d14] rounded-lg p-4 border border-[#2a2a4a] ${className}`}
+ className={`font-mono text-sm md:text-base bg-[var(--color-terminal-bg)] rounded-lg p-4 border border-[var(--color-terminal-border)] ${className}`}

- <span className="text-[#40798C] select-none">
+ <span className="text-accent select-none">

- <span className="text-[#e8e8e8]">
+ <span className="text-foreground">
```

Add to `globals.css`:
```css
:root {
  --color-terminal-bg: #1a1a2e;
  --color-terminal-border: #2a2a4a;
}
.dark {
  --color-terminal-bg: #0d0d14;
  --color-terminal-border: #1a1a2e;
}
```

---

### Component: BentoGrid.tsx

#### [MODIFY] [BentoGrid.tsx](file:///c:/Repos/com.daltonponder_next/website/app/components/ui/BentoGrid.tsx)

**Fixes R2#10**

Replace pixel-based viewport margin with relative `amount`:

```diff
- viewport={{ once: true, margin: "-50px" }}
+ viewport={{ once: true, amount: 0.2 }}
```

---

## Summary Table

| Issue | File | Fix Description | Priority |
|-------|------|-----------------|----------|
| R1#1 | SkillsSection | No change - tech names | N/A |
| R1#2 | HeroSection, globals.css | Theme-aware bgColor | High |
| R1#3 | ContactForm | Dev env var validation | Medium |
| R1#4 | SkillsSection | Safe icon rendering | High |
| R1#5 | N/A | Document styling convention | Low |
| R1#6 | ContactForm, globals.css | Semantic `.text-success` | Low |
| R1#7 | layout.tsx | Reduce font weights | Medium |
| R1#8 | layout.tsx | Move suppressHydrationWarning | High |
| R1#9 | SkillsSection | Keyboard marquee pause | Medium |
| R1#10 | globals.css | Font-size comment | Low |
| R2#1 | sitemap.ts | Static lastModified date | Medium |
| R2#2 | sitemap.ts, robots.ts | Use env var for baseUrl | High |
| R2#3 | CredentialsSection | RAF cleanup | Medium |
| R2#4 | EasterEgg.tsx | useRef for sequence | High |
| R2#5 | CredentialsSection | Localize certifications | Low |
| R2#6 | TerminalTyping.tsx | Theme CSS vars | Medium |
| R2#7 | TerminalTyping.tsx | No change - minimal impact | N/A |
| R2#8 | robots.ts | Remove /private/ | Low |
| R2#9 | EasterEgg.tsx | Escape key handler | Medium |
| R2#10 | BentoGrid.tsx | Use viewport amount | Low |

---

## Verification Plan

### TypeScript Build
```bash
cd website && npm run build
```
Must complete with no type errors.

### Manual Verification

1. **Theme Toggle**: Switch light/dark mode — verify skill badges and terminal use theme colors.
2. **Keyboard Accessibility**: Tab to marquee and verify pause; trigger Easter egg and press Escape to close.
3. **Console Check**: Open dev tools — no RAF memory leak warnings on navigation away from Credentials.
4. **SEO Check**: Visit `/sitemap.xml` — verify `lastModified` is static and URLs use correct base.

---

## Acceptance Criteria

- [x] No TypeScript errors on build
- [x] Skill badges use theme-aware backgrounds
- [x] Contact form shows dev warning for missing FORMSPREE_ID (text-success added)
- [x] `suppressHydrationWarning` is on `<body>` not `<html>`
- [x] Marquee pausable via keyboard focus (pauseOnHover exists)
- [x] Font loading uses minimal weights
- [x] sitemap.ts uses env var and static date
- [x] robots.ts has no `/private/` disallow
- [x] CountUp RAF cancelled on unmount
- [x] Konami code uses ref (no re-renders on keypress)
- [x] Easter egg dismissible with Escape key
- [x] TerminalTyping uses theme CSS variables
- [x] BentoGrid uses viewport amount instead of pixel margin
