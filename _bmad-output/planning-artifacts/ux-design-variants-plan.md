# UX Design Variants Plan

> **Goal**: Create unique, detail-rich component designs for each non-Home page to replace recycled summary components and improve user experience.

## Problem Statement

The portfolio site currently reuses the same components (with `summary={true/false}` toggle) across Home and detail pages. This makes detail pages feel like expanded versions of the same content rather than **destination experiences** with comprehensive information.

---

## Pages to Redesign

### 1. Skills Page ✅ WIREFRAME COMPLETE

**Status**: Wireframe created, pending review

**Design Decisions**:
| Decision | Choice |
|----------|--------|
| Card detail level | Medium (icon + name + progress bar + category tag) |
| Experience indicator | Progress bar + years together |
| Click behavior | No action (purely visual scan) |
| Categories | All, Languages, Frontend, Backend, Cloud, DevOps, Data, Security |
| Hero style | Creative dark "developer console" aesthetic (NOT maroon banner) |
| Filtering | Real-time fuzzy search + category filter pills |

**Wireframe**: [skills-page-wireframe.excalidraw](file:///c:/Repos/com.daltonponder_next/_bmad-output/excalidraw-diagrams/skills-page-wireframe.excalidraw)

**Layout Structure**:
1. Hero zone (dark bg + code decorations)
2. Search bar (full-width, real-time filtering)
3. Category filter pills (horizontally scrollable on mobile)
4. Skill cards grid (3 columns desktop, responsive)
5. Stats footer ("Showing X of Y skills")

---

### 2. About Page 🔲 NOT STARTED

**Concept**: "The Journey" – narrative arc experience

**Proposed Features**:
- Timeline experience (career milestones, education, key moments)
- Dual-persona layout (Professional vs Personal columns)
- Testimonials carousel (larger quotes, context)

**To Discuss**:
- [ ] Timeline data structure (abstract vs real dates)
- [ ] What to include in Professional vs Personal sections
- [ ] Testimonial presentation style

---

### 3. Credentials Page 🔲 NOT STARTED

**Concept**: "Proof of Excellence" – credibility showcase

**Proposed Features**:
- Education section (full degree details, institutions, focus areas)
- Certification cards (logos, validity, skills verified)
- Experience highlights (notable employers/projects)

**To Discuss**:
- [ ] Education details to display
- [ ] Certification badge styling
- [ ] Whether to include work experience timeline

---

### 4. Contact Page 🔲 NOT STARTED

**Concept**: "Let's Build Something" – warm welcome mat

**Proposed Features**:
- Hero with personalized call-to-action
- Availability indicator (open to: freelance/full-time/consulting)
- Response time expectation
- Multiple contact paths (form, email, calendar booking)

**To Discuss**:
- [ ] Current availability to display
- [ ] Calendar booking integration (if any)
- [ ] Preferred contact hierarchy

---

## Progress Tracker

| Page | Discuss | Decisions | Wireframe | Review | Implement |
|------|:-------:|:---------:|:---------:|:------:|:---------:|
| Skills | ✅ | ✅ | ✅ | 🔲 | 🔲 |
| About | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 |
| Credentials | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 |
| Contact | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 |

---

## Design Principles Agreed

1. **Use mock data** – content population happens later
2. **Expand design patterns** – not limited to existing Bento grid
3. **Detail pages = destinations** – comprehensive info, not just expanded summaries
4. **Interactive where appropriate** – filtering/search for Skills

---

## Session Context for New Agents

When resuming this work, invoke `/ux-designer` agent and reference this document. Key context:

- We are designing **detail page variants** for a portfolio website
- The site uses Next.js + React with Framer Motion animations
- Existing components are in `app/components/sections/`
- Output wireframes go to `_bmad-output/excalidraw-diagrams/`
- User prefers to discuss concepts before wireframing
