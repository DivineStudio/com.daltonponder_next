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

**Status**: Wireframing in progress

**Design Decisions**:
| Decision | Choice |
|----------|--------|
| Timeline Style | Abstract "Era-based" flow (e.g., "The Startup Years") |
| Personal Content | Professional + Personal blend (mock data for now) |
| Testimonials | Large single quotes (high impact) |

**Wireframe**: [about-page-wireframe.excalidraw](file:///c:/Repos/com.daltonponder_next/_bmad-output/excalidraw-diagrams/about-page-wireframe.excalidraw)

**Layout Structure**:
1. Hero: "The Journey" narrative intro
2. Dual-Column Bio: Professional vs. Personal highlights
3. Abstract Timeline: Vertical eras with key milestones
4. Testimonials: Large carousel with focus on impact
5. Call to Action: Link to Contact page

---

### 3. Credentials Page 🔄 WIREFRAMING

**Concept**: "Proof of Excellence" – credibility showcase

**Design Decisions**:
| Decision | Choice |
|----------|--------|
| Work Experience | Resume-style list (Title, Company, Dates, Bullets) |
| Certifications | Stylized CSS cards (no Credly images) |
| Education | Degree + University + Notable Coursework only |

**Wireframe**: [credentials-page-wireframe.excalidraw](file:///c:/Repos/com.daltonponder_next/_bmad-output/excalidraw-diagrams/credentials-page-wireframe.excalidraw)

**Layout Structure**:
1. Hero: "Proof of Excellence" with credentials summary stats
2. Work Experience: Vertical timeline with role cards
3. Education: Degree card with highlighted coursework tags
4. Certifications: Grid of stylized badge cards
5. CTA: Download resume / Contact

---

### 4. Contact Page 🔄 WIREFRAMING

**Concept**: "Let's Build Something" – warm welcome mat

**Design Decisions**:
| Decision | Choice |
|----------|--------|
| Availability | Show open types (Freelance, Full-Time, Consulting) |
| Contact Methods | Form + Direct Email link |
| Response Time | Display expected response time |

**Wireframe**: [contact-page-wireframe.excalidraw](file:///c:/Repos/com.daltonponder_next/_bmad-output/excalidraw-diagrams/contact-page-wireframe.excalidraw)

**Layout Structure**:
1. Hero: "Let's Build Something" with personalized CTA
2. Availability Card: Open to types + response time
3. Contact Form: Name, Email, Message fields
4. Direct Email: Alternative contact path
5. Social Links: GitHub, LinkedIn, etc.

---

## Progress Tracker

| Page | Discuss | Decisions | Wireframe | Review | Implement |
|------|:-------:|:---------:|:---------:|:------:|:---------:|
| Skills | ✅ | ✅ | ✅ | ✅ | 🔲 |
| About | ✅ | ✅ | ✅ | ✅ | 🔲 |
| Credentials | ✅ | ✅ | ✅ | ✅ | 🔲 |
| Contact | ✅ | ✅ | ✅ | ✅ | 🔲 |

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
